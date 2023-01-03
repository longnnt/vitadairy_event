import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormProvider, RHFSwitch, RHFTextField } from "src/common/components/hook-form";
import { IPrizeCreateData } from "src/event-prize-q1/interface";
import { createPrizeSchema } from "src/event-prize-q1/prize.schema";
import { DateTimePicker } from '@mui/x-date-pickers';
import { RHFSelectPaginationSingle } from "src/common/components/hook-form/RHFSelectPaginationSingle";
import TableCountry from "./TableCountry";
import { useSelector, dispatch } from "src/common/redux/store";
import { setFormEndDate, setFormStartDate } from "src/event-prize-q1/eventPrizeQ1.slice";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "src/common/routes/paths";

export default function EditPrizeContainer() {
    const { formStartDate, formEndDate } = useSelector(state => state.eventPrizeQ1);
    const navigate = useNavigate()

    const methods = useForm<IPrizeCreateData>({
        resolver: yupResolver(createPrizeSchema),
        defaultValues: {
            eventStatusShop: true
        }
    });

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = methods

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Stack spacing={3}>
                    <Stack direction={'row'} spacing={3}>
                        <TextField
                            name="id"
                            label="ID"
                            value="0456"
                            disabled
                        />
                        <RHFTextField
                            name="name"
                            label="Tên giải*"
                            sx={{ width: '70%' }}
                        />

                        <RHFTextField
                            name="count"
                            type="number"
                            label="Số lượng tổng giải*"
                            sx={{ width: '30%' }}
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={3}>
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                                <DateTimePicker
                                    {...field}
                                    label={'Ngày bắt đầu'}
                                    value={formStartDate}
                                    inputFormat="MM-dd-yyyy HH:mm:ss"
                                    onChange={(value) => {
                                        dispatch(setFormStartDate(value))
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            helperText={
                                                errors.startDate && errors.startDate?.message
                                            }
                                            error={!!errors.startDate}
                                        />
                                    )}
                                />
                            )}
                        />

                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <DateTimePicker
                                    {...field}
                                    label={'Ngày kết thúc'}
                                    inputFormat="MM-dd-yyyy HH:mm:ss"
                                    value={formEndDate}
                                    onChange={(value) => {
                                        dispatch(setFormEndDate(value))
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            helperText={
                                                errors.endDate && errors.endDate?.message
                                            }
                                            error={!!errors.endDate}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Stack>

                    <Stack direction={'row'} spacing={3}>
                        <RHFTextField
                            name="orderWinning"
                            type="number"
                            label="Thứ tự trúng giải*"
                        />

                        <RHFTextField
                            name="probability"
                            type="number"
                            label="Xác suất trúng giải*"
                        />
                    </Stack>
                    <RHFSelectPaginationSingle
                        name={'crmType'}
                        getAsyncData={() => { }}
                        placeholder="CRM Transaction Type"
                        error={errors}
                    />

                    <Stack spacing={5} direction="row">
                        <Box sx={{ width: '50%' }}>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Giải loại trừ event theo tệp chủ shop</Typography>
                                <RHFSwitch name="eventStatusShop" label="" />
                            </Stack>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Giải loại trừ event group theo tệp chủ shop</Typography>
                                <RHFSwitch name="eventGroupStatusShop" label="" checked />
                            </Stack>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Trạng thái giải</Typography>
                                <RHFSwitch name="eventPrize" label="" checked />
                            </Stack>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Giải loại trừ event theo tệp người dùng</Typography>
                                <RHFSwitch name="eventStatusShop1" label="" />
                            </Stack>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Giải loại trừ event group theo tệp người dùng</Typography>
                                <RHFSwitch name="eventGroupStatusShop1" label="" checked />
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Paper>

            {(!formStartDate && !formEndDate) && (
                <TableCountry />
            )}

            <Stack spacing={3} direction='row' alignItems='center' justifyContent='flex-end' sx={{ width: '100%', mt: 5 }} >
                <Button variant="contained">Lưu thay đổi</Button>
                <Button variant="contained" color="inherit" onClick={() => {
                    navigate(PATH_DASHBOARD.eventPrizeQ1.list)
                }}>Hủy</Button>
            </Stack>
        </FormProvider>
    )
}