// @mui
import { TableRow, TableCell, Skeleton, Stack, TableRowProps } from '@mui/material';

// ----------------------------------------------------------------------
type Props = {
  isNotFound: boolean;
  
};
export default function ListPrizeTableSkeleton({ isNotFound  }: Props) {
  return (
    <TableRow sx={{ minWidth: 800, position: 'relative', minHeight: 400 }}>
     {isNotFound ? (<> <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left" ><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell>
      <TableCell align="left"><Skeleton/></TableCell></>):(
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
