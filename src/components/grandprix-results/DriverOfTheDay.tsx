import { getDriverOfTheDayImage } from '@/constants/images';
import type {
  GrandPrixDriverOfTheDay,
  GrandPrixResultDriver,
} from '@/types/grandprix';
import { getDriverInitials, splitDriverName } from '@/utils/grandPrixResult';

interface DriverOfTheDayProps {
  dotd: GrandPrixDriverOfTheDay | null;
  drivers: GrandPrixResultDriver[];
}

const getPositionChangeLabel = (positionChange: number): string => {
  if (positionChange > 0) {
    return `+${positionChange} POSITIONS`;
  }

  if (positionChange < 0) {
    return `${positionChange} POSITIONS`;
  }

  return 'NO CHANGE';
};

export default function DriverOfTheDay({ dotd, drivers }: DriverOfTheDayProps) {
  const driverIndex =
    dotd === null
      ? -1
      : drivers.findIndex((driver) => driver.driver_id === dotd.driver_id);
  const finalPosition = driverIndex + 1;
  const driver = driverIndex < 0 ? undefined : drivers[driverIndex];

  return (
    <section className="min-[1400px]:h-[512px] min-[1400px]:rounded-[22px] min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-6">
      <p className="text-[9px] font-bold text-grand-prix-primary uppercase min-[1400px]:text-[11px]">
        Driver of the Day
      </p>
      <h2 className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:text-[22px]">
        팬들이 선택한 오늘의 드라이버
      </h2>

      {dotd === null || driver === undefined ? (
        <div className="mt-4 flex h-[250px] items-center justify-center rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-6 text-center text-sm text-grand-prix-muted-mobile min-[1400px]:mt-5 min-[1400px]:h-[388px] min-[1400px]:rounded-2xl min-[1400px]:border-0 min-[1400px]:bg-grand-prix-deep">
          오늘의 드라이버 정보가 아직 없습니다.
        </div>
      ) : (
        <DriverOfTheDayVisual
          driver={driver}
          finalPosition={finalPosition}
          startingGrid={dotd.starting_grid}
        />
      )}
    </section>
  );
}

interface DriverOfTheDayVisualProps {
  driver: GrandPrixResultDriver;
  finalPosition: number;
  startingGrid: number | null;
}

function DriverOfTheDayVisual({
  driver,
  finalPosition,
  startingGrid,
}: DriverOfTheDayVisualProps) {
  const image = getDriverOfTheDayImage(driver.driver_id);
  const name = splitDriverName(driver.name);
  const positionChange =
    startingGrid === null ? null : startingGrid - finalPosition;

  return (
    <div className="relative mt-4 h-[250px] overflow-hidden rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-deep min-[1400px]:mt-5 min-[1400px]:h-[388px] min-[1400px]:rounded-2xl min-[1400px]:border-0">
      {image === null ? (
        <div className="flex h-full items-center justify-center text-6xl font-bold text-grand-prix-muted/40">
          {getDriverInitials(driver.name)}
        </div>
      ) : (
        <img
          alt={`${driver.name} 오늘의 드라이버`}
          className="size-full object-cover"
          src={image}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 hidden h-[220px] bg-linear-to-t from-black/90 via-black/35 to-transparent min-[1400px]:block" />
      <div className="absolute bottom-14 left-6 hidden text-white min-[1400px]:block">
        <p className="text-[11px] font-bold uppercase">Driver of the Day</p>
        {name.firstName === '' ? null : (
          <p className="mt-3 text-[26px] leading-none">{name.firstName}</p>
        )}
        <p className="text-[50px] leading-tight font-bold uppercase">
          {name.lastName}
        </p>
      </div>

      {startingGrid === null ? null : (
        <div className="absolute right-5 bottom-[18px] min-[1400px]:right-[26px] min-[1400px]:bottom-4">
          <div className="flex h-11 w-[126px] items-center justify-center gap-4 rounded-[10px] bg-white text-[15px] font-bold text-[#111] min-[1400px]:h-16 min-[1400px]:w-[190px] min-[1400px]:rounded-[14px] min-[1400px]:text-base">
            <span>P{startingGrid}</span>
            <span className="text-xl text-grand-prix-primary min-[1400px]:text-[25px]">
              →
            </span>
            <span className="text-lg min-[1400px]:text-2xl">
              P{finalPosition}
            </span>
          </div>
          {positionChange === null ? null : (
            <p
              className={`mt-1 text-center text-[10px] font-bold uppercase min-[1400px]:text-[11px] ${
                positionChange >= 0
                  ? 'text-[#36d399]'
                  : 'text-grand-prix-primary'
              }`}
            >
              {getPositionChangeLabel(positionChange)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
