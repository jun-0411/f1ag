interface GrandPrixDisplay {
  koreanName: string;
  countryCode: string;
}

export const CURRENT_SEASON = 2026;

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

export const getGrandPrixDisplay = (name: string): GrandPrixDisplay =>
  GRAND_PRIX_DISPLAY_BY_NAME[name] ?? {
    koreanName: name,
    countryCode: 'GP',
  };
