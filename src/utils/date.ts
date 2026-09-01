const KOREA_TIME_ZONE = 'Asia/Seoul';

const parseApiDate = (date: string): Date => {
  const hasTimeZone = /(?:z|[+-]\d{2}:?\d{2})$/i.test(date);
  return new Date(hasTimeZone ? date : `${date}Z`);
};

const getDatePart = (
  dateParts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes
): string => dateParts.find((part) => part.type === type)?.value ?? '';

export const formatGrandPrixDate = (date: string | null): string => {
  if (date === null) {
    return '일정 미정';
  }

  const parsedDate = parseApiDate(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  const dateParts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: KOREA_TIME_ZONE,
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(parsedDate);
  return `${getDatePart(dateParts, 'month')} ${getDatePart(dateParts, 'day')} · ${getDatePart(dateParts, 'hour')}:${getDatePart(dateParts, 'minute')} KST`;
};

export interface GrandPrixSessionDateTime {
  dayKey: string;
  dateLabel: string;
  weekdayLabel: string;
  weekdayShortLabel: string;
  timeLabel: string;
}

export const getBrowserTimeZone = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || KOREA_TIME_ZONE;

export const formatGrandPrixTimeZoneName = (
  timeZone: string,
  referenceDate: string | null
): string => {
  const parsedReferenceDate =
    referenceDate === null ? new Date() : parseApiDate(referenceDate);
  const validReferenceDate = Number.isNaN(parsedReferenceDate.getTime())
    ? new Date()
    : parsedReferenceDate;
  const timeZoneName = new Intl.DateTimeFormat('ko-KR', {
    timeZone,
    timeZoneName: 'long',
  })
    .formatToParts(validReferenceDate)
    .find((part) => part.type === 'timeZoneName')?.value;

  return timeZoneName ?? timeZone;
};

export const formatGrandPrixSessionDateTime = (
  date: string | null,
  timeZone: string
): GrandPrixSessionDateTime | null => {
  if (date === null) {
    return null;
  }

  const parsedDate = parseApiDate(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  const dateParts = new Intl.DateTimeFormat('ko-KR', {
    timeZone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).formatToParts(parsedDate);
  const shortWeekdayParts = new Intl.DateTimeFormat('ko-KR', {
    timeZone,
    weekday: 'short',
  }).formatToParts(parsedDate);
  const timeParts = new Intl.DateTimeFormat('ko-KR', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(parsedDate);
  const year = getDatePart(dateParts, 'year');
  const month = getDatePart(dateParts, 'month');
  const day = getDatePart(dateParts, 'day');

  return {
    dayKey: `${year}-${month}-${day}`,
    dateLabel: `${month} ${day}`,
    weekdayLabel: getDatePart(dateParts, 'weekday'),
    weekdayShortLabel: getDatePart(shortWeekdayParts, 'weekday').replace(
      '요일',
      ''
    ),
    timeLabel: `${getDatePart(timeParts, 'dayPeriod')} ${getDatePart(timeParts, 'hour')}:${getDatePart(timeParts, 'minute')}`,
  };
};

export const formatGrandPrixSessionOffsetTime = (
  date: string | null,
  offsetMinutes: number,
  timeZone: string
): string => {
  if (date === null) {
    return '미정';
  }

  const parsedDate = parseApiDate(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return '미정';
  }

  parsedDate.setUTCMinutes(parsedDate.getUTCMinutes() + offsetMinutes);

  return new Intl.DateTimeFormat('ko-KR', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(parsedDate);
};
