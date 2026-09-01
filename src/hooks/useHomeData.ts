import { getConstructorChampionship } from '@/api/championship/constructor';
import { getDriverChampionship } from '@/api/championship/driver';
import { getGrandPrixList } from '@/api/grandprix/grandprix';
import { CURRENT_SEASON } from '@/constants/grandPrix';
import type {
  ChampionshipConstructorItem,
  ChampionshipDriverItem,
} from '@/types/championship';
import type { GrandPrixListItem } from '@/types/grandprix';
import { useQuery } from '@tanstack/react-query';

interface HomeData {
  grandPrix: GrandPrixListItem[];
  currentGrandPrix: GrandPrixListItem | null;
  nextGrandPrix: GrandPrixListItem | null;
  winner: ChampionshipDriverItem | null;
  drivers: ChampionshipDriverItem[];
  constructors: ChampionshipConstructorItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const grandPrixQueryKey = ['grandprix', 'list', { season: CURRENT_SEASON }];
const driverQueryKey = ['championship', 'driver', { season: CURRENT_SEASON }];
const constructorQueryKey = [
  'championship',
  'constructor',
  { season: CURRENT_SEASON },
];

export default function useHomeData(): HomeData {
  const grandPrixQuery = useQuery({
    queryKey: grandPrixQueryKey,
    queryFn: () => getGrandPrixList({ season: CURRENT_SEASON }),
  });
  const driverQuery = useQuery({
    queryKey: driverQueryKey,
    queryFn: () => getDriverChampionship({ season: CURRENT_SEASON }),
  });
  const constructorQuery = useQuery({
    queryKey: constructorQueryKey,
    queryFn: () => getConstructorChampionship({ season: CURRENT_SEASON }),
  });

  const grandPrix = grandPrixQuery.data?.grandprix ?? [];
  const drivers = driverQuery.data?.driver ?? [];
  const constructors = constructorQuery.data?.team ?? [];

  // 백엔드 필드명이 바뀌면 최근 경기 선택 조건만 이곳에서 교체한다.
  const currentGrandPrix = grandPrix.find((item) => item.is_current) ?? null;
  const nextGrandPrix = grandPrix.find((item) => item.is_next) ?? null;
  const winner =
    drivers.find(
      (driver) => driver.driver_id === currentGrandPrix?.first_driver_id
    ) ?? null;

  const refetch = async () => {
    await Promise.all([
      grandPrixQuery.refetch(),
      driverQuery.refetch(),
      constructorQuery.refetch(),
    ]);
  };

  return {
    grandPrix,
    currentGrandPrix,
    nextGrandPrix,
    winner,
    drivers,
    constructors,
    isLoading:
      grandPrixQuery.isPending ||
      driverQuery.isPending ||
      constructorQuery.isPending,
    error:
      grandPrixQuery.error ??
      driverQuery.error ??
      constructorQuery.error ??
      null,
    refetch,
  };
}
