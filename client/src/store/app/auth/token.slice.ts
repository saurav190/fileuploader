import { encryptData } from '@utils/functions';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Tokens {
  refresh: string;
  access: string;
}

const initialState: Tokens = {
  access: '',
  refresh: ''
};

export const tokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_TOKENS: (state, action: PayloadAction<Tokens>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      localStorage.setItem('tokens', encryptData(JSON.stringify(action?.payload)));
    },
    RESET_TOKENS: () => initialState
  }
});

export const { SET_TOKENS, RESET_TOKENS } = tokenSlice.actions;
