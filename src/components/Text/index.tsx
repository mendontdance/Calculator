import React, { FC } from 'react';
import bem from 'bem-cn';
import { ITextProps } from './types';
import './styles.scss';

const Text: FC<ITextProps> = ({ value, weight }) => {
  const classBem = bem('text');

  return <div className={classBem({ weight })}>{value}</div>;
};

export default Text;
