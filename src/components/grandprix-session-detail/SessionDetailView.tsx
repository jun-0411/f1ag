import MeasurementInfoTooltip from '@/components/grandprix-session-detail/MeasurementInfoTooltip';
import {
  SessionDriverIdentity,
  SessionFastestSummary,
  SessionTireStints,
} from '@/components/grandprix-session-detail/SessionDetailShared';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GRAND_PRIX_SESSION_LABELS } from '@/constants/grandPrix';
import type {
  GrandPrixDetailDriver,
  GrandPrixSessionCode,
} from '@/types/grandprix';
import {
  formatPracticeResult,
  formatSpeedTrap,
  getSessionBestMetrics,
  isBestTime,
} from '@/utils/grandPrixDetail';
import {
  formatPoints,
  formatRaceTime,
  getPositionLabel,
  isRaceStatusResult,
} from '@/utils/grandPrixResult';
import { ArrowRight } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

interface SessionDetailViewProps {
  drivers: GrandPrixDetailDriver[];
  session: GrandPrixSessionCode;
}

interface MetricValueProps {
  best: boolean;
  value: string;
}

function MetricValue({ best, value }: MetricValueProps) {
  return (
    <span
      className={best ? 'font-bold text-grand-prix-performance' : undefined}
    >
      {value}
      {best ? <span className="sr-only"> 세션 최고</span> : null}
    </span>
  );
}

const isRaceSession = (session: GrandPrixSessionCode): boolean =>
  session === 'R' || session === 'S';

export default function SessionDetailView({
  drivers,
  session,
}: SessionDetailViewProps) {
  const raceSession = isRaceSession(session);
  const label = GRAND_PRIX_SESSION_LABELS[session];

  return (
    <section className="mt-7 min-[1400px]:mt-0">
      <div className="mb-6 items-end justify-between gap-6 min-[1400px]:flex">
        <div className="mb-5 min-[1400px]:mb-0">
          <p className="text-[9px] font-bold tracking-[0.12em] text-grand-prix-primary uppercase min-[1400px]:text-[11px]">
            {raceSession
              ? `${session === 'S' ? 'Sprint' : 'Race'} session results`
              : 'Session classification'}
          </p>
          <h2 className="mt-2 text-xl font-bold text-grand-prix-text min-[1400px]:text-[32px]">
            {label} {raceSession ? '상세 결과' : '세부 결과'}
          </h2>
        </div>
        <SessionFastestSummary drivers={drivers} session={session} />
      </div>

      <div className="hidden min-[1400px]:block">
        {raceSession ? (
          <RaceDesktopTable drivers={drivers} />
        ) : (
          <PracticeDesktopTable drivers={drivers} />
        )}
      </div>
      <div className="min-[1400px]:hidden">
        <SessionMobileResults
          drivers={drivers}
          key={session}
          raceSession={raceSession}
        />
      </div>
    </section>
  );
}

interface DriverListProps {
  drivers: GrandPrixDetailDriver[];
}

function PracticeDesktopTable({ drivers }: DriverListProps) {
  const best = getSessionBestMetrics(drivers);

  return (
    <div className="overflow-hidden rounded-[20px] border border-grand-prix-border bg-grand-prix-card">
      <table className="w-full table-fixed text-left text-xs text-grand-prix-text">
        <caption className="sr-only">
          연습 및 퀄리파잉 세션 드라이버 결과
        </caption>
        <colgroup>
          <col className="w-[54px]" />
          <col className="w-[190px]" />
          <col className="w-[104px]" />
          <col className="w-[112px]" />
          <col className="w-[112px]" />
          <col className="w-[90px]" />
          <col className="w-[90px]" />
          <col className="w-[90px]" />
          <col className="w-[110px]" />
          <col />
        </colgroup>
        <thead className="h-[54px] text-[11px] text-grand-prix-muted">
          <tr>
            <th className="pl-5">등수</th>
            <th>팀·선수</th>
            <th>기록</th>
            <th>
              <MeasurementInfoTooltip measurement="fastestlap" />
            </th>
            <th>
              <MeasurementInfoTooltip measurement="theoretical" />
            </th>
            <th>
              <MeasurementInfoTooltip measurement="sector1" />
            </th>
            <th>
              <MeasurementInfoTooltip measurement="sector2" />
            </th>
            <th>
              <MeasurementInfoTooltip measurement="sector3" />
            </th>
            <th>
              <MeasurementInfoTooltip measurement="speedtrap" />
            </th>
            <th>타이어</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr
              className={index % 2 === 0 ? 'h-11 bg-grand-prix-row/55' : 'h-11'}
              key={driver.driver_id}
            >
              <td
                className={`pl-5 font-bold ${driver.position !== null && driver.position <= 3 ? 'text-grand-prix-primary' : 'text-grand-prix-text'}`}
              >
                {getPositionLabel(driver.position)}
              </td>
              <td className="pr-3">
                <SessionDriverIdentity driver={driver} />
              </td>
              <td className="font-bold text-grand-prix-text">
                {formatPracticeResult(driver.fastestlap, best.fastestlap)}
              </td>
              <td>
                <MetricValue
                  best={isBestTime(driver.fastestlap, best.fastestlap)}
                  value={driver.fastestlap ?? '—'}
                />
              </td>
              <td>
                <MetricValue
                  best={isBestTime(
                    driver.theoretical_lap_time,
                    best.theoreticalLap
                  )}
                  value={driver.theoretical_lap_time ?? '—'}
                />
              </td>
              <td>
                <MetricValue
                  best={isBestTime(driver.sector1_time, best.sector1)}
                  value={driver.sector1_time ?? '—'}
                />
              </td>
              <td>
                <MetricValue
                  best={isBestTime(driver.sector2_time, best.sector2)}
                  value={driver.sector2_time ?? '—'}
                />
              </td>
              <td>
                <MetricValue
                  best={isBestTime(driver.sector3_time, best.sector3)}
                  value={driver.sector3_time ?? '—'}
                />
              </td>
              <td>
                <MetricValue
                  best={
                    driver.speedtrap !== null &&
                    driver.speedtrap === best.speedtrap
                  }
                  value={formatSpeedTrap(driver.speedtrap)}
                />
              </td>
              <td className="pr-2">
                <SessionTireStints compact driver={driver} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RaceDesktopTable({ drivers }: DriverListProps) {
  const best = getSessionBestMetrics(drivers);

  return (
    <div className="overflow-hidden rounded-[20px] border border-grand-prix-border bg-grand-prix-card">
      <table className="w-full table-fixed text-left text-xs text-grand-prix-text">
        <caption className="sr-only">
          레이스 및 스프린트 세션 드라이버 결과
        </caption>
        <colgroup>
          <col className="w-[65px]" />
          <col className="w-[230px]" />
          <col className="w-[150px]" />
          <col className="w-[145px]" />
          <col className="w-[140px]" />
          <col className="w-[220px]" />
          <col className="w-[90px]" />
          <col />
        </colgroup>
        <thead className="h-[54px] text-[11px] text-grand-prix-muted">
          <tr>
            <th className="pl-5">등수</th>
            <th>팀·선수</th>
            <th>기록</th>
            <th>
              <MeasurementInfoTooltip measurement="fastestlap" />
            </th>
            <th>
              <MeasurementInfoTooltip measurement="speedtrap" />
            </th>
            <th>타이어</th>
            <th>랩 수</th>
            <th>포인트</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => {
            const subdued = isRaceStatusResult(driver.racetime);
            return (
              <tr
                className={`${index % 2 === 0 ? 'bg-grand-prix-row/55' : ''} h-11 ${subdued ? 'opacity-45 grayscale' : ''}`}
                key={driver.driver_id}
              >
                <td
                  className={`pl-5 font-bold ${driver.position !== null && driver.position <= 3 ? 'text-grand-prix-primary' : 'text-grand-prix-text'}`}
                >
                  {getPositionLabel(driver.position)}
                </td>
                <td className="pr-3">
                  <SessionDriverIdentity driver={driver} />
                </td>
                <td className="font-bold text-grand-prix-text">
                  {formatRaceTime(driver.racetime, driver.position)}
                </td>
                <td>
                  <MetricValue
                    best={isBestTime(driver.fastestlap, best.fastestlap)}
                    value={driver.fastestlap ?? '—'}
                  />
                </td>
                <td>
                  <MetricValue
                    best={
                      driver.speedtrap !== null &&
                      driver.speedtrap === best.speedtrap
                    }
                    value={formatSpeedTrap(driver.speedtrap)}
                  />
                </td>
                <td>
                  <SessionTireStints compact driver={driver} />
                </td>
                <td>{driver.lap_amount ?? '—'}</td>
                <td
                  className={
                    driver.points !== null && driver.points > 0
                      ? 'font-bold text-grand-prix-success'
                      : 'text-grand-prix-muted'
                  }
                >
                  {driver.points !== null && driver.points > 0
                    ? `+${driver.points}`
                    : formatPoints(driver.points)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface SessionMobileResultsProps extends DriverListProps {
  raceSession: boolean;
}

function SessionMobileResults({
  drivers,
  raceSession,
}: SessionMobileResultsProps) {
  const collapsedCount = Math.ceil(drivers.length / 2);
  const [expanded, setExpanded] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const visibleDrivers = expanded ? drivers : drivers.slice(0, collapsedCount);
  const best = useMemo(() => getSessionBestMetrics(drivers), [drivers]);
  const selectedDriver = drivers.find(
    (driver) => driver.driver_id === selectedDriverId
  );

  return (
    <div>
      <div className="grid h-11 grid-cols-[36px_minmax(0,1fr)_92px] items-center rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-3 text-[10px] font-bold text-grand-prix-muted">
        <span>순위</span>
        <span>팀·선수</span>
        <span className="text-right">기록</span>
      </div>
      <div className="mt-1.5 space-y-1.5">
        {visibleDrivers.map((driver) => {
          const subdued = raceSession && isRaceStatusResult(driver.racetime);
          return (
            <Button
              aria-haspopup="dialog"
              className={`grid h-[58px] w-full grid-cols-[36px_minmax(0,1fr)_92px] items-center rounded-xl border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-3 text-left shadow-none hover:border-grand-prix-performance/60 hover:bg-grand-prix-row ${subdued ? 'opacity-45 grayscale' : ''}`}
              key={driver.driver_id}
              onClick={() => setSelectedDriverId(driver.driver_id)}
              type="button"
              variant="ghost"
            >
              <span
                className={`self-center text-sm font-bold ${driver.position !== null && driver.position <= 3 ? 'text-grand-prix-primary' : 'text-grand-prix-text'}`}
              >
                {getPositionLabel(driver.position)}
              </span>
              <SessionDriverIdentity driver={driver} variant="mobileRow" />
              <div
                className={`truncate text-right text-[10px] font-bold ${
                  !raceSession && isBestTime(driver.fastestlap, best.fastestlap)
                    ? 'text-grand-prix-performance'
                    : 'text-grand-prix-text'
                }`}
              >
                {raceSession
                  ? formatRaceTime(driver.racetime, driver.position)
                  : formatPracticeResult(driver.fastestlap, best.fastestlap)}
              </div>
            </Button>
          );
        })}
      </div>

      {drivers.length > collapsedCount ? (
        <Button
          className="relative mt-3 h-11 w-full border-grand-prix-border-mobile bg-grand-prix-row text-[11px] font-bold text-grand-prix-text hover:bg-grand-prix-row/80"
          onClick={() => setExpanded((current) => !current)}
          type="button"
          variant="outline"
        >
          {expanded
            ? `상위 ${collapsedCount}명만 보기`
            : `전체 ${drivers.length}명 결과 보기`}
          <ArrowRight
            aria-hidden="true"
            className={`absolute right-3 size-4 text-grand-prix-primary transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </Button>
      ) : null}

      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDriverId(null);
          }
        }}
        open={selectedDriver !== undefined}
      >
        {selectedDriver === undefined ? null : (
          <DialogContent
            className="max-w-[358px] p-4"
            onOpenAutoFocus={(event) => {
              // 첫 metric 버튼에 자동 포커스되면 Tooltip까지 함께 열리므로 모달 컨테이너에 초기 포커스를 둔다.
              event.preventDefault();
              dialogContentRef.current?.focus();
            }}
            ref={dialogContentRef}
          >
            <SessionDriverDetail
              driver={selectedDriver}
              raceSession={raceSession}
              sessionDrivers={drivers}
            />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

interface SessionDriverDetailProps {
  driver: GrandPrixDetailDriver;
  raceSession: boolean;
  sessionDrivers: GrandPrixDetailDriver[];
}

function SessionDriverDetail({
  driver,
  raceSession,
  sessionDrivers,
}: SessionDriverDetailProps) {
  const best = useMemo(
    () => getSessionBestMetrics(sessionDrivers),
    [sessionDrivers]
  );

  const metrics: Array<{
    key: string;
    label: React.ReactNode;
    value: React.ReactNode;
  }> = raceSession
    ? [
        {
          key: 'fastest',
          label: <MeasurementInfoTooltip compact measurement="fastestlap" />,
          value: (
            <MetricValue
              best={isBestTime(driver.fastestlap, best.fastestlap)}
              value={driver.fastestlap ?? '—'}
            />
          ),
        },
        {
          key: 'speed',
          label: <MeasurementInfoTooltip compact measurement="speedtrap" />,
          value: (
            <MetricValue
              best={
                driver.speedtrap !== null && driver.speedtrap === best.speedtrap
              }
              value={formatSpeedTrap(driver.speedtrap)}
            />
          ),
        },
        {
          key: 'tire',
          label: '타이어 스틴트',
          value: <SessionTireStints driver={driver} />,
        },
        { key: 'laps', label: '랩 수', value: driver.lap_amount ?? '—' },
        {
          key: 'points',
          label: '포인트',
          value: (
            <span
              className={
                driver.points !== null && driver.points > 0
                  ? 'text-grand-prix-success'
                  : undefined
              }
            >
              {formatPoints(driver.points)}
            </span>
          ),
        },
      ]
    : [
        {
          key: 'fastest',
          label: <MeasurementInfoTooltip compact measurement="fastestlap" />,
          value: (
            <MetricValue
              best={isBestTime(driver.fastestlap, best.fastestlap)}
              value={driver.fastestlap ?? '—'}
            />
          ),
        },
        {
          key: 'theoretical',
          label: <MeasurementInfoTooltip compact measurement="theoretical" />,
          value: (
            <MetricValue
              best={isBestTime(
                driver.theoretical_lap_time,
                best.theoreticalLap
              )}
              value={driver.theoretical_lap_time ?? '—'}
            />
          ),
        },
        {
          key: 'sector1',
          label: <MeasurementInfoTooltip compact measurement="sector1" />,
          value: (
            <MetricValue
              best={isBestTime(driver.sector1_time, best.sector1)}
              value={driver.sector1_time ?? '—'}
            />
          ),
        },
        {
          key: 'sector2',
          label: <MeasurementInfoTooltip compact measurement="sector2" />,
          value: (
            <MetricValue
              best={isBestTime(driver.sector2_time, best.sector2)}
              value={driver.sector2_time ?? '—'}
            />
          ),
        },
        {
          key: 'sector3',
          label: <MeasurementInfoTooltip compact measurement="sector3" />,
          value: (
            <MetricValue
              best={isBestTime(driver.sector3_time, best.sector3)}
              value={driver.sector3_time ?? '—'}
            />
          ),
        },
        {
          key: 'speed',
          label: <MeasurementInfoTooltip compact measurement="speedtrap" />,
          value: (
            <MetricValue
              best={
                driver.speedtrap !== null && driver.speedtrap === best.speedtrap
              }
              value={formatSpeedTrap(driver.speedtrap)}
            />
          ),
        },
        {
          key: 'tire',
          label: '타이어 스틴트',
          value: <SessionTireStints driver={driver} />,
        },
      ];

  return (
    <article>
      <DialogHeader>
        <DialogTitle className="text-base">선수 상세</DialogTitle>
        <DialogDescription className="sr-only">
          선택한 선수의 세션 상세 기록
        </DialogDescription>
      </DialogHeader>
      <div className="mt-5">
        <SessionDriverIdentity
          detailPosition={
            raceSession
              ? driver.position === null
                ? 'NC'
                : `P${driver.position}`
              : undefined
          }
          driver={driver}
          variant="detail"
        />
      </div>
      <dl className="mt-5">
        {metrics.map((metric) => (
          <div
            className={`flex items-center justify-between gap-4 border-t border-grand-prix-border-mobile text-xs ${raceSession ? 'min-h-9' : 'min-h-10'}`}
            key={metric.key}
          >
            <dt className="text-grand-prix-muted">{metric.label}</dt>
            <dd className="min-w-0 text-right font-bold text-grand-prix-text">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-[9px] leading-4 text-grand-prix-muted">
        {raceSession
          ? '측정 항목을 누르면 기준을 확인할 수 있습니다.'
          : '항목명을 누르면 측정 기준을 확인할 수 있습니다.'}
      </p>
    </article>
  );
}
