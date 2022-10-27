export interface IResEventPrizeById {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: IFormEdit;
  };
}

export interface IEventProvince {
  id?: number;
  provinceId: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  extraquantity?: number;
}

export interface IFormEdit {
  eventDetailProvinces: IEventProvince[];
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
  transactionTypeId: number;
  winnerAmount: number;
  typeUser?: string;
}

export interface IResProvince {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: {
      provinces: IProvince[];
    };
  };
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