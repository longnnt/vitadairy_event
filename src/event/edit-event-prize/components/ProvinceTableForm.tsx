import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
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
import { COLUMNS_HEADERS, DATE_FORMAT } from '../common/constants';
import useShowSnackbar from 'src/common/hooks/useMessage';
import dayjs from 'dayjs';
import { parse, ParseResult } from 'papaparse';
import { useGetAllProvinceVN } from '../hooks/useGetAllProvinceVN';
import { Stack } from '@mui/material';
import { StyledBox } from '../common/ultils';

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
      { id, provinceId: 0, quantity: 0, extraquantity: 0, isNew: true },
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

export default function PovinceTableForm() {
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

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
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
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const importFile = async (event: any) => {
    try {
      const allowedExtensions = ['csv'];
      if (event.target.files.length) {
        const inputFile = event.target.files[0];

        const fileExtension = inputFile?.type.split('/')[1];
        DATE_FORMAT;
        if (!allowedExtensions.includes(fileExtension)) {
          showErrorSnackbar('Không phải file csv');
          return;
        }
        // setfilesCsv(inputFile);
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
      headerName: 'Province Id',
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: provinceOptions ? provinceOptions : ([] as ISelect[]),
      valueFormatter: ({ id: rowId, value, field, api }) => {
        const colDef = api.getColumn(field);
        const option: ISelect = colDef?.valueOptions.find(
          ({ value: optionValue }: { value: number }) => value === optionValue
        );
        return option ? option.label : 'choose a province';
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      editable: false,
      width: 150,
    },
    {
      field: 'extraquantity',
      headerName: 'Extra Quantity',
      type: 'number',
      editable: true,
      width: 150,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      type: 'date',
      width: 200,
      editable: true,
      // preProcessEditCellProps: (params) => {
      //   const isDate = !!params.props.value;
      //   return { ...params.props, error: !isDate };
      // },
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      type: 'dateTime',
      width: 220,
      editable: true,
      // preProcessEditCellProps: (params) => {
      //   const isDate = !!params.props.value;
      //   return { ...params.props, error: !isDate };
      // },
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
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
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
        rows={rows}
        // rowsPerPageOptions={[15, 25]}
        // pageSize={15}

        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
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
  );
}
