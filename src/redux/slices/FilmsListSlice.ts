import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMediaByType } from '@services';

import type { ApiFilm, ApiFilms } from '@models';
import type { TransformedMediaType } from '@types';

type FilmsListType = {
  films: ApiFilm[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  lastFetch: number | null;
};

type FilmsListState = Record<TransformedMediaType, FilmsListType>;

const emptyState: FilmsListType = {
  films: [],
  loading: false,
  error: null,
  page: 0,
  totalPages: 0,
  lastFetch: null
};

const initialState: FilmsListState = {
  movie: { ...emptyState },
  tv: { ...emptyState }
};

export const loadFilmsByType = createAsyncThunk<
  ApiFilms,
  { mediaType: TransformedMediaType; page: number }
>('loadFilmsListByType', async ({ mediaType, page }, thunkAPI) => {
  const data = await getMediaByType(mediaType, page);
  return thunkAPI.fulfillWithValue(data);
});

export const filmsListSlice = createSlice({
  name: 'filmsList',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadFilmsByType.pending, (state, action) => {
        const { mediaType } = action.meta.arg;

        state[mediaType].loading = true;
        state[mediaType].error = null;
      })
      .addCase(loadFilmsByType.fulfilled, (state, action) => {
        const { mediaType } = action.meta.arg;
        const payload = action.payload;
        const target = state[mediaType];

        target.films = payload.results ?? [];

        target.page = payload.page ?? target.page;
        target.totalPages = payload.total_pages ?? target.totalPages;
        target.loading = false;
        target.lastFetch = Date.now();
      })
      .addCase(loadFilmsByType.rejected, (state, action) => {
        const { mediaType } = action.meta.arg;

        state[mediaType].loading = false;
        state[mediaType].error = action.error.message ?? 'Failed to load films';
      })
});

export const filmsListActions = {
  ...filmsListSlice.actions,
  loadFilmsByType
};
