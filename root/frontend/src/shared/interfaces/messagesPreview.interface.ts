export interface IMessagesPreview {
  date: string;
  adoptionStatus: string;
  Pet: {
    name: string;
    picture: string;
  };
  Adopter?: {
    firstName: string;
    lastName: string;
  };
  Donor?: {
    firstName: string;
    lastName: string;
  };
}


export interface IMessagesPreviewPagination {
  count: number;
  rows: IMessagesPreview[];
}