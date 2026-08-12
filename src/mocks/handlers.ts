import { championshipHandlers } from '@/mocks/handlers/championship';
import { grandPrixHandlers } from '@/mocks/handlers/grandprix';

export const handlers = [...grandPrixHandlers, ...championshipHandlers];
