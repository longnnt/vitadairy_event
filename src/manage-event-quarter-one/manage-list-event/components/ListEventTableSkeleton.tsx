// @mui
import { TableRow, TableCell, Skeleton, Stack, TableRowProps } from '@mui/material';

// ----------------------------------------------------------------------
type Props = {
  isNotFound: boolean;
  
};
function ListEventTableSkeleton({ isNotFound  }: Props) {
  return (
    <TableRow>
     {isNotFound ? (<> <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
      <Skeleton/>
      </TableCell>

      <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell></>):(
        
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}

export { ListEventTableSkeleton }
