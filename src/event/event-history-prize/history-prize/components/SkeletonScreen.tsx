// @mui
import {
  Box,

  Card,

  Stack,

  Skeleton,

} from '@mui/material';

// ----------------------------------------------------------------------

export default function LoadingSkeletonHistoryPrizeScreen() {

  return (
    <Stack spacing={5}>
      <Stack direction={'row'} spacing={5} height={60} justifyContent='space-between'>
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
        <Stack direction={'row'} width="10%" spacing={2}>
          <Skeleton variant="rounded" width='100%' height={50} />
        </Stack>
      </Stack>
      <Card sx={{ overflow: 'hidden'} }>
        <Stack spacing={2} sx={{ py: 3, px: 1 }}  height={550}>
          <Stack height='20%' spacing={2}>
            <Stack spacing ={2} direction={'row'} height='55%'>
              <Skeleton variant="rounded"  width="33%" height='100%'/>
              <Skeleton variant="rounded"  width="33%" height='100%'/>
              <Skeleton variant="rounded"  width="33%" height='100%'/>
            </Stack>
            <Stack direction={'row'} width='25%' spacing={2} height='45%'>
              <Skeleton variant="rounded"  width="50%" height='100%'/>
              <Skeleton variant="rounded"  width="50%" height='100%'/>
            </Stack>
          </Stack>
          <Skeleton variant="rounded" height='80%' width="100%"/>
        </Stack>

      </Card>
    </Stack>
  );
}
