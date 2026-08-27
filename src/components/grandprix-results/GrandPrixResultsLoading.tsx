export default function GrandPrixResultsLoading() {
  return (
    <div
      aria-label="경기 결과를 불러오는 중"
      aria-live="polite"
      className="mt-7 animate-pulse space-y-10 motion-reduce:animate-none min-[1400px]:mt-0 min-[1400px]:grid min-[1400px]:grid-cols-[650px_minmax(0,1fr)] min-[1400px]:items-start min-[1400px]:gap-6 min-[1400px]:space-y-0"
      role="status"
    >
      <span className="sr-only">경기 결과를 불러오고 있습니다.</span>
      <div className="space-y-6">
        <div className="h-[270px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[430px] min-[1400px]:rounded-[22px] min-[1400px]:bg-grand-prix-card" />
        <div className="h-[300px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[512px] min-[1400px]:rounded-[22px] min-[1400px]:bg-grand-prix-card" />
      </div>
      <div className="h-[720px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[966px] min-[1400px]:rounded-[22px] min-[1400px]:bg-grand-prix-card" />
    </div>
  );
}
