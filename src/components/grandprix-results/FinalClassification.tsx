import { Button } from '@/components/ui/button';
import { getTeamDisplay } from '@/constants/teams';
import type { GrandPrixResultDriver } from '@/types/grandprix';
import { cn } from '@/utils/cn';
import {
  formatPoints,
  formatRaceTime,
  getRankChangeDisplay,
} from '@/utils/grandPrixResult';
import { ArrowRight, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FinalClassificationProps {
  drivers: GrandPrixResultDriver[];
  isSprint: boolean;
}

type ResultView = 'race' | 'sprint';

export default function FinalClassification({
  drivers,
  isSprint,
}: FinalClassificationProps) {
  const [resultView, setResultView] = useState<ResultView>('race');
  const [isExpanded, setIsExpanded] = useState(false);
  const initialVisibleCount = Math.ceil(drivers.length / 2);
  const mobileDrivers = isExpanded
    ? drivers
    : drivers.slice(0, initialVisibleCount);

  return (
    <section className="min-w-0 min-[1400px]:rounded-[22px] min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-bold text-grand-prix-primary uppercase min-[1400px]:text-[11px]">
            Final Classification
          </p>
          <h2 className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:text-2xl">
            경기 결과
          </h2>
        </div>

        {isSprint ? (
          <div
            aria-label="결과 세션 선택"
            className="flex h-[34px] overflow-hidden rounded-[10px] border border-grand-prix-border bg-grand-prix-row"
            role="group"
          >
            {(['race', 'sprint'] as const).map((view) => {
              const isActive = resultView === view;

              return (
                <Button
                  aria-pressed={isActive}
                  className={cn(
                    'h-8 w-[78px] rounded-[9px] px-2 text-[11px] font-bold shadow-none',
                    isActive
                      ? 'bg-grand-prix-active text-grand-prix-primary hover:bg-grand-prix-active'
                      : 'text-grand-prix-muted hover:bg-grand-prix-row hover:text-grand-prix-text'
                  )}
                  key={view}
                  onClick={() => setResultView(view)}
                  type="button"
                  variant="ghost"
                >
                  {view === 'race' ? '레이스' : '스프린트'}
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>

      {resultView === 'sprint' ? (
        <div className="mt-5 flex min-h-64 items-center justify-center rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-6 text-center text-sm text-grand-prix-muted-mobile min-[1400px]:min-h-[760px] min-[1400px]:border-0 min-[1400px]:bg-grand-prix-row/40">
          스프린트 결과는 추후 추가될 예정입니다.
        </div>
      ) : (
        <>
          <DesktopResultTable drivers={drivers} />
          <div
            className="mt-4 space-y-[6px] min-[1400px]:hidden"
            id="mobile-grand-prix-results"
          >
            {mobileDrivers.map((driver, index) => (
              <MobileResultRow
                driver={driver}
                key={driver.driver_id}
                position={index + 1}
              />
            ))}
          </div>

          {drivers.length > initialVisibleCount ? (
            <Button
              aria-controls="mobile-grand-prix-results"
              aria-expanded={isExpanded}
              className="mt-4 h-11 w-full rounded-[11px] border border-grand-prix-border-mobile bg-grand-prix-row text-[11px] font-bold text-grand-prix-text shadow-none hover:bg-grand-prix-border-mobile min-[1400px]:hidden"
              onClick={() => setIsExpanded((current) => !current)}
              type="button"
              variant="outline"
            >
              {isExpanded ? '결과 접기' : `전체 ${drivers.length}명 결과 보기`}
              {isExpanded ? (
                <ChevronUp
                  aria-hidden="true"
                  className="ml-auto size-4 text-grand-prix-primary"
                />
              ) : (
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto size-4 text-grand-prix-primary"
                />
              )}
            </Button>
          ) : null}
        </>
      )}
    </section>
  );
}

interface ResultListProps {
  drivers: GrandPrixResultDriver[];
}

function DesktopResultTable({ drivers }: ResultListProps) {
  return (
    <div className="mt-6 hidden min-[1400px]:block">
      <table className="w-full table-fixed text-left">
        <caption className="sr-only">레이스 최종 순위</caption>
        <colgroup>
          <col className="w-[44px]" />
          <col className="w-[44px]" />
          <col />
          <col className="w-[112px]" />
          <col className="w-[48px]" />
          <col className="w-[48px]" />
        </colgroup>
        <thead className="border-b border-grand-prix-border text-[10px] text-grand-prix-muted">
          <tr>
            <th className="pb-3 font-bold">순위</th>
            <th className="pb-3 font-bold">팀</th>
            <th className="pb-3 font-bold">선수</th>
            <th className="pb-3 font-bold">기록</th>
            <th className="pb-3 text-center font-bold">PTS</th>
            <th className="pb-3 text-center font-bold">변동</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => {
            const position = index + 1;
            const team = getTeamDisplay(driver.teamname);
            const rankChange = getRankChangeDisplay(driver.rank_change);

            return (
              <tr
                className="h-10 odd:bg-grand-prix-row even:bg-grand-prix-card"
                key={driver.driver_id}
              >
                <td
                  className={cn(
                    'rounded-l-[9px] pl-2 text-xs font-bold',
                    position <= 3
                      ? 'text-grand-prix-primary'
                      : 'text-grand-prix-text'
                  )}
                >
                  {position}
                </td>
                <td>
                  <span
                    className="flex size-[30px] items-center justify-center rounded-lg text-[9px] font-bold text-white"
                    style={{ backgroundColor: team.color }}
                  >
                    {team.code}
                  </span>
                </td>
                <td className="truncate pr-2 text-xs font-bold text-grand-prix-text">
                  {driver.name}
                </td>
                <td className="truncate pr-2 text-[11px] font-bold text-grand-prix-text">
                  {formatRaceTime(driver.racetime, position)}
                </td>
                <td className="text-center text-[11px] font-bold text-grand-prix-text">
                  {formatPoints(driver.points)}
                </td>
                <td
                  className={cn(
                    'rounded-r-[9px] text-center text-[11px] font-bold',
                    rankChange.tone === 'positive' && 'text-[#36d399]',
                    rankChange.tone === 'negative' && 'text-grand-prix-primary',
                    rankChange.tone === 'neutral' && 'text-grand-prix-muted'
                  )}
                >
                  {rankChange.label}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface MobileResultRowProps {
  driver: GrandPrixResultDriver;
  position: number;
}

function MobileResultRow({ driver, position }: MobileResultRowProps) {
  const team = getTeamDisplay(driver.teamname);

  return (
    <article className="grid h-14 grid-cols-[25px_minmax(0,1fr)_82px_30px] items-center rounded-[13px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-2">
      <p
        className={cn(
          'text-xs font-bold',
          position <= 3 ? 'text-grand-prix-primary' : 'text-grand-prix-text'
        )}
      >
        {position}
      </p>
      <div
        className="flex h-10 min-w-0 items-center gap-2 rounded-lg px-2"
        style={{
          background: `linear-gradient(90deg, ${team.color}6b 0%, ${team.color}24 58%, #1b222e 100%)`,
        }}
      >
        <span
          className="flex h-[26px] w-[34px] shrink-0 items-center justify-center rounded-[7px] text-[8px] font-bold text-white"
          style={{ backgroundColor: team.color }}
        >
          {team.code}
        </span>
        <h3 className="truncate text-[11px] font-bold text-grand-prix-text">
          {driver.name}
        </h3>
      </div>
      <p className="truncate pl-2 text-[10px] font-bold text-grand-prix-muted-mobile">
        {formatRaceTime(driver.racetime, position)}
      </p>
      <p
        className={cn(
          'text-right text-xs font-bold',
          driver.points === null ? 'text-grand-prix-muted' : 'text-[#36d399]'
        )}
      >
        {formatPoints(driver.points)}
      </p>
    </article>
  );
}
