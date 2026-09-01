import { championshipHandlers } from '@/mocks/handlers/championship';
import { circuitHandlers } from '@/mocks/handlers/circuit';
import { grandPrixHandlers } from '@/mocks/handlers/grandprix';
import { mediaHandlers } from '@/mocks/handlers/media';

export const handlers = [
  ...grandPrixHandlers,
  ...championshipHandlers,
  ...circuitHandlers,
  ...mediaHandlers,
];
