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
    const testProperties = Object.keys(item);
    const found = testProperties?.every((t: string) => testPropsName.includes(t));
    if (found === false) {
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
