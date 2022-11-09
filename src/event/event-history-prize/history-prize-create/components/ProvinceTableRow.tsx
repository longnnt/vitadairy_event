import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import {
    DataGrid, GridActionsCellItem, GridColumns, GridEventListener,
    GridRowId,
    GridRowModel, GridRowModes, GridRowModesModel, GridRowParams, GridToolbarContainer, MuiEvent
} from '@mui/x-data-grid';
import {
    randomId
} from '@mui/x-data-grid-generator';
import dayjs from 'dayjs';
import { parse, ParseResult } from 'papaparse';
import * as React from 'react';
import Iconify from 'src/common/components/Iconify';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useShowSnackbar from 'src/store-admin/hooks/useMessage';
import { COLUMNS_HEADERS, CSV, FORMAT_DATE } from '../../constants';
import { setFileCSV, setProvinceNewForm, setProvinceNewFormSelector, setRows, setRowsSelector } from '../../event.slice';
import { useGetAllProvince } from '../../hooks/useGetAllProvince';
import { EditToolbarProps, IEventDetail, ISelect } from '../../interfaces';
import { StyledBox } from '../ultils';

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, importFile } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id,  provinceId: 0, quantity: 0, extraquantity: 0, isNew: true }]);
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

export default function FullFeaturedCrudGrid() {
  const dispatch = useDispatch();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [rows, setRows] = React.useState<IEventDetail[]>([]);
  // const rows = useSelector(setRowsSelector);
  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();

  const province = useSelector(setProvinceNewFormSelector);

  const { data: addProvince } = useGetAllProvince();
  const dataProvince = addProvince?.data?.response?.provinces || [];
  const addProvinceVN = dataProvince.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useDeepCompareEffect(() => {
    setRows(province);
  }, [province]);
  useDeepCompareEffect(() => {
    if (rows) {
      const tempData = rows?.map((item) => ({
        provinceId: item.provinceId,
        quantity: item.quantity,
        startDate: item.startDate,
        endDate: item.endDate,
        extraquantity: item.extraquantity,
      }));
      dispatch(setProvinceNewForm(tempData));
    }
  }, [rows]);

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
      rows.map((row: IEventDetail) =>
        row.id === newRow.id ? updatedRow : row
      ) as IEventDetail[]
    );
    return updatedRow;
  };

  const importFile = async (event: any) => {
    try {
      const allowedExtensions = [CSV];
      if (event.target.files.length) {
        const inputFile = event.target.files[0];

        const fileExtension = inputFile?.type.split('/')[1];
        FORMAT_DATE;
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
          const data: IEventDetail[] = results.data.map((item: IEventDetail) => ({
            id: randomId(),
            name: item.name,
            provinceId: item.provinceId,
            quantity: item.quantity,
            startDate: dayjs(item.startDate, FORMAT_DATE),
            endDate: dayjs(item.endDate, FORMAT_DATE),
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
      valueOptions: addProvinceVN ? addProvinceVN : ([] as ISelect[]),
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
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      type: 'dateTime',
      width: 220,
      editable: true,
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
