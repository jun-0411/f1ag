import apiClient from '@/api/apiClient';
import type {
  ChampionshipConstructorResponse,
  ChampionshipRequest,
} from '@/types/championship';

export const getConstructorChampionship = async (
  request: ChampionshipRequest = {}
): Promise<ChampionshipConstructorResponse> => {
  const response = await apiClient.get<ChampionshipConstructorResponse>(
    '/championship/constructor',
    { params: request }
  );

  return response.data;
};
