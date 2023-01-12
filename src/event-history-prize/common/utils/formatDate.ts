import { IPrizeHistory } from '../interface';

export function formatDates(giftReceivedDate: string) {
  const time = giftReceivedDate.split(' ')[0].replace(',', '');
  const date = giftReceivedDate.split(' ')[1].split('/');
  const day = date[0];
  let month = date[1];
  if (parseInt(month) < 10) {
    month = '0' + month;
  }
  const year = date[2];
  return `${month}-${day}-${year} ${time}`
}
