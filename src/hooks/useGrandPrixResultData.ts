import { getGrandPrixResult } from '@/api/grandprix/grandprix';
import type { GrandPrixResultSession } from '@/types/grandprix';
import { useQuery } from '@tanstack/react-query';

export default function useGrandPrixResultData(
  grandPrixId: number,
  session: GrandPrixResultSession
) {
  const resultQuery = useQuery({
    queryKey: ['grandprix', 'result', grandPrixId, session],
    queryFn: () => getGrandPrixResult(grandPrixId, session),
  });

  return {
    result: resultQuery.data,
    isPending: resultQuery.isPending,
    error: resultQuery.error,
    refetch: resultQuery.refetch,
  };
}
