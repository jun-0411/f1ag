import GrandPrixError from '@/components/grandprix/GrandPrixError';
import GrandPrixHeader from '@/components/grandprix/GrandPrixHeader';
import GrandPrixLayoutLoading from '@/components/grandprix/GrandPrixLayoutLoading';
import GrandPrixMobileNavigationDrawer from '@/components/grandprix/GrandPrixMobileNavigationDrawer';
import GrandPrixNavigation from '@/components/grandprix/GrandPrixNavigation';
import useGrandPrixData from '@/hooks/useGrandPrixData';
import useMobileNavigationStore from '@/stores/useMobileNavigationStore';
import type { GrandPrixResponse } from '@/types/grandprix';
import { useEffect } from 'react';
import { Outlet, type UIMatch, useMatches, useParams } from 'react-router';

interface GrandPrixRouteHandle {
  grandPrixMobilePageName?: string;
  grandPrixPageName?: string;
}

export interface GrandPrixLayoutContext {
  grandPrixId: number;
  grandPrix: GrandPrixResponse;
}

const getGrandPrixPageName = (matches: UIMatch[]): string => {
  for (const match of [...matches].reverse()) {
    const handle = match.handle as GrandPrixRouteHandle | undefined;

    if (handle?.grandPrixPageName !== undefined) {
      return handle.grandPrixPageName;
    }
  }

  return '';
};

const getGrandPrixMobilePageName = (matches: UIMatch[]): string | undefined => {
  for (const match of [...matches].reverse()) {
    const handle = match.handle as GrandPrixRouteHandle | undefined;

    if (handle?.grandPrixMobilePageName !== undefined) {
      return handle.grandPrixMobilePageName;
    }
  }

  return undefined;
};

export default function GrandPrixLayout() {
  const { grandPrixId: grandPrixIdParameter } = useParams();
  const matches = useMatches();
  const { grandPrixId, grandPrix, isPending, error, isNotFound, refetch } =
    useGrandPrixData(grandPrixIdParameter);
  const closeMobileNavigation = useMobileNavigationStore(
    (state) => state.close
  );

  useEffect(
    () => () => {
      closeMobileNavigation();
    },
    [closeMobileNavigation]
  );

  if (isPending) {
    return <GrandPrixLayoutLoading />;
  }

  if (grandPrixId === null || isNotFound) {
    return <GrandPrixError isNotFound />;
  }

  if (error !== null || grandPrix === undefined) {
    return <GrandPrixError isNotFound={false} onRetry={() => void refetch()} />;
  }

  const pageName = getGrandPrixPageName(matches);
  const mobilePageName = getGrandPrixMobilePageName(matches);

  return (
    <>
      <GrandPrixMobileNavigationDrawer
        activePageName={pageName}
        grandPrix={grandPrix}
        grandPrixId={grandPrixId}
      />

      <div className="min-h-[calc(100vh-64px)] bg-grand-prix-page px-4 pb-16 min-[1400px]:px-5 min-[1400px]:pb-20">
        <div className="mx-auto max-w-[1400px] min-[1400px]:grid min-[1400px]:grid-cols-[172px_minmax(0,1200px)] min-[1400px]:gap-6 min-[1400px]:pt-12">
          <GrandPrixNavigation
            activePageName={pageName}
            grandPrixId={grandPrixId}
            isSprint={grandPrix.is_sprint}
          />

          <main className="min-w-0">
            <GrandPrixHeader
              grandPrix={grandPrix}
              mobilePageName={mobilePageName}
              pageName={pageName}
            />
            <Outlet context={{ grandPrixId, grandPrix }} />
          </main>
        </div>
      </div>
    </>
  );
}
