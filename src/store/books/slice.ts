import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { sliceName } from './constants';
import { Book, BooksState, SetInputPayload } from './types';
import { getBooksThunk } from './thunks';

const initialState: BooksState = {
  totalItems: null,
  isPaginating: false,
  status: 'init',
  inputValues: {
    search: '',
    category: 'all',
    orderBy: 'relevance',
  },
  startIndex: 0,
  items: {},
  ids: [],
};

const booksSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setBook: (state, { payload }: PayloadAction<Book>) => {
      state.items[payload.id] = payload;
    },
    setInputValue: (state, { payload }: PayloadAction<SetInputPayload>) => {
      //@ts-ignore
      state.inputValues[payload.key] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksThunk.pending, (state, { meta }) => {
      if (meta.arg.startIndex) {
        state.isPaginating = true;
      } else {
        state.status = 'loading';
      }
    });

    builder.addCase(getBooksThunk.fulfilled, (state, { meta, payload }) => {
      if (meta.arg.startIndex) {
        state.isPaginating = false;
        state.startIndex += meta.arg.maxResults || 30;
        if (payload.ids) state.ids = state.ids.concat(payload.ids);
      } else {
        state.status = 'success';
        state.startIndex = meta.arg.maxResults || 30;
        if (payload.ids) state.ids = payload.ids;
      }

      state.items = { ...state.items, ...payload.items };

      state.totalItems = payload.totalItems;
    });

    builder.addCase(getBooksThunk.rejected, (state) => {
      state.isPaginating = false;
      state.status = 'error';
    });
  },
});

export const { actions: booksActions } = booksSlice;

export default booksSlice.reducer;
