import { RootLayout } from '@/components/RootLayout';
import GrandPrixLayout from '@/routes/GrandPrixLayout';
import GrandPrixOverview from '@/routes/GrandPrixOverview';
import GrandPrixResults from '@/routes/GrandPrixResults';
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
        Component: GrandPrixLayout,
        children: [
          {
            index: true,
            Component: GrandPrixOverview,
            handle: { grandPrixPageName: '개요' },
          },
          {
            path: 'result',
            Component: GrandPrixResults,
            handle: { grandPrixPageName: '결과' },
          },
          {
            path: 'history',
            lazy: async () => {
              const { default: Component } = await import(
                '@/routes/GrandPrixRaceHistory'
              );

              return { Component };
            },
            handle: {
              grandPrixPageName: '레이스 히스토리',
              grandPrixMobilePageName: '히스토리',
            },
          },
        ],
      },
    ],
  },
]);
