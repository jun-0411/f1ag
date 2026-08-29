import apiClient from '@/api/apiClient';
import type {
  GrandPrixDetailResponse,
  GrandPrixHistoryResponse,
  GrandPrixListRequest,
  GrandPrixListResponse,
  GrandPrixOverviewResponse,
  GrandPrixResponse,
  GrandPrixResultResponse,
  GrandPrixResultSession,
  GrandPrixSessionCode,
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
  grandPrixId: number,
  session: GrandPrixResultSession
): Promise<GrandPrixResultResponse> => {
  const response = await apiClient.get<GrandPrixResultResponse>(
    `/grandprix/${grandPrixId}/result`,
    { params: { session } }
  );

  return response.data;
};

export const getGrandPrixHistory = async (
  grandPrixId: number,
  session: GrandPrixSessionCode
): Promise<GrandPrixHistoryResponse> => {
  const response = await apiClient.get<GrandPrixHistoryResponse>(
    `/grandprix/${grandPrixId}/history`,
    { params: { session } }
  );

  return response.data;
};

export const getGrandPrixDetail = async (
  grandPrixId: number,
  session: GrandPrixSessionCode
): Promise<GrandPrixDetailResponse> => {
  const response = await apiClient.get<GrandPrixDetailResponse>(
    `/grandprix/${grandPrixId}/detail`,
    { params: { session } }
  );

  return response.data;
};
