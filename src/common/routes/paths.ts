// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = '/dashboard';

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
  root: '/dashboard/stories',
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
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
    shop_invitation: path(ROOTS_DASHBOARD, '/shop-invitation'),
    edit_store: (editStoreId: string) => path(ROOTS_DASHBOARD, `/stories/${editStoreId}`),
    edit_shop: (shopID: string) =>
      path(ROOTS_DASHBOARD, `/shop-invitation/${shopID}`),
  },
  eventPromotionIV: {
    root: path(ROOTS_DASHBOARD, '/event-promotion-IV'),
    list: path(ROOTS_DASHBOARD, '/event-promotion-IV'),
    new: path(ROOTS_DASHBOARD, '/event-promotion-IV/new'),
    view: (id: number) => path(ROOTS_DASHBOARD, `/event-promotion-IV/${id}`),
    edit: (eventId: number) =>
      path(ROOTS_DASHBOARD, `/event-promotion-IV/edit/${eventId}`),
  },

  eventAdmin: {
    root: path(ROOTS_DASHBOARD, '/event-history'),
    historyPrize: path(ROOTS_DASHBOARD, '/event-history'),
    createPrize: (eventID: string) =>
      path(ROOTS_DASHBOARD, `/event-create-prize/${eventID}`),
    listPrize: (eventID: string) =>
      path(ROOTS_DASHBOARD, `/event-list-prize/event-${eventID}`),
    editEventPrize: path(ROOTS_DASHBOARD, '/event/event-prize-edit/:id'),
    editFileEvent: (idEvent: number) =>
      path(ROOTS_DASHBOARD, `/event/event-prize-edit/${idEvent}`),
  },

  manageEventQuarterOne: {
    root: path(ROOTS_DASHBOARD, '/event-quarter-one'),
    list: path(ROOTS_DASHBOARD, '/event-quarter-one'),
    new: path(ROOTS_DASHBOARD, '/add-new-event'),
    edit: (idEventOne: number) =>
    path(ROOTS_DASHBOARD, `/event-quarter-one/${idEventOne}`),
  },

  eventPrizeQ1: {
    root: path(ROOTS_DASHBOARD, '/event-q1-prize'),
    list: path(ROOTS_DASHBOARD, '/event-q1-prize/event-:eventId'),
    create: path(ROOTS_DASHBOARD, '/event-q1-prize/event-:eventId/create'),
    edit: path(ROOTS_DASHBOARD, '/event-q1-prize/event-:eventId/:prizeId'),
  },
  

  eventQ1GroupEvent: {
    root: path(ROOTS_DASHBOARD, '/event-q1-groupEvent'),
    listGroupEvent: path(ROOTS_DASHBOARD, '/event-q1-groupEvent/list'), 
    addGroupEvent: path(ROOTS_DASHBOARD, '/event-q1-groupEvent/add'), 
    editGroupEvent: (idEvent: number) => path (ROOTS_DASHBOARD, `/event-q1-groupEvent/${idEvent}`),
    viewGroupEvent: (idEvent: number) => path (ROOTS_DASHBOARD, `/event-q1-groupEvent/view/${idEvent}`),
  },

  eventHistoryPrize: {
    listHistoryPrize: path(ROOTS_DASHBOARD, '/event-history-prize/list'),
  }

};
