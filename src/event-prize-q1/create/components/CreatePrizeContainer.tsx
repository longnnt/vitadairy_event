import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Stack, TextField, Typography, Button, FormHelperText } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/common/components/hook-form";
import { IFormSubmitCreate, IGiftParams, IPrizeCreateData, IProvinceData, IProvinceDetail, ISelectType } from "src/event-prize-q1/interface";
import { DateTimePicker } from '@mui/x-date-pickers';
import { RHFSelectPrizeGift } from "./RHFSelectPrizeGift";
import ProvinceTable from "./ProvinceTable";
import { useSelector, dispatch } from "src/common/redux/store";
import { setFormEndDate, setFormStartDate, setIsCustomerExclusion, setIsCustomerGroupExclusion, setIsStoreExclusion, setIsStoreGroupExclusion } from "src/event-prize-q1/eventPrizeQ1.slice";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_DASHBOARD } from "src/common/routes/paths";
import { getCrmTransaction, getGift } from "src/event-prize-q1/services";
import { RHFSelectPaginationSingle } from "src/common/components/hook-form/RHFSelectPaginationSingle";
import { createEventPrizeValidate } from "src/event-prize-q1/prize.schema";
import { useGetListProvince } from "src/event-prize-q1/hooks/useGetListProvince";
import { useAddEventPrize } from "src/event-prize-q1/hooks/useAddEventPrize";
import useMessage from "src/common/hooks/useMessage";
import { FORMAT_DATE_NEWS } from "src/common/constants/common.constants";
import dayjs from "dayjs";
import RHFSwitch from "./RHFSwitch";
import { replacePathParams } from "src/common/utils/replaceParams";

export default function CreatePrizeContainer() {
    const { formStartDate, formEndDate, isStoreExclusion, isStoreGroupExclusion, isCustomerExclusion, isCustomerGroupExclusion } = useSelector(state => state.eventPrizeQ1);
    const navigate = useNavigate();
    const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

    const params = useParams();
    const eventId = params?.eventId;

    const searchParamsProvince = {
        page: 0,
        size: 1000,
        type: "PROVINCE"
    }

    const { data: addProvince } = useGetListProvince(searchParamsProvince);
    const dataProvince = addProvince?.data?.response || [];
    const addProvinceVN = dataProvince.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const provinceId = addProvinceVN
        ? addProvinceVN.map((item: ISelectType) => item.value)
        : [];


    const methods = useForm<IPrizeCreateData>({
        resolver: yupResolver(createEventPrizeValidate(provinceId)),
        defaultValues: {
            isCustomerExclusion: false,
            isStoreExclusion: false,
            isCustomerGroupExclusion: false,
            isStoreGroupExclusion: false,
            status: true,
            startDate: null,
            endDate: null
        }
    });


    const searchParamsGift: IGiftParams = {
        keySearch: '',
    }

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        getValues,
        trigger,
        clearErrors,
        register,
        formState: { errors }
    } = methods

    const onSuccess = () => {
        showSuccessSnackbar('Tạo giải thành công');
        navigate(replacePathParams(PATH_DASHBOARD.eventPrizeQ1.list, { eventId: eventId }));
    };

    const onError = () => {
        showErrorSnackbar('Lưu giải thất bại');
    };

    const { mutate, isLoading } = useAddEventPrize({ onSuccess, onError })

    const onSubmit = (data: any) => {
        if (eventId === undefined) {
            return showErrorSnackbar('Không tìm thấy event. Vui lòng thử lại');
        }
        let dataSend: IFormSubmitCreate = {
            quantity: data.quantity,
            eventId: parseInt(eventId),
            giftId: data.giftId.value,
            startDate: data.startDate || null,
            endDate: data.startDate || null,
            ordinal: data.ordinal,
            status: data.status,
            crmTransactionTypeId: data.crmTransactionTypeId.value,
            isCustomerExclusion: isCustomerExclusion,
            isCustomerGroupExclusion: isCustomerGroupExclusion,
            isStoreExclusion: isStoreExclusion,
            isStoreGroupExclusion: isStoreGroupExclusion,
        }

        if (data.eventDetailProvinces && data.eventDetailProvinces !== undefined) {
            const array: IProvinceData[] = []
            const eventDetailProvincesArray = Object.keys(data.eventDetailProvinces)?.map((item) => {
                const dataConvert = {
                    provinceId: data.eventDetailProvinces[item].provinceId,
                    quantity: parseInt(data.eventDetailProvinces[item].quantity),
                    startDate: dayjs(data.eventDetailProvinces[item].startDate),
                    endDate: dayjs(data.eventDetailProvinces[item].endDate)
                }
                array.push(dataConvert)
            })
            dataSend = { ...dataSend, eventDetailProvinces: array }
        }

        mutate(dataSend)
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Stack spacing={3}>
                    <Stack direction={'row'} spacing={3}>
                        <Box sx={{ width: '70%', zIndex: 1999 }}>
                            <RHFSelectPrizeGift
                                name={'giftId'}
                                placeholder="Tên giải*"
                                getAsyncData={getGift}
                                searchParams={searchParamsGift}
                                error={errors}
                            />
                            <FormHelperText error sx={{ marginLeft: '10px' }}>
                                {errors?.giftId?.message}
                            </FormHelperText>
                        </Box>

                        <RHFTextField
                            name="quantity"
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
                                <Stack position="relative" width="100%">
                                    <DateTimePicker
                                        {...field}
                                        label="Ngày bắt đầu"
                                        value={formStartDate}
                                        onChange={(value) => {
                                            dispatch(setFormStartDate(value))
                                        }}
                                        inputFormat={FORMAT_DATE_NEWS}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                helperText={errors.startDate && errors.startDate?.message}
                                                error={!!errors.startDate}
                                            />
                                        )}
                                    />
                                </Stack>
                            )}
                        />

                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <Stack position={'relative'} width="100%">
                                    <DateTimePicker
                                        {...field}
                                        label="Ngày kết thúc"
                                        value={formEndDate}
                                        onChange={(value) => {
                                            dispatch(setFormEndDate(value))
                                        }}
                                        inputFormat={FORMAT_DATE_NEWS}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                helperText={errors.endDate && errors.endDate?.message}
                                                error={!!errors.endDate}
                                            />
                                        )}
                                    />
                                </Stack>
                            )}
                        />
                    </Stack>

                    <Stack direction={'row'} spacing={3}>
                        <RHFTextField
                            name="ordinal"
                            key={'ordinal'}
                            type="number"
                            label="Thứ tự trúng giải*"
                        />
                    </Stack>
                    <Box sx={{ zIndex: 1001, marginTop: 1 }}>
                        <RHFSelectPaginationSingle
                            name={'crmTransactionTypeId'}
                            getAsyncData={getCrmTransaction}
                            searchParams={{ page: 0 }}
                            placeholder="CRM Transaction Type"
                            error={errors}
                        />
                        <FormHelperText error sx={{ marginLeft: '10px' }}>
                            {errors?.crmTransactionTypeId?.message}
                        </FormHelperText>
                    </Box>

                    <Stack spacing={5} direction="row">
                        <Box sx={{ width: '50%' }}>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Giải loại trừ event theo tệp chủ shop</Typography>
                                <RHFSwitch name="isStoreExclusion" label="" data={isStoreExclusion} onChange={() => dispatch(setIsStoreExclusion(!isStoreExclusion))} />
                            </Stack>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Giải loại trừ event group theo tệp chủ shop</Typography>
                                <RHFSwitch
                                    name="isStoreGroupExclusion"
                                    label=""
                                    data={isStoreGroupExclusion}
                                    onChange={() => dispatch(setIsStoreGroupExclusion(!isStoreGroupExclusion))}
                                    disabledCheck={!isStoreExclusion}
                                />
                            </Stack>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Trạng thái giải</Typography>
                                <RHFSwitch name="status" label="" checked />
                            </Stack>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Giải loại trừ event theo tệp người dùng</Typography>
                                <RHFSwitch
                                    name="isCustomerExclusion"
                                    label=""
                                    data={isCustomerExclusion}
                                    onChange={() => dispatch(setIsCustomerExclusion(!isCustomerExclusion))}
                                />
                            </Stack>
                            <Stack justifyContent={'space-between'} alignItems={'center'} direction="row" sx={{ width: "65%" }}>
                                <Typography variant="body1">Giải loại trừ event group theo tệp người dùng</Typography>
                                <RHFSwitch
                                    name="isCustomerGroupExclusion"
                                    label=""
                                    data={isCustomerGroupExclusion} onChange={() => dispatch(setIsCustomerGroupExclusion(!isCustomerGroupExclusion))}
                                    disabledCheck={!isCustomerExclusion}
                                />
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Paper>

            {(!formStartDate && !formEndDate) && (
                <ProvinceTable />
            )}

            <Stack spacing={3} direction='row' alignItems='center' justifyContent='flex-end' sx={{ width: '100%', mt: 5 }} >
                <Button variant="contained" type="submit">Lưu thay đổi</Button>
                <Button variant="contained" color="inherit" onClick={() => {
                    navigate(replacePathParams(PATH_DASHBOARD.eventPrizeQ1.list, { eventId: eventId }));
                }}>Hủy</Button>
            </Stack>
        </FormProvider>
    )
}