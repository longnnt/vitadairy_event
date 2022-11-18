import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { IEventDetail, IFormCreate, IFormCreateEvent } from '../interfaces';
import { useSelector } from 'src/common/redux/store';
import { popUpTypeSelector } from '../event.slice';

export const fomatFormData = (data: IFormCreate) => {
  // const tempEditData = { ...data };
  // const popUpType = useSelector(popUpTypeSelector);
  const { eventDetailProvinces, ...tempEditData } = data;
  const tempProvince = Object.values(eventDetailProvinces)?.map((item: IEventDetail) => {
    if (item.endDate || item.startDate) {
      const startDate = item.startDate
        ? new Date(item.startDate as string).toISOString()
        : new Date().toISOString;
      const endDate = item.endDate
        ? new Date(item.endDate as string).toISOString()
        : new Date().toISOString;
      item = { ...item, startDate: startDate as string, endDate: endDate as string };
    }
    if (typeof item.provinceId === 'string') {
      const provId = parseInt(item.provinceId);
      item = { ...item, provinceId: provId };
    }
    if (!item.extraquantity) {
      delete item.extraquantity;
      item = { ...item, quantity: 0 };
    } else {
      const totalQuantities = +item.extraquantity;
      item = { ...item, quantity: totalQuantities };
    }
    return item;
  });
  return {
    ...tempEditData,
    eventDetailProvinces: tempProvince,
  };
};

export const formatDataProvinces = (data: IEventDetail[]) => {
  const newData: IFormCreateEvent = {};
  data.forEach((item: IEventDetail) => {
    newData[item.id as number] = item;
  });
  return newData;
};

export const StyledBox = styled(Box)(({ theme }) => ({
  height: 500,
  width: '100%',
  '& .MuiDataGrid-cell--editing': {
    backgroundColor: 'rgb(255,215,115, 0.19)',
    color: '#1a3e72',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.error.main,
  },
  '& .actions': {
    color: 'text.secondary',
  },
  '& .textPrimary': {
    color: 'text.primary',
  },
}));
