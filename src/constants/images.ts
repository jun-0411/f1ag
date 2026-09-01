const GRAND_PRIX_TYRE_IMAGE_BY_TYPE: Record<string, string> = {
  HARD: '/assets/grandprix-overview/tyre-hard.svg',
  MEDIUM: '/assets/grandprix-overview/tyre-medium.svg',
  SOFT: '/assets/grandprix-overview/tyre-soft.svg',
  INTERMEDIATE: '/assets/grandprix-overview/tyre-intermediate.svg',
  WET: '/assets/grandprix-overview/tyre-wet.svg',
};

export const getGrandPrixTyreImage = (
  tireType: string | null
): string | null =>
  tireType === null
    ? null
    : (GRAND_PRIX_TYRE_IMAGE_BY_TYPE[tireType.toUpperCase()] ?? null);
