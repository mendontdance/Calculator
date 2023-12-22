import React, { FC } from 'react';
import bem from 'bem-cn';
import { IContainerProps } from './types';
import './styles.scss';

const Container: FC<IContainerProps> = ({ children, flexColumn }) => {
  const classBem = bem('container');
  return <div className={classBem({ 'flex-column': flexColumn })}>{children}</div>;
};

export default Container;
