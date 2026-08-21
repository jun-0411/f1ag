export default function GrandPrixOverviewLoading() {
  return (
    <div
      aria-label="그랑프리 개요를 불러오는 중"
      aria-live="polite"
      className="mt-7 grid animate-pulse gap-8 motion-reduce:animate-none min-[1400px]:mt-0 min-[1400px]:grid-cols-[minmax(0,742px)_minmax(360px,434px)] min-[1400px]:gap-6"
      role="status"
    >
      <span className="sr-only">그랑프리 개요를 불러오고 있습니다.</span>
      <div className="h-[756px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:rounded-[22px] min-[1400px]:bg-grand-prix-card" />
      <div className="space-y-6">
        <div className="h-[304px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:rounded-[22px] min-[1400px]:bg-grand-prix-card" />
        <div className="h-[372px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:rounded-[22px] min-[1400px]:bg-grand-prix-card" />
        <div className="h-[246px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:rounded-[22px] min-[1400px]:bg-grand-prix-card" />
      </div>
    </div>
  );
}
