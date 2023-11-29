import { IPet } from 'src/shared/interfaces/pet.interface';
import { IAccountData } from './accountData.interface';

export interface IMessageDetails {
  id: number;
  adoptionStatus: string;
  subject: string;
  contactMessage: String;
  idPet: number;
  date: string;
  Pet: IPet;
  Adopter: IAccountData;
}
