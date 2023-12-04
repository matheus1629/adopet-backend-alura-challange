import { IPet } from 'src/shared/interfaces/pet.interface';
import { IAccountData } from './accountData.interface';

export interface IMessageDetails {
  id: number;
  adoptionStatus: string;
  subject: string;
  contactMessage: String;
  idPet: number;
  createdAt: string;
  Pet: IPet;
  Adopter: IAccountData;
}
