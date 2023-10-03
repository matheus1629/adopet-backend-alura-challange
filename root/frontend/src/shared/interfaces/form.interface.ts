import { States } from '../enums/states.enum';

export interface IForm {
  firstName: string;
  lastName: string;
  state: string | undefined;
  city: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
