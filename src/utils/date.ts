const KOREA_TIME_ZONE = 'Asia/Seoul';

const parseApiDate = (date: string): Date => {
  const hasTimeZone = /(?:z|[+-]\d{2}:?\d{2})$/i.test(date);
  return new Date(hasTimeZone ? date : `${date}Z`);
};

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
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    dateParts.find((part) => part.type === type)?.value ?? '';

  return `${getPart('month')} ${getPart('day')} · ${getPart('hour')}:${getPart('minute')} KST`;
};
