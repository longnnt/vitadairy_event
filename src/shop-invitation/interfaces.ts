export interface IParams_Query {
  searchText?: string;
  firstScanStartDate?: Date | string;
  firstScanEndDate?: Date | string;
  status?: boolean | string;
  page?: number;
  size?: number;
}

export interface IResShop_Invitation {
  userName: string;
  storeCode: string;
  phoneNumber: string;
  registrationDate: number;
  firstScanDate: number;
  qrCode: string;
  spoonCode: string;
  isSuccess: boolean;
}

export interface IPayloadSearch {
  payload: string;
  type: string;
}
export interface IPayloadDate {
  payload: Date | string;
  type: string;
}
export interface IPayloadStatus {
  payload: boolean | string;
  type: string;
}
