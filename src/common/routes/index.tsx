import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// config
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
    const { pathname } = useLocation();

    const { isAuthenticated } = useAuth();

    const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

    return (
        <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    ),
                },
                {
                    path: 'forgot-password',
                    element: <ForgotPassword />,
                },
                {
                    path: 'reset-password',
                    element: <ResetPassword />,
                },
            ],
        },

        // Dashboard Routes
        {
            path: 'dashboard',
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                {
                    path: 'shop-invitation/:id',
                    element: <ShopInvitation />,
                },
                // STORE
                {
                    path: '',
                    children: [
                        { element: <Navigate to="/dashboard/store" replace />, index: true },
                        { path: 'stories', element: <ListStore /> },
                        { path: 'stories/:id', element: <EditStore /> }
                    ],
                },
                {
                    path: '',
                    children: [
                        { element: <Navigate to="/" replace />, index: true },
                        { path: 'admins', element: <AdminList /> },
                        { path: 'admins/create', element: <AddNewAdmin /> },
                        { path: 'admins/:id', element: <EditAdmin /> },
                    ],
                },
                {
                    path: '',
                    children: [
                        {
                            element: <Navigate to="/dashboard/event-promotion-IV" replace />,
                            index: true,
                        },
                        { path: 'event-promotion-IV', element: <ListEventPromotion /> },
                        { path: 'event-promotion-IV/:id', element: <ViewEventPromotion /> },
                        { path: 'event-promotion-IV/edit/:id', element: <EditEventPromotion /> },
                        { path: 'event-promotion-IV/new', element: <AddEventPromotion /> },
                    ],
                },
                {
                    path: '',
                    children: [
                        { element: <Navigate to="/dashboard/event" replace />, index: true },
                        { path: 'event-history', element: <History /> },
                        { path: 'event-list-prize', element: <ListPrize /> },
                        { path: 'event-create-prize/:id', element: <CreatePrize /> },
                        // { path: 'event-list-prize', element: <ListPrize /> },
                        { path: 'event/event-prize-edit/:id', element: <EditEventPrize /> },
                        { path: 'event-list-prize/event-:id', element: <ListPrize /> },
                    ],
                },
                {
                    path: '',
                    children: [
                        { element: <Navigate to="/dashboard/event-q1-prize" replace />, index: true },
                        { path: 'event-q1-prize/list', element: <ListEventQ1Prize /> },
                        { path: 'event-q1-prize/edit', element: <EditEventPrizeQ1 /> },
                        { path: 'event-q1-prize/create', element: <CreateEventPrizeQ1 /> },
                        
                    ]
                },
                {
                    path: '',
                    children: [
                      {
                        element: <Navigate to="/dashboard/event-quarter-one"/>,
                        index: true,
                      },
                      { path: 'event-quarter-one', element: <ManageListEvent /> },
                      { path: 'add-new-event', element: <ManageCreateEvent /> },
                      { path: 'event-quarter-one/:id', element: <ManageEditEvent /> },
                    ]
                  },
                  {
                    path: '',
                    children: [
                      {
                        element: <Navigate to="/dashboard/event-q1-groupEvent" replace />,
                        index: true,
                      },
                      { path: 'event-q1-groupEvent/list', element: <ListGroupEvent /> },
                      { path: 'event-q1-groupEvent/add', element: <AddGroupEvent /> },
                      { path: 'event-q1-groupEvent/edit', element: <EditGroupEvent /> },
                    ],
                  },
            ],
        },
        // STORE
        {
          path: '',
          children: [
            { element: <Navigate to="/dashboard/store" replace />, index: true },
            { path: 'stories', element: <ListStore /> },
            { path: 'stories/:id', element: <EditStore />}
          ],
        },
        {
          path: '',
          children: [
            { element: <Navigate to="/" replace />, index: true },
            { path: 'admins', element: <AdminList /> },
            { path: 'admins/create', element: <AddNewAdmin /> },
            { path: 'admins/:id', element: <EditAdmin /> },
          ],
        },
        {
          path: '',
          children: [
            {
              element: <Navigate to="/dashboard/event-promotion-IV" replace />,
              index: true,
            },
            { path: 'event-promotion-IV', element: <ListEventPromotion /> },
            { path: 'event-promotion-IV/:id', element: <ViewEventPromotion /> },
            { path: 'event-promotion-IV/edit/:id', element: <EditEventPromotion /> },
            { path: 'event-promotion-IV/new', element: <AddEventPromotion /> },
          ],
        },
        // {
        //   path: '',
        //   children: [
        //     {
        //       element: <Navigate to="/dashboard/event-quarter-one"/>,
        //       index: true,
        //     },
        //     { path: 'event-quarter-one', element: <ManageListEvent /> },
        //     { path: 'add-new-event', element: <ManageCreateEvent /> },
        //   ]
        // },
        {
          path: '',
          children: [
            { element: <Navigate to="/dashboard/event" replace />, index: true },
            { path: 'event-history', element: <History /> },
            { path: 'event-list-prize', element: <ListPrize /> },
            { path: 'event-create-prize/:id', element: <CreatePrize /> },
            // { path: 'event-list-prize', element: <ListPrize /> },
            { path: 'event/event-prize-edit/:id', element: <EditEventPrize /> },
            { path: 'event-list-prize/event-:id', element: <ListPrize /> },
          ],
        },

        // Main Routes
        {
            path: '*',
            element: <LogoOnlyLayout />,
            children: [
                { path: '500', element: <Page500 /> },
                { path: '404', element: <Page404 /> },
                { path: '403', element: <Page403 /> },
                { path: '*', element: <Navigate to="/404" replace /> },
            ],
        },
        {
            path: '/',

            children: [
                {
                    path: '',
                    children: [
                        { element: <Navigate to="/dashboard/stories" replace />, index: true },
                        { path: 'stories', element: <ListStore /> },
                    ],
                },
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
// login
const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const ForgotPassword = Loadable(
    lazy(() => import('../../auth/forgot-password/ForgotPassword'))
);
const ResetPassword = Loadable(
    lazy(() => import('../../auth/reset-password/ResetPassword'))
);

// STORE ADMIN
const ListStore = Loadable(
    lazy(() => import('../../store-admin/storeAdmin-page/ListStoreAdmin'))
);
const EditStore = Loadable(lazy(() => import('../../store-admin/storeAdmin-page/EditStoreAdmin')));

// EVENT ADMIN
const History = Loadable(lazy(() => import('../../event/event-history-prize/index')));
const ListPrize = Loadable(lazy(() => import('../../event/list-prize/index')));
const CreatePrize = Loadable(
    lazy(() => import('../../event/event-history-prize/history-prize-create/create'))
);
const EditEventPrize = Loadable(lazy(() => import('../../event/edit-event-prize/index')));

// EVENT Q1 PRIZE
const ListEventQ1Prize = Loadable(lazy(() => import('../../event-prize-q1/list')));
const EditEventPrizeQ1 = Loadable(lazy(() => import('../../event-prize-q1/edit')));
const CreateEventPrizeQ1 = Loadable(lazy(() => import('../../event-prize-q1/create')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// shop invitation
const ShopInvitation = Loadable(
    lazy(() => import('src/shop-invitation/components/ShopInvitation'))
);

// EVENT_PROMOTION_IV

const ListEventPromotion = Loadable(
    lazy(() => import('../pages/event-promotion-IV/listEventPromotion'))
);

const ViewEventPromotion = Loadable(
    lazy(() => import('../pages/event-promotion-IV/viewEventPromotion'))
);
const EditEventPromotion = Loadable(
    lazy(() => import('../pages/event-promotion-IV/editEventPromotion'))
);
const AddEventPromotion = Loadable(
    lazy(() => import('../pages/event-promotion-IV/addEventPromotion'))
);


const ListGroupEvent = Loadable(
  lazy(() => import('../../event-q1-groupEvent/list-group-event/index'))
);
const AddGroupEvent = Loadable(
  lazy(() => import('../../event-q1-groupEvent/add-group-event/index'))
);
const EditGroupEvent = Loadable(
  lazy(() => import('../../event-q1-groupEvent/edit-group-event/index'))
);

// ADMIN
const AdminList = Loadable(lazy(() => import('../../admin/admin-pages/AdminList')));
const AddNewAdmin = Loadable(lazy(() => import('../../admin/admin-pages/AddNewAdmin')));
const EditAdmin = Loadable(lazy(() => import('../../admin/admin-pages/EditAdmin')));

// MANAGE_EVENT_QUARTER_ONE
const ManageListEvent = Loadable(lazy(() => import('../../manage-event-quarter-one/manage-list-event/index')));
const ManageCreateEvent = Loadable(lazy(() => import('../../manage-event-quarter-one/manage-create-event/index')))
const ManageEditEvent = Loadable(lazy(() => import('../../manage-event-quarter-one/manage-edit-event/index')))

