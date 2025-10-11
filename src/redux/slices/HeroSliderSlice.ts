import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import type { ApiFilm } from '@models';
import type { MediaSourceType, MediaType } from '@types';
import { MediaSource, TTL_MS } from '@constants';
import { getPopularFilms, getTrendAllFilms } from '@services';
import { getErrorMessage } from '@utils';

type CacheItem = {
  films: ApiFilm[];
  lastFetch: number;
};

type HeroSliderSliceType = {
  films: ApiFilm[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
  lastArgs: { source: MediaSourceType; mediaType?: MediaType } | null;
  cache: Record<string, CacheItem>;
};

const initHeroSliderSliceState: HeroSliderSliceType = {
  films: [],
  loading: false,
  error: null,
  lastFetch: null,
  lastArgs: null,
  cache: {}
};

const makeKey = (source: MediaSourceType, mediaType?: MediaType) =>
  `${source}:${mediaType ?? 'all'}`;

export const loadFilms = createAsyncThunk<
  { films: ApiFilm[]; key: string; fromCache: boolean },
  { source: MediaSourceType; mediaType?: MediaType },
  { state: { heroSlider: HeroSliderSliceType }; rejectValue: string }
>(
  'heroSlider/loadFilms',
  async ({ source, mediaType }, { getState, rejectWithValue }) => {
    const key = makeKey(source, mediaType);
    const { cache } = getState().heroSlider;
    const now = Date.now();

    const cached = cache[key];
    if (cached && now - cached.lastFetch < TTL_MS) {
      return { films: cached.films, key, fromCache: true };
    }

    try {
      const res =
        source === MediaSource.Trend
          ? await getTrendAllFilms()
          : await getPopularFilms(mediaType);

      const films = res?.results ?? [];
      return { films, key, fromCache: false };
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const heroSliderSlice = createSlice({
  name: 'heroSliderSlice',
  initialState: initHeroSliderSliceState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadFilms.pending, (state, action) => {
        const { source, mediaType } = action.meta.arg ?? {};

        state.loading = true;
        state.error = null;
        state.lastArgs = { source, mediaType };
      })
      .addCase(
        loadFilms.fulfilled,
        (
          state,
          action: PayloadAction<{
            films: ApiFilm[];
            key: string;
            fromCache: boolean;
          }>
        ) => {
          const { films, key, fromCache } = action.payload;

          state.loading = false;
          state.films = films;
          state.lastFetch = Date.now();

          if (!fromCache) {
            state.cache[key] = {
              films,
              lastFetch: state.lastFetch
            };
          }
        }
      )
      .addCase(loadFilms.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Failed to load films';
      })
});

export const heroSliderFilmsActions = {
  ...heroSliderSlice.actions,
  loadFilms
};
