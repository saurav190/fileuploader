import { Ierror, LoginRequest, LoginResponseTokens } from '@/types/auth';
import { store } from '@/store';
import { SET_ISLOGGEDIN, SET_REFRESH_ERROR } from '@/store/app/auth/config.slice';
import { SET_TOKENS, Tokens } from '@/store/app/auth/token.slice';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { apiService } from '@services/api.service.ts';

const authApi = apiService.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponseTokens, LoginRequest>({
      query: credentials => ({
        url: 'login/',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: [{ type: 'AUTH' }],
      transformResponse: (response: LoginResponseTokens, meta: FetchBaseQueryMeta | undefined) => {
        const res = response;
        if (meta?.response && meta?.response?.ok) {
          store.dispatch(SET_TOKENS(res));
          store.dispatch(SET_ISLOGGEDIN());
        }

        return res as LoginResponseTokens;
      },
      transformErrorResponse: error => {
        const resError = error as Ierror;
        if (resError.status === 400 || resError.status === 401) {
          console.log('error while login', resError);
        } else if (resError?.status === 'FETCH_ERROR') {
          console.log('error while login', resError);
        }
      }
    }),
    refresh: builder.mutation<Tokens, string>({
      query: refreshToken => ({
        url: 'login/refresh/',
        method: 'POST',
        body: { refresh: refreshToken }
      }),
      invalidatesTags: [{ type: 'REFRESH' }],
      transformResponse: (response: Tokens, meta) => {
        const res = response;
        if (meta?.response && meta?.response?.ok) {
          store.dispatch(SET_TOKENS(res));
        }
        return res;
      },
      transformErrorResponse: error => {
        const resError = error as Ierror;
        if (resError) {
          store.dispatch(SET_REFRESH_ERROR(resError));
        }
      }
    })
  })
});

export const { useLoginMutation, useRefreshMutation } = authApi;
