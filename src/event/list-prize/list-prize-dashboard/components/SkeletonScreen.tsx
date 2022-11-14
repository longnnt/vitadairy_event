// @mui
import {
  Box,
  Card,
  Stack,
  Skeleton,

} from '@mui/material';

// ----------------------------------------------------------------------

export default function LoadingSkeletonListPrizeScreen() {

  return (
    <Stack spacing={5}>
      <Stack direction={'row'} spacing={5} height={60}>
        <Stack width="80%">
          <Box width="40%" height="70%">
            <Skeleton variant="text" />
          </Box>
          <Stack direction={'row'} height="30%" width='60%' spacing={4}>
            <Skeleton variant="text" width="33%" />
            <Skeleton variant="text" width="33%" />
            <Skeleton variant="text" width="33%" />
          </Stack>
        </Stack>
        <Stack direction={'row'} width="20%" spacing={2}>
          <Skeleton variant="rounded" width='50%' height={40} />
          <Skeleton variant="rounded" width='50%' height={40} />
        </Stack>
      </Stack>
      <Card sx={{ overflow: 'hidden'} }>
        <Stack spacing={2} sx={{ py: 2, px: 1 }}  height={550}>
          <Skeleton variant="rounded" height='10%' width="100%"/>
          <Skeleton variant="rounded" height='90%' width="100%"/>
        </Stack>

      </Card>
    </Stack>
  );
}
