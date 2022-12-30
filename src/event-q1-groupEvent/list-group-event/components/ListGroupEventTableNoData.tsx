// @mui
import { TableRow, TableCell } from '@mui/material';
import EmptyContent from 'src/common/components/EmptyContent';
// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
};

export default function ListGroupEventTableNoData({ isNotFound }: Props) {
  return (
    <TableRow sx={{ minWidth: 800, position: 'relative'}}>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title="Không có dữ liệu"
            sx={{
              padding: 0,
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
