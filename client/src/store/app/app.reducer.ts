import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@/store/app/auth/auth.reducer';

export const appReducer = combineReducers({
  auth: authReducer
});

export type RootStateWeb = ReturnType<typeof appReducer>;
