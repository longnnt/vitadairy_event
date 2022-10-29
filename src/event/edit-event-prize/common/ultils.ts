import * as XLSX from 'xlsx';
import { ISelect } from './interface';

export const convertExcelFileToObj = (file: any, setFileImport: any) => {
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
    setFileImport(convertDta);
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

export const convertNameProvinceToId = (name: string, provinceOp: ISelect[]) => {
  const idProvince = provinceOp?.find((item: ISelect) => {
    return item.label === name;
  });
  return idProvince?.value;
};

export const validateFileImportFormat = (file: any) => {
  const testArr = ['name', 'extraquantity', 'startDate', 'endDate'];
  const testProperties = Object.keys(file);
  let result = true;
  const found = testProperties?.every((t: string) => testArr.includes(t));

  if (found === false) {
    result = false;
    return result;
  }
  const startTime = new Date(file.startDate);
  const endTime = new Date(file.endDate);

  if (!(startTime instanceof Date) || !(endTime instanceof Date)) {
    result = false;
    return result;
  }

  return result;
};
