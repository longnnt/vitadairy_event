import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import dayjs from 'dayjs';
import { parse, ParseResult } from 'papaparse';
import * as React from 'react';
import Iconify from 'src/common/components/Iconify';
import { Controller, useFormContext } from 'react-hook-form';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useShowSnackbar from 'src/store-admin/hooks/useMessage';
import { COLUMNS_HEADERS, CSV, FORMAT_DATE, FORMAT_DATE_NEWS } from '../../constants';
import { setFileCSV, setProvinceInFoSelector, setProvinceNewForm } from '../../event.slice';
import { useGetAllProvince } from '../../hooks/useGetAllProvince';
import { EditToolbarProps, IEventDetail, IFormCreate, IFormCreateEvent, ISelect } from '../../interfaces';
import { StyledBox } from '../utils';
import { RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, importFile } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => {
      return {
        ...oldRows,
        [id]: {
          id,
          provinceId: '',
          quantity: '',
          extraquantity: '',
          isNew: true,
        },
      };
    });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'provinceId' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Stack direction={'row'} spacing={1} sx={{ alignSelf: 'flex-end' }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Iconify icon={'mdi:file-import'} />}
          component="label"
        >
          Nhập
          <input hidden multiple type="file" onChange={importFile} accept=".csv" />
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="success"
          onClick={handleClick}
        >
          Add record
        </Button>
      </Stack>
    </GridToolbarContainer>
  );
}

export default function ProvinceTableForm() {
  const dispatch = useDispatch();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [rows, setRows] = React.useState<IFormCreateEvent>({});
  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const provinceSelector = useSelector(setProvinceInFoSelector);

  const methods = useFormContext<IFormCreate>();

  const {
    control,
    watch,
    setValue,
    trigger,
    clearErrors,
    formState: { errors },
  } = methods;

  const { data: addProvince } = useGetAllProvince();
  const dataProvince = addProvince?.data?.response?.provinces || [];
  const addProvinceVN = dataProvince.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useDeepCompareEffect(() => {
    setRows(provinceSelector);
    setValue('eventDetailProvinces', provinceSelector);
  }, [provinceSelector]);

  const handleSaveClick = (id: GridRowId) => () => {
    const newRow = rows[id];
    const passedRow = !!newRow?.provinceId;
    if (passedRow) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const { [id]: rowDelete, ...newRows } = rows;
    setRows(newRows);
    setValue('eventDetailProvinces', newRows);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (row: GridRowModel) => {
    const updatedRow = { ...row, isNew: false } as IEventDetail;
    const newRow = { ...rows };
    newRow[row.id] = { ...updatedRow };
    setRows(newRow);
    return updatedRow;
  };

  useDeepCompareEffect(() => {
    if (
      errors?.eventDetailProvinces &&
      Object.keys(errors?.eventDetailProvinces).length
    ) {
      let rowEdit = {};
      Object.keys(errors?.eventDetailProvinces).forEach((key) => {
        rowEdit = { ...rowEdit, [key]: { mode: GridRowModes.Edit } };
      });
      setRowModesModel((preState) => {
        return { ...preState, ...rowEdit };
      });
    }
  }, [errors, rowModesModel]);


  const importFile = async (event: any) => {
    try {
      const allowedExtensions = [CSV];
      if (event.target.files.length) {
        const inputFile = event.target.files[0];

        const fileExtension = inputFile?.type.split('/')[1];
        if (!allowedExtensions.includes(fileExtension)) {
          showErrorSnackbar('Không phải file csv');
          return;
        }
        dispatch(setFileCSV(inputFile));
        showSuccessSnackbar('Import file thành công');
      }
      if (!event.target.files[0]) return showErrorSnackbar('file không hợp lệ!!!');

      parse(event.target.files[0], {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ',',
        fastMode: true,
        encoding: 'utf-8',
        transformHeader: (header: string, index: number) => COLUMNS_HEADERS[index],
        complete: async (results: ParseResult<IEventDetail>) => {
          const data: IFormCreateEvent = {};
          results?.data?.forEach((item: IEventDetail) => {
            const id = randomId();
            data[id] = {
              id: id,
              provinceId: item.provinceId,
              quantity: item.quantity,
              extraquantity: item.extraquantity,
              startDate: dayjs(item.startDate, FORMAT_DATE_NEWS),
              endDate: dayjs(item.endDate, FORMAT_DATE_NEWS),
              isNew: false,
            };
          });

          setRows({ ...rows, ...data });
          setValue('eventDetailProvinces', { ...rows, ...data });
        },
      });
    } catch (e) {
      return;
    } finally {
      event.target.value = '';
    }
  };

  const columns: GridColumns = [
    {
      field: 'provinceId',
      headerName: 'Tỉnh thành',
      flex: 1,
      editable: true,
      valueFormatter: ({ value }) => {
        const option = addProvinceVN?.find((item: ISelect) => {
          return item.value == parseInt(value);
        });
        return option ? option.label : '';
      },
      renderEditCell(params) {
        return (
          <RHFSelect
            name={`eventDetailProvinces.${params.row.id}.provinceId`}
            key={params.row.id}
            InputLabelProps={{ shrink: true }}
            defaultValue={params.value}
            helperText={''}
            onChange={(e) => {
              clearErrors(`eventDetailProvinces.${params.row.id}.provinceId`);
              setValue(
                `eventDetailProvinces.${params.row.id}.provinceId`,
                parseInt(e.target.value)
              );
            }}
          >
            <option value="" />
            {[...(addProvinceVN || ([] as ISelect[]))].map((option) => (
              <option key={option.value} value={option.value} style={{ color: 'black' }}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
        );
      },
      valueSetter(params) {
        const provinceId = watch(`eventDetailProvinces.${params.row.id}.provinceId`);
        return { ...params.row, provinceId: provinceId };
      }
    },
    {
      field: 'quantity',
      headerName: 'Tổng số lượng giải theo tỉnh',
      type: 'number',
      editable: false,
      flex: 1,
    },
    {
      field: 'extraquantity',
      headerName: 'Số giải phân bổ',
      type: 'number',
      editable: true,
      flex: 1,
      renderEditCell(params) {
        return (
          <RHFTextField
            name={`eventDetailProvinces.${params.row.id}.extraquantity`}
            key={`eventDetailProvinces.${params.row.id}.extraquantity`}
            type="number"
          />
        );
      },
      valueSetter(params) {
        const extraquantity = watch(
          `eventDetailProvinces.${params.row.id}.extraquantity`
        );
        return { ...params.row, extraquantity: extraquantity };
      },
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu',
      flex: 1,
      editable: true,
      valueFormatter: ({ value }) => {
        return new Date(value).toLocaleString();
      },
      renderEditCell(param) {
        return (
          <Controller
            name={`eventDetailProvinces.${param.row.id}.startDate`}
            key={param.row.id}
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                value={
                  watch(`eventDetailProvinces.${param.row.id}.startDate`) || param.value
                }
                onChange={(value) => {
                  clearErrors(`eventDetailProvinces.${param.row.id}.startDate`);
                  setValue(`eventDetailProvinces.${param.row.id}.startDate`, value);
                }}
                inputFormat={FORMAT_DATE_NEWS}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={
                      errors?.eventDetailProvinces &&
                      !!errors?.eventDetailProvinces[param.row.id]?.startDate?.message
                    }
                  />
                )}
              />
            )}
          />
        );
      },
      valueSetter(params) {
        const startDate = watch(`eventDetailProvinces.${params.row.id}.startDate`);
        return { ...params.row, startDate: startDate };
      },
    },
    {
      field: 'endDate',
      headerName: 'Ngày kết thúc',
      flex: 1,
      editable: true,
      valueFormatter: ({ value }) => {
        return new Date(value).toLocaleString();
      },

      renderEditCell(param) {
        return (
          <Controller
            name={`eventDetailProvinces.${param.row.id}.endDate`}
            key={param.row.id}
            control={control}
            render={({ field }: { field: any }) => (
              <DateTimePicker
                {...field}
                value={
                  watch(`eventDetailProvinces.${param.row.id}.endDate`) || param.value
                }
                onChange={(value: string) => {
                  clearErrors(`eventDetailProvinces.${param.row.id}.endDate`);
                  setValue(`eventDetailProvinces.${param.row.id}.endDate`, value);
                }}
                inputFormat={FORMAT_DATE_NEWS}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={
                      errors?.eventDetailProvinces &&
                      !!errors?.eventDetailProvinces[param.row.id]?.endDate?.message
                    }
                  />
                )}
              />
            )}
          />
        );
      },
      valueSetter(params) {
        const endDate = watch(`eventDetailProvinces.${params.row.id}.endDate`);
        return { ...params.row, endDate: endDate };
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <StyledBox>
      <DataGrid
        rows={Object.values(rows)}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        processRowUpdate={processRowUpdate}
        onRowEditStop={() => {
          trigger('eventDetailProvinces');
        }}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel, importFile },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </StyledBox>
  );
}
