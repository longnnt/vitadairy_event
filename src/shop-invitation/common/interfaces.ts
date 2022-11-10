export interface IParamsQuery {
  searchText: string | null;
  firstScanStartDate: Date | null;
  firstScanEndDate: Date | null;
  status: boolean | string;
  page?: number;
  size?: number;
}

export interface IResShopInvitation {
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
  payload: Date | null;
  type: string;
}
export interface IPayloadStatus {
  payload: boolean | string;
  type: string;
}

export interface IResShopInvitationData {
  data: {
    response: {
      response: IResShopInvitation[];
    };
  };
}
