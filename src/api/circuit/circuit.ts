import apiClient from '@/api/apiClient';
import type {
  CircuitGrandPrixResponse,
  CircuitResponse,
} from '@/types/circuit';

export const getCircuit = async (
  circuitId: number
): Promise<CircuitResponse> => {
  const response = await apiClient.get<CircuitResponse>(
    `/circuit/${circuitId}`
  );

  return response.data;
};

export const getCircuitGrandPrix = async (
  circuitId: number
): Promise<CircuitGrandPrixResponse> => {
  const response = await apiClient.get<CircuitGrandPrixResponse>(
    `/circuit/${circuitId}/grandprix`
  );

  return response.data;
};
