import { combineReducers } from 'redux';
import { sliceName as sliceNameBooks } from './books/constants';

import booksReducer from './books';

export const rootReducer = combineReducers({
  [sliceNameBooks]: booksReducer
})

export type RootState = ReturnType<typeof rootReducer>;