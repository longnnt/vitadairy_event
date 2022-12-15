import {
  Box,
  Card,
  Stack,
  Skeleton,
} from '@mui/material';

export default function LoadingSkeletonViewEventScreen() {
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
      </Stack>
      <Stack spacing={2}>
        <Skeleton variant="text" width="33%" />
        <Card sx={{ overflow: 'hidden', px: 3} }>
          <Stack spacing={3} sx={{ py: 3, px: 1 }}  height={750}>
            <Skeleton variant="rounded" height="11.11%" width="100%"/>
            <Stack direction='row' spacing={3} height="11.11%">
              <Skeleton variant="rounded" height="100%" width="50%"/>
              <Skeleton variant="rounded" height="100%" width="50%"/>  
            </Stack>
            <Skeleton variant="rounded" height="11.11%" width="100%"/>
            <Skeleton variant="rounded" height="11.11%" width="100%"/>
            <Skeleton variant="rounded" height="11.11%" width="100%"/>
            <Skeleton variant="rounded" height="11.11%" width="100%"/>
            <Stack direction='row' spacing={2} height="11.11%" width="30%" alignItems='center'>
              <Skeleton variant="rounded" width="50%"/>
              <Skeleton variant="rounded" width="50%"/>
            </Stack>
            <Skeleton variant="rounded" height="11.11%" width="100%"/>
            <Skeleton variant="rounded" height="11.11%" width="100%"/>
          </Stack>
        </Card>
        <Stack width="25%" spacing={2} height = {60} direction='row' alignSelf='flex-end'>
          <Skeleton variant="rounded" height="100%" width="40%"/>
          <Skeleton variant="rounded" height="100%" width="60%"/> 
        </Stack>
      </Stack>
    </Stack>
  );
}
