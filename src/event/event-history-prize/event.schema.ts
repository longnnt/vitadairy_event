import * as Yup from 'yup';

const validationObject: any = {};
const TranslateObjectSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
  shortDesc: Yup.string().required('Short description is required'),
  content: Yup.string().required('Content is required'),
});

export const NewEventSchema = Yup.object().shape({
  thumbnail: Yup.mixed().required('Thumbnail is required'),
  location: Yup.string().required('Location is required'),
  timeStart: Yup.string().required('Start time is required'),
});
