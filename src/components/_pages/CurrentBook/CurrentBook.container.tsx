import React, { useEffect } from 'react';
import CurrentBook from './CurrentBook';
import { useParametricSelector } from '@/hooks/useSelector';
import { currentBookSelector } from '@/store/books/selectors';
import { Book } from '@/store/books/types';
import { booksActions } from '@/store/books/slice';
import { useActionsCreator } from '@/hooks/useActionCreator';

type Props = {
  data: Book;
};

const allActions = {
  ...booksActions,
};

const CurrentBookContainer = ({ data }: Props) => {
  const currentBook = useParametricSelector(currentBookSelector, data.id);

  const { setBook } = useActionsCreator(allActions);

  useEffect(() => {
    if (!currentBook) {
      setBook(data);
    }
  }, [currentBook, data, setBook]);

  return <CurrentBook data={data} />;
};

export default CurrentBookContainer;
