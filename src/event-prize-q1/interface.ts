import { Dayjs } from "dayjs";
import { GridRowId } from "@mui/x-data-grid";

export interface IListPrizeData {
    endDate: string | null;
    startDate: string | null;
    quantity: number;
    id: number;
    giftId: number;
    eventId: number;
    ordinal: number;
    gift: IGift;
    crmTransactionTypeId?: number
    isCustomerExclusion?: boolean
    isCustomerGroupExclusion?: boolean
    isStoreExclusion?: boolean
    isStoreGroupExclusion?: boolean
    status?: boolean
    eventDetailProvinces?: IProvinceDetail[]
}

export interface IPrizeData {
    id: number
    name: string
    count_prize: number
    start_time: string
    end_time: string
    win_prize: number
}

export interface IPrizeCreateData {
    giftId: number
    quantity: number
    startDate: string | null
    endDate: string | null
    ordinal: number
    status: boolean
    crmTransactionTypeId: number,
    eventDetailProvinces: IProvinceData[]
    isCustomerExclusion: boolean,
    isCustomerGroupExclusion: boolean,
    isStoreExclusion: boolean,
    isStoreGroupExclusion: boolean
}

export interface ICreateEventDetailProvinces {
    provinceId: number
    quantity: number
    startDate: string | null
    endDate: string | null
}

export interface StateProps {
    fields: ICountryTableValue[];
    formStartDate: string | null;
    formEndDate: string | null;
    provinceInFo: IFormCreateProvince;
    isStoreExclusion: boolean;
    isStoreGroupExclusion: boolean;
    isCustomerExclusion: boolean;
    isCustomerGroupExclusion: boolean;
    crmTypeIdEdit: number;
    giftIdEdit: number;
    openConfirmDelete: boolean;
    idPrizeDelete: number;
    countPrizeEvent: number;
    countPrizeProvince: number;
    rowProvinceId: GridRowId | null;
    statusPrize: boolean;
    prizeQuantityChange: number | null;

}

export interface ICountryTableValue {
    id?: string,
    countryName: string
    count: number
    startDate: string | null
    endDate: string | null
    totalPrizeCountry: number
    totalPrizeAllCountry: number
}

export interface IResCrmTransaction {
    data: {
        meta: {
            status: number;
            msg: string;
        };
        response: ICrmTranSacTion[];
        pagination: {
            totalPages: number;
            totalRecords: number;
            currentPage: number;
            recordsPerPage: number;
            last: boolean;
        };
    };
}

export interface IResCrmTransactionDetail {
    data: {
        meta: {
            status: number;
            msg: string;
        };
        response: ICrmTranSacTion;
        pagination: {
            totalPages: number;
            totalRecords: number;
            currentPage: number;
            recordsPerPage: number;
            last: boolean;
        };
    };
}

export interface IResPrize {
    data: {
        meta: {
            status: number;
            msg: string;
        };
        response: IEventPrize[];
        pagination: {
            totalPages: number;
            totalRecords: number;
            currentPage: number;
            recordsPerPage: number;
            last: boolean;
        };
    };
}

export interface IResGift {
    data: {
        pagination: {
            totalPages: number;
            totalRecords: number;
            currentPage: number;
            recordsPerPage: number;
            last: boolean;
        };
        response: IGift[];
    };
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

export interface IGift {
    id: number;
    type: string;
    money: string;
    name: string;
}

export interface IEventPrize {
    id: number,
    quantity: number,
    giftId: number,
    eventId: number,
    startDate: string | null,
    endDate: string | null,
    ordinal: number,
    status: boolean,
    crmTransactionTypeId: number,
    eventDetailProvinces: [
        {
            id: number,
            provinceId: number,
            provinceName: string,
            quantity: number,
            startDate: string,
            endDate: string
        }
    ] | [],
    isCustomerExclusion: boolean,
    isCustomerGroupExclusion: boolean,
    isStoreExclusion: boolean,
    isStoreGroupExclusion: boolean
}


export interface ICrmTranSacTion {
    id: number;
    code: string;
    name: string;
    description: string;
    mainCode: string;
    eventDetail: null;
}

interface IProvince {
    id: number;
    code: number;
    name: string;
    type: string;
    parentId: number;
    regionId: null;
    regionName: string;
}


export interface IProvinceParams {
    page?: number;
    size?: number;
    type: string;
}

export interface IGiftParams {
    page?: number;
    size?: number;
    keySearch: string;
}

export interface IProvinceData {
    provinceId: number
    quantity: number
    startDate: Dayjs | Date | string
    endDate: Dayjs | Date | string
}

export interface ISelectType {
    value: number;
    label: string;
}

interface IForm {
    eventId: number
    giftId: number
    quantity: number
    startDate: Dayjs | Date | string | null,
    endDate: Dayjs | Date | string | null,
    ordinal: number
    status: boolean
    crmTransactionTypeId: number,
    isCustomerExclusion: boolean,
    isCustomerGroupExclusion: boolean,
    isStoreExclusion: boolean,
    isStoreGroupExclusion: boolean
}

export interface IFormCreate extends IForm {
    eventDetailProvinces: IFormCreateProvince;
}

export interface IFormCreateProvince {
    [id: number | string]: IProvinceDetail;
}

export interface IProvinceDetail {
    id?: number | string;
    provinceId: number | string;
    quantity: number;
    endDate: Dayjs | Date | string | null;
    startDate: Dayjs | Date | string | null;
    name?: string;
    isNew?: boolean;
    provinceName?:string
}

export interface IFormSubmitCreate {
    quantity: number;
    eventId: number;
    giftId: number;
    startDate?: Dayjs | Date | string | null;
    endDate?: Dayjs | Date | string | null;
    ordinal: number;
    status: boolean;
    crmTransactionTypeId: number;
    eventDetailProvinces?: IProvinceData[],
    isCustomerExclusion: boolean;
    isCustomerGroupExclusion: boolean;
    isStoreExclusion: boolean;
    isStoreGroupExclusion: boolean;
    id?: number
}

export interface IFormDataStore {
    crmTransactionTypeId: {
        label: string,
        value: number
    }
    giftId: {
        label: string,
        value: number
    },
    eventDetailProvinces: IFormCreateProvince
    startDate: Dayjs | Date | string
    endDate: Dayjs | Date | string
    isCustomerExclusion: boolean
    isCustomerGroupExclusion: boolean
    isStoreExclusion: boolean
    isStoreGroupExclusion: boolean
    ordinal: number
    quantity: number
    status: boolean
}

export type IStoreAdminCallback = {
    onSuccess: VoidFunction;
    onError: VoidFunction;
};

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