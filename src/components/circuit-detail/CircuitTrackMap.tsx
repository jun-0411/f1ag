import MediaImage from '@/components/media/MediaImage';

interface CircuitTrackMapProps {
  circuitImageId: number | null;
  circuitName: string;
  englishName: string;
}

interface TrackLegendItem {
  colorClassName: string;
  label: string;
}

const TRACK_LEGEND_ITEMS: TrackLegendItem[] = [
  { colorClassName: 'bg-[#a970ff]', label: 'SECTOR 1' },
  { colorClassName: 'bg-[#35d0ba]', label: 'SECTOR 2' },
  { colorClassName: 'bg-grand-prix-primary', label: 'SECTOR 3' },
];

export default function CircuitTrackMap({
  circuitImageId,
  circuitName,
  englishName,
}: CircuitTrackMapProps) {
  return (
    <section
      aria-labelledby="circuit-track-map-heading"
      className="flex min-h-[392px] min-w-0 flex-col overflow-hidden rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-4 min-[1400px]:min-h-[792px] min-[1400px]:rounded-[18px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-[#171d28] min-[1400px]:p-7"
    >
      <p className="text-[10px] font-bold text-grand-prix-muted-mobile min-[1400px]:text-xs min-[1400px]:font-semibold min-[1400px]:text-grand-prix-muted">
        TRACK MAP
      </p>
      <h2
        className="sr-only min-[1400px]:not-sr-only min-[1400px]:mt-1 min-[1400px]:text-[26px] min-[1400px]:font-bold min-[1400px]:text-grand-prix-text"
        id="circuit-track-map-heading"
      >
        {englishName.toUpperCase()}
      </h2>

      <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[linear-gradient(to_right,rgba(42,50,65,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,50,65,0.18)_1px,transparent_1px)] bg-[size:38px_38px] min-[1400px]:mt-8 min-[1400px]:bg-[size:54px_54px]">
        <MediaImage
          alt={`${circuitName} 트랙 지도`}
          className="h-auto max-h-[250px] w-full max-w-[310px] object-contain min-[1400px]:max-h-[470px] min-[1400px]:max-w-[620px]"
          fallback={
            <p className="px-6 text-center text-xs text-grand-prix-muted">
              서킷 이미지 준비 중
            </p>
          }
          imageId={circuitImageId}
        />
      </div>

      <div
        aria-label="트랙 섹터 범례"
        className="mt-3 border-grand-prix-border-mobile border-t pt-3 min-[1400px]:mt-8 min-[1400px]:border-grand-prix-border min-[1400px]:pt-6"
      >
        <div className="grid grid-cols-3 gap-2">
          {TRACK_LEGEND_ITEMS.map((item) => (
            <div className="flex min-w-0 items-center gap-2" key={item.label}>
              <span
                aria-hidden="true"
                className={`${item.colorClassName} h-1 w-7 shrink-0 rounded-full min-[1400px]:w-[38px]`}
              />
              <span className="truncate text-[8px] font-semibold text-grand-prix-muted-mobile min-[1400px]:text-xs min-[1400px]:text-grand-prix-muted">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-[8px] text-grand-prix-unit min-[1400px]:text-[11px]">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-grand-prix-muted"
          />
          START / FINISH
        </p>
      </div>
    </section>
  );
}
