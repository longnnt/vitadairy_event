import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Scrollbar from 'src/common/components/Scrollbar';
import { IGiftDetail } from '../common/interface';
import {
  Checkbox,
  TableCell,
  TableRow,
  Paper,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  TablePagination,
  Switch,
  Dialog,
  DialogContent,
} from '@mui/material';
import ListPrizeFilterBar from 'src/event/list-prize/list-prize-dashboard/components/ListPrizeFilterBar';
import { useSelector } from 'react-redux';
import { filterGiftSelector, setFilterGift } from '../editEventPrize.Slice';
import { dispatch } from 'src/common/redux/store';

// --------------------------------------------------------------------------------------------
export const GiftModal = ({
  open,
  handleClose,
  setChoosenGift,
  setPage,
  giftDta,
  page,
  totalRecords,
}: {
  open: boolean;
  totalRecords: number;
  page: number;
  setPage: (value: number) => void;
  giftDta: IGiftDetail[];
  handleClose: () => void;
  setChoosenGift: (value: IGiftDetail) => void;
}) => {
  const handleOnclick = (id: number) => {
    const choosenGift = giftDta?.filter((item: IGiftDetail) => item.id === id);
    setChoosenGift(choosenGift[0]);
    dispatch(setFilterGift(''));
    handleClose();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const filterGift = useSelector(filterGiftSelector)
  const handleFilterGift = (filterGift: string)=>{
    dispatch(setFilterGift(filterGift));
    setPage(0);
  }

  return (
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          dispatch(setFilterGift(''))
        }}
        aria-labelledby="modal-dialog-title"
        aria-describedby="modal-dialog-description"
        fullWidth
        maxWidth={'xl'}
      >
        <DialogContent sx={{ minHeight: 770}}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center', fontWeight: 'bold', py: '20px' }}
          >
            Please choose a gift!
          </Typography>
          <ListPrizeFilterBar
            filterName={filterGift}
            onFilterName={handleFilterGift}
            placeholder={'Lọc theo tên quà'}
          />
          <Scrollbar>
            <TableContainer
              sx={{
                minWidth: 800,
                maxHeight: 500,
                position: 'relative',
                overflowY: 'scroll',
                overflowX: 'auto',
              }}
              component={Paper}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell align="right">Totals</TableCell>
                    <TableCell align="right">Money</TableCell>
                    <TableCell align="right">Active</TableCell>
                    <TableCell align="right">Operation</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {giftDta.map((row: IGiftDetail) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>
                        <img src={row.image} alt="row.name" height="50" width="50" />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>

                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.point}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                      <TableCell align="right">{row.money}</TableCell>

                      <TableCell align="right">
                        <Switch checked={row.active} disabled />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox onClick={() => handleOnclick(row.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={totalRecords}
              rowsPerPage={10}
              page={page}
              onPageChange={handleChangePage}
            />
          </Scrollbar>
        </DialogContent>
      </Dialog>
  );
};
