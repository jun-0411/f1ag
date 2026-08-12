import type { ChampionshipRowItem } from '@/components/home/ChampionshipRow';
import ChampionshipSection from '@/components/home/ChampionshipSection';
import GrandPrixSchedule from '@/components/home/GrandPrixSchedule';
import HomeError from '@/components/home/HomeError';
import HomeLoading from '@/components/home/HomeLoading';
import LatestWinnerCard from '@/components/home/LatestWinnerCard';
import useHomeData from '@/hooks/useHomeData';

export default function Home() {
  const {
    grandPrix,
    currentGrandPrix,
    nextGrandPrix,
    winner,
    drivers,
    constructors,
    isLoading,
    error,
    refetch,
  } = useHomeData();

  const driverRows: ChampionshipRowItem[] = drivers.map((driver, index) => ({
    id: driver.driver_id,
    rank: index + 1,
    name: driver.name,
    teamName: driver.teamname,
    points: driver.points,
    rankChange: driver.rank_change,
  }));
  const constructorRows: ChampionshipRowItem[] = constructors.map(
    (team, index) => ({
      id: team.team_id,
      rank: index + 1,
      name: team.team_name,
      teamName: team.team_name,
      points: team.points,
      rankChange: team.rank_change,
    })
  );

  const handleRetry = () => {
    void refetch();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-home-page">
      <div className="mx-auto max-w-[1272px] px-4 pt-7 pb-14 md:px-8 md:pt-10 md:pb-20 xl:px-0">
        {isLoading ? <HomeLoading /> : null}
        {!isLoading && error ? (
          <HomeError error={error} onRetry={handleRetry} />
        ) : null}
        {!isLoading && !error ? (
          <>
            <div className="grid gap-x-[18px] gap-y-8 lg:grid-cols-2 xl:grid-cols-3">
              <LatestWinnerCard grandPrix={currentGrandPrix} winner={winner} />
              <ChampionshipSection
                items={driverRows}
                mobileLimit={5}
                paginate
                title="드라이버 챔피언십"
              />
              <ChampionshipSection
                items={constructorRows}
                mobileLimit={3}
                title="컨스트럭터 챔피언십"
              />
            </div>
            <div className="mt-10 md:mt-12">
              <GrandPrixSchedule
                items={grandPrix}
                nextGrandPrix={nextGrandPrix}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
