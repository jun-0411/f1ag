import {
  CHAMPIONSHIP_MOCK_SEASON,
  constructorChampionshipMock,
  driverChampionshipMock,
} from '@/mocks/db/championship';
import type { ApiErrorResponse } from '@/types/api';
import { http, HttpResponse } from 'msw';

const MIN_SEASON = 1950;
const MAX_SEASON = 2100;
const MIN_ROUND = 1;
const MAX_ROUND = 40;

const createValidationError = (
  parameterName: string,
  input: string,
  type: string,
  message: string,
  ctx?: Record<string, unknown>
): ApiErrorResponse => ({
  detail: [
    {
      type,
      loc: ['query', parameterName],
      msg: message,
      input,
      ctx,
    },
  ],
});

const validateIntegerParameter = (
  searchParams: URLSearchParams,
  parameterName: string,
  min: number,
  max: number
): ApiErrorResponse | null => {
  const parameter = searchParams.get(parameterName);

  if (parameter === null) {
    return null;
  }

  if (!/^[+-]?\d+$/.test(parameter)) {
    return createValidationError(
      parameterName,
      parameter,
      'int_parsing',
      'Input should be a valid integer, unable to parse string as an integer'
    );
  }

  const value = Number(parameter);

  if (value < min) {
    return createValidationError(
      parameterName,
      parameter,
      'greater_than_equal',
      `Input should be greater than or equal to ${min}`,
      { ge: min }
    );
  }

  if (value > max) {
    return createValidationError(
      parameterName,
      parameter,
      'less_than_equal',
      `Input should be less than or equal to ${max}`,
      { le: max }
    );
  }

  return null;
};

const getChampionshipErrorResponse = (request: Request) => {
  const requestUrl = new URL(request.url);
  const seasonValidationError = validateIntegerParameter(
    requestUrl.searchParams,
    'season',
    MIN_SEASON,
    MAX_SEASON
  );

  if (seasonValidationError) {
    return HttpResponse.json<ApiErrorResponse>(seasonValidationError, {
      status: 422,
    });
  }

  const roundValidationError = validateIntegerParameter(
    requestUrl.searchParams,
    'after_round',
    MIN_ROUND,
    MAX_ROUND
  );

  if (roundValidationError) {
    return HttpResponse.json<ApiErrorResponse>(roundValidationError, {
      status: 422,
    });
  }

  const seasonParameter = requestUrl.searchParams.get('season');
  const season =
    seasonParameter === null
      ? CHAMPIONSHIP_MOCK_SEASON
      : Number(seasonParameter);

  if (season !== CHAMPIONSHIP_MOCK_SEASON) {
    return HttpResponse.json<ApiErrorResponse>(
      { detail: `Season ${season} not found` },
      { status: 404 }
    );
  }

  return null;
};

export const championshipHandlers = [
  http.get('*/api/championship/driver', ({ request }) => {
    const errorResponse = getChampionshipErrorResponse(request);

    if (errorResponse) {
      return errorResponse;
    }

    // 대표 순위 데이터만 보유하므로 유효한 after_round에는 동일한 계약을 반환한다.
    return HttpResponse.json(driverChampionshipMock);
  }),
  http.get('*/api/championship/constructor', ({ request }) => {
    const errorResponse = getChampionshipErrorResponse(request);

    if (errorResponse) {
      return errorResponse;
    }

    return HttpResponse.json(constructorChampionshipMock);
  }),
];
