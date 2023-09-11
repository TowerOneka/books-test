import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Button';
import Input from '../Input';

import s from './SearchForm.module.scss';

type FormValues = {
  search: string;
};

type Props = {
  handleSubmit: (data: FormValues) => void;
  initialValue: string;
};

const SearchForm = ({ handleSubmit: handleSubmitParent, initialValue }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      search: initialValue,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => handleSubmitParent(data);

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('search')} />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchForm;
