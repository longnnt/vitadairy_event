import { Box, Button, Container, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBreadcrumbs from "src/common/components/HeaderBreadcrumbs";
import Page from "src/common/components/Page";
import { TableNoData } from "src/common/components/table";
import { BREADCUMBS, FORMAT_DATE_FILTER } from "src/common/constants/common.constants";
import useSettings from "src/common/hooks/useSettings";
import { PATH_DASHBOARD } from "src/common/routes/paths";
import { replacePathParams } from "src/common/utils/replaceParams";
import { useGetCrmTransactionById } from "../hooks/useGetCrmTransactionById";
import { useGetDetailPrize } from "../hooks/useGetDetailPrize";
import { useGetGiftById } from "../hooks/useGetGiftById";
import { IListPrizeData, IProvinceDetail } from "../interface";

export default function EventPrizeQ1Detail() {
    const { themeStretch } = useSettings()

    const { eventId, prizeId } = useParams()
    const navigate = useNavigate()

    if (!eventId || !prizeId) {
        navigate(PATH_DASHBOARD.manageEventQuarterOne.list)
    }

    const { data, isLoading } = useGetDetailPrize(parseInt(prizeId || ''))
    const prizeDataDetail: IListPrizeData = data?.data?.response || {};

    const { data: giftSelected } = useGetGiftById(prizeDataDetail.giftId)
    const giftSelectedDetail = giftSelected?.data?.response || null;

    const { data: crmTransaction } = useGetCrmTransactionById(prizeDataDetail?.crmTransactionTypeId || 0)
    const transactionDetail = crmTransaction?.data?.response;

    return (
        <>
            <Page title={BREADCUMBS.EVENT_Q1}>
                <Container
                    maxWidth={themeStretch ? 'sm' : 'xl'}
                >
                    <HeaderBreadcrumbs
                        heading={BREADCUMBS.EVENT_PRIZE_DETAIL}
                        links={[
                            {
                                name: BREADCUMBS.MANAGE_LIST_EVENT,
                                href: PATH_DASHBOARD.manageEventQuarterOne.list
                            },
                            {
                                name: BREADCUMBS.EVENT_PRIZE_LIST,
                                href: replacePathParams(PATH_DASHBOARD.eventPrizeQ1.list, {eventId: eventId || ''})
                            },
                            {
                                name: BREADCUMBS.EVENT_PRIZE_DETAIL
                            }
                        ]}
                    />

                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Stack direction={'row'} spacing={3}>
                            <TextField
                                label="ID"
                                sx={{ width: '30%' }}
                                value={prizeDataDetail?.id}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Tên giải"
                                sx={{ width: '40%' }}
                                value={giftSelectedDetail?.name}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                label="Số lượng tổng giải"
                                sx={{ width: '30%' }}
                                value={prizeDataDetail?.quantity}
                                InputLabelProps={{ shrink: true }}
                                disabled
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={3} sx={{ pt: 3 }}>
                            <TextField
                                label="Ngày bắt đầu"
                                sx={{ width: '50%' }}
                                value={dayjs(prizeDataDetail?.startDate).isValid() ? dayjs(prizeDataDetail?.endDate).format(FORMAT_DATE_FILTER) : ''}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Ngày kết thúc"
                                sx={{ width: '50%' }}
                                value={dayjs(prizeDataDetail?.endDate).isValid() ? dayjs(prizeDataDetail?.endDate).format(FORMAT_DATE_FILTER) : ''}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />
                        </Stack>
                        <Box sx={{ width: '100%', position: 'relative', pt: 3 }}>
                            <TextField
                                label="Thứ tự trúng giải"
                                fullWidth
                                value={prizeDataDetail?.ordinal}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <Box sx={{ width: '100%', position: 'relative', pt: 3 }}>
                            <TextField
                                label="CRM Transaction Type"
                                fullWidth
                                value={transactionDetail?.description}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <Stack spacing={5} direction="row" sx={{ pt: 3 }}>
                            <Box sx={{ width: '50%' }}>
                                <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                    <Typography variant="body1">Giải loại trừ event theo tệp chủ shop</Typography>
                                    <Switch checked={prizeDataDetail?.isStoreExclusion} onClick={(e) => e.preventDefault()} />
                                </Stack>
                                <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                    <Typography variant="body1">Giải loại trừ event group theo tệp chủ shop</Typography>
                                    <Switch checked={prizeDataDetail?.isStoreGroupExclusion} onClick={(e) => e.preventDefault()}/>
                                </Stack>
                                <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                    <Typography variant="body1">Trạng thái giải</Typography>
                                    <Switch checked={prizeDataDetail?.status} onClick={(e) => e.preventDefault()} />
                                </Stack>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                    <Typography variant="body1">Giải loại trừ event theo tệp người dùng</Typography>
                                    <Switch checked={prizeDataDetail?.isCustomerExclusion} onClick={(e) => e.preventDefault()} />
                                </Stack>
                                <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                    <Typography variant="body1">Giải loại trừ event group theo tệp người dùng</Typography>
                                    <Switch checked={prizeDataDetail?.isCustomerGroupExclusion} onClick={(e) => e.preventDefault()} />
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>

                    {(!prizeDataDetail?.startDate && !prizeDataDetail?.endDate) && (
                        <>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} sx={{ pt: 7 }}>
                                <Typography variant="h5">
                                    Tỉnh thành
                                </Typography>
                            </Stack>
                            <Paper elevation={3}>
                                <TableContainer>
                                    <Table size="medium">
                                        <TableHead>
                                            <TableCell align="center">Tên tỉnh</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Ngày bắt đầu</TableCell>
                                            <TableCell align="center">Ngày kết thúc</TableCell>
                                            <TableCell align="center">Số giải đã trúng ở tỉnh thành</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            {prizeDataDetail && prizeDataDetail?.eventDetailProvinces?.map((item: IProvinceDetail) => (
                                                <TableRow key={item.provinceId}>
                                                    <TableCell align="center">{item.provinceName}</TableCell>
                                                    <TableCell align="center">{item.quantity}</TableCell>
                                                    <TableCell align="center">{dayjs(item?.startDate).isValid() ? dayjs(item?.startDate).format(FORMAT_DATE_FILTER) : ''}</TableCell>
                                                    <TableCell align="center">{dayjs(item?.endDate).isValid() ? dayjs(item?.endDate).format(FORMAT_DATE_FILTER) : ''}</TableCell>
                                                    <TableCell align="center">{0}</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableNoData
                                                isNotFound={!prizeDataDetail || prizeDataDetail?.eventDetailProvinces?.length === 0}
                                            />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </>
                    )}
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ pt: 5 }}>
                        <Button variant="contained" color="inherit" onClick={() => {
                            navigate(replacePathParams(PATH_DASHBOARD.eventPrizeQ1.list, { eventId: prizeDataDetail?.eventId }));
                        }}>Hủy</Button>
                    </Stack>
                </Container>
            </Page>
        </>
    )
}