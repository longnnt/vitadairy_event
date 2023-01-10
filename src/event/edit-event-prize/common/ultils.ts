import * as XLSX from 'xlsx';

export const convertExcelFileToObj = (file: any, setFileImport: any, fileImport: any) => {
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;
  let convertDta;

  reader.onload = (e: ProgressEvent<FileReader>) => {
    const bstr = e?.target?.result;
    const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_csv(ws);
    convertDta = convertToJson(data);
    const tempCustomDta = fileImport.concat(convertDta);

    setFileImport(tempCustomDta);
  };

  if (rABS) {
    reader.readAsBinaryString(file);
  } else {
    reader.readAsArrayBuffer(file);
  }
};

export const convertToJson = (csv: any) => {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i].split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
};

export const validateFileImportFormat = (files: any) => {
  const testPropsName = [
    'provinceId',
    'extraquantity',
    'startDate',
    'endDate',
    'provinceName',
    'id',
    'quantity',
  ];
  let result = true;
  files?.map((item: any) => {
    const propsfileImportName = Object.keys(item);
    const rightFormatName = propsfileImportName?.every((t: string) =>
      testPropsName.includes(t)
    );
    if (rightFormatName === false) {
      result = false;
      return;
    }
    const startTime = new Date(item.startDate);
    const endTime = new Date(item.endDate);

    if (!(startTime instanceof Date) || !(endTime instanceof Date)) {
      result = false;
      return;
    }
  });

  return result;
};

import {
  IEventDetailProvinces,
  IEventProvince,
  IFormEdit,
  IFormSubmitEdit,
} from './interface';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import _ from 'lodash';

export const fomatFormData = (data: IFormEdit) => {
  const { eventDetailProvinces, ...tempEditData } = data;
  delete tempEditData.typeUser;
  // tempEditData.transactionTypeId = tempEditData.transactionTypeId.value as number;

  const tempProvince = Object.values(eventDetailProvinces)?.map(
    (item: IEventProvince) => {
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
      if (typeof item.id === 'string') {
        const { id, ...newItem } = item;
        return newItem;
      }
      return item;
    }
  );

  return {
    ...tempEditData,
    eventDetailProvinces: tempProvince,
  };
};

export const formatDataProvinces = (data: IEventProvince[]) => {
  const newData: IEventDetailProvinces = {};
  data.forEach((item: IEventProvince) => {
    newData[item.id as number] = item;
  });
  return newData;
};

export const tranferData = (data: IFormSubmitEdit) => {
  const newProvince: IEventDetailProvinces = {};
  data.eventDetailProvinces.forEach((item: IEventProvince) => {
    newProvince[item.id as number] = item;
  });
  return {
    ...data,
    eventDetailProvinces: newProvince,
  };
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
