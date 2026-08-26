import type { GrandPrixResultDriver } from '@/types/grandprix';
import { formatRaceTime, getDriverInitials } from '@/utils/grandPrixResult';

interface RacePodiumProps {
  drivers: GrandPrixResultDriver[];
}

interface PodiumStyle {
  badgeClassName: string;
  cardClassName: string;
  labelClassName: string;
}

const PODIUM_STYLES: Record<1 | 2 | 3, PodiumStyle> = {
  1: {
    badgeClassName: 'bg-[#ff8a4c]',
    cardClassName:
      'h-[184px] border-[#ff8a4c] min-[1400px]:h-[272px] min-[1400px]:border-2',
    labelClassName: 'text-[#ff8a4c]',
  },
  2: {
    badgeClassName: 'bg-grand-prix-info',
    cardClassName: 'h-[160px] border-grand-prix-info min-[1400px]:h-[244px]',
    labelClassName: 'text-grand-prix-info',
  },
  3: {
    badgeClassName: 'bg-[#45d4d0]',
    cardClassName: 'h-[160px] border-[#45d4d0] min-[1400px]:h-[228px]',
    labelClassName: 'text-[#45d4d0]',
  },
};

const PODIUM_ORDER = [2, 1, 3] as const;

export default function RacePodium({ drivers }: RacePodiumProps) {
  return (
    <section className="min-[1400px]:h-[430px] min-[1400px]:rounded-[22px] min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-6">
      <p className="text-[9px] font-bold text-grand-prix-primary uppercase min-[1400px]:text-[11px]">
        Race Podium
      </p>
      <h2 className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:text-2xl">
        포디엄
      </h2>

      <div className="mt-4 grid h-[222px] grid-cols-3 items-end gap-2 rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-[11px] pb-5 min-[1400px]:mt-[34px] min-[1400px]:h-[272px] min-[1400px]:grid-cols-[182px_202px_182px] min-[1400px]:gap-[18px] min-[1400px]:border-0 min-[1400px]:bg-transparent min-[1400px]:p-0">
        {PODIUM_ORDER.map((position) => {
          const driver = drivers[position - 1];

          if (driver === undefined) {
            return <div aria-hidden="true" key={position} />;
          }

          const style = PODIUM_STYLES[position];

          return (
            <article
              aria-label={`${position}위 ${driver.name}`}
              className={`min-w-0 rounded-xl border bg-grand-prix-card-mobile p-[9px] min-[1400px]:rounded-[20px] min-[1400px]:bg-grand-prix-card min-[1400px]:p-[17px] ${style.cardClassName}`}
              key={driver.driver_id}
            >
              <p
                className={`text-[9px] font-bold min-[1400px]:text-[13px] ${style.labelClassName}`}
              >
                P{position}
              </p>
              <div
                aria-hidden="true"
                className={`mx-auto mt-[18px] flex size-10 items-center justify-center rounded-full text-[10px] font-bold text-white min-[1400px]:mt-[21px] min-[1400px]:size-11 min-[1400px]:text-[13px] ${style.badgeClassName}`}
              >
                {getDriverInitials(driver.name)}
              </div>
              <h3
                className={`mt-[10px] line-clamp-2 text-xs leading-[15px] font-bold text-grand-prix-text min-[1400px]:mt-6 min-[1400px]:leading-tight ${
                  position === 1
                    ? 'min-[1400px]:text-[23px]'
                    : 'min-[1400px]:text-[19px]'
                }`}
              >
                {driver.name}
              </h3>
              <p className="mt-1 truncate text-[9px] text-grand-prix-muted-mobile min-[1400px]:text-[13px] min-[1400px]:text-grand-prix-muted">
                {driver.teamname}
              </p>
              <p
                className={`truncate text-[10px] font-bold text-grand-prix-text min-[1400px]:text-[15px] ${
                  position === 1
                    ? 'mt-[18px] min-[1400px]:mt-[46px]'
                    : position === 2
                      ? 'mt-[6px] min-[1400px]:mt-5'
                      : 'mt-[6px]'
                }`}
              >
                {formatRaceTime(driver.racetime, position)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
