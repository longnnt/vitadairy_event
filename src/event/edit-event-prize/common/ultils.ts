import { IEventProvince } from './interface';

export const sortArrObj = (arr: IEventProvince[]) => {
  arr.sort((a, b) => {
    if (a.provinceId > b.provinceId) {
      return 1;
    }
    if (a.provinceId < b.provinceId) {
      return 1;
    }
    return 0;
  });
};
