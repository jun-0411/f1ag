import type {
  GrandPrixDetailDriver,
  GrandPrixDetailTireStint,
} from '@/types/grandprix';

interface SessionBestMetrics {
  fastestlap: number | null;
  theoreticalLap: number | null;
  sector1: number | null;
  sector2: number | null;
  sector3: number | null;
  speedtrap: number | null;
}

interface TireStintDisplay {
  endLap: number;
  tireType: string | null;
  lapCount: number;
  startLap: number;
}

const parseLapTime = (time: string | null): number | null => {
  if (time === null || time.trim() === '') {
    return null;
  }

  const parts = time.trim().split(':').map(Number);
  if (parts.some((part) => !Number.isFinite(part) || part < 0)) {
    return null;
  }

  return parts.reduce((total, part) => total * 60 + part, 0);
};

const getMinimumTime = (
  drivers: GrandPrixDetailDriver[],
  selectTime: (driver: GrandPrixDetailDriver) => string | null
): number | null => {
  const times = drivers
    .map((driver) => parseLapTime(selectTime(driver)))
    .filter((time): time is number => time !== null);

  return times.length === 0 ? null : Math.min(...times);
};

export const getSessionBestMetrics = (
  drivers: GrandPrixDetailDriver[]
): SessionBestMetrics => {
  const speeds = drivers
    .map((driver) => driver.speedtrap)
    .filter(
      (speed): speed is number => speed !== null && Number.isFinite(speed)
    );

  return {
    fastestlap: getMinimumTime(drivers, (driver) => driver.fastestlap),
    theoreticalLap: getMinimumTime(
      drivers,
      (driver) => driver.theoretical_lap_time
    ),
    sector1: getMinimumTime(drivers, (driver) => driver.sector1_time),
    sector2: getMinimumTime(drivers, (driver) => driver.sector2_time),
    sector3: getMinimumTime(drivers, (driver) => driver.sector3_time),
    speedtrap: speeds.length === 0 ? null : Math.max(...speeds),
  };
};

export const getFastestDriver = (
  drivers: GrandPrixDetailDriver[]
): GrandPrixDetailDriver | null => {
  const fastest = drivers.reduce<{
    driver: GrandPrixDetailDriver;
    time: number;
  } | null>((current, driver) => {
    const time = parseLapTime(driver.fastestlap);
    if (time === null || (current !== null && time >= current.time)) {
      return current;
    }

    return { driver, time };
  }, null);

  return fastest?.driver ?? null;
};

export const isBestTime = (
  time: string | null,
  bestTime: number | null
): boolean => {
  const parsedTime = parseLapTime(time);
  return parsedTime !== null && bestTime !== null && parsedTime === bestTime;
};

export const formatPracticeResult = (
  lapTime: string | null,
  fastestTime: number | null
): string => {
  const parsedTime = parseLapTime(lapTime);
  if (lapTime === null || parsedTime === null || fastestTime === null) {
    return '—';
  }

  const gap = parsedTime - fastestTime;
  return Math.abs(gap) < 0.0005 ? lapTime : `+${gap.toFixed(3)}`;
};

export const formatSpeedTrap = (speed: number | null): string =>
  speed === null || !Number.isFinite(speed) ? '—' : `${speed} km/h`;

export const getSafeTeamColor = (color: string | null): string =>
  color !== null && /^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(color)
    ? color
    : '#6f7a8d';

export const getTireStintDisplays = (
  stints: GrandPrixDetailTireStint[]
): TireStintDisplay[] =>
  stints.reduce<TireStintDisplay[]>((displays, stint) => {
    const lapCount = stint.endlap - stint.startlap + 1;
    if (lapCount <= 0) {
      return displays;
    }

    const previous = displays.at(-1);
    const normalizedType = stint.tire_type?.trim().toUpperCase() ?? null;
    if (
      previous?.tireType === normalizedType &&
      previous.endLap + 1 === stint.startlap
    ) {
      previous.lapCount += lapCount;
      previous.endLap = stint.endlap;
      return displays;
    }

    displays.push({
      endLap: stint.endlap,
      tireType: normalizedType,
      lapCount,
      startLap: stint.startlap,
    });
    return displays;
  }, []);
