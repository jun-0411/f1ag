import apiClient from '@/api/apiClient';
import type { CircuitResponse } from '@/types/circuit';

export const getCircuit = async (
  circuitId: number
): Promise<CircuitResponse> => {
  const response = await apiClient.get<CircuitResponse>(
    `/circuit/${circuitId}`
  );

  return response.data;
};
