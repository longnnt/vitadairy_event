// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { LIST_STORE } from 'src/store-admin/constants';
import { LIST_USER } from 'src/shop-invitation/common/constants';
import { BREADCUMBS } from 'src/common/constants/common.constants';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  setting: getIcon('ic_menu_item'),
  policy: getIcon('ic_policy'),
  document: getIcon('ic_policy'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'shop-invitation',
  //       path: PATH_DASHBOARD.general.shop_invitation,
  //       icon: ICONS.analytics,
  //     },
  //   ],
  // },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // STORE
      {
        title: BREADCUMBS.STORE_ADMIN,
        path: PATH_DASHBOARD.storeAdmin.root,
        icon: ICONS.booking,
        children: [
          {
            title: LIST_STORE,
            path: PATH_DASHBOARD.storeAdmin.list,
          },
        ],
      },

      // EVENT
      {
        title: 'Sự kiện Promotion Quý 4',
        path: PATH_DASHBOARD.eventAdmin.root,
        icon: ICONS.calendar,
        children: [
          {
            title: 'Danh sách Event',
            path: PATH_DASHBOARD.eventPromotionIV.list,
          },
          {
            title: 'Lịch sử trúng giải',
            path: PATH_DASHBOARD.eventAdmin.historyPrize,
          },
        ],
      },
      {
        title: 'Quản lý quản trị viên',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.policy,
        children: [{ title: 'Danh sách quản trị viên', path: PATH_DASHBOARD.admin.list }],
      },
      {
        title: BREADCUMBS.MANAGE_EVENT,
        path: PATH_DASHBOARD.manageEventQuarterOne.root,
        icon: ICONS.cart,
        children: [
          {
            title: BREADCUMBS.MANAGE_LIST_EVENT,
            path: PATH_DASHBOARD.manageEventQuarterOne.list,
          },
        ]
      },
      {
        title: BREADCUMBS.MANAGE_GROUP_EVENT,
        path: PATH_DASHBOARD.eventQ1GroupEvent.root,
        icon: ICONS.policy,
        children: [
          {
            title: BREADCUMBS.LIST_GROUP_EVENT,
            path: PATH_DASHBOARD.eventQ1GroupEvent.listGroupEvent,
          },
        ],
      },
      {
        title: BREADCUMBS.EVENT_HISTORY_PRIZE,
        path: PATH_DASHBOARD.eventHistoryPrize.listHistoryPrize,
        icon: ICONS.calendar,
      },
    ],
  },
];

export default navConfig;
