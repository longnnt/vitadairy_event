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
} from '@mui/material';

const styleGiftModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // color: '#3c8dbc',
  color: 'black',
};
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
    handleClose();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleGiftModal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center', fontWeight: 'bold', py: '20px' }}
          >
            Please choose a gift!
          </Typography>

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
        </Box>
      </Modal>
    </div>
  );
};
