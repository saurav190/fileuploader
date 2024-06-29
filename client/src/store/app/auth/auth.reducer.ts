import { combineReducers } from '@reduxjs/toolkit';
import { configSlice } from '@/store/app/auth/config.slice';
import { tokenSlice } from '@/store/app/auth/token.slice';

export const authReducer = combineReducers({
  config: configSlice.reducer,
  token: tokenSlice.reducer
});
