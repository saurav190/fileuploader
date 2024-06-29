import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ============================================//
// Non-Protected API Service
// ============================================//
export const publicApiService = createApi({
  reducerPath: 'public',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URI}/`
  }),
  refetchOnReconnect: true,
  endpoints: () => ({})
});

// ============================================//
// Base API Service
// ============================================//
export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URI}/`
  }),
  tagTypes: [
    'AUTH','REFRESH','FILE', 'FOLDER'
  ],
  refetchOnReconnect: true,
  endpoints: () => ({})
});
