import { getGrandPrixTyreImage } from '@/constants/images';
import type { GrandPrixTireOverviewItem } from '@/types/grandprix';

interface TireOverviewProps {
  tires: GrandPrixTireOverviewItem[];
}

interface TireCardProps {
  tire: GrandPrixTireOverviewItem;
}

const DRY_TIRE_TYPES = ['HARD', 'MEDIUM', 'SOFT'];
const WET_TIRE_TYPES = ['INTERMEDIATE', 'WET'];

const TIRE_ABBREVIATION_BY_TYPE: Record<string, string> = {
  HARD: 'H',
  MEDIUM: 'M',
  SOFT: 'S',
  INTERMEDIATE: 'I',
  WET: 'W',
};

const TIRE_TEXT_CLASS_BY_TYPE: Record<string, string> = {
  HARD: 'text-white',
  MEDIUM: 'text-grand-prix-warning',
  SOFT: 'text-grand-prix-primary',
  INTERMEDIATE: 'text-[#45c96b]',
  WET: 'text-grand-prix-info',
};

const getTireName = (tireType: string | null): string => {
  if (tireType === null) {
    return '타이어 정보 없음';
  }

  return tireType.toUpperCase() === 'INTERMEDIATE'
    ? 'INTER'
    : tireType.toUpperCase();
};

function TireCard({ tire }: TireCardProps) {
  const image = getGrandPrixTyreImage(tire.tire_type);
  const normalizedTireType = tire.tire_type?.toUpperCase() ?? '';
  const abbreviation = TIRE_ABBREVIATION_BY_TYPE[normalizedTireType] ?? '?';
  const textClass =
    TIRE_TEXT_CLASS_BY_TYPE[normalizedTireType] ?? 'text-grand-prix-muted';

  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      {image === null ? (
        <div className="flex size-[58px] items-center justify-center rounded-full border-4 border-grand-prix-border text-[9px] font-bold text-grand-prix-muted min-[1400px]:size-[68px]">
          N/A
        </div>
      ) : (
        <div className="relative size-[58px] min-[1400px]:size-[68px]">
          <img
            alt={`${getTireName(tire.tire_type)} 타이어`}
            className="size-full"
            src={image}
          />
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center text-sm font-black min-[1400px]:text-base ${textClass}`}
          >
            {abbreviation}
          </span>
        </div>
      )}
      <p className="mt-2 truncate text-[9px] font-bold text-grand-prix-text min-[1400px]:text-[10px]">
        {getTireName(tire.tire_type)}
      </p>
      <p className="mt-0.5 text-[9px] text-grand-prix-muted-mobile min-[1400px]:text-[10px] min-[1400px]:text-grand-prix-muted">
        {tire.tire_set === null ? '정보 없음' : `${tire.tire_set} SETS`}
      </p>
    </div>
  );
}

export default function TireOverview({ tires }: TireOverviewProps) {
  const dryTires = tires.filter((tire) =>
    DRY_TIRE_TYPES.includes(tire.tire_type?.toUpperCase() ?? '')
  );
  const wetTires = tires.filter((tire) =>
    WET_TIRE_TYPES.includes(tire.tire_type?.toUpperCase() ?? '')
  );

  return (
    <section aria-labelledby="tire-overview-heading">
      <div className="rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-4 min-[1400px]:min-h-[372px] min-[1400px]:rounded-[22px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-[22px]">
        <div>
          <p className="text-[9px] font-bold text-grand-prix-warning min-[1400px]:text-[11px]">
            TYRE ALLOCATION
          </p>
          <h2
            className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:mt-2 min-[1400px]:text-[22px]"
            id="tire-overview-heading"
          >
            타이어 배정
          </h2>
        </div>

        {tires.length === 0 ? (
          <div className="flex min-h-36 items-center justify-center text-center text-xs leading-5 text-grand-prix-muted min-[1400px]:min-h-64 min-[1400px]:text-sm">
            타이어 정보가 아직 제공되지 않았습니다.
          </div>
        ) : (
          <div className="mt-5">
            <div className="grid grid-cols-3 gap-3">
              {dryTires.map((tire) => (
                <TireCard key={tire.tire_code} tire={tire} />
              ))}
            </div>
            <div className="mx-auto mt-5 grid max-w-[220px] grid-cols-2 gap-6 border-t border-grand-prix-border-mobile pt-4 min-[1400px]:mt-6 min-[1400px]:border-grand-prix-border">
              {wetTires.map((tire) => (
                <TireCard key={tire.tire_code} tire={tire} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
