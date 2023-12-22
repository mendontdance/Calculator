import { ReactNode } from 'react';

export interface IContainerProps {
  children: ReactNode | ReactNode[];
  flexColumn?: boolean;
}
