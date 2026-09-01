import MediaImage from '@/components/media/MediaImage';
import { getCircuitCountryCode } from '@/constants/circuit';

interface CircuitHeaderProps {
  circuitName: string;
  englishName: string;
  nationFlagImageId: number | null;
}

export default function CircuitHeader({
  circuitName,
  englishName,
  nationFlagImageId,
}: CircuitHeaderProps) {
  const countryCode = getCircuitCountryCode(englishName);

  return (
    <header className="flex min-w-0 items-center gap-3 min-[1400px]:gap-5">
      <span className="h-[27px] w-[42px] shrink-0 overflow-hidden rounded-[5px] bg-grand-prix-row min-[1400px]:h-[46px] min-[1400px]:w-[72px] min-[1400px]:rounded-md">
        <MediaImage
          alt={`${countryCode ?? circuitName} 국기`}
          className="size-full object-cover"
          fallback={
            <span
              aria-label="국기 이미지 준비 중"
              className="grid size-full place-items-center text-[8px] font-bold text-grand-prix-muted min-[1400px]:text-[10px]"
            >
              {countryCode ?? '—'}
            </span>
          }
          height={46}
          imageId={nationFlagImageId}
          width={72}
        />
      </span>

      <h1 className="min-w-0 truncate text-2xl font-bold text-grand-prix-text min-[1400px]:text-[40px]">
        {circuitName}
      </h1>
    </header>
  );
}
