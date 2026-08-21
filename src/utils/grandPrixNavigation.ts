import {
  GRAND_PRIX_SESSION_LABELS,
  getWeekendSessionCodes,
} from '@/constants/grandPrix';

interface GrandPrixNavigationItem {
  label: string;
  pageName: string;
  to: string;
}

export const createGrandPrixNavigationItems = (
  grandPrixId: number,
  isSprint: boolean
): GrandPrixNavigationItem[] => [
  {
    label: '개요',
    pageName: '개요',
    to: `/grandprix/${grandPrixId}`,
  },
  {
    label: '레이스 히스토리',
    pageName: '레이스 히스토리',
    to: `/grandprix/${grandPrixId}/history`,
  },
  ...getWeekendSessionCodes(isSprint).map((sessionCode) => ({
    label: `${GRAND_PRIX_SESSION_LABELS[sessionCode]} 결과`,
    pageName: `${GRAND_PRIX_SESSION_LABELS[sessionCode]} 결과`,
    to: `/grandprix/${grandPrixId}/session/${sessionCode}`,
  })),
];
