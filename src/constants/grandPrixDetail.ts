interface GrandPrixTeamDisplay {
  code: string;
  name: string;
}

const GRAND_PRIX_TEAM_BY_IMAGE_ID: Record<number, GrandPrixTeamDisplay> = {
  22: { code: 'ALP', name: 'Alpine' },
  23: { code: 'AMR', name: 'Aston Martin' },
  24: { code: 'AUD', name: 'Audi' },
  25: { code: 'CAD', name: 'Cadillac' },
  26: { code: 'FER', name: 'Ferrari' },
  27: { code: 'HAA', name: 'Haas' },
  28: { code: 'MCL', name: 'McLaren' },
  29: { code: 'MER', name: 'Mercedes' },
  30: { code: 'RAC', name: 'Racing Bulls' },
  31: { code: 'RBR', name: 'Red Bull Racing' },
  32: { code: 'WIL', name: 'Williams' },
};

const UNKNOWN_TEAM: GrandPrixTeamDisplay = {
  code: 'TEAM',
  name: '팀 정보 없음',
};

export const getGrandPrixDetailTeamDisplay = (
  teamImageId: number | null
): GrandPrixTeamDisplay => {
  // detail API가 팀명·코드를 제공하기 전까지만 이미지 ID를 표시 정보의 임시 키로 사용한다.
  if (teamImageId === null) {
    return UNKNOWN_TEAM;
  }

  return GRAND_PRIX_TEAM_BY_IMAGE_ID[teamImageId] ?? UNKNOWN_TEAM;
};
