import React, { FC } from 'react';
import bem from 'bem-cn';
import { IButtonProps } from './types';
import './styles.scss';

const Button: FC<IButtonProps> = ({ appearance, value, onClick }) => {
  const classBem = bem('button');

  return (
    <button type="button" className={classBem({ appearance })} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
