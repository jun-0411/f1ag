import {
  getCircuitKoreanName,
  getCircuitLocation,
} from '@/constants/grandPrix';
import { getCircuitImage } from '@/constants/images';
import type { GrandPrixCircuitOverview } from '@/types/grandprix';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';

interface CircuitOverviewProps {
  circuit: GrandPrixCircuitOverview;
  circuitId: number;
}

const formatMetric = (
  value: number | null,
  unit: string,
  fractionDigits = 0
): string =>
  value === null ? '정보 없음' : `${value.toFixed(fractionDigits)} ${unit}`;

export default function CircuitOverview({
  circuit,
  circuitId,
}: CircuitOverviewProps) {
  const circuitImage = getCircuitImage(circuitId);
  const koreanName = getCircuitKoreanName(
    circuit.circuit_english_name,
    circuit.circuit_korean_name
  );
  const location = getCircuitLocation(
    circuit.circuit_english_name,
    circuit.circuit_region_name
  );

  return (
    <section aria-labelledby="circuit-overview-heading">
      <Link
        aria-label={`${koreanName} 상세 보기`}
        className="block overflow-hidden rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile transition-colors hover:border-grand-prix-primary/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grand-prix-primary min-[1400px]:min-h-[410px] min-[1400px]:rounded-[22px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card"
        to={`/circuit/${circuitId}`}
      >
        <div className="grid min-[700px]:grid-cols-[1.08fr_0.92fr]">
          <div className="p-5 min-[1400px]:p-7">
            <div>
              <p className="text-[9px] font-bold text-grand-prix-primary min-[1400px]:text-[11px]">
                CIRCUIT
              </p>
              <h2
                className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:mt-2 min-[1400px]:text-[26px]"
                id="circuit-overview-heading"
              >
                서킷 정보
              </h2>
            </div>

            <h3 className="mt-6 text-xl font-bold text-grand-prix-text min-[1400px]:mt-8 min-[1400px]:text-[27px]">
              {koreanName}
            </h3>
            <p className="mt-1 text-[11px] text-grand-prix-muted-mobile min-[1400px]:text-sm min-[1400px]:text-grand-prix-muted">
              {circuit.circuit_english_name}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-[10px] text-grand-prix-muted-mobile min-[1400px]:text-xs min-[1400px]:text-grand-prix-muted">
              <MapPin aria-hidden="true" className="size-3.5" />
              {location}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-grand-prix-border-mobile pt-5 min-[1400px]:mt-8 min-[1400px]:border-grand-prix-border">
              <div>
                <dt className="text-[9px] text-grand-prix-muted-mobile min-[1400px]:text-[11px] min-[1400px]:text-grand-prix-muted">
                  랩 수
                </dt>
                <dd className="mt-1 text-xs font-bold text-grand-prix-text min-[1400px]:text-base">
                  {formatMetric(circuit.circuit_laps, 'Laps')}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] text-grand-prix-muted-mobile min-[1400px]:text-[11px] min-[1400px]:text-grand-prix-muted">
                  1랩 길이
                </dt>
                <dd className="mt-1 text-xs font-bold text-grand-prix-text min-[1400px]:text-base">
                  {formatMetric(circuit.circuit_one_lap_length, 'km', 3)}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] text-grand-prix-muted-mobile min-[1400px]:text-[11px] min-[1400px]:text-grand-prix-muted">
                  총 길이
                </dt>
                <dd className="mt-1 text-xs font-bold text-grand-prix-text min-[1400px]:text-base">
                  {formatMetric(circuit.circuit_total_length, 'km', 3)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex min-h-[230px] items-center justify-center bg-grand-prix-map p-8 min-[1400px]:min-h-[408px] min-[1400px]:p-10">
            {circuitImage === null ? (
              <p className="text-xs text-grand-prix-muted">
                서킷 이미지 준비 중
              </p>
            ) : (
              <img
                alt={`${koreanName} 트랙 지도`}
                className="h-auto w-full max-w-[310px]"
                src={circuitImage}
              />
            )}
          </div>
        </div>
      </Link>
    </section>
  );
}
