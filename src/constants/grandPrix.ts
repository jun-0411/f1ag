import type { GrandPrixSessionCode } from '@/types/grandprix';

interface GrandPrixDisplay {
  koreanName: string;
  countryCode: string;
}

export const CURRENT_SEASON = 2026;

export const GRAND_PRIX_SESSION_LABELS: Record<GrandPrixSessionCode, string> = {
  FP1: '프랙티스 1',
  FP2: '프랙티스 2',
  FP3: '프랙티스 3',
  Q: '퀄리파잉',
  SQ: '스프린트 퀄리파잉',
  S: '스프린트',
  R: '레이스',
};

const GRAND_PRIX_SESSION_CODE_SET = new Set<string>(
  Object.keys(GRAND_PRIX_SESSION_LABELS)
);

export const isGrandPrixSessionCode = (
  value: string | undefined
): value is GrandPrixSessionCode =>
  value !== undefined && GRAND_PRIX_SESSION_CODE_SET.has(value);

const SPRINT_SESSION_CODES: GrandPrixSessionCode[] = [
  'FP1',
  'SQ',
  'S',
  'Q',
  'R',
];
const STANDARD_SESSION_CODES: GrandPrixSessionCode[] = [
  'FP1',
  'FP2',
  'FP3',
  'Q',
  'R',
];

const GRAND_PRIX_DISPLAY_BY_NAME: Record<string, GrandPrixDisplay> = {
  'Australian Grand Prix': {
    koreanName: '호주 그랑프리',
    countryCode: 'AU',
  },
  'Chinese Grand Prix': {
    koreanName: '중국 그랑프리',
    countryCode: 'CN',
  },
  'Japanese Grand Prix': {
    koreanName: '일본 그랑프리',
    countryCode: 'JP',
  },
  'Miami Grand Prix': {
    koreanName: '마이애미 그랑프리',
    countryCode: 'US',
  },
  'Canadian Grand Prix': {
    koreanName: '캐나다 그랑프리',
    countryCode: 'CA',
  },
  'Monaco Grand Prix': {
    koreanName: '모나코 그랑프리',
    countryCode: 'MC',
  },
  'Barcelona Grand Prix': {
    koreanName: '바르셀로나 그랑프리',
    countryCode: 'ES',
  },
  'Austrian Grand Prix': {
    koreanName: '오스트리아 그랑프리',
    countryCode: 'AT',
  },
  'British Grand Prix': {
    koreanName: '영국 그랑프리',
    countryCode: 'GB',
  },
  'Belgian Grand Prix': {
    koreanName: '벨기에 그랑프리',
    countryCode: 'BE',
  },
  'Hungarian Grand Prix': {
    koreanName: '헝가리 그랑프리',
    countryCode: 'HU',
  },
  'Dutch Grand Prix': {
    koreanName: '네덜란드 그랑프리',
    countryCode: 'NL',
  },
  'Italian Grand Prix': {
    koreanName: '이탈리아 그랑프리',
    countryCode: 'IT',
  },
  'Spanish Grand Prix': {
    koreanName: '스페인 그랑프리',
    countryCode: 'ES',
  },
  'Azerbaijan Grand Prix': {
    koreanName: '아제르바이잔 그랑프리',
    countryCode: 'AZ',
  },
  'Bahrain Grand Prix': {
    koreanName: '바레인 그랑프리',
    countryCode: 'BH',
  },
  'Singapore Grand Prix': {
    koreanName: '싱가포르 그랑프리',
    countryCode: 'SG',
  },
  'United States Grand Prix': {
    koreanName: '미국 그랑프리',
    countryCode: 'US',
  },
  'Mexico City Grand Prix': {
    koreanName: '멕시코시티 그랑프리',
    countryCode: 'MX',
  },
  'São Paulo Grand Prix': {
    koreanName: '상파울루 그랑프리',
    countryCode: 'BR',
  },
  'Las Vegas Grand Prix': {
    koreanName: '라스베이거스 그랑프리',
    countryCode: 'US',
  },
  'Qatar Grand Prix': {
    koreanName: '카타르 그랑프리',
    countryCode: 'QA',
  },
  'Abu Dhabi Grand Prix': {
    koreanName: '아부다비 그랑프리',
    countryCode: 'AE',
  },
};

const GRAND_PRIX_TIME_ZONE_BY_NAME: Record<string, string> = {
  'Australian Grand Prix': 'Australia/Melbourne',
  'Chinese Grand Prix': 'Asia/Shanghai',
  'Japanese Grand Prix': 'Asia/Tokyo',
  'Miami Grand Prix': 'America/New_York',
  'Canadian Grand Prix': 'America/Toronto',
  'Monaco Grand Prix': 'Europe/Monaco',
  'Barcelona Grand Prix': 'Europe/Madrid',
  'Austrian Grand Prix': 'Europe/Vienna',
  'British Grand Prix': 'Europe/London',
  'Belgian Grand Prix': 'Europe/Brussels',
  'Hungarian Grand Prix': 'Europe/Budapest',
  'Dutch Grand Prix': 'Europe/Amsterdam',
  'Italian Grand Prix': 'Europe/Rome',
  'Spanish Grand Prix': 'Europe/Madrid',
  'Azerbaijan Grand Prix': 'Asia/Baku',
  'Bahrain Grand Prix': 'Asia/Bahrain',
  'Singapore Grand Prix': 'Asia/Singapore',
  'United States Grand Prix': 'America/Chicago',
  'Mexico City Grand Prix': 'America/Mexico_City',
  'São Paulo Grand Prix': 'America/Sao_Paulo',
  'Las Vegas Grand Prix': 'America/Los_Angeles',
  'Qatar Grand Prix': 'Asia/Qatar',
  'Abu Dhabi Grand Prix': 'Asia/Dubai',
};

export const getGrandPrixDisplay = (name: string): GrandPrixDisplay =>
  GRAND_PRIX_DISPLAY_BY_NAME[name] ?? {
    koreanName: name,
    countryCode: 'GP',
  };

export const getGrandPrixTimeZone = (name: string): string | null =>
  GRAND_PRIX_TIME_ZONE_BY_NAME[name] ?? null;

export const getWeekendSessionCodes = (
  isSprint: boolean
): GrandPrixSessionCode[] => [
  ...(isSprint ? SPRINT_SESSION_CODES : STANDARD_SESSION_CODES),
];
