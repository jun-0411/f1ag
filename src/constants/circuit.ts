interface CircuitDisplay {
  koreanName: string;
  countryCode: string | null;
  location: string | null;
}

const CIRCUIT_DISPLAY_BY_ENGLISH_NAME: Record<string, CircuitDisplay> = {
  'Autodromo Nazionale di Monza': {
    koreanName: '몬차 서킷',
    countryCode: 'IT',
    location: 'Monza, Italy',
  },
  'Circuit de Spa-Francorchamps': {
    koreanName: '스파-프랑코샹 서킷',
    countryCode: 'BE',
    location: 'Stavelot, Belgium',
  },
  'Circuit Park Zandvoort': {
    koreanName: '잔드보르트 서킷',
    countryCode: 'NL',
    location: 'Zandvoort, Netherlands',
  },
  Hungaroring: {
    koreanName: '헝가로링',
    countryCode: 'HU',
    location: 'Mogyoród, Hungary',
  },
  'Red Bull Ring': {
    koreanName: '레드불 링',
    countryCode: 'AT',
    location: 'Spielberg, Austria',
  },
  'Silverstone Circuit': {
    koreanName: '실버스톤 서킷',
    countryCode: 'GB',
    location: 'Silverstone, United Kingdom',
  },
  'Suzuka Circuit': {
    koreanName: '스즈카 서킷',
    countryCode: 'JP',
    location: 'Suzuka, Japan',
  },
};

export const getCircuitKoreanName = (
  englishName: string,
  apiKoreanName: string | null
): string =>
  apiKoreanName ??
  CIRCUIT_DISPLAY_BY_ENGLISH_NAME[englishName]?.koreanName ??
  englishName;

export const getCircuitCountryCode = (englishName: string): string | null =>
  CIRCUIT_DISPLAY_BY_ENGLISH_NAME[englishName]?.countryCode ?? null;

export const getCircuitLocation = (
  englishName: string,
  apiLocation: string | null
): string =>
  apiLocation ??
  CIRCUIT_DISPLAY_BY_ENGLISH_NAME[englishName]?.location ??
  '위치 정보 없음';
