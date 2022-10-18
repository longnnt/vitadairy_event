export interface IFormStore {
  code: number;
  name: string;
  phoneNumber: number;
  address: string;
  qrLink: string;
  isActive: boolean;
  createdDate: Date;
}

export type IStoreAdminCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IStories = Array<IFormStore>;

export interface IStoreAdminSearchParams {
  endDate?: string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: string;
}

export interface IDataStore {
  meta: {
    status: number;
    msg: string;
  };
  response: {
    meta: {
      status: number;
      msg: string;
    };
    pagination: {
      totalPages: number;
      totalRecords: number;
      currentPage: number;
      recordsPerPage: number;
      last: boolean;
    };
    response: IStories;
  };
}

export type IPropsStoreTableRow = {
  row: IFormStore;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};
