import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Card,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  DataGrid,
  GridColumns,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModel,
  GridRowModes,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { dispatch, useSelector } from 'src/common/redux/store';
import {
  setCloseConfirmDelete,
  setCountPrizeProvince,
  setOpenConfirmDelete,
  setProvinceInFoSelector,
  setRowProvinceId,
} from 'src/event-prize-q1/eventPrizeQ1.slice';
import { Controller, useFormContext } from 'react-hook-form';
import {
  IFormCreate,
  IFormCreateProvince,
  IProvinceDetail,
  ISelectType,
} from 'src/event-prize-q1/interface';
import { useGetListProvince } from 'src/event-prize-q1/hooks/useGetListProvince';
import { RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import dayjs from 'dayjs';
import {
  FORMAT_DATE_FILTER,
  FORMAT_DATE_NEWS,
} from 'src/common/constants/common.constants';
import { DateTimePicker } from '@mui/x-date-pickers';
import { StyledBox } from 'src/event-prize-q1/utils';
import { useEffect, useState } from 'react';
import { randomId } from '@mui/x-data-grid-generator';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import AlertConfirmDelete from 'src/event-prize-q1/common/AlertConfirmDelete';
import {
  ACCEPT_FILE_IMPORT,
  COLUMNS_HEADERS,
  paramsProvince,
} from 'src/event-prize-q1/constants';
import Iconify from 'src/common/components/Iconify';
import { parse, ParseResult } from 'papaparse';
import useShowSnackbar from 'src/common/hooks/useMessage';

type Props = {
  dataProvinceAPI?: IProvinceDetail[];
  countWonPrize?:number;
};

export default function ProvinceTable({ dataProvinceAPI, countWonPrize = 0 }: Props) {
  const [rows, setRows] = useState<IFormCreateProvince>({});
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { useDeepCompareEffect } = useDeepEffect();

  const { openConfirmDelete, rowProvinceId, countPrizeProvince, confirmEdit } = useSelector((state) => state.eventPrizeQ1);
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const provinceSelector = useSelector(setProvinceInFoSelector);

  const methods = useFormContext<IFormCreate>();

  const {
    control,
    watch,
    setValue,
    trigger,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const { data: addProvince } = useGetListProvince(paramsProvince);
  const dataProvince = addProvince?.data?.response || [];
  const addProvinceVN = dataProvince.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const columns: GridColumns = [
    {
      field: 'provinceId',
      headerName: 'Tên tỉnh',
      flex: 1,
      editable: true,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => {
        const option = addProvinceVN?.find((item: ISelectType) => {
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
              setRows(getValues('eventDetailProvinces'));
            }}
          >
            <option value="" />
            {[...(addProvinceVN || ([] as ISelectType[]))].map((option) => (
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
      },
    },
    {
      field: 'quantity',
      headerName: 'Số lượng',
      flex: 1,
      editable: true,
      sortable: false,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      renderEditCell(params) {
        return (
          <RHFTextField
            name={`eventDetailProvinces.${params.row.id}.quantity`}
            key={`eventDetailProvinces.${params.row.id}.quantity`}
            type="number"
            helperText={''}
            onChange={(e) => {
              setValue(
                `eventDetailProvinces.${params.row.id}.quantity`,
                parseInt(e.target.value)
              );
              setRows(getValues('eventDetailProvinces'));
            }}
          />
        );
      },
      valueSetter(params) {
        const quantity = watch(`eventDetailProvinces.${params.row.id}.quantity`);
        return { ...params.row, quantity: quantity };
      },
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu',
      flex: 1,
      editable: true,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => {
        return dayjs(value).format(FORMAT_DATE_FILTER);
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
                  setRows(getValues('eventDetailProvinces'));
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
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => {
        return dayjs(value).format(FORMAT_DATE_FILTER);
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
                  setRows(getValues('eventDetailProvinces'));
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
      field: 'wonAmount',
      headerName: 'Số giải đã trúng ở tỉnh thành',
      flex: 1,
      editable: false,
      sortable: false,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
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
            label="Delete"
            icon={<DeleteIcon />}
            onClick={() => {
              dispatch(setRowProvinceId(id));
              dispatch(setOpenConfirmDelete());
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useDeepCompareEffect(() => {
    setRows(provinceSelector);
    setValue('eventDetailProvinces', provinceSelector);
  }, [provinceSelector]);

  useEffect(() => {
    if (getValues('eventDetailProvinces')) {
      clearErrors(['startDate', 'endDate']);
    }

    setValue('eventDetailProvinces', rows);

    let countPrize = 0;
    Object.values(rows).map((item) => {
      countPrize += item.quantity;
    });
    dispatch(setCountPrizeProvince(countPrize));
  }, [rows]);

  const handleClickAddnewRow = () => {
    // trigger('eventDetailProvinces');
    const id = randomId();
    setRows((oldRows: any) => {
      return {
        ...oldRows,
        [id]: {
          id,
          provinceId: '',
          isNew: true,
          quantity: 0
        },
      };
    });

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'provinceId' },
    }));
  };

  const processRowUpdate = (row: GridRowModel) => {
    const updatedRow = {
      ...row,
      isNew: false,
      quantity: row.quantity ? parseInt(row.quantity) : null,
    } as IProvinceDetail;
    const newRow = { ...rows };
    newRow[row.id] = { ...updatedRow };
    setRows(newRow);

    return updatedRow;
  };

  const handleDeleteClick = () => {
    if (!rowProvinceId) {
      return console.log('không tìm thấy rowId');
    }
    const { [rowProvinceId || '']: rowDelete, ...newRows } = rows;
    setRows(rows);
    setValue('eventDetailProvinces', newRows);
    dispatch(setCloseConfirmDelete());
    dispatch(setRowProvinceId(null));
    if (Object.values(rows).length !== 0) {
      setRows(newRows);
      setValue('eventDetailProvinces', newRows);
      dispatch(setRowProvinceId(null));
      dispatch(setCloseConfirmDelete());
      return;
    }
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

  useDeepCompareEffect(() => {
    if (dataProvinceAPI && dataProvinceAPI?.length > 0) {
      const data: IFormCreateProvince = {};
      let countPrize = 0;
      dataProvinceAPI.forEach((item: IProvinceDetail) => {
        const id = randomId();
        data[id] = {
          id: id,
          provinceId: item.provinceId,
          quantity: item.quantity,
          startDate: dayjs(item.startDate, FORMAT_DATE_FILTER),
          endDate: dayjs(item.endDate, FORMAT_DATE_FILTER),
          isNew: false,
          wonAmount: item?.wonAmount
        };
        countPrize += item.quantity;
      });
      setRows(data);
      setValue('eventDetailProvinces', data);
      dispatch(setCountPrizeProvince(countPrize));
    }
  }, [dataProvinceAPI]);

  const importFile = async (event: any) => {
    try {
      const allowedExtensions = ACCEPT_FILE_IMPORT;
      if (event.target.files.length) {
        const inputFile = event.target.files[0];
        const fileExtension = inputFile?.type.split('/')[1];
        if (!allowedExtensions.includes(fileExtension)) {
          showErrorSnackbar('Sai định dạng file');
          return;
        }
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
        complete: async (results: ParseResult<IProvinceDetail>) => {
          const data: IFormCreateProvince = {};
          results?.data?.forEach((item: IProvinceDetail) => {
            if(item.provinceId) {
                const id = randomId();
                data[id] = {
                  id: id,
                  provinceId: item.provinceId,
                  quantity: item.quantity,
                  startDate: dayjs(item.startDate, FORMAT_DATE_FILTER),
                  endDate: dayjs(item.endDate, FORMAT_DATE_FILTER),
                  isNew: false,
                };
            }
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

  return (
    <>
      <AlertConfirmDelete
        open={openConfirmDelete}
        handleClose={() => dispatch(setCloseConfirmDelete())}
        handleConfirm={handleDeleteClick}
        content="Bạn có chắc chắn muốn xóa tỉnh thành này không?"
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 10,
        }}
      >
        <Typography variant="h5">Tỉnh thành</Typography>

        <Stack direction={'row'} spacing={1} sx={{ alignSelf: 'flex-end' }}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon={'mdi:file-import'} />}
            component="label"
          >
            Nhập
            <input hidden multiple type="file" onChange={importFile} accept=".csv" />
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickAddnewRow}
          >
            Thêm
          </Button>
        </Stack>
      </Box>
      {!window.location.pathname.includes('create') && <Box sx={{ mt:3, mb: 3 }}>
        <Card sx={{ width: '20%', px: 4, py: 2 }}>
            <Stack direction={'row'} alignItems='center' justifyContent='space-between'>
                <Typography variant='body1'>Tổng số giải đã trúng <br/>ở tất cả tỉnh thành</Typography>
                <Typography variant='h5'>{countWonPrize}</Typography>
                </Stack>
        </Card>
      </Box>}
      <StyledBox sx={{ width: '100%' }}>
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
          experimentalFeatures={{ newEditingApi: true }}
        />
      </StyledBox>
    </>
  );
}
