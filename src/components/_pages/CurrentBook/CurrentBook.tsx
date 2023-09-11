import { Book } from '@/store/books/types';
import React from 'react';

import s from './CurrentBook.module.scss';
import Link from 'next/link';

import EmptyImage from '@/assets/empty.png';
import Image from 'next/image';

type Props = {
  data: Book;
};

const CurrentBook = ({ data }: Props) => (
  <div className={s.root}>
    <Link href="/">На главную</Link>
    <div className={s.wrapper}>
      <div className={s.imageWrapper}>
        <Image
          src={data.volumeInfo.imageLinks?.thumbnail ?? EmptyImage}
          alt={data.volumeInfo.title}
          fill
          sizes="100%"
        />
      </div>
      <div className={s.body}>
        <h2>{data.volumeInfo.title}</h2>
        <p>{!!data.volumeInfo.authors?.length && data.volumeInfo.authors.join(', ')}</p>
        {!!data.volumeInfo.description && <p>Description: {data.volumeInfo.description}</p>}
      </div>
    </div>
  </div>
);

export default CurrentBook;
