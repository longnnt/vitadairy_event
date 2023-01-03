import * as yup from 'yup';

export const createPrizeSchema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên giải'),
    count: yup.number().required('Vui lòng nhập số lượng'),
    orderWinning: yup.number().required('Vui lòng nhập thứ tự trúng giải'),
    probability: yup.number().required('Vui lòng nhập xác suất trúng giải')
})