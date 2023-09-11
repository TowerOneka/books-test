import React from 'react';

import s from './Input.module.scss';

import cx from 'classnames';

type Props = React.HTMLProps<HTMLInputElement>;

// const Input = React.forwardRef(() => {});

const Input = React.forwardRef<HTMLInputElement, Props>(({ className, ...rest }, ref) => (
  <input ref={ref} className={cx(s.root, className)} {...rest} />
));

export default Input;
