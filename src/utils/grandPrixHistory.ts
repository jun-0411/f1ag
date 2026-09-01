import { getTeamDisplay } from '@/constants/teams';
import type {
  GrandPrixHistoryDriver,
  GrandPrixHistoryFlag,
  GrandPrixHistoryLap,
  GrandPrixHistoryTireStint,
} from '@/types/grandprix';

export type RaceHistoryMetric = 'position' | 'laptime' | 'gaptime';

interface RaceHistoryChartPoint {
  [key: string]: number | null;
  lap: number;
}

interface RaceHistoryFlagRange {
  endLap: number;
  label: string;
  startLap: number;
  type: 'red' | 'safety';
}

interface TireDisplay {
  color: string;
  label: string;
  shortLabel: string;
}

const HEX_COLOR_PATTERN = /^#[\da-f]{6}$/i;

const TIRE_DISPLAY_BY_TYPE: Record<string, TireDisplay> = {
  SOFT: { color: '#ff2442', label: 'SOFT', shortLabel: 'S' },
  MEDIUM: { color: '#ffd24a', label: 'MEDIUM', shortLabel: 'M' },
  HARD: { color: '#f5f7fa', label: 'HARD', shortLabel: 'H' },
  INTERMEDIATE: { color: '#35d39a', label: 'INTER', shortLabel: 'I' },
  INTER: { color: '#35d39a', label: 'INTER', shortLabel: 'I' },
  WET: { color: '#4ca7ff', label: 'WET', shortLabel: 'W' },
};

export const getHistoryDriverDataKey = (driverId: number): string =>
  `driver-${driverId}`;

export const getHistoryDriverColor = (
  driver: GrandPrixHistoryDriver
): string =>
  driver.driver_color !== null && HEX_COLOR_PATTERN.test(driver.driver_color)
    ? driver.driver_color
    : getTeamDisplay(driver.team).color;

export const getTireDisplay = (tireType: string | null): TireDisplay =>
  tireType === null
    ? { color: '#6f7a8d', label: 'UNKNOWN', shortLabel: '?' }
    : (TIRE_DISPLAY_BY_TYPE[tireType.toUpperCase()] ?? {
        color: '#6f7a8d',
        label: tireType.toUpperCase(),
        shortLabel: '?',
      });

const parseLapTime = (lapTime: string | null): number | null => {
  if (lapTime === null) {
    return null;
  }

  const match = /^(\d+):(\d{2})\.(\d{1,3})$/.exec(lapTime.trim());
  if (match === null) {
    return null;
  }

  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  const milliseconds = Number(match[3].padEnd(3, '0'));

  if (seconds >= 60) {
    return null;
  }

  return minutes * 60 + seconds + milliseconds / 1000;
};

const formatLapTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  return `${minutes}:${seconds.toFixed(3).padStart(6, '0')}`;
};

export const formatHistoryMetricValue = (
  metric: RaceHistoryMetric,
  value: number
): string => {
  if (metric === 'position') {
    return `P${Math.round(value)}`;
  }

  if (metric === 'laptime') {
    return formatLapTime(value);
  }

  return value === 0 ? 'LEADER' : `+${value.toFixed(3)}s`;
};

const getHistoryLapMetricValue = (
  lap: GrandPrixHistoryLap,
  metric: RaceHistoryMetric
): number | null => {
  if (metric === 'position') {
    return lap.position;
  }

  if (metric === 'laptime') {
    return parseLapTime(lap.laptime);
  }

  return lap.gaptime;
};

export const getHistoryMaxLap = (drivers: GrandPrixHistoryDriver[]): number =>
  drivers.reduce(
    (maximum, driver) =>
      driver.laps.reduce(
        (driverMaximum, lap) => Math.max(driverMaximum, lap.lap_number),
        maximum
      ),
    0
  );

export const createHistoryChartData = (
  drivers: GrandPrixHistoryDriver[],
  metric: RaceHistoryMetric
): RaceHistoryChartPoint[] => {
  const maximumLap = getHistoryMaxLap(drivers);
  const lapValuesByDriver = new Map(
    drivers.map((driver) => [
      driver.driver_id,
      new Map(
        driver.laps.map((lap) => [
          lap.lap_number,
          getHistoryLapMetricValue(lap, metric),
        ])
      ),
    ])
  );

  return Array.from({ length: maximumLap }, (_, index) => {
    const lap = index + 1;
    const point: RaceHistoryChartPoint = { lap };

    for (const driver of drivers) {
      point[getHistoryDriverDataKey(driver.driver_id)] =
        lapValuesByDriver.get(driver.driver_id)?.get(lap) ?? null;
    }

    return point;
  });
};

export const hasHistoryMetricData = (
  chartData: RaceHistoryChartPoint[],
  selectedDriverIds: Set<number>
): boolean =>
  chartData.some((point) =>
    [...selectedDriverIds].some(
      (driverId) => point[getHistoryDriverDataKey(driverId)] !== null
    )
  );

export const getHistoryMaxPosition = (
  drivers: GrandPrixHistoryDriver[]
): number =>
  Math.max(
    drivers.length,
    ...drivers.flatMap((driver) =>
      driver.laps.flatMap((lap) =>
        lap.position === null ? [] : [lap.position]
      )
    )
  );

export const findTireStint = (
  driver: GrandPrixHistoryDriver,
  lapNumber: number
): GrandPrixHistoryTireStint | null =>
  driver.tire.find(
    (stint) => stint.startlap <= lapNumber && lapNumber <= stint.endlap
  ) ?? null;

export const getTireStintMetricValue = (
  driver: GrandPrixHistoryDriver,
  stint: GrandPrixHistoryTireStint,
  metric: RaceHistoryMetric
): number | null => {
  const lap = driver.laps.find(
    (driverLap) => driverLap.lap_number === stint.startlap
  );

  return lap === undefined ? null : getHistoryLapMetricValue(lap, metric);
};

export const normalizeHistoryFlags = (
  flags: GrandPrixHistoryFlag[],
  maximumLap: number
): RaceHistoryFlagRange[] => {
  if (maximumLap < 1) {
    return [];
  }

  const ranges = flags.flatMap<RaceHistoryFlagRange>((flag) => {
    if (flag.startlap === null) {
      return [];
    }

    const type =
      flag.flag_type === 'RED_FLAG'
        ? 'red'
        : flag.flag_type === 'SAFETY_CAR' || flag.flag_type === 'VSC'
          ? 'safety'
          : null;

    if (type === null) {
      return [];
    }

    const startLap = Math.max(1, flag.startlap);
    const endLap = Math.min(maximumLap, flag.endlap ?? maximumLap);
    if (startLap > endLap) {
      return [];
    }

    return [
      {
        type,
        startLap,
        endLap,
        label: type === 'red' ? 'RED FLAG' : 'SAFETY CAR / VSC',
      },
    ];
  });

  return ranges
    .sort((left, right) =>
      left.type === right.type
        ? left.startLap - right.startLap
        : left.type === 'safety'
          ? -1
          : 1
    )
    .reduce<RaceHistoryFlagRange[]>((merged, range) => {
      const previous = merged.at(-1);

      if (
        previous !== undefined &&
        previous.type === range.type &&
        range.startLap <= previous.endLap + 1
      ) {
        previous.endLap = Math.max(previous.endLap, range.endLap);
        return merged;
      }

      merged.push({ ...range });
      return merged;
    }, []);
};
