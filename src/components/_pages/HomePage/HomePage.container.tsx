import React, { useCallback, useEffect } from 'react';
import HomePage from './HomePage';
// import { getBooks } from '@/store/books/api';
import { booksActions } from '@/store/books/slice';
import { getBooksThunk } from '@/store/books/thunks';
import { useActionsCreator } from '@/hooks/useActionCreator';
import { useSelector } from '@/hooks/useSelector';
import {
  inputValuesSelector,
  isPaginatingSelector,
  listSelector,
  startIndexSelector,
  statusSelector,
  totalItemsSelector,
} from '@/store/books/selectors';
import { SetInputPayload } from '@/store/books/types';

const allActions = {
  ...booksActions,
  getBooks: getBooksThunk,
};

const HomePageContainer = () => {
  const { setInputValue, getBooks } = useActionsCreator(allActions);

  const totalItems = useSelector(totalItemsSelector);
  const status = useSelector(statusSelector);
  const inputValues = useSelector(inputValuesSelector);
  const isPaginating = useSelector(isPaginatingSelector);
  const list = useSelector(listSelector);
  const startIndex = useSelector(startIndexSelector);

  const handleChangeField = useCallback(
    (data: SetInputPayload) => {
      setInputValue(data);
    },
    [setInputValue]
  );

  const handleRetry = useCallback(() => {
    getBooks({
      q: inputValues.search,
      orderBy: inputValues.orderBy,
      maxResults: 30,
      category: inputValues.category,
    });
  }, [getBooks, inputValues.category, inputValues.orderBy, inputValues.search]);

  useEffect(() => {
    if (inputValues.search) {
      getBooks({
        q: inputValues.search,
        orderBy: inputValues.orderBy,
        maxResults: 30,
        category: inputValues.category,
      });
    }
  }, [getBooks, inputValues.category, inputValues.orderBy, inputValues.search]);

  const handleLoadMore = useCallback(() => {
    getBooks({
      q: inputValues.search,
      orderBy: inputValues.orderBy,
      maxResults: 30,
      category: inputValues.category,
      startIndex,
    });
  }, [getBooks, inputValues.category, inputValues.orderBy, inputValues.search, startIndex]);

  return (
    <HomePage
      list={list}
      startIndex={startIndex}
      totalItems={totalItems}
      category={inputValues.category}
      isPaginating={isPaginating}
      handleLoadMore={handleLoadMore}
      status={status}
      handleRetry={handleRetry}
      orderBy={inputValues.orderBy}
      searchValue={inputValues.search}
      handleChangeField={handleChangeField}
    />
  );
};

export default HomePageContainer;
