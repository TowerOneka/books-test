import React from 'react';

import s from './Button.module.scss';

import cx from 'classnames';
import Link from 'next/link';

type Props = React.HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  to?: string;
};

const Button = ({ children, className, to, type, ...rest }: Props) => {
  if (to) {
    return (
      <Link href={to} className={cx(s.root, className)}>
        {' '}
        {children}{' '}
      </Link>
    );
  }

  return (
    <button className={cx(s.root, className)} type={type ?? 'button'} {...rest}>
      {children}
    </button>
  );
};

export default Button;
