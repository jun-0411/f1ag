import {
  GRAND_PRIX_SESSION_LABELS,
  getWeekendSessionCodes,
} from '@/constants/grandPrix';
import type {
  GrandPrixScheduleItem,
  GrandPrixWeatherItem,
} from '@/types/grandprix';
import {
  formatGrandPrixSessionDateTime,
  getBrowserTimeZone,
} from '@/utils/date';
import { CloudRain, Sun } from 'lucide-react';
import { useState } from 'react';

interface WeekendWeatherProps {
  isSprint: boolean;
  schedule: GrandPrixScheduleItem[];
  weather: GrandPrixWeatherItem[];
}

const formatTemperature = (temperature: number | null | undefined): string =>
  temperature === null || temperature === undefined
    ? '정보 없음'
    : `${Math.round(temperature)}°`;

export default function WeekendWeather({
  isSprint,
  schedule,
  weather,
}: WeekendWeatherProps) {
  const [timeZone] = useState(getBrowserTimeZone);
  const sessionCodes = getWeekendSessionCodes(isSprint);

  return (
    <section aria-labelledby="weekend-weather-heading">
      <div className="rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-[9px] min-[1400px]:min-h-[304px] min-[1400px]:rounded-[22px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-[22px]">
        <div>
          <p className="text-[9px] font-bold text-grand-prix-info min-[1400px]:text-[11px]">
            WEEKEND WEATHER
          </p>
          <h2
            className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:mt-2 min-[1400px]:text-[22px]"
            id="weekend-weather-heading"
          >
            주말 날씨
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-6">
          {sessionCodes.map((code, index) => {
            const scheduleItem = schedule.find(
              (item) => item.session_code === code
            );
            const weatherItem = weather.find(
              (item) => item.session_code === code
            );
            const dateTime = formatGrandPrixSessionDateTime(
              scheduleItem?.time ?? null,
              timeZone
            );
            const isTopRow = index < 3;
            const isRainy = weatherItem?.rainfall === true;
            const WeatherIcon = isRainy ? CloudRain : Sun;

            return (
              <div
                className={`min-h-[82px] p-[5px] min-[1400px]:min-h-[86px] ${
                  isTopRow ? 'col-span-2' : 'col-span-3 border-t'
                } ${index > 0 && index < 3 ? 'border-l' : ''} ${
                  index === 4 ? 'border-l' : ''
                } border-grand-prix-border-mobile min-[1400px]:border-grand-prix-border`}
                key={code}
              >
                <p className="text-[8px] font-bold text-grand-prix-primary min-[1400px]:text-[10px]">
                  {dateTime?.weekdayShortLabel ?? '—'}
                </p>
                <p className="mt-1 text-[9px] leading-[13px] font-bold text-grand-prix-text min-[1400px]:text-[11px] min-[1400px]:leading-4">
                  {GRAND_PRIX_SESSION_LABELS[code]}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    aria-label={isRainy ? '비' : '맑음'}
                    className={
                      isRainy
                        ? 'text-grand-prix-info'
                        : 'text-grand-prix-warning'
                    }
                    role="img"
                  >
                    <WeatherIcon
                      aria-hidden="true"
                      className="size-4 min-[1400px]:size-[18px]"
                    />
                  </span>
                  <p className="text-[17px] font-bold text-grand-prix-text min-[1400px]:text-lg">
                    {formatTemperature(weatherItem?.temperature)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
