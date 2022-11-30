import { Dayjs } from 'dayjs';

export interface IResEventPrizeById {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: IFormSubmitEdit;
  };
}

export interface IQuery {
  except?: number;
  page?: number;
  size?: number;
}

export interface IEventProvince {
  id?: number | string;
  provinceId: number;
  quantity?: number;
  startDate: Date | string | Dayjs;
  endDate: Date | string | Dayjs;
  extraquantity?: number;
  isNew?: boolean;
}

export interface IEventDetailProvinces {
  [id: number | string]: IEventProvince;
}
interface IForm {
  eventId: number;
  giftId: number;
  id: number;
  notificationContent: string;
  notificationDescription: string;
  notificationTitle: string;
  ordinal: number;
  popupCode: string;
  popupImageLink: string;
  popupLink: string;
  popupType: string;
  probability: number;
  quantity: number;
  // transactionTypeId: number;
  transactionTypeId: ISelect | number;
  winnerAmount: number;
  typeUser?: string;
}
export interface IFormEdit extends IForm {
  // eventDetailProvinces: IEventProvince[];
  eventDetailProvinces: IEventDetailProvinces;
}

export interface IFormSubmitEdit extends IForm {
  eventDetailProvinces: IEventProvince[];
}

export interface IResProvince {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: IProvince[];
  };
}
export interface IProvinceParams {
  page?: number;
  size?: number;
  type: string;
}
export interface IProvince {
  id: number;
  code: string;
  name: string;
  type: string;
  parentId: number;
  regionId: number;
}

export interface ISelect {
  value: number;
  label: string;
}

export interface ITransactionType {
  code: string;
  description: string;
  id: number;
  mainCode: string;
  name: string;
}

export interface IResTransactionType {
  data: {
    meta: {
      msg: string;
      status: number;
    };
    response: ITransactionType[];
  };
}

export interface ISelectPopup {
  value: string;
  label: string;
}

export interface IParamsGetGift {
  page: number;
  size: number;
}

export interface IGiftDetail {
  id: number;
  type: string;
  money: number;
  name: string;
  image: string;
  point: number;
  total: number;
  active: boolean;
}
export interface IGiftById {
  data: {
    meta: {
      msg: string;
      status: number;
    };
    response: IGiftDetail;
  };
}

interface IGiftPagiantion {
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  recordsPerPage: number;
  last: boolean;
}

export interface IResGetGifts {
  data: {
    meta: {
      msg: string;
      status: number;
    };
    response: IGiftDetail[];
    pagination: IGiftPagiantion;
  };
}
