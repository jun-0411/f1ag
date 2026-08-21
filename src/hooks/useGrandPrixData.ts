import { getGrandPrix } from '@/api/grandprix/grandprix';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const parseGrandPrixId = (grandPrixId: string | undefined): number | null => {
  if (grandPrixId === undefined || !/^\d+$/.test(grandPrixId)) {
    return null;
  }

  const parsedGrandPrixId = Number(grandPrixId);

  return Number.isSafeInteger(parsedGrandPrixId) && parsedGrandPrixId > 0
    ? parsedGrandPrixId
    : null;
};

export default function useGrandPrixData(
  grandPrixIdParameter: string | undefined
) {
  const grandPrixId = parseGrandPrixId(grandPrixIdParameter);
  const queryGrandPrixId = grandPrixId ?? 0;
  const grandPrixQuery = useQuery({
    queryKey: ['grandprix', 'detail', queryGrandPrixId],
    queryFn: () => getGrandPrix(queryGrandPrixId),
    enabled: grandPrixId !== null,
  });
  const isNotFound =
    axios.isAxiosError(grandPrixQuery.error) &&
    grandPrixQuery.error.response?.status === 404;

  return {
    grandPrixId,
    grandPrix: grandPrixQuery.data,
    isPending: grandPrixId !== null && grandPrixQuery.isPending,
    error: grandPrixQuery.error,
    isNotFound,
    refetch: grandPrixQuery.refetch,
  };
}
