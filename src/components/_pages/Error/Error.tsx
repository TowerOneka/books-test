import Button from '@/components/_common/Button';
import React from 'react';

import s from './Error.module.scss';

const Error = () => (
  <div className={s.root}>
    <h1>404</h1>
    <p>Произошла ошибка</p>
    <Button to="/">Вернуться на главную</Button>;
  </div>
);

export default Error;
