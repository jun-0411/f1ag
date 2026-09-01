import { getGrandPrixHistory } from '@/api/grandprix/grandprix';
import type { GrandPrixSessionCode } from '@/types/grandprix';
import { useQuery } from '@tanstack/react-query';

export default function useGrandPrixHistoryData(
  grandPrixId: number,
  session: GrandPrixSessionCode
) {
  const historyQuery = useQuery({
    queryKey: ['grandprix', 'history', grandPrixId, session],
    queryFn: () => getGrandPrixHistory(grandPrixId, session),
  });

  return {
    history: historyQuery.data,
    isPending: historyQuery.isPending,
    error: historyQuery.error,
    refetch: historyQuery.refetch,
  };
}
