import { store } from '@/store';
import { appReducer } from '@/store/app/app.reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';

export const persist = persistStore(store);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseAppReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type RootAppState = ReturnType<typeof baseAppReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
