interface DriverNameParts {
  firstName: string;
  lastName: string;
}

interface RankChangeDisplay {
  label: string;
  tone: 'positive' | 'negative' | 'neutral';
}

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
  position: number
): string => {
  if (raceTime === null || raceTime.trim() === '') {
    // 완주 상태 필드가 추가되기 전에는 null만으로 DNF·DNS·실격을 추정하지 않는다.
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
