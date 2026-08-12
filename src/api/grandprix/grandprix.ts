import apiClient from '@/api/apiClient';
import type {
  GrandPrixListRequest,
  GrandPrixListResponse,
} from '@/types/grandprix';

export const getGrandPrixList = async (
  request: GrandPrixListRequest = {}
): Promise<GrandPrixListResponse> => {
  const response = await apiClient.get<GrandPrixListResponse>('/grandprix', {
    params: request,
  });

  return response.data;
};
