import { ButtonClass } from '../enums/buttonConfig.enum';

export interface IButtonConfig {
  innerText: string;
  class: ButtonClass;
  disable?: boolean;
  loading?: boolean;
}
