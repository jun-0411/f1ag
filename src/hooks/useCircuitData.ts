import { getCircuit, getCircuitGrandPrix } from '@/api/circuit/circuit';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const parseCircuitId = (circuitId: string | undefined): number | null => {
  if (circuitId === undefined || !/^\d+$/.test(circuitId)) {
    return null;
  }

  const parsedCircuitId = Number(circuitId);

  return Number.isSafeInteger(parsedCircuitId) && parsedCircuitId > 0
    ? parsedCircuitId
    : null;
};

export default function useCircuitData(circuitIdParameter: string | undefined) {
  const circuitId = parseCircuitId(circuitIdParameter);
  const queryCircuitId = circuitId ?? 0;
  const circuitQuery = useQuery({
    queryKey: ['circuit', 'detail', queryCircuitId],
    queryFn: () => getCircuit(queryCircuitId),
    enabled: circuitId !== null,
  });
  const hostedGrandPrixQuery = useQuery({
    queryKey: ['circuit', 'grandprix', queryCircuitId],
    queryFn: () => getCircuitGrandPrix(queryCircuitId),
    enabled: circuitId !== null,
  });
  const isNotFound =
    axios.isAxiosError(circuitQuery.error) &&
    circuitQuery.error.response?.status === 404;

  return {
    circuitId,
    circuit: circuitQuery.data,
    hostedGrandPrix: hostedGrandPrixQuery.data?.grand_prix ?? [],
    isPending: circuitId !== null && circuitQuery.isPending,
    isHostedGrandPrixPending:
      circuitId !== null && hostedGrandPrixQuery.isPending,
    error: circuitQuery.error,
    hostedGrandPrixError: hostedGrandPrixQuery.error,
    isNotFound,
    refetch: circuitQuery.refetch,
    refetchHostedGrandPrix: hostedGrandPrixQuery.refetch,
  };
}
