import { yupResolver } from '@hookform/resolvers/yup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import AsyncSelect from 'react-select/async';

import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Select, { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import Scrollbar from 'src/common/components/Scrollbar';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { ProductCodeModal } from '../components/ProductCodeModal';
import { defaultValues } from '../constant';
import {
  buttonTypeState,
  productState,
  searchTextSelectSelector,
  setButtonType,
  setIsOpenModal,
  setProduct,
  setSearchTextSelect,
  setUserType,
  userTypeState,
} from '../eventPromotionIV.slice';
import { useAddNewEvent } from '../hooks/useAddNewEvent';
import { EventSearchParams, IEventFormData, IProductCode, UserType } from '../interface';
import { schemaAddEvent } from '../schema';
import { useProductCode } from '../hooks/useProductCode';
import { getProductCode } from '../service';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { AsyncPaginate } from 'react-select-async-paginate';

export const AddEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonTypeValue = useSelector(buttonTypeState);
  const methods = useForm({
    resolver: yupResolver(schemaAddEvent),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    reset: resetSelect,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  console.log(watch('skus'));

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { useDeepCompareEffect } = useDeepEffect();

  const { mutate, isSuccess, data } = useAddNewEvent({
    onError: () => {
      showErrorSnackbar('Tạo mới thất bại');
    },
  });
  const [page, setPage] = useState<number>(0);
  // console.log('page', page);

  const searchParams: EventSearchParams = {
    searchText: useSelector(searchTextSelectSelector),
    page: page,
  };
  console.log('searchParams.searchText', searchParams);

  const {
    skusListData: skusCodeDataEvent,
    pagination,
    isLoading,
  } = useProductCode(searchParams);

  const dataProductCodeSelect = skusCodeDataEvent.map((prodCode: IProductCode) => {
    return {
      value: prodCode.code,
      label: prodCode.code,
    };
  });
  console.log('dataProductCodeSelect', dataProductCodeSelect);

  const loadOptions = async (
    search: string,
    loadedOptions: any,
    { page }: { page: number }
  ) => {
    await new Promise((r) => setTimeout(r, 1000));
    // const hasMore = page < pagination?.totalPages;

    // return {
    //   // options: slicedOptions,
    //   // options: listProdCodeSearch,
    //   options: dataProductCodeSelect,
    //   hasMore,
    // };
    const response = await getProductCode({ page: page, searchText: search });
    console.log('page', page);

    // const response = await await responseData.json();
    console.log('response', response);
    const hasMore = page < response?.data?.response.pagination.totalPages;

    // const responseJSON = await response.json();
    const opt = response
      ? response.data?.response.response.map((prodCode: IProductCode) => {
          return {
            value: prodCode.code,
            label: prodCode.code,
          };
        })
      : ([] as unknown[]);

    return {
      options: opt as unknown,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };
  // const loadPageOptions = async (
  //   q: string,
  //   prevOptions: any,
  //   { page }: { page: number }
  // ) => {
  //   const { options, hasMore } = await loadOptions(q, page);

  //   return {
  //     options,
  //     hasMore,

  //     additional: {
  //       page: page + 1,
  //     },
  //   };
  // };
  // console.log('listProdCode', listProdCode);

  const handleInputChange = (inputText: string) => {
    dispatch(setSearchTextSelect(inputText));
  };

  const onSubmit = (data: any) => {
    const formDataAddNewEvent: IEventFormData = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      skus: data.skus,
      defaultWinRate: data.defaultWinRate,
      upRate: data.upRate,
      downRate: data.downRate,
      userRegisterDate: data.userRegisterDate,
      userLimit: data.userLimit,
      id: 1,
    };
    mutate(formDataAddNewEvent);
    dispatch(setProduct([]));
  };

  useDeepCompareEffect(() => {
    const idEvent = data?.data?.response?.id;
    if (isSuccess) {
      if (buttonTypeValue !== 'saveSubmit') {
        navigate(PATH_DASHBOARD.eventPromotionIV.edit(+idEvent));
      } else {
        navigate(PATH_DASHBOARD.eventPromotionIV.list);
      }
    }
  }, [isSuccess]);

  const handleStatusUserType = (userType: string) => {
    dispatch(setUserType(userType as UserType));
  };
  const userTypeValue = useSelector(userTypeState);

  const product = useSelector(productState);

  useDeepCompareEffect(() => {
    if (product.length > 0) setValue('skus', product);
  }, [product?.length]);

  // const scroll = () => {
  //   if (page < pagination?.totalPages) setPage(page + 1);
  //   else return;
  // };

  return (
    <>
      <HeaderBreadcrumbs
        heading="DANH SÁCH SỰ KIỆN"
        links={[
          { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Danh sách sự kiện', href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: BREADCUMBS.CREATE_EVENT },
        ]}
      />
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        Thông tin tổng quát
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Scrollbar sx={{ marginTop: '20px' }}>
          <Stack sx={{ p: '20px 40px 48px', backgroundColor: 'white' }}>
            <Stack spacing="26px">
              <RHFTextField name="name" label="Tên sự kiện*" fullWidth />
              <Stack
                spacing={'10px'}
                direction="row"
                alignItems={'center'}
                position="relative"
              >
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <Stack position="relative" width="100%">
                      <DateTimePicker
                        {...field}
                        label="Ngày bắt đầu"
                        inputFormat="dd/MM/yyyy hh:mm a"
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
                <Box sx={{ mx: 2 }}>-</Box>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <Stack position={'relative'} width="100%">
                      <DateTimePicker
                        {...field}
                        label="Ngày kết thúc"
                        inputFormat="dd/MM/yyyy hh:mm a"
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

              <Box sx={{ zIndex: 1001 }}>
                {/* <Typography>Mã sản phẩm</Typography> */}
                <Controller
                  name="skus"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    // <AsyncSelect
                    //   placeholder="Vui lòng chọn mã sản phẩm"
                    //   // name="skus"
                    //   isMulti
                    //   cacheOptions
                    //   defaultOptions={listProdCodeSearch}
                    //   // defaultOptions={[
                    //   //   { value: 1, label: 1 },
                    //   //   { value: 2, label: 1 },
                    //   //   { value: 3, label: 1 },
                    //   // ]}
                    //   closeMenuOnSelect={false}
                    //   isLoading={isLoading}
                    //   // loadOptions={async () => listProdCode}
                    //   loadOptions={loadOptions}
                    //   onMenuScrollToBottom={scroll}
                    //   onInputChange={handleInputChange}
                    //   value={value}
                    //   onChange={onChange}
                    //   styles={colourStyles}
                    // />
                    <AsyncPaginate
                      placeholder="Vui lòng chọn mã sản phẩm"
                      value={value}
                      additional={{ page: 0 }}
                      loadOptions={loadOptions}
                      isMulti
                      closeMenuOnSelect={false}
                      onChange={onChange}
                      styles={colourStyles}
                    />
                  )}
                  //   <Select
                  //     placeholder="Vui lòng chọn mã sản phẩm"
                  //     name="skus"
                  //     isMulti
                  //     // cacheOptions
                  //     // defaultOptions
                  //     closeMenuOnSelect={false}
                  //     options={dataProductCodeSelect}
                  //     isLoading={isLoading}
                  //     // loadOptions={promiseOptions}
                  //     onInputChange={handleInputChange}
                  //     // className="basic-multi-select"
                  //     // classNamePrefix="select"
                  //     value={value}
                  //     onChange={onChange}

                  //   />
                  // )}
                />
                {errors && <FormHelperText error>{errors?.skus?.message}</FormHelperText>}
              </Box>

              <RHFTextField
                fullWidth
                label="Tỉ lệ trúng quà mặc định của người dùng (%)*"
                name="defaultWinRate"
                type="number"
              />
              <RHFTextField
                fullWidth
                label="Tỉ lệ cộng thêm khi người dùng không trúng quà (%)*"
                name="upRate"
                type="number"
              />
              <RHFTextField
                fullWidth
                label="Tỉ lệ bị trừ đi khi người dùng trúng quà (%)*"
                name="downRate"
                type="number"
              />

              <FormControl>
                <RadioGroup
                  defaultValue="allUser"
                  name="radio-buttons-group"
                  sx={{ flexDirection: 'row' }}
                  onChange={(e) => handleStatusUserType(e.target.value)}
                >
                  <FormControlLabel
                    value="allUser"
                    control={<Radio />}
                    label="Toàn bộ người dùng"
                  />
                  <FormControlLabel
                    value="newUser"
                    control={<Radio />}
                    label="Người dùng mới"
                  />
                </RadioGroup>
              </FormControl>

              <Controller
                name="userRegisterDate"
                control={control}
                render={({ field }) => (
                  <Stack
                    position={'relative'}
                    width="100%"
                    sx={{
                      display: `${(userTypeValue === 'allUser' && 'none') || 'block'}`,
                    }}
                  >
                    <DatePicker
                      {...field}
                      label="Ngày tính người dùng mới"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          helperText={
                            errors.userRegisterDate && errors.userRegisterDate.message
                          }
                          error={!!errors.userRegisterDate}
                        />
                      )}
                    />
                  </Stack>
                )}
              />
              <RHFTextField
                name="userLimit"
                fullWidth
                label="Số lần người dùng nhận quà tối đa*"
                type="number"
              />
            </Stack>
          </Stack>
        </Scrollbar>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => dispatch(setButtonType('saveSubmit'))}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            sx={{ mx: '7px' }}
            type="submit"
            onClick={() => dispatch(setButtonType('saveEditSubmit'))}
          >
            Lưu & chỉnh sửa
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};

const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'primary',
    borderRadius: '6px',
    minHeight: '60px',
    height: '60px',
    opacity: 0.7,
  }),
  // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //   // const color = chroma(data.color);
  //   return {
  //     ...styles,
  //     backgroundColor: isDisabled ? undefined : isSelected,
  //     // ? data.color
  //     // : isFocused
  //     // ? color.alpha(0.1).css()
  //     // : undefined,
  //     color: isDisabled ? '#ccc' : isSelected,
  //     // ? chroma.contrast(color, 'white') > 2
  //     //   ? 'white'
  //     //   : 'black'
  //     // : data.color,
  //     cursor: isDisabled ? 'not-allowed' : 'default',

  //     ':active': {
  //       ...styles[':active'],
  //       backgroundColor: !isDisabled
  //         ? isSelected
  //         : // ? data.color
  //           // : color.alpha(0.3).css()
  //           undefined,
  //     },
  //   };
  // },
};
