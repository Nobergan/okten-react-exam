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
  itemsByType: { movie: [], tv: [] },
  errorByType: { movie: null, tv: null },
  lastFetchByType: { movie: null, tv: null }
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
  extraReducers: (b) => {
    b.addCase(loadGenres.pending, (state, action) => {
      const t = action.meta.arg.mediaType;
      state.errorByType[t] = null;
    });
    b.addCase(
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
    b.addCase(loadGenres.rejected, (state, action) => {
      const t = action.meta.arg.mediaType;
      state.errorByType[t] =
        (action.payload as string | undefined) ??
        action.error.message ??
        'Failed to load genres';
    });
  }
});

export const genresActions = { ...genresSlice.actions, loadGenres };
