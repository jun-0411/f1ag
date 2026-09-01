export interface MediaMockItem {
  accentColor: string;
  backgroundColor: string;
  label: string;
}

export const mediaMockById: Record<number, MediaMockItem> = {
  1: {
    accentColor: '#bc002d',
    backgroundColor: '#ffffff',
    label: 'JP',
  },
  4: {
    accentColor: '#00a19c',
    backgroundColor: '#18202b',
    label: 'KIMI ANTONELLI',
  },
  10: {
    accentColor: '#ff2442',
    backgroundColor: '#21171b',
    label: 'CHARLES LECLERC',
  },
  13: {
    accentColor: '#ff2442',
    backgroundColor: '#21171b',
    label: 'LEWIS HAMILTON',
  },
  19: {
    accentColor: '#00a19c',
    backgroundColor: '#18202b',
    label: 'GEORGE RUSSELL',
  },
  36: {
    accentColor: '#ff2442',
    backgroundColor: '#151b25',
    label: 'SUZUKA CIRCUIT',
  },
  42: {
    accentColor: '#a970ff',
    backgroundColor: '#151b25',
    label: 'SILVERSTONE CIRCUIT',
  },
};
