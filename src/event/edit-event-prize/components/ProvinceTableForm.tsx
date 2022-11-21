import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import dayjs from 'dayjs';
import { parse, ParseResult } from 'papaparse';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Iconify from 'src/common/components/Iconify';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useShowSnackbar from 'src/common/hooks/useMessage';
import { ACCEPT_FILE_IMPORT, COLUMNS_HEADERS, DATE_FORMAT } from '../common/constants';
import {
  IEventDetailProvinces,
  IEventProvince,
  IFormEdit,
  IProvince,
  ISelect,
} from '../common/interface';
import { StyledBox } from '../common/ultils';
import { provinceInforSelector } from '../editEventPrize.Slice';
import { useGetAllProvinceVN } from '../hooks/useGetAllProvinceVN';
// @mui
import { Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { RHFSelect, RHFTextField } from 'src/common/components/hook-form';

// --------------------------------------------------------------------------

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  importFile: any;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

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

export default function PovinceTableForm() {
  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();

  const [rows, setRows] = React.useState<IEventDetailProvinces>({});
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const provinceSelector = useSelector(provinceInforSelector);

  const methods = useFormContext<IFormEdit>();
  const {
    control,
    watch,
    setValue,
    trigger,
    clearErrors,
    formState: { errors },
  } = methods;

  const { data: provincesData } = useGetAllProvinceVN();
  const provinceOptions = provincesData?.map((item: IProvince) => ({
    value: item?.id,
    label: item?.name,
  }));

  useDeepCompareEffect(() => {
    setRows(provinceSelector);
    setValue('eventDetailProvinces', provinceSelector);
  }, [provinceSelector]);

  const handleDeleteClick = (id: GridRowId) => () => {
    const { [id]: rowDelete, ...newRows } = rows;
    setRows(newRows);
    setValue('eventDetailProvinces', newRows);
  };

  const processRowUpdate = (row: GridRowModel) => {
    const updatedRow = { ...row, isNew: false } as IEventProvince;
    const newRow = { ...rows };
    newRow[row.id] = { ...updatedRow };
    setRows(newRow);
    return updatedRow;
  };
  const handleSaveClick = (id: GridRowId) => () => {
    const newRow = rows[id];
    const passedRow = !!newRow?.provinceId;
    if (passedRow) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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

  const importFile = async (event: any) => {
    try {
      const allowedExtensions = ACCEPT_FILE_IMPORT;
      if (event.target.files.length) {
        const inputFile = event.target.files[0];
        const fileExtension = inputFile?.type.split('/')[1];
        if (!allowedExtensions.includes(fileExtension)) {
          showErrorSnackbar('Không phải file csv');
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
        complete: async (results: ParseResult<IEventProvince>) => {
          const data: IEventDetailProvinces = {};
          results?.data?.forEach((item: IEventProvince) => {
            const id = randomId();
            data[id] = {
              id: id,
              provinceId: item.provinceId,
              extraquantity: item.extraquantity,
              startDate: dayjs(item.startDate, DATE_FORMAT),
              endDate: dayjs(item.endDate, DATE_FORMAT),
              isNew: false,
            };
          });

          setRows({ ...rows, ...data });
          setValue('eventDetailProvinces', { ...rows, ...data });
          // event.target.value = '';
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
      headerName: 'Tên tỉnh ',
      width: 180,
      editable: true,
      valueFormatter: ({ value }) => {
        const option = provinceOptions?.find((item: ISelect) => {
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
            {[...(provinceOptions || ([] as ISelect[]))].map((option) => (
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
      headerName: 'Tổng Số lượng giải theo tỉnh',
      type: 'number',
      editable: false,
      width: 150,
    },
    {
      field: 'extraquantity',
      headerName: 'Số giải phân bổ',
      type: 'number',
      editable: true,
      width: 150,
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
      width: 200,
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
                inputFormat={'dd/MM/yyyy hh:mm a'}
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
      width: 220,
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
                inputFormat={'dd/MM/yyyy hh:mm a'}
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
      width: 80,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        // if (isInEditMode) {
        //   return [
        //     // <GridActionsCellItem
        //     //   key={id}
        //     //   icon={<SaveIcon />}
        //     //   label="Save"
        //     //   onClick={handleSaveClick(id)}
        //     // />,
        //     <GridActionsCellItem
        //       key={id}
        //       icon={<DeleteIcon />}
        //       label="Delete"
        //       onClick={handleDeleteClick(id)}
        //       color="inherit"
        //     />,
        //   ];
        // }

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
