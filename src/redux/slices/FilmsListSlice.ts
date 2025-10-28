import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilmsByGenre, getMediaByType } from '@services';

import type { ApiFilm, ApiFilms } from '@models';
import type { TransformedMediaType } from '@types';

const buildRequestKey = (genreId: number | null | undefined, page: number) =>
  `${genreId ?? 'all'}|${page}`;

type FilmsListType = {
  films: ApiFilm[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  lastFetch: number | null;
  lastKey: string | null;
  inFlightKey: string | null;
};

type FilmsListState = Record<TransformedMediaType, FilmsListType>;

const emptyState: FilmsListType = {
  films: [],
  loading: false,
  error: null,
  totalPages: 0,
  lastFetch: null,
  lastKey: null,
  inFlightKey: null
};

const initialState: FilmsListState = {
  movie: { ...emptyState },
  tv: { ...emptyState }
};

export const loadFilmsList = createAsyncThunk<
  ApiFilms,
  { mediaType: TransformedMediaType; page: number; genreId?: number | null }
>('loadFilmsList', async ({ mediaType, page, genreId }, thunkAPI) => {
  const data = genreId
    ? await getFilmsByGenre(mediaType, genreId, page)
    : await getMediaByType(mediaType, page);
  return thunkAPI.fulfillWithValue(data);
});

export const filmsListSlice = createSlice({
  name: 'filmsList',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadFilmsList.pending, (state, action) => {
        const { mediaType, page, genreId } = action.meta.arg;
        const key = buildRequestKey(genreId, page);
        const stateByMediaType = state[mediaType];

        stateByMediaType.loading = true;
        stateByMediaType.error = null;
        stateByMediaType.inFlightKey = key;
      })
      .addCase(loadFilmsList.fulfilled, (state, action) => {
        const { mediaType, page, genreId } = action.meta.arg;
        const key = buildRequestKey(genreId, page);
        const payload = action.payload;
        const stateByMediaType = state[mediaType];

        stateByMediaType.films = payload.results ?? [];
        stateByMediaType.totalPages =
          payload.total_pages ?? stateByMediaType.totalPages;
        stateByMediaType.loading = false;
        stateByMediaType.lastFetch = Date.now();
        stateByMediaType.lastKey = key;
        stateByMediaType.inFlightKey = null;
      })
      .addCase(loadFilmsList.rejected, (state, action) => {
        const { mediaType } = action.meta.arg;
        const stateByMediaType = state[mediaType];

        stateByMediaType.loading = false;
        stateByMediaType.error = action.error.message ?? 'Failed to load films';
        stateByMediaType.inFlightKey = null;
      })
});

export const filmsListActions = {
  ...filmsListSlice.actions,
  loadFilmsList
};
