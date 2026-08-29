import GrandPrixHistoryError from '@/components/grandprix-history/GrandPrixHistoryError';
import GrandPrixHistoryLoading from '@/components/grandprix-history/GrandPrixHistoryLoading';
import RaceHistoryWorkspace from '@/components/grandprix-history/RaceHistoryWorkspace';
import useGrandPrixHistoryData from '@/hooks/useGrandPrixHistoryData';
import type { GrandPrixLayoutContext } from '@/routes/GrandPrixLayout';
import { useOutletContext } from 'react-router';

export default function GrandPrixRaceHistory() {
  const { grandPrixId } = useOutletContext<GrandPrixLayoutContext>();

  return (
    <GrandPrixRaceHistoryContent grandPrixId={grandPrixId} key={grandPrixId} />
  );
}

interface GrandPrixRaceHistoryContentProps {
  grandPrixId: number;
}

function GrandPrixRaceHistoryContent({
  grandPrixId,
}: GrandPrixRaceHistoryContentProps) {
  const historyQuery = useGrandPrixHistoryData(grandPrixId, 'R');

  if (historyQuery.isPending) {
    return <GrandPrixHistoryLoading />;
  }

  if (historyQuery.error !== null || historyQuery.history === undefined) {
    return (
      <GrandPrixHistoryError onRetry={() => void historyQuery.refetch()} />
    );
  }

  if (historyQuery.history.driver.length === 0) {
    return (
      <div className="mt-7 flex min-h-[360px] items-center justify-center rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-6 text-center text-sm text-grand-prix-muted-mobile min-[1400px]:mt-0 min-[1400px]:rounded-[22px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card">
        아직 등록된 레이스 히스토리가 없습니다.
      </div>
    );
  }

  return <RaceHistoryWorkspace history={historyQuery.history} />;
}
