import React, { FC } from 'react';
import './styles.scss';
import bem from 'bem-cn';
import { IButtonProps } from './types';

const Button: FC<IButtonProps> = ({ appearance, value, onClick }) => {
  const classBem = bem('button');
  return (
    <button type="button" className={classBem({ appearance })} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
