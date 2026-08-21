import CircuitOverview from '@/components/grandprix-overview/CircuitOverview';
import GrandPrixOverviewError from '@/components/grandprix-overview/GrandPrixOverviewError';
import GrandPrixOverviewLoading from '@/components/grandprix-overview/GrandPrixOverviewLoading';
import RaceDirectorInstructions from '@/components/grandprix-overview/RaceDirectorInstructions';
import SessionSchedule from '@/components/grandprix-overview/SessionSchedule';
import TireOverview from '@/components/grandprix-overview/TireOverview';
import WeekendWeather from '@/components/grandprix-overview/WeekendWeather';
import useGrandPrixOverviewData from '@/hooks/useGrandPrixOverviewData';
import type { GrandPrixLayoutContext } from '@/routes/GrandPrixLayout';
import { useOutletContext } from 'react-router';

export default function GrandPrixOverview() {
  const { grandPrixId, grandPrix } = useOutletContext<GrandPrixLayoutContext>();
  const { overview, isPending, error, refetch } =
    useGrandPrixOverviewData(grandPrixId);

  if (isPending) {
    return <GrandPrixOverviewLoading />;
  }

  if (error !== null || overview === undefined) {
    return <GrandPrixOverviewError onRetry={() => void refetch()} />;
  }

  return (
    <div className="mt-7 flex flex-col gap-10 min-[1400px]:mt-0 min-[1400px]:grid min-[1400px]:grid-cols-[minmax(0,742px)_minmax(360px,434px)] min-[1400px]:gap-6">
      <div className="contents min-[1400px]:block min-[1400px]:space-y-11">
        <div className="order-1">
          <SessionSchedule
            grandPrixId={grandPrixId}
            grandPrixName={grandPrix.name}
            isSprint={grandPrix.is_sprint}
            schedule={overview.schedule}
          />
        </div>
        <div className="order-5">
          <CircuitOverview
            circuit={overview.circuit}
            circuitId={grandPrix.circuit_id}
          />
        </div>
      </div>

      <div className="contents min-[1400px]:block min-[1400px]:space-y-6">
        <div className="order-2">
          <WeekendWeather
            isSprint={grandPrix.is_sprint}
            schedule={overview.schedule}
            weather={overview.weather}
          />
        </div>
        <div className="order-3">
          <TireOverview tires={overview.tire} />
        </div>
        <div className="order-4">
          <RaceDirectorInstructions />
        </div>
      </div>
    </div>
  );
}
