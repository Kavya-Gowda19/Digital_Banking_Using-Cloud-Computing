import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Products = Loadable(lazy(() => import('views/product/Addproduct')));

const ViewProducts = Loadable(lazy(() => import('views/product/Viewproduct')));
const UpdateProducts = Loadable(lazy(() => import('views/product/UpdateProduct')));
const SingleProducts = Loadable(lazy(() => import('views/product/SingleProduct')));

const Accounts = Loadable(lazy(() => import('views/Account/Accounts')));
const SingleView =  Loadable(lazy(() => import('views/Account/SingleView')));
const ViewAccount = Loadable(lazy(() => import('views/Account/MAccount')));
const UpdateAccount = Loadable(lazy(() => import('views/Account/UpdateAccount')));
const Deposit = Loadable(lazy(() => import('views/Deposit/Deposit')));
const Withdrawa = Loadable(lazy(() => import('views/withdraw/Withdrawa')));
const Helpline = Loadable(lazy(() => import('views/Help/Helpline')));


const Party = Loadable(lazy(() => import('views/party/AddParty')));
const ViewParty = Loadable(lazy(() => import('views/party/View_party')));
// const UpdateParty = Loadable(lazy(() => import('views/party/UpdateParty')));



// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'mproduct',
      children: [
        {
          path: 'add-product',
          element: <Products />
        },
        {
          path: 'view-product',
          element: <ViewProducts />
        },
        {
          path: 'update-product/:id',
          element: <UpdateProducts />
        },
        {
          path: 'single-product/:id',
          element: <SingleProducts />
        }
      ]
    },


    {
      path: 'maccount',
      children: [
        {
          path: 'add-account',
          element:<Accounts/>  
        },
        {
          path: 'view-account',
          element: <ViewAccount />
        },
        {
          path: 'single-account/:id',
          element: <SingleView/>
        },
        {
          path: 'update-account/:id',
          element: <UpdateAccount/>
        }
      ]
    },

    {
      path: 'mdeposit',
      children: [
        {
          path: 'add-deposit',
          element:  <Deposit/>
        },
      ]
    },

    {
      path: 'mwithdraw',
      children: [
        {
          path: 'add-withdraw',
          element:  <Withdrawa/>
        },
      ]
    },

    {
      path: 'mhelpline',
      children: [
        {
          path: 'view-helpline',
          element: <Helpline/>
        },
      ]
    },



    {
      path: 'mparty',
      children: [
        {
          path: 'add-party',
          element: <Party />
        },
        {
          path: 'view-party',
          element: <ViewParty />
        }
      ]
    },
   
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
