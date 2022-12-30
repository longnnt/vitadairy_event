import { string } from 'yup';
export interface IPrizeData {
    id: number
    name: string
    count_prize: number
    start_time: string
    end_time: string
    win_prize: number
}