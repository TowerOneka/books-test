import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from './constants';
import { getBooks } from './api';
import { GetBooksRequest } from './types.api';
import { Book, SerializedGetBooksResponse } from './types';

export const getBooksThunk = createAsyncThunk<SerializedGetBooksResponse, GetBooksRequest>(
  `${sliceName}/getBooks`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getBooks(payload);
      const ids = data.items?.map((item) => item.id);

      const items = data.items?.reduce(
        (acc, item) => {
          acc[item.id] = item;

          return acc;
        },
        <Record<string, Book>>{}
      );

      return {
        ids,
        items,
        totalItems: data.totalItems,
      };
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);
