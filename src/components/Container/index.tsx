import React, { FC } from 'react';
import { IContainerProps } from './types';
import bem from 'bem-cn';
import './styles.scss';

const Container: FC<IContainerProps> = ({ children, flexColumn }) => {
  const classBem = bem('container');
  return <div className={classBem({ 'flex-column': flexColumn })}>{children}</div>;
};

export default Container;
