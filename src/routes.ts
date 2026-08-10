import { RootLayout } from '@/components/RootLayout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
  },
]);
