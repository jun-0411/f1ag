interface DriverNameParts {
  firstName: string;
  lastName: string;
}

interface RankChangeDisplay {
  label: string;
  tone: 'positive' | 'negative' | 'neutral';
}

const RACE_STATUS_RESULTS = new Set(['DNF', 'DNS', 'DNQ', 'DSQ']);

export const getDriverInitials = (name: string): string => {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);

  if (nameParts.length === 0) {
    return '—';
  }

  return nameParts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
};

export const splitDriverName = (name: string): DriverNameParts => {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const lastName = nameParts.pop() ?? name;

  return {
    firstName: nameParts.join(' '),
    lastName,
  };
};

export const formatRaceTime = (
  raceTime: string | null,
  position: number | null
): string => {
  if (raceTime === null || raceTime.trim() === '') {
    // 기록이 없는 경우 상태명을 임의로 만들지 않고 빈 기록으로만 표시한다.
    return '—';
  }

  if (position === 1 || /^[+−-]|LAP|DNF|DNS|DSQ/i.test(raceTime)) {
    return raceTime;
  }

  if (!raceTime.startsWith('0:')) {
    return raceTime;
  }

  const gap = raceTime.slice(2).replace(/^0(?=\d\.)/, '');

  return `+${gap}`;
};

export const getPositionLabel = (position: number | null): string =>
  position === null ? 'NC' : String(position);

export const isRaceStatusResult = (raceTime: string | null): boolean =>
  raceTime !== null && RACE_STATUS_RESULTS.has(raceTime.trim().toUpperCase());

export const isUnfinishedResult = (raceTime: string | null): boolean => {
  if (raceTime === null) {
    // 백엔드가 기록을 제공하지 않은 결과도 미완주와 같은 흐림 상태로 표시한다.
    return true;
  }

  return isRaceStatusResult(raceTime);
};

export const formatPoints = (points: number | null): string => {
  if (points === null) {
    return '—';
  }

  return String(points);
};

export const getRankChangeDisplay = (rankChange: number): RankChangeDisplay => {
  if (rankChange > 0) {
    return { label: `↑${rankChange}`, tone: 'positive' };
  }

  if (rankChange < 0) {
    return { label: `↓${Math.abs(rankChange)}`, tone: 'negative' };
  }

  return { label: '—', tone: 'neutral' };
};
