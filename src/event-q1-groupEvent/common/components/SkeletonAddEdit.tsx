import {
    Box,
    Card,
    Stack,
    Skeleton,
  } from '@mui/material';
  
  export default function LoadingPageAddEditGroupEvent() {
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
        </Stack>
        <Card sx={{ overflow: 'hidden'} }>
          <Stack spacing={2} sx={{ py: 3, px: 2 }}  height={200}>
            <Stack direction='row' spacing={2} height={'50%'}> 
              <Skeleton variant="rounded" width="50%" height={'100%'}/>
              <Skeleton variant="rounded" width="50%" height={'100%'}/>
            </Stack>
            <Skeleton variant="rounded" width="100%" height={'50%'}/>
          </Stack>          
        </Card>
      </Stack>
    );
  }
  