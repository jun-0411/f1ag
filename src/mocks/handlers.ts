import { championshipHandlers } from '@/mocks/handlers/championship';
import { circuitHandlers } from '@/mocks/handlers/circuit';
import { grandPrixHandlers } from '@/mocks/handlers/grandprix';

export const handlers = [
  ...grandPrixHandlers,
  ...championshipHandlers,
  ...circuitHandlers,
];
