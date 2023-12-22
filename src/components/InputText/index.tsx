import React, { FC } from 'react';
import { IInputTextProps } from './types';
import bem from 'bem-cn';
import './styles.scss';

const InputText: FC<IInputTextProps> = ({ placeholder, value, onChange, isValid, textValid }) => {
  const classBem = bem('input-text');

  return (
    <div className={classBem()}>
      <label className={classBem('label')}>
        <input
          type="text"
          className={classBem('input')}
          value={value || ''}
          placeholder={placeholder}
          onChange={onChange}
        />
        {!isValid && <span className={classBem('not-valid')}>{textValid}</span>}
      </label>
    </div>
  );
};

export default InputText;
