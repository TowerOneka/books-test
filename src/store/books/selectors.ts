import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../reducers';

const rootSelector = createSelector(
  (state: RootState) => state,
  (state) => state.books
);

export const totalItemsSelector = createSelector(rootSelector, (state) => state.totalItems);

export const statusSelector = createSelector(rootSelector, (state) => state.status);

export const inputValuesSelector = createSelector(rootSelector, (state) => state.inputValues);

export const isPaginatingSelector = createSelector(rootSelector, (state) => state.isPaginating);

export const listSelector = createSelector(rootSelector, (state) =>
  state.ids.map((id) => state.items[id])
);

export const startIndexSelector = createSelector(rootSelector, (state) => state.startIndex);

export const currentBookSelector = createSelector(
  rootSelector,
  (_: unknown, id: string) => id,
  (state, id) => state.items[id]
);
