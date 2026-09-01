import { getCircuitCountryCode } from '@/constants/circuit';
import { getNationFlagImage } from '@/constants/images';

interface CircuitHeaderProps {
  circuitName: string;
  englishName: string;
}

export default function CircuitHeader({
  circuitName,
  englishName,
}: CircuitHeaderProps) {
  const countryCode = getCircuitCountryCode(englishName);
  const flagImage =
    countryCode === null ? null : getNationFlagImage(countryCode);

  return (
    <header className="flex min-w-0 items-center gap-3 min-[1400px]:gap-5">
      {flagImage === null ? (
        <span
          aria-label="국기 이미지 준비 중"
          className="grid h-[27px] w-[42px] shrink-0 place-items-center rounded-[5px] bg-grand-prix-row text-[8px] font-bold text-grand-prix-muted min-[1400px]:h-[46px] min-[1400px]:w-[72px] min-[1400px]:rounded-md min-[1400px]:text-[10px]"
        >
          {countryCode ?? '—'}
        </span>
      ) : (
        <span className="h-[27px] w-[42px] shrink-0 overflow-hidden rounded-[5px] min-[1400px]:h-[46px] min-[1400px]:w-[72px] min-[1400px]:rounded-md">
          <img
            alt={`${countryCode} 국기`}
            className="size-full object-cover"
            height={46}
            src={flagImage}
            width={72}
          />
        </span>
      )}

      <h1 className="min-w-0 truncate text-2xl font-bold text-grand-prix-text min-[1400px]:text-[40px]">
        {circuitName}
      </h1>
    </header>
  );
}
