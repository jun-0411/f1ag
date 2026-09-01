export default function GrandPrixLayoutLoading() {
  return (
    <div
      aria-label="그랑프리 정보를 불러오는 중"
      aria-live="polite"
      className="min-h-[calc(100vh-64px)] bg-grand-prix-page px-4 pb-16"
      role="status"
    >
      <span className="sr-only">그랑프리 정보를 불러오고 있습니다.</span>
      <div className="mx-auto max-w-[1400px] animate-pulse motion-reduce:animate-none min-[1400px]:grid min-[1400px]:grid-cols-[172px_minmax(0,1200px)] min-[1400px]:gap-6 min-[1400px]:pt-12">
        <div className="hidden h-[170px] rounded-[14px] bg-grand-prix-card min-[1400px]:block" />
        <div>
          <div className="h-[170px] pt-8 min-[1400px]:h-[220px] min-[1400px]:pt-5">
            <div className="h-7 w-60 rounded bg-grand-prix-row min-[1400px]:h-10 min-[1400px]:w-[520px]" />
            <div className="mt-3 h-3 w-40 rounded bg-grand-prix-row" />
          </div>
          <div className="h-[520px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:rounded-[22px] min-[1400px]:bg-grand-prix-card" />
        </div>
      </div>
    </div>
  );
}
