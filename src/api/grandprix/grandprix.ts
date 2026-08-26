import apiClient from '@/api/apiClient';
import type {
  GrandPrixListRequest,
  GrandPrixListResponse,
  GrandPrixOverviewResponse,
  GrandPrixResponse,
  GrandPrixResultResponse,
} from '@/types/grandprix';

export const getGrandPrixList = async (
  request: GrandPrixListRequest = {}
): Promise<GrandPrixListResponse> => {
  const response = await apiClient.get<GrandPrixListResponse>('/grandprix', {
    params: request,
  });

  return response.data;
};

export const getGrandPrix = async (
  grandPrixId: number
): Promise<GrandPrixResponse> => {
  const response = await apiClient.get<GrandPrixResponse>(
    `/grandprix/${grandPrixId}`
  );

  return response.data;
};

export const getGrandPrixOverview = async (
  grandPrixId: number
): Promise<GrandPrixOverviewResponse> => {
  const response = await apiClient.get<GrandPrixOverviewResponse>(
    `/grandprix/${grandPrixId}/overview`
  );

  return response.data;
};

export const getGrandPrixResult = async (
  grandPrixId: number
): Promise<GrandPrixResultResponse> => {
  const response = await apiClient.get<GrandPrixResultResponse>(
    `/grandprix/${grandPrixId}/result`
  );

  return response.data;
};
