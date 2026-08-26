import {
  GRAND_PRIX_MOCK_SEASON,
  grandPrixDetailMockById,
  grandPrixListMock,
  grandPrixOverviewMockById,
  grandPrixResultMockById,
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

const createGrandPrixIdValidationError = (input: string): ApiErrorResponse => ({
  detail: [
    {
      type: 'int_parsing',
      loc: ['path', 'grand_prix_id'],
      msg: 'Input should be a valid integer, unable to parse string as an integer',
      input,
    },
  ],
});

const parseGrandPrixId = (
  parameter: string | readonly string[] | undefined
): number | null => {
  if (typeof parameter !== 'string' || !/^[+-]?\d+$/.test(parameter)) {
    return null;
  }

  return Number(parameter);
};

export const grandPrixHandlers = [
  http.get('*/api/grandprix/:grandPrixId/result', ({ params }) => {
    const grandPrixIdParameter = params.grandPrixId;
    const grandPrixId = parseGrandPrixId(grandPrixIdParameter);

    if (grandPrixId === null) {
      return HttpResponse.json<ApiErrorResponse>(
        createGrandPrixIdValidationError(String(grandPrixIdParameter)),
        { status: 422 }
      );
    }

    const result = grandPrixResultMockById[grandPrixId];
    if (result === undefined) {
      return HttpResponse.json<ApiErrorResponse>(
        { detail: `Grand Prix ${grandPrixId} result not found` },
        { status: 404 }
      );
    }

    return HttpResponse.json(result);
  }),
  http.get('*/api/grandprix/:grandPrixId/overview', ({ params }) => {
    const grandPrixIdParameter = params.grandPrixId;
    const grandPrixId = parseGrandPrixId(grandPrixIdParameter);

    if (grandPrixId === null) {
      return HttpResponse.json<ApiErrorResponse>(
        createGrandPrixIdValidationError(String(grandPrixIdParameter)),
        { status: 422 }
      );
    }

    const overview = grandPrixOverviewMockById[grandPrixId];
    if (overview === undefined) {
      return HttpResponse.json<ApiErrorResponse>(
        { detail: `Grand Prix ${grandPrixId} not found` },
        { status: 404 }
      );
    }

    return HttpResponse.json(overview);
  }),
  http.get('*/api/grandprix/:grandPrixId', ({ params }) => {
    const grandPrixIdParameter = params.grandPrixId;
    const grandPrixId = parseGrandPrixId(grandPrixIdParameter);

    if (grandPrixId === null) {
      return HttpResponse.json<ApiErrorResponse>(
        createGrandPrixIdValidationError(String(grandPrixIdParameter)),
        { status: 422 }
      );
    }

    const grandPrix = grandPrixDetailMockById[grandPrixId];
    if (grandPrix === undefined) {
      return HttpResponse.json<ApiErrorResponse>(
        { detail: `Grand Prix ${grandPrixId} not found` },
        { status: 404 }
      );
    }

    return HttpResponse.json(grandPrix);
  }),
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
