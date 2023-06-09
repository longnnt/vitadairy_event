export interface IParamsQuery {
  searchText: string;
  firstScanStartDate: Date | null;
  firstScanEndDate: Date | null;
  status: boolean | string;
  page?: number;
  size?: number;
  storeCode?: number | string;
  searchBy: string | boolean;
}

export interface IResShopInvitation {
  userName: string;
  storeCode: string;
  phoneNumber: string;
  registrationDate: string;
  firstScanDate: string;
  qrCode: string;
  spoonCode: string;
  isSuccess: boolean;
}

export type StateProps = {
  firstScanStartDate: Date | null;
  searchText: string;
  firstScanEndDate: Date | null;
  status: string | boolean;
  searchBy: string | boolean;
};

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
    meta: {
      status: number;
      msg: string;
    },
    response: {
      meta: {
        status: number;
        msg: string;
      },
      response: IResShopInvitation[];
      pagination: {
        totalPages: number;
        totalRecords: number;
        currentPage: number;
        recordsPerPage: number;
        last: boolean
      }
    };
  };
}
