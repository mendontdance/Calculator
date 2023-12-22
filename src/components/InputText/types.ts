import { ChangeEvent } from 'react';

export interface IInputTextProps {
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
  textValid?: string;
}
