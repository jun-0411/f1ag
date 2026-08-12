import apiClient from '@/api/apiClient';
import type {
  ChampionshipDriverResponse,
  ChampionshipRequest,
} from '@/types/championship';

export const getDriverChampionship = async (
  request: ChampionshipRequest = {}
): Promise<ChampionshipDriverResponse> => {
  const response = await apiClient.get<ChampionshipDriverResponse>(
    '/championship/driver',
    { params: request }
  );

  return response.data;
};
