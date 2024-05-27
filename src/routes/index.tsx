import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layouts/dashboard";
import axiosInstance from '../api/axios';
export const AppPage = lazy(() => import('../pages/app'));
export const HotelsPage = lazy(() => import('../pages/hotels'));
export const UsersPage = lazy(() => import('../pages/users'));
export const SigninPage = lazy(() => import('../pages/signin'));

export default function Router() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get('/staff/isLogin'); 
        if (res.data.isLogin) {
          navigate('/');
        }
      } catch (error: any) {
        navigate('/signin');
      }
    };

    checkUser();
  }, []);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <AppPage />, index: true },
        { path: 'hotels', element: <HotelsPage /> },
        { path: 'users', element: <UsersPage /> },
      ],
    },
    {
      element: (<div>
        <Outlet />
      </div>),
      children: [
        { element: <div>login</div>, path: 'login', index: true }
      ]
    }
    ,
    {
      path:"signin",
      element: <SigninPage />,
    } 
  ])

  return routes
}