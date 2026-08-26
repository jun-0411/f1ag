import { getGrandPrixResult } from '@/api/grandprix/grandprix';
import { useQuery } from '@tanstack/react-query';

export default function useGrandPrixResultData(grandPrixId: number) {
  const resultQuery = useQuery({
    queryKey: ['grandprix', 'result', grandPrixId],
    queryFn: () => getGrandPrixResult(grandPrixId),
  });

  return {
    result: resultQuery.data,
    isPending: resultQuery.isPending,
    error: resultQuery.error,
    refetch: resultQuery.refetch,
  };
}
