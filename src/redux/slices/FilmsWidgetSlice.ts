import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getPopularFilmsWidget,
  getTrendFilms,
  getUpcomingFilmsWidget
} from '@services';

import type { ApiFilm, ApiFilms } from '@models';
import type { MediaSourceType, MediaType } from '@types';

type FilmsWidgetType = {
  films: ApiFilm[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
};

type FilmsWidgetState = {
  bySource: Record<MediaSourceType, Record<MediaType, FilmsWidgetType>>;
};

const emptyState: FilmsWidgetType = {
  films: [],
  loading: false,
  error: null,
  lastFetch: null
};

const makeInitialStateByType = (): Record<MediaType, FilmsWidgetType> => ({
  all: { ...emptyState },
  movie: { ...emptyState },
  tv: { ...emptyState }
});

const initialState: FilmsWidgetState = {
  bySource: {
    trending: makeInitialStateByType(),
    popular: makeInitialStateByType(),
    upcoming: makeInitialStateByType()
  }
};

export const loadWidgetFilms = createAsyncThunk<
  ApiFilm[] | null,
  { mediaType: MediaType; source: MediaSourceType }
>('loadFilmsWidget', async ({ mediaType, source }, thunkAPI) => {
  const fetcher: () => Promise<ApiFilms> = {
    popular: () => getPopularFilmsWidget(mediaType),
    trending: () => getTrendFilms(mediaType),
    upcoming: () => getUpcomingFilmsWidget()
  }[source];

  const data = fetcher ? await fetcher() : null;
  return thunkAPI.fulfillWithValue(data?.results ?? null);
});

export const filmsWidgetSlice = createSlice({
  name: 'filmsWidget',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadWidgetFilms.pending, (state, action) => {
        const { mediaType, source } = action.meta.arg;

        state.bySource[source][mediaType].loading = true;
        state.bySource[source][mediaType].error = null;
      })
      .addCase(loadWidgetFilms.fulfilled, (state, action) => {
        const { mediaType, source } = action.meta.arg;
        const target = state.bySource[source][mediaType];

        target.loading = false;
        target.films = action.payload ?? [];
        target.lastFetch = Date.now();
      })
      .addCase(loadWidgetFilms.rejected, (state, action) => {
        const { mediaType, source } = action.meta.arg;
        const target = state.bySource[source][mediaType];

        target.loading = false;
        target.error = action.error.message ?? 'Failed to load films';
      })
});

export const filmsWidgetActions = {
  ...filmsWidgetSlice.actions,
  loadWidgetFilms
};
