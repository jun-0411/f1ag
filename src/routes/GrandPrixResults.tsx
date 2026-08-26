import DriverOfTheDay from '@/components/grandprix-results/DriverOfTheDay';
import FinalClassification from '@/components/grandprix-results/FinalClassification';
import GrandPrixResultsError from '@/components/grandprix-results/GrandPrixResultsError';
import GrandPrixResultsLoading from '@/components/grandprix-results/GrandPrixResultsLoading';
import RacePodium from '@/components/grandprix-results/RacePodium';
import useGrandPrixResultData from '@/hooks/useGrandPrixResultData';
import type { GrandPrixLayoutContext } from '@/routes/GrandPrixLayout';
import { useOutletContext } from 'react-router';

export default function GrandPrixResults() {
  const { grandPrixId, grandPrix } = useOutletContext<GrandPrixLayoutContext>();
  const { result, isPending, error, refetch } =
    useGrandPrixResultData(grandPrixId);

  if (isPending) {
    return <GrandPrixResultsLoading />;
  }

  if (error !== null || result === undefined) {
    return <GrandPrixResultsError onRetry={() => void refetch()} />;
  }

  if (result.driver.length === 0) {
    return (
      <div className="mt-7 flex min-h-[360px] items-center justify-center rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-6 text-center text-sm text-grand-prix-muted-mobile min-[1400px]:mt-0 min-[1400px]:rounded-[22px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card">
        아직 등록된 경기 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-7 flex flex-col gap-10 min-[1400px]:mt-0 min-[1400px]:grid min-[1400px]:grid-cols-[650px_minmax(0,1fr)] min-[1400px]:items-start min-[1400px]:gap-6">
      <div className="space-y-10 min-[1400px]:space-y-6">
        <RacePodium drivers={result.driver} />
        <DriverOfTheDay dotd={result.dotd} drivers={result.driver} />
      </div>
      <FinalClassification
        drivers={result.driver}
        isSprint={grandPrix.is_sprint}
        key={grandPrixId}
      />
    </div>
  );
}
