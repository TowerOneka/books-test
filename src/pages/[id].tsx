import CurrentBook from '@/components/_pages/CurrentBook';
import { getCurrentBook } from '@/store/books/api';
import { Book } from '@/store/books/types';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

type Props = {
  data: Book;
};

const SimpleBookPage: NextPage<Props> = ({ data }) => <CurrentBook data={data} />;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  try {
    if (params?.id && typeof params.id === 'string') {
      const { data } = await getCurrentBook(params.id);

      return {
        props: { data },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default SimpleBookPage;
