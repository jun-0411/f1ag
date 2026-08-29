export default function GrandPrixHistoryLoading() {
  return (
    <div
      aria-label="레이스 히스토리를 불러오는 중"
      aria-live="polite"
      className="mt-7 animate-pulse space-y-4 motion-reduce:animate-none min-[1400px]:mt-0 min-[1400px]:rounded-[22px] min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-6"
      role="status"
    >
      <span className="sr-only">레이스 히스토리를 불러오고 있습니다.</span>
      <div className="h-14 rounded-xl bg-grand-prix-card-mobile min-[1400px]:w-[450px] min-[1400px]:bg-grand-prix-row" />
      <div className="h-12 rounded-xl bg-grand-prix-card-mobile min-[1400px]:bg-grand-prix-row" />
      <div className="grid gap-4 min-[1400px]:grid-cols-[minmax(0,1fr)_258px]">
        <div className="h-[440px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[720px] min-[1400px]:bg-grand-prix-deep" />
        <div className="h-[270px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[720px] min-[1400px]:bg-grand-prix-row" />
      </div>
      <div className="h-[220px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[78px] min-[1400px]:bg-grand-prix-row" />
    </div>
  );
}
