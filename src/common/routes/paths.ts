// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: '/',
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    shop_invitation: path(ROOTS_DASHBOARD, '/shop-invitation'),
  },
  admin: {
    root: path(ROOTS_DASHBOARD, '/admins'),
    list: path(ROOTS_DASHBOARD, '/admins'),
    create: path(ROOTS_DASHBOARD, '/admins/create'),
    edit: (adminId: number) => path(ROOTS_DASHBOARD, `/admins/${adminId}`),
  },
  storeAdmin: {
    root: path(ROOTS_DASHBOARD, '/stories'),
    list: path(ROOTS_DASHBOARD, '/stories'),
    new: path(ROOTS_DASHBOARD, '/store/new'),
  },
  eventPromotionIV: {
    root: path(ROOTS_DASHBOARD, '/event-promotion-IV'),
    list: path(ROOTS_DASHBOARD, '/event-promotion-IV'),
    new: path(ROOTS_DASHBOARD, '/event-promotion-IV/new'),
    view: (eventId: number) => path(ROOTS_DASHBOARD, `/event-promotion-IV/${eventId}`),
    edit: (eventId: number) =>
      path(ROOTS_DASHBOARD, `/event-promotion-IV/edit/${eventId}`),
  },

  eventAdmin: {
    root: path(ROOTS_DASHBOARD, '/event-list'),
    list: path(ROOTS_DASHBOARD, '/events-list'),
    historyPrize: path(ROOTS_DASHBOARD, '/event-history'),
    listPrize: path(ROOTS_DASHBOARD, '/event-list-prize'),
  },
};
