import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';

import { getGenresFilmsList } from '@services';
import { getErrorMessage } from '@utils';

import type { ApiGenre } from '@models';
import type { MediaType } from '@types';
import { TTL_MS } from '@constants';

type PerType<T> = Record<MediaType, T>;

type GenresSliceState = {
  itemsByType: PerType<ApiGenre[]>;
  errorByType: PerType<string | null>;
  lastFetchByType: PerType<number | null>;
};

const initialState: GenresSliceState = {
  itemsByType: { all: [], movie: [], tv: [] },
  errorByType: { all: null, movie: null, tv: null },
  lastFetchByType: { all: null, movie: null, tv: null }
};

export const loadGenres = createAsyncThunk<
  { mediaType: MediaType; items: ApiGenre[] },
  { mediaType: MediaType },
  { state: { genres: GenresSliceState }; rejectValue: string }
>('genres/loadGenres', async ({ mediaType }, { getState, rejectWithValue }) => {
  try {
    const state = getState().genres;
    const last = state.lastFetchByType[mediaType];
    const hasGenresFresh =
      last && Date.now() - last < TTL_MS && state.itemsByType[mediaType].length;

    if (hasGenresFresh) {
      return { mediaType, items: state.itemsByType[mediaType] };
    }

    const res = await getGenresFilmsList(mediaType);
    const items = res?.genres ?? [];
    return { mediaType, items };
  } catch (e) {
    return rejectWithValue(getErrorMessage(e) ?? 'Failed to load genres');
  }
});

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadGenres.pending, (state, action) => {
      const mediaType = action.meta.arg.mediaType;

      state.errorByType[mediaType] = null;
    });
    builder.addCase(
      loadGenres.fulfilled,
      (
        state,
        action: PayloadAction<{ mediaType: MediaType; items: ApiGenre[] }>
      ) => {
        const { mediaType, items } = action.payload;

        state.itemsByType[mediaType] = items;
        state.lastFetchByType[mediaType] = Date.now();
      }
    );
    builder.addCase(loadGenres.rejected, (state, action) => {
      const mediaType = action.meta.arg.mediaType;

      state.errorByType[mediaType] =
        action.payload ?? action.error.message ?? 'Failed to load genres';
    });
  }
});

export const genresActions = { ...genresSlice.actions, loadGenres };
