import { RootLayout } from '@/components/RootLayout';
import GrandPrixDetail from '@/routes/GrandPrixDetail';
import Home from '@/routes/Home';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'grandprix/:grandPrixId',
        Component: GrandPrixDetail,
      },
    ],
  },
]);
