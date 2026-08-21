import TimeZoneToggle, {
  type TimeMode,
} from '@/components/grandprix-overview/TimeZoneToggle';
import {
  GRAND_PRIX_SESSION_LABELS,
  getGrandPrixTimeZone,
  getWeekendSessionCodes,
} from '@/constants/grandPrix';
import type {
  GrandPrixScheduleItem,
  GrandPrixSessionCode,
} from '@/types/grandprix';
import {
  type GrandPrixSessionDateTime,
  formatGrandPrixSessionDateTime,
  formatGrandPrixSessionOffsetTime,
  formatGrandPrixTimeZoneName,
  getBrowserTimeZone,
} from '@/utils/date';
import { useState } from 'react';
import { Link } from 'react-router';

interface SessionScheduleProps {
  grandPrixId: number;
  grandPrixName: string;
  isSprint: boolean;
  schedule: GrandPrixScheduleItem[];
}

interface ScheduleSlot {
  code: GrandPrixSessionCode;
  item: GrandPrixScheduleItem | undefined;
  dateTime: GrandPrixSessionDateTime | null;
}

interface ScheduleGroup {
  key: string;
  dateTime: GrandPrixSessionDateTime | null;
  slots: ScheduleSlot[];
}

const createScheduleGroups = (
  schedule: GrandPrixScheduleItem[],
  isSprint: boolean,
  timeZone: string
): ScheduleGroup[] => {
  const groups: ScheduleGroup[] = [];

  for (const code of getWeekendSessionCodes(isSprint)) {
    const item = schedule.find((session) => session.session_code === code);
    const dateTime = formatGrandPrixSessionDateTime(
      item?.time ?? null,
      timeZone
    );
    const key = dateTime?.dayKey ?? 'undated';
    const existingGroup = groups.find((group) => group.key === key);
    const slot = { code, item, dateTime };

    if (existingGroup === undefined) {
      groups.push({ key, dateTime, slots: [slot] });
    } else {
      existingGroup.slots.push(slot);
    }
  }

  return groups;
};

const getSessionAccentClass = (code: GrandPrixSessionCode): string => {
  if (code === 'Q' || code === 'SQ') {
    return 'before:bg-grand-prix-warning';
  }

  if (code === 'R') {
    return 'before:bg-grand-prix-primary';
  }

  return '';
};

export default function SessionSchedule({
  grandPrixId,
  grandPrixName,
  isSprint,
  schedule,
}: SessionScheduleProps) {
  const [timeMode, setTimeMode] = useState<TimeMode>('mine');
  const [browserTimeZone] = useState(getBrowserTimeZone);
  const localTimeZone = getGrandPrixTimeZone(grandPrixName);
  const effectiveTimeMode =
    timeMode === 'local' && localTimeZone === null ? 'mine' : timeMode;
  const timeZone =
    effectiveTimeMode === 'local' && localTimeZone !== null
      ? localTimeZone
      : browserTimeZone;
  const groups = createScheduleGroups(schedule, isSprint, timeZone);
  const referenceDate =
    schedule.find((session) => session.time !== null)?.time ?? null;
  const timeZoneName = formatGrandPrixTimeZoneName(timeZone, referenceDate);

  const handleTimeModeChange = (nextTimeMode: TimeMode) => {
    setTimeMode(nextTimeMode);
  };

  return (
    <section aria-labelledby="weekend-schedule-heading">
      <div className="rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-[11px] min-[1400px]:min-h-[756px] min-[1400px]:rounded-[22px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 pt-0.5">
            <p className="text-[9px] font-bold text-grand-prix-primary min-[1400px]:text-[11px]">
              WEEKEND SCHEDULE
            </p>
            <h2
              className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:mt-2 min-[1400px]:text-[26px]"
              id="weekend-schedule-heading"
            >
              일정
            </h2>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <TimeZoneToggle
              isLocalTimeAvailable={localTimeZone !== null}
              onTimeModeChange={handleTimeModeChange}
              timeMode={effectiveTimeMode}
            />
            <p
              aria-live="polite"
              className="text-[9px] font-medium text-grand-prix-muted-mobile min-[1400px]:text-[11px] min-[1400px]:text-grand-prix-muted"
            >
              표시 기준 · {timeZoneName}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-grand-prix-border-mobile pt-4 min-[1400px]:mt-6 min-[1400px]:border-grand-prix-border min-[1400px]:pt-5">
          {groups.map((group, groupIndex) => (
            <div
              className={groupIndex === 0 ? '' : 'mt-[18px] min-[1400px]:mt-7'}
              key={group.key}
            >
              <div className="flex items-baseline gap-2.5">
                <h3 className="text-base font-bold text-grand-prix-text min-[1400px]:text-[22px]">
                  {group.dateTime?.dateLabel ?? '일정 미정'}
                </h3>
                <span className="text-[10px] font-bold text-grand-prix-muted-mobile min-[1400px]:text-[13px] min-[1400px]:text-grand-prix-muted">
                  {group.dateTime?.weekdayLabel ?? ''}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 min-[1400px]:space-y-2">
                {group.slots.map(({ code, item, dateTime }) => (
                  <Link
                    aria-label={`${GRAND_PRIX_SESSION_LABELS[code]} 상세 보기`}
                    className="group block rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grand-prix-primary"
                    key={code}
                    to={`/grandprix/${grandPrixId}/session/${code}`}
                  >
                    <div
                      className={`relative flex h-[42px] items-center justify-between rounded-[9px] bg-grand-prix-row px-3.5 text-[11px] font-bold text-grand-prix-text transition-colors before:absolute before:left-0 before:h-[26px] before:w-[3px] group-hover:bg-grand-prix-border/60 min-[1400px]:h-[58px] min-[1400px]:rounded-[10px] min-[1400px]:px-5 min-[1400px]:text-[15px] min-[1400px]:before:h-full min-[1400px]:before:w-1 ${getSessionAccentClass(code)}`}
                    >
                      <span>{GRAND_PRIX_SESSION_LABELS[code]}</span>
                      <time dateTime={item?.time ?? undefined}>
                        {dateTime?.timeLabel ?? '일정 미정'}
                      </time>
                    </div>

                    {code === 'Q' ? (
                      <div className="mx-0 mt-1.5 rounded-lg bg-grand-prix-deep px-3.5 py-2.5 transition-colors group-hover:bg-grand-prix-row min-[1400px]:mx-[22px] min-[1400px]:rounded-[10px] min-[1400px]:px-[18px] min-[1400px]:py-3">
                        <p className="text-[9px] text-grand-prix-muted-mobile min-[1400px]:text-[11px] min-[1400px]:text-grand-prix-muted">
                          Q1–Q3 예상 시작
                        </p>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] font-bold text-grand-prix-text min-[1400px]:text-xs">
                          {[0, 25, 50].map((offset, index) => (
                            <span key={offset}>
                              Q{index + 1}{' '}
                              {formatGrandPrixSessionOffsetTime(
                                item?.time ?? null,
                                offset,
                                timeZone
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
