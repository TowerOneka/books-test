import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, AsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch } from '@/store';

export const useActionsCreator = <T extends ActionCreatorsMapObject>(
  actions: T
): BoundActions<T> => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
  ...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>;
