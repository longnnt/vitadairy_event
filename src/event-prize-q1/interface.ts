export interface IPrizeData {
    id: number
    name: string
    count_prize: number
    start_time: string
    end_time: string
    win_prize: number
}

export interface IPrizeCreateData{
    name: string
    count: number
    startDate: string
    endDate: string
    orderWinning: number
    probability: number
    crmType: string
    eventStatusShop: boolean
}

export interface StateProps  {
    fields: ICountryTableValue[],
    formStartDate: string | null,
    formEndDate: string | null
}

export interface ICountryTableValue {
    id?: string,
    countryName: string
    count: number
    startDate: string | null
    endDate: string | null
    totalPrizeCountry: number,
    totalPrizeAllCountry: number
}