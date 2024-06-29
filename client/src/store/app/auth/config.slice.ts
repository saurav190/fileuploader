import { Ierror } from '@/types/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export interface Iconfig {
  isLoggedIn: boolean;
  errorToken: Ierror | null;
  errorUserDetails: Ierror | null;
}

const initialState: Iconfig = {
  isLoggedIn: false,
  errorToken: null,
  errorUserDetails: null
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    SET_ISLOGGEDIN: state => {
      state.isLoggedIn = true;
    },
    SET_REFRESH_ERROR: (state, action: PayloadAction<Ierror>) => {
      state.errorToken = action.payload;
    },
    SET_USER_DETAILS_ERROR: (state, action: PayloadAction<Ierror>) => {
      state.errorUserDetails = action.payload;
    },
    RESET_CONFIG: () => initialState
  }
});

export const { SET_ISLOGGEDIN, SET_REFRESH_ERROR, SET_USER_DETAILS_ERROR, RESET_CONFIG } = configSlice.actions;
