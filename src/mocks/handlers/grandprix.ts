import {
  GRAND_PRIX_MOCK_SEASON,
  grandPrixListMock,
} from '@/mocks/db/grandprix';
import type { ApiErrorResponse } from '@/types/api';
import { http, HttpResponse } from 'msw';

const MIN_SEASON = 1950;
const MAX_SEASON = 2100;

const createSeasonValidationError = (
  input: string,
  type: string,
  message: string,
  ctx?: Record<string, unknown>
): ApiErrorResponse => ({
  detail: [
    {
      type,
      loc: ['query', 'season'],
      msg: message,
      input,
      ctx,
    },
  ],
});

export const grandPrixHandlers = [
  http.get('*/api/grandprix', ({ request }) => {
    const requestUrl = new URL(request.url);
    const seasonParameter = requestUrl.searchParams.get('season');

    if (seasonParameter !== null && !/^[+-]?\d+$/.test(seasonParameter)) {
      return HttpResponse.json<ApiErrorResponse>(
        createSeasonValidationError(
          seasonParameter,
          'int_parsing',
          'Input should be a valid integer, unable to parse string as an integer'
        ),
        { status: 422 }
      );
    }

    const season =
      seasonParameter === null
        ? GRAND_PRIX_MOCK_SEASON
        : Number(seasonParameter);

    if (season < MIN_SEASON) {
      return HttpResponse.json<ApiErrorResponse>(
        createSeasonValidationError(
          seasonParameter ?? '',
          'greater_than_equal',
          `Input should be greater than or equal to ${MIN_SEASON}`,
          { ge: MIN_SEASON }
        ),
        { status: 422 }
      );
    }

    if (season > MAX_SEASON) {
      return HttpResponse.json<ApiErrorResponse>(
        createSeasonValidationError(
          seasonParameter ?? '',
          'less_than_equal',
          `Input should be less than or equal to ${MAX_SEASON}`,
          { le: MAX_SEASON }
        ),
        { status: 422 }
      );
    }

    if (season !== GRAND_PRIX_MOCK_SEASON) {
      // OpenAPI에 빠진 데이터 없음 정책도 실제 서버의 404 응답과 동일하게 흉내 낸다.
      return HttpResponse.json<ApiErrorResponse>(
        { detail: `Season ${season} not found` },
        { status: 404 }
      );
    }

    return HttpResponse.json(grandPrixListMock);
  }),
];
