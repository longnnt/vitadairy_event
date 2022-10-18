import { IParamsQuery } from 'src/shop-invitation/interfaces';
import { DEFAULT_PICK_DATE } from 'src/shop-invitation/constants';
export const getQueryObj = (params: IParamsQuery) => {
  const temp = { ...params };

  if (temp.searchText === '') delete temp.searchText;

  if (temp.firstScanEndDate?.toString() === DEFAULT_PICK_DATE.toString()) {
    delete temp.firstScanEndDate;
  } else {
    if (temp.firstScanEndDate instanceof Date)
      temp.firstScanEndDate = temp.firstScanEndDate?.toISOString();
  }

  if (temp.firstScanStartDate?.toString() === DEFAULT_PICK_DATE.toString()) {
    delete temp.firstScanStartDate;
  } else {
    if (temp.firstScanStartDate instanceof Date)
      temp.firstScanStartDate = temp.firstScanStartDate?.toISOString();
  }

  if (temp.status === '') delete temp.status;

  return temp;
};
