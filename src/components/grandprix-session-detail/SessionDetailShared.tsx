import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getGrandPrixDetailTeamDisplay } from '@/constants/grandPrixDetail';
import { getGrandPrixTyreImage } from '@/constants/images';
import type {
  GrandPrixDetailDriver,
  GrandPrixSessionCode,
} from '@/types/grandprix';
import {
  getFastestDriver,
  getSafeTeamColor,
  getTireStintDisplays,
} from '@/utils/grandPrixDetail';

interface SessionFastestSummaryProps {
  drivers: GrandPrixDetailDriver[];
  session: GrandPrixSessionCode;
}

const getSummaryDriverName = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const lastName = parts.at(-1) ?? name;
  const firstInitial = parts[0]?.[0]?.toUpperCase();

  return firstInitial === undefined
    ? lastName.toUpperCase()
    : `${firstInitial}. ${lastName.toUpperCase()}`;
};

export function SessionFastestSummary({
  drivers,
  session,
}: SessionFastestSummaryProps) {
  const fastestDriver = getFastestDriver(drivers);
  const isRaceSession = session === 'R' || session === 'S';

  return (
    <aside className="flex h-[90px] w-full items-center justify-between rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-[13px] min-[1400px]:h-[92px] min-[1400px]:w-[310px] min-[1400px]:rounded-2xl min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:px-5">
      <div>
        <p className="text-[9px] font-bold tracking-[0.04em] text-grand-prix-performance uppercase min-[1400px]:text-[10px]">
          {isRaceSession ? 'Race fastest lap' : 'Session fastest'}
        </p>
        <p className="mt-2 max-w-[190px] truncate text-[13px] font-bold text-grand-prix-text min-[1400px]:text-sm">
          {fastestDriver === null
            ? '기록 없음'
            : getSummaryDriverName(fastestDriver.name)}
        </p>
      </div>
      <p className="text-2xl font-bold text-grand-prix-performance min-[1400px]:text-xl">
        {fastestDriver?.fastestlap ?? '—'}
      </p>
    </aside>
  );
}

interface SessionDriverIdentityProps {
  detailPosition?: string;
  driver: GrandPrixDetailDriver;
  showTeamName?: boolean;
  variant?: 'default' | 'detail' | 'mobileRow';
}

export function SessionDriverIdentity({
  detailPosition,
  driver,
  showTeamName = false,
  variant = 'default',
}: SessionDriverIdentityProps) {
  const team = getGrandPrixDetailTeamDisplay(driver.team_image_id);
  const teamColor = getSafeTeamColor(driver.team_color);

  if (variant === 'detail') {
    return (
      <div className="min-w-0">
        <p className="truncate text-base font-bold text-grand-prix-text">
          {driver.name}
        </p>
        <p className="mt-1 truncate text-[9px] text-grand-prix-muted">
          {team.name}
          {detailPosition === undefined ? null : ` · ${detailPosition}`}
        </p>
      </div>
    );
  }

  const isMobileRow = variant === 'mobileRow';

  return (
    <div className="min-w-0">
      <div
        className={`flex min-w-0 items-center gap-2 ${isMobileRow ? 'h-10 rounded-lg px-2' : ''}`}
        style={
          isMobileRow
            ? {
                background: `linear-gradient(90deg, color-mix(in srgb, ${teamColor} 42%, transparent), color-mix(in srgb, ${teamColor} 14%, #1b222e) 58%, #1b222e)`,
              }
            : undefined
        }
      >
        <span
          className={`flex items-center justify-center font-bold text-white ${isMobileRow ? 'h-7 w-[34px] rounded-[7px] text-[8px]' : 'h-6 min-w-10 rounded px-1.5 text-[10px]'}`}
          style={{
            background: isMobileRow
              ? teamColor
              : `linear-gradient(90deg, ${teamColor}, color-mix(in srgb, ${teamColor} 35%, transparent))`,
          }}
        >
          {team.code}
        </span>
        <span
          className={`truncate font-bold text-grand-prix-text ${isMobileRow ? 'text-[11px]' : 'text-xs min-[1400px]:text-[13px]'}`}
        >
          {driver.name}
        </span>
      </div>
      {showTeamName ? (
        <p className="mt-1 truncate pl-12 text-[10px] text-grand-prix-muted">
          {team.name}
        </p>
      ) : null}
    </div>
  );
}

interface SessionTireStintsProps {
  driver: GrandPrixDetailDriver;
  compact?: boolean;
}

interface TireMark {
  color: string;
  label: string;
}

const TIRE_MARK_BY_TYPE: Record<string, TireMark> = {
  HARD: { color: '#ffffff', label: 'H' },
  MEDIUM: { color: '#ffcf4a', label: 'M' },
  SOFT: { color: '#ff2442', label: 'S' },
  INTERMEDIATE: { color: '#45c96b', label: 'I' },
  WET: { color: '#43a8ff', label: 'W' },
};

export function SessionTireStints({
  driver,
  compact = false,
}: SessionTireStintsProps) {
  const stints = getTireStintDisplays(driver.tire);

  if (stints.length === 0) {
    return <span className="text-grand-prix-muted">—</span>;
  }

  return (
    <TooltipProvider>
      <div className="flex max-w-full flex-wrap items-center gap-1">
        {stints.map((stint, index) => {
          const image = getGrandPrixTyreImage(stint.tireType);
          const tireMark =
            stint.tireType === null
              ? null
              : (TIRE_MARK_BY_TYPE[stint.tireType] ?? null);

          return (
            <Tooltip key={`${stint.tireType ?? 'unknown'}-${index}`}>
              <TooltipTrigger asChild>
                <span
                  aria-label={`${stint.tireType ?? '알 수 없는'} 타이어, ${stint.startLap}랩부터 ${stint.endLap}랩까지`}
                  className={`inline-flex items-center gap-1.5 rounded-full bg-grand-prix-deep font-semibold text-grand-prix-text ${
                    compact ? 'px-1.5 py-1 text-[11px]' : 'px-2 py-1.5 text-xs'
                  }`}
                >
                  {image === null ? (
                    <span>{stint.tireType ?? '?'}</span>
                  ) : (
                    <span
                      className={`relative inline-flex shrink-0 items-center justify-center ${compact ? 'size-5' : 'size-6'}`}
                    >
                      <img
                        alt={`${stint.tireType} 타이어`}
                        className="size-full"
                        src={image}
                      />
                      {tireMark === null ? null : (
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 flex items-center justify-center font-black leading-none ${compact ? 'text-[8px]' : 'text-[9px]'}`}
                          style={{ color: tireMark.color }}
                        >
                          {tireMark.label}
                        </span>
                      )}
                    </span>
                  )}
                  <span>{stint.lapCount}</span>
                </span>
              </TooltipTrigger>
              <TooltipContent className="w-auto max-w-[240px] px-3 py-2">
                <p className="text-xs font-semibold">
                  {stint.startLap}랩부터 {stint.endLap}랩까지 사용
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
