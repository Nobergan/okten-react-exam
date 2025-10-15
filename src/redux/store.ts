import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { genresSlice, heroSliderSlice, filmsWidgetSlice } from '@redux/slices';

export const store = configureStore({
  reducer: {
    heroSlider: heroSliderSlice.reducer,
    genres: genresSlice.reducer,
    filmsWidget: filmsWidgetSlice.reducer
  }
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();
