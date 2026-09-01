import { getGrandPrixOverview } from '@/api/grandprix/grandprix';
import { useQuery } from '@tanstack/react-query';

export default function useGrandPrixOverviewData(grandPrixId: number) {
  const overviewQuery = useQuery({
    queryKey: ['grandprix', 'overview', grandPrixId],
    queryFn: () => getGrandPrixOverview(grandPrixId),
  });

  return {
    overview: overviewQuery.data,
    isPending: overviewQuery.isPending,
    error: overviewQuery.error,
    refetch: overviewQuery.refetch,
  };
}
