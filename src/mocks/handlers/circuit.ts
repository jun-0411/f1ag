import { circuitMockById } from '@/mocks/db/circuit';
import type { ApiErrorResponse } from '@/types/api';
import { http, HttpResponse } from 'msw';

const createCircuitIdValidationError = (input: string): ApiErrorResponse => ({
  detail: [
    {
      type: 'int_parsing',
      loc: ['path', 'circuit_id'],
      msg: 'Input should be a valid integer, unable to parse string as an integer',
      input,
    },
  ],
});

const parseCircuitId = (
  parameter: string | readonly string[] | undefined
): number | null => {
  if (typeof parameter !== 'string' || !/^[+-]?\d+$/.test(parameter)) {
    return null;
  }

  return Number(parameter);
};

export const circuitHandlers = [
  http.get('*/api/circuit/:circuitId', ({ params }) => {
    const circuitIdParameter = params.circuitId;
    const circuitId = parseCircuitId(circuitIdParameter);

    if (circuitId === null) {
      return HttpResponse.json<ApiErrorResponse>(
        createCircuitIdValidationError(String(circuitIdParameter)),
        { status: 422 }
      );
    }

    const circuit = circuitMockById[circuitId];
    if (circuit === undefined) {
      return HttpResponse.json<ApiErrorResponse>(
        { detail: 'Circuit not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(circuit);
  }),
];
