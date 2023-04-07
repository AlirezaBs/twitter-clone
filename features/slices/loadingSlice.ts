import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  progress: number
}

const initialState: LoadingState = {
  isLoading: false,
  progress: 0
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setProgress: (state, action: PayloadAction<number>) => {
        state.progress = action.payload;
      },
  },
});

export const { startLoading, stopLoading, setProgress } = loadingSlice.actions;
export default loadingSlice.reducer;
