export interface IMessagesPreview {
  id: number;
  createdAt: string;
  adoptionStatus: string;
  Pet: {
    name: string;
    picture: string;
    Donor?: {
      firstName: string;
      lastName: string;
    };
  };
  Adopter?: {
    firstName: string;
    lastName: string;
  };
}

export interface IMessagesPreviewPagination {
  count: number;
  rows: IMessagesPreview[];
}
