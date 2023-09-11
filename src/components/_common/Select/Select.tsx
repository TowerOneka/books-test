import React from 'react';

import cx from 'classnames';

import s from './Select.module.scss';

type Props = React.HTMLProps<HTMLSelectElement>;

const Select = ({ children, className, ...rest }: Props) => (
  <select className={cx(s.root, className)} {...rest}>
    {children}
  </select>
);

export default Select;
