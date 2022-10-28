import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Scrollbar from 'src/common/components/Scrollbar';
import { useGetAllGift } from '../hooks/useGetAllGift';
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
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: '#3c8dbc',
};
// --------------------------------------------------------------------------------------------
export const GiftModal = ({
  open,
  handleClose,
  //   handleOpen,
  setChoosenGift,
}: {
  open: boolean;
  handleClose: () => void;
  //   handleOpen: () => void;
  setChoosenGift: (value: IGiftDetail) => void;
}) => {
  const [page, setPage] = React.useState<number>(0);
  const params = { page: page, size: 10 };
  const { data } = useGetAllGift(params);
  const giftDta = data?.data?.response ? data?.data?.response : [];
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
        <Box sx={style}>
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
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Money</TableCell>
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
                      <TableCell component="th" scope="row" sx={{ color: '#3c8dbc' }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="right" sx={{ color: '#3c8dbc' }}>
                        {row.type}
                      </TableCell>
                      <TableCell align="right" sx={{ color: '#3c8dbc' }}>
                        {row.money}
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
              count={data ? data?.data?.pagination?.totalRecords : 0}
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
