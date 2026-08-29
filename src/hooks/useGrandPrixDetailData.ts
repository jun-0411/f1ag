import { getGrandPrixDetail } from '@/api/grandprix/grandprix';
import type { GrandPrixSessionCode } from '@/types/grandprix';
import { useQuery } from '@tanstack/react-query';

export default function useGrandPrixDetailData(
  grandPrixId: number,
  session: GrandPrixSessionCode
) {
  const detailQuery = useQuery({
    queryKey: ['grandprix', 'detail', grandPrixId, session],
    queryFn: () => getGrandPrixDetail(grandPrixId, session),
  });

  return {
    detail: detailQuery.data,
    isPending: detailQuery.isPending,
    error: detailQuery.error,
    refetch: detailQuery.refetch,
  };
}
