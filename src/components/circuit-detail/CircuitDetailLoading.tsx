export default function CircuitDetailLoading() {
  return (
    <div
      aria-label="서킷 정보를 불러오는 중"
      aria-live="polite"
      className="min-h-[calc(100vh-64px)] animate-pulse bg-grand-prix-page px-4 pt-7 pb-12 motion-reduce:animate-none min-[1400px]:px-5 min-[1400px]:pt-12 min-[1400px]:pb-20"
      role="status"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="h-10 w-64 rounded-lg bg-grand-prix-row min-[1400px]:h-12" />
        <div className="mt-10 grid gap-8 min-[1400px]:mt-[158px] min-[1400px]:grid-cols-[minmax(0,714px)_minmax(0,414px)] min-[1400px]:rounded-3xl min-[1400px]:bg-[#121720] min-[1400px]:p-6">
          <div className="h-[392px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[792px] min-[1400px]:rounded-[18px]" />
          <div className="space-y-8">
            <div className="h-[126px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[356px] min-[1400px]:rounded-[18px]" />
            <div className="h-[260px] rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:h-[408px] min-[1400px]:rounded-[18px]" />
          </div>
        </div>
        <div className="mt-8 h-32 rounded-[14px] bg-grand-prix-card-mobile min-[1400px]:mt-32 min-[1400px]:h-[136px] min-[1400px]:rounded-2xl" />
      </div>
    </div>
  );
}
