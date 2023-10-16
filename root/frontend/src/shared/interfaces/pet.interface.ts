export interface IPet {
  id: number;
  name: string;
  age: number;
  size: string;
  description: string;
  picture: string;
  adoptionDate: string;
  adopted: number;
  idDonor: number;
  idAdopter: number;
  Donor?: { city: string; state: string };
}

export interface IPetPagination {
  count: number;
  rows: IPet[];
}
