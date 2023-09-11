import { Book, Category, OrderedBy } from './types';

export type GetBooksRequest = {
  q: string;
  category?: Category;
  orderBy?: OrderedBy;
  startIndex?: number;
  maxResults?: number;
  langRestrict?: 'ru';
};

export type GetBooksListResponse = {
  kind: 'books#volumes';
  items?: Book[];
  totalItems: number;
};

export type GetCurrentBookResponse = Book;
