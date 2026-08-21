import { Radio } from 'lucide-react';

export default function RaceDirectorInstructions() {
  return (
    <section aria-labelledby="race-director-heading">
      <div className="rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-4 min-[1400px]:min-h-[246px] min-[1400px]:rounded-[22px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-[22px]">
        <div>
          <p className="text-[9px] font-bold text-grand-prix-director min-[1400px]:text-[11px]">
            RACE DIRECTOR
          </p>
          <h2
            className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:mt-2 min-[1400px]:text-[22px]"
            id="race-director-heading"
          >
            디렉터 지시사항
          </h2>
        </div>

        <div className="mt-5 flex min-h-28 flex-col items-center justify-center rounded-[10px] bg-grand-prix-deep px-5 text-center min-[1400px]:min-h-[132px]">
          <Radio
            aria-hidden="true"
            className="size-5 text-grand-prix-director"
          />
          <p className="mt-3 text-xs font-bold text-grand-prix-text">
            지시사항 준비 중
          </p>
          <p className="mt-1 text-[10px] leading-4 text-grand-prix-muted-mobile min-[1400px]:text-grand-prix-muted">
            공식 데이터가 제공되면 이곳에 표시됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
