import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFilmDetails, getFilmTrailer } from '@services';

import type { ApiFilmDetails } from '@models';
import type { MediaType } from '@types';

export type FilmKey = `${MediaType}:${number}`;

export const makeFilmKey = (mediaType: MediaType, id: number): FilmKey =>
  `${mediaType}:${id}`;

type FilmDetailsType = {
  loading: boolean;
  error: string | null;
  data: ApiFilmDetails | null;
  trailerUrl?: string | null;
  lastFetch: number | null;
};

export type FilmDetailsState = {
  byKey: Partial<Record<FilmKey, FilmDetailsType>>;
};

const emptyItem: FilmDetailsType = {
  loading: false,
  error: null,
  data: null,
  lastFetch: null
};

const initialState: FilmDetailsState = { byKey: {} };

export const loadFilmDetails = createAsyncThunk<
  { key: FilmKey; data: ApiFilmDetails },
  { mediaType: MediaType; id: number }
>('filmDetails/load', async ({ mediaType, id }) => {
  const data = await getFilmDetails(mediaType, id);

  return { key: `${mediaType}:${id}`, data };
});

export const loadFilmTrailer = createAsyncThunk<
  { key: FilmKey; trailerUrl: string | null },
  { mediaType: MediaType; id: number }
>('filmDetails/loadTrailer', async ({ mediaType, id }) => {
  const trailerUrl = await getFilmTrailer(mediaType, id);

  return { key: `${mediaType}:${id}`, trailerUrl };
});

export const filmDetailsSlice = createSlice({
  name: 'filmDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadFilmDetails.pending, (state, action) => {
        const { mediaType, id } = action.meta.arg;
        const key = makeFilmKey(mediaType, id);

        state.byKey[key] = state.byKey[key] ?? { ...emptyItem };
        state.byKey[key]!.loading = true;
        state.byKey[key]!.error = null;
      })
      .addCase(loadFilmDetails.fulfilled, (state, action) => {
        const { key, data } = action.payload;

        state.byKey[key] = state.byKey[key] ?? { ...emptyItem };
        state.byKey[key]!.loading = false;
        state.byKey[key]!.data = data;
        state.byKey[key]!.lastFetch = Date.now();
      })
      .addCase(loadFilmTrailer.fulfilled, (state, action) => {
        const { key, trailerUrl } = action.payload;

        state.byKey[key] = state.byKey[key] ?? { ...emptyItem };
        state.byKey[key]!.trailerUrl = trailerUrl;
      })
      .addCase(loadFilmDetails.rejected, (state, action) => {
        const { mediaType, id } = action.meta.arg;
        const key = makeFilmKey(mediaType, id);

        state.byKey[key] = state.byKey[key] ?? { ...emptyItem };
        state.byKey[key]!.loading = false;
        state.byKey[key]!.error =
          action.error.message ?? 'Failed to load details';
      })
});

export const filmDetailsActions = {
  ...filmDetailsSlice.actions,
  loadFilmDetails,
  loadFilmTrailer
};
