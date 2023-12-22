export interface IButtonProps {
  appearance: EButtonAppearance;
  value: string;
  onClick: () => void;
}

export enum EButtonAppearance {
  primary = 'primary',
  danger = 'danger',
}
