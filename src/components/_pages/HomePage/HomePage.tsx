import Loader from '@/components/_common/Loader';
import SearchForm from '@/components/_common/SearchForm';
import { categoryFields, orderByFields } from '@/store/books/constants';
import { Book, Category, OrderedBy, PendingStatus, SetInputPayload } from '@/store/books/types';
import Link from 'next/link';
import React, { useCallback } from 'react';
import s from './HomePage.module.scss';
import Image from 'next/image';
import Button from '@/components/_common/Button';
import Select from '@/components/_common/Select';

import EmptyImage from '@/assets/empty.png';

type Props = {
  category: Category;
  orderBy: OrderedBy;
  list: Book[];
  totalItems: number | null;
  startIndex: number;
  searchValue: string;
  isPaginating: boolean;
  status: PendingStatus;
  handleChangeField: (data: SetInputPayload) => void;
  handleLoadMore: () => void;
  handleRetry: () => void;
};

const HomePage = ({
  category,
  orderBy,
  searchValue,
  list,
  status,
  totalItems,
  startIndex,
  isPaginating,
  handleChangeField,
  handleRetry,
  handleLoadMore,
}: Props) => {
  const handleChangeSearch = useCallback(
    ({ search }: { search: string }) => {
      handleChangeField({
        key: 'search',
        value: search,
      });
    },
    [handleChangeField]
  );

  const handleChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChangeField({
        key: e.target.name as 'category' & 'orderBy',
        value: e.target.value as Category & OrderedBy,
      });
    },
    [handleChangeField]
  );

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>Books Search</h1>
        <SearchForm initialValue={searchValue} handleSubmit={handleChangeSearch} />
        <div className={s.selectWrapper}>
          <Select name="category" value={category} onChange={handleChangeSelect}>
            {categoryFields.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <Select name="orderBy" value={orderBy} onChange={handleChangeSelect}>
            {orderByFields.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {status === 'error' && (
        <div className={s.buttonWrapper}>
          <p>Произошла ошибка</p>
          <Button onClick={handleRetry}>Попробовать снова</Button>
        </div>
      )}

      {status === 'success' && (
        <>
          <div className={s.cardsWrapper}>
            {list.map((item) => (
              <Link href={`/${item.id}`} key={item.id} className={s.card}>
                <div>
                  <div className={s.imageWrapper}>
                    <Image
                      src={item.volumeInfo.imageLinks?.thumbnail ?? EmptyImage}
                      fill
                      sizes="100%"
                      alt={item.volumeInfo.title}
                    />
                  </div>
                  <div>
                    {!!item.volumeInfo.categories?.length && (
                      <p>{item.volumeInfo.categories.join(', ')}</p>
                    )}
                    <p>{item.volumeInfo.title}</p>
                    {!!item.volumeInfo.authors?.length && (
                      <p>{item.volumeInfo.authors.join(', ')}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {!!totalItems &&
            totalItems > startIndex &&
            (isPaginating ? (
              <Loader />
            ) : (
              <div className={s.buttonWrapper}>
                <Button onClick={handleLoadMore} type="button">
                  Load More
                </Button>
              </div>
            ))}
        </>
      )}

      {status === 'loading' && <Loader />}
    </div>
  );
};

export default HomePage;
