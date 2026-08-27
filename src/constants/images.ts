const WINNER_IMAGE_BY_DRIVER_ID: Partial<Record<number, string>> = {
  3: '/assets/home/winner-kimi-antonelli.jpg',
};

const DEFAULT_WINNER_IMAGE = '/assets/home/winner-kimi-antonelli.jpg';
const NATION_FLAG_IMAGE_BY_CODE: Record<string, string> = {
  AE: '/assets/flags/ae.png',
  AT: '/assets/flags/at.png',
  AU: '/assets/flags/au.png',
  AZ: '/assets/flags/az.png',
  BE: '/assets/flags/be.png',
  BH: '/assets/flags/bh.png',
  BR: '/assets/flags/br.png',
  CA: '/assets/flags/ca.png',
  CN: '/assets/flags/cn.png',
  ES: '/assets/flags/es.png',
  GB: '/assets/flags/gb.png',
  HU: '/assets/flags/hu.png',
  IT: '/assets/flags/it.png',
  JP: '/assets/flags/jp.png',
  MC: '/assets/flags/mc.png',
  MX: '/assets/flags/mx.png',
  NL: '/assets/flags/nl.png',
  QA: '/assets/flags/qa.png',
  SG: '/assets/flags/sg.png',
  US: '/assets/flags/us.png',
};

const GRAND_PRIX_TYRE_IMAGE_BY_TYPE: Record<string, string> = {
  HARD: '/assets/grandprix-overview/tyre-hard.svg',
  MEDIUM: '/assets/grandprix-overview/tyre-medium.svg',
  SOFT: '/assets/grandprix-overview/tyre-soft.svg',
  INTERMEDIATE: '/assets/grandprix-overview/tyre-intermediate.svg',
  WET: '/assets/grandprix-overview/tyre-wet.svg',
};

const CIRCUIT_IMAGE_BY_ID: Partial<Record<number, string>> = {
  18: '/assets/grandprix-overview/silverstone-circuit.svg',
};

const DRIVER_OF_THE_DAY_IMAGE_BY_DRIVER_ID: Partial<Record<number, string>> = {
  15: '/assets/grandprix-results/driver-of-the-day-lewis-hamilton.jpg',
};

export const getWinnerImage = (driverId: number | null): string => {
  if (driverId === null) {
    return DEFAULT_WINNER_IMAGE;
  }

  // 이미지 조회 API가 준비되기 전까지만 Figma 원본을 임시 매핑한다.
  return WINNER_IMAGE_BY_DRIVER_ID[driverId] ?? DEFAULT_WINNER_IMAGE;
};

export const getNationFlagImage = (countryCode: string): string | null =>
  NATION_FLAG_IMAGE_BY_CODE[countryCode] ?? null;

export const getGrandPrixTyreImage = (
  tireType: string | null
): string | null =>
  tireType === null
    ? null
    : (GRAND_PRIX_TYRE_IMAGE_BY_TYPE[tireType.toUpperCase()] ?? null);

export const getCircuitImage = (circuitId: number): string | null =>
  CIRCUIT_IMAGE_BY_ID[circuitId] ?? null;

export const getDriverOfTheDayImage = (driverId: number): string | null =>
  // 이미지 조회 API가 준비되기 전까지만 Figma 원본을 임시 매핑한다.
  DRIVER_OF_THE_DAY_IMAGE_BY_DRIVER_ID[driverId] ?? null;
