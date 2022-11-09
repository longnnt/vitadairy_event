import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useSelector } from 'react-redux';
import { provinceInforSelector, setProvinceForm } from '../editEventPrize.Slice';
import { IEventProvince, IProvince, ISelect } from '../common/interface';
import { dispatch } from 'src/common/redux/store';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import Iconify from 'src/common/components/Iconify';
import { ACCEPT_FILE_IMPORT, COLUMNS_HEADERS, DATE_FORMAT } from '../common/constants';
import useShowSnackbar from 'src/common/hooks/useMessage';
import dayjs from 'dayjs';
import { parse, ParseResult } from 'papaparse';
import { useGetAllProvinceVN } from '../hooks/useGetAllProvinceVN';
import { StyledBox } from '../common/ultils';
import { useFormContext } from 'react-hook-form';
// @mui
import { TextFieldProps, Stack } from '@mui/material';

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
    setRows((oldRows) => [
      ...oldRows,
      { id, provinceId: '', quantity: '', extraquantity: '', isNew: true },
    ]);
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

type IProps = {
  name: string;
  setValue: any;
};

type Props = IProps & TextFieldProps;

export default function PovinceTableForm({ name, setValue, ...other }: Props) {
  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();

  const provinceSelector = useSelector(provinceInforSelector);
  const [rows, setRows] = React.useState<IEventProvince[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const { data: provincesData } = useGetAllProvinceVN();
  const provinceOptions = provincesData?.map((item: IProvince) => ({
    value: item?.id,
    label: item?.name,
  }));

  useDeepCompareEffect(() => {
    setRows(provinceSelector);
  }, [provinceSelector]);
  useDeepCompareEffect(() => {
    if (rows) {
      const tempData = rows?.map((item) => ({
        provinceId: item.provinceId,
        quantity: item.quantity,
        startDate: item.startDate,
        endDate: item.endDate,
        extraquantity: item.extraquantity,
      }));
      dispatch(setProvinceForm(tempData));
    }
  }, [rows]);

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows.map((row: IEventProvince) =>
        row.id === newRow.id ? updatedRow : row
      ) as IEventProvince[]
    );
    return updatedRow;
  };
  const handleSaveClick = (id: GridRowId) => () => {
    const newRow = rows.find((row: IEventProvince) => row.id === id);
    const passedRow = !!newRow?.provinceId;
    if (passedRow) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    }
  };

  const importFile = async (event: any) => {
    try {
      const allowedExtensions = ACCEPT_FILE_IMPORT;
      if (event.target.files.length) {
        const inputFile = event.target.files[0];
        const fileExtension = inputFile?.type.split('/')[1];
        DATE_FORMAT;
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
          const data: IEventProvince[] = results.data.map((item: IEventProvince) => ({
            id: randomId(),
            provinceId: item.provinceId,
            extraquantity: item.extraquantity,
            startDate: dayjs(item.startDate, DATE_FORMAT),
            endDate: dayjs(item.endDate, DATE_FORMAT),
            isNew: false,
          }));
          setRows([...rows, ...data]);
        },
      });
    } catch (e) {
      return;
    }
  };

  const columns: GridColumns = [
    {
      field: 'provinceId',
      headerName: 'Tên tỉnh ',
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: provinceOptions ? provinceOptions : ([] as ISelect[]),
      valueFormatter: ({ id: rowId, value, field, api }) => {
        const option = provinceOptions?.find((item: ISelect) => {
          return item.value == parseInt(value);
        });
        return option ? option.label : '';
      },
      preProcessEditCellProps: (params) => {
        const hasProvinceId = !!params.props.value;
        return { ...params.props, error: !hasProvinceId };
      },
    },
    {
      field: 'quantity',
      headerName: 'Số lượng quà',
      type: 'number',
      editable: false,
      width: 150,
    },
    {
      field: 'extraquantity',
      headerName: 'Số lượng quà thêm',
      type: 'number',
      editable: true,
      width: 150,
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu',
      type: 'date',
      width: 200,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isDate = !!params.props.value;
        return { ...params.props, error: !isDate };
      },
    },
    {
      field: 'endDate',
      headerName: 'Ngày kết thúc',
      type: 'dateTime',
      width: 220,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isDate = !!params.props.value;
        return { ...params.props, error: !isDate };
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 80,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        }

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

  const { control } = useFormContext();

  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field, fieldState: { error } }) => {
    //     // console.log('e rocs', error);

    //     return (
    <StyledBox>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel, importFile },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </StyledBox>
    //     );
    //   }}
    // />
  );
}
