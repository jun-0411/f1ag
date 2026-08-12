interface TeamDisplay {
  code: string;
  color: string;
  fullName: string;
}

const TEAM_DISPLAY_BY_NAME: Record<string, TeamDisplay> = {
  Mercedes: {
    code: 'MER',
    color: '#22d3c5',
    fullName: 'MERCEDES-AMG PETRONAS',
  },
  Ferrari: { code: 'FER', color: '#ff2d46', fullName: 'SCUDERIA FERRARI' },
  McLaren: { code: 'MCL', color: '#ff8c42', fullName: 'MCLAREN' },
  'Red Bull': { code: 'RBR', color: '#4a9eff', fullName: 'RED BULL RACING' },
  'RB F1 Team': {
    code: 'RBF',
    color: '#4a9eff',
    fullName: 'RACING BULLS',
  },
  'Alpine F1 Team': {
    code: 'ALP',
    color: '#9b8afb',
    fullName: 'ALPINE',
  },
  'Haas F1 Team': { code: 'HAA', color: '#ffd24a', fullName: 'HAAS' },
  Audi: { code: 'AUD', color: '#ff2d46', fullName: 'AUDI' },
  Williams: { code: 'WIL', color: '#9b8afb', fullName: 'WILLIAMS' },
  'Aston Martin': {
    code: 'AMR',
    color: '#35d39a',
    fullName: 'ASTON MARTIN',
  },
  'Cadillac F1 Team': {
    code: 'CAD',
    color: '#697386',
    fullName: 'CADILLAC',
  },
};

const DEFAULT_TEAM_DISPLAY: TeamDisplay = {
  code: 'F1',
  color: '#697386',
  fullName: 'FORMULA 1 TEAM',
};

export const getTeamDisplay = (teamName: string): TeamDisplay =>
  TEAM_DISPLAY_BY_NAME[teamName] ?? {
    ...DEFAULT_TEAM_DISPLAY,
    fullName: teamName.toUpperCase(),
  };
