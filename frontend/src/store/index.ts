import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import promptReducer from './slices/promptSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prompts: promptReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
