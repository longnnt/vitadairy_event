// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

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

  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.mail,
        info: <Label color="error">+32</Label>,
      },
      { title: 'chat', path: PATH_DASHBOARD.general.app, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.general.app, icon: ICONS.calendar },
      { title: 'kanban', path: PATH_DASHBOARD.general.app, icon: ICONS.kanban },
    ],
  },
];

export default navConfig;
