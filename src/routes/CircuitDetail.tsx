import CircuitDetailError from '@/components/circuit-detail/CircuitDetailError';
import CircuitDetailLoading from '@/components/circuit-detail/CircuitDetailLoading';
import CircuitHeader from '@/components/circuit-detail/CircuitHeader';
import CircuitMetrics from '@/components/circuit-detail/CircuitMetrics';
import CircuitRecords from '@/components/circuit-detail/CircuitRecords';
import CircuitTrackMap from '@/components/circuit-detail/CircuitTrackMap';
import HostedGrandPrixSection from '@/components/circuit-detail/HostedGrandPrixSection';
import { getCircuitKoreanName } from '@/constants/circuit';
import useCircuitData from '@/hooks/useCircuitData';
import { useParams } from 'react-router';

export default function CircuitDetail() {
  const { circuitId: circuitIdParameter } = useParams();
  const {
    circuitId,
    circuit,
    hostedGrandPrix,
    isPending,
    isHostedGrandPrixPending,
    error,
    hostedGrandPrixError,
    isNotFound,
    refetch,
    refetchHostedGrandPrix,
  } = useCircuitData(circuitIdParameter);

  if (isPending) {
    return <CircuitDetailLoading />;
  }

  if (circuitId === null || isNotFound) {
    return <CircuitDetailError isNotFound />;
  }

  if (error !== null || circuit === undefined) {
    return (
      <CircuitDetailError isNotFound={false} onRetry={() => void refetch()} />
    );
  }

  const circuitName = getCircuitKoreanName(
    circuit.circuit_english_name,
    circuit.circuit_korean_name
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-grand-prix-page px-4 pt-7 pb-12 min-[1400px]:px-5 min-[1400px]:pt-12 min-[1400px]:pb-20">
      <div className="mx-auto max-w-[1200px]">
        <CircuitHeader
          circuitName={circuitName}
          englishName={circuit.circuit_english_name}
          nationFlagImageId={circuit.nation_flag_image_id}
        />

        <div className="mt-10 grid gap-8 min-[1400px]:mt-[158px] min-[1400px]:grid-cols-[minmax(0,714px)_minmax(0,414px)] min-[1400px]:gap-6 min-[1400px]:rounded-3xl min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-[#121720] min-[1400px]:p-6">
          <CircuitTrackMap
            circuitImageId={circuit.circuit_image_id}
            circuitName={circuitName}
            englishName={circuit.circuit_english_name}
          />

          <div className="min-w-0 space-y-8 min-[1400px]:space-y-0 min-[1400px]:rounded-[18px] min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-[#171d28] min-[1400px]:p-6">
            <CircuitMetrics
              corners={circuit.circuit_corners}
              oneLapLength={circuit.circuit_one_lap_length}
              openingYear={circuit.circuit_opening_year}
            />
            <CircuitRecords records={circuit.record} />
          </div>
        </div>

        <div className="mt-8 min-[1400px]:mt-32">
          <HostedGrandPrixSection
            error={hostedGrandPrixError}
            grandPrixItems={hostedGrandPrix}
            isPending={isHostedGrandPrixPending}
            onRetry={() => void refetchHostedGrandPrix()}
          />
        </div>
      </div>
    </div>
  );
}
