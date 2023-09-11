import { Methods, request } from '@/utils/request';
import { GetBooksListResponse, GetBooksRequest, GetCurrentBookResponse } from './types.api';

export const getBooks = ({
  startIndex = 0,
  maxResults = 30,
  langRestrict,
  category,
  q,
  ...rest
}: GetBooksRequest) => {
  const params = {
    startIndex,
    maxResults,
    ...(!!langRestrict && { langRestrict }),
    q: `${q}${category && category !== 'all' ? `+subject:${category}` : ''}`,
    // ...(category !== 'all' && {
    //   fields: { volumeInfo: { categories: [category!.toUpperCase()] } },
    // }),
    ...rest,
  };
  return request<GetBooksListResponse>(Methods.GET, {
    url: '/volumes',
    params,
  });
};

export const getCurrentBook = async (id: string) =>
  request<GetCurrentBookResponse>(Methods.GET, {
    url: `/volumes/${id}`,
  });
