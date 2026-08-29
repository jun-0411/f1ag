import { getTireDisplay } from '@/utils/grandPrixHistory';

const TIRE_TYPES = ['SOFT', 'MEDIUM', 'HARD', 'INTERMEDIATE', 'WET'];

export default function RaceHistoryLegend() {
  return (
    <section aria-labelledby="race-history-legend-title">
      <h3
        className="mb-3 text-xl font-bold text-grand-prix-text min-[1400px]:sr-only"
        id="race-history-legend-title"
      >
        범례
      </h3>
      <div className="rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-3.5 py-4 min-[1400px]:grid min-[1400px]:grid-cols-[1fr_1.15fr] min-[1400px]:gap-10 min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-row min-[1400px]:px-[18px] min-[1400px]:py-3.5">
        <div>
          <p className="text-[10px] font-bold text-grand-prix-muted-mobile min-[1400px]:text-[11px] min-[1400px]:text-grand-prix-muted">
            타이어
          </p>
          <div className="mt-3 grid grid-cols-5 gap-2 min-[1400px]:flex min-[1400px]:gap-10">
            {TIRE_TYPES.map((tireType) => {
              const display = getTireDisplay(tireType);

              return (
                <div
                  className="flex items-center gap-1.5 text-[9px] font-bold text-grand-prix-text min-[1400px]:text-[10px]"
                  key={tireType}
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full border border-black/30"
                    style={{ backgroundColor: display.color }}
                  />
                  <span className="min-[1400px]:hidden">
                    {display.shortLabel}
                  </span>
                  <span className="hidden min-[1400px]:inline">
                    {display.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 border-t border-grand-prix-border-mobile pt-4 min-[1400px]:mt-0 min-[1400px]:border-0 min-[1400px]:pt-0">
          <p className="text-[10px] font-bold text-grand-prix-muted-mobile min-[1400px]:text-[11px] min-[1400px]:text-grand-prix-muted">
            경기 이벤트
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5 min-[1400px]:gap-10">
            <div className="rounded-[5px] bg-[#6f642d] px-4 py-2 text-[8px] font-bold text-grand-prix-text min-[1400px]:flex min-[1400px]:items-center min-[1400px]:gap-2 min-[1400px]:bg-transparent min-[1400px]:p-0 min-[1400px]:text-[11px]">
              <span className="hidden h-3 w-7 rounded-[3px] bg-[#6f642d] min-[1400px]:inline-block" />
              세이프티카 / VSC
            </div>
            <div className="rounded-[5px] bg-[#5d1f31] px-4 py-2 text-[8px] font-bold text-grand-prix-text min-[1400px]:flex min-[1400px]:items-center min-[1400px]:gap-2 min-[1400px]:bg-transparent min-[1400px]:p-0 min-[1400px]:text-[11px]">
              <span className="hidden h-3 w-7 rounded-[3px] bg-[#5d1f31] min-[1400px]:inline-block" />
              레드 플래그
            </div>
          </div>
        </div>

        <p className="mt-5 border-t border-grand-prix-border-mobile pt-4 text-[9px] leading-relaxed text-grand-prix-muted-mobile min-[1400px]:hidden">
          차트 색상과 이벤트 구간은 데스크톱과 동일하게 표시됩니다.
        </p>
      </div>
    </section>
  );
}
