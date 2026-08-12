interface SkeletonBlockProps {
  className: string;
}

function SkeletonBlock({ className }: SkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[22px] border border-home-border bg-home-card motion-reduce:animate-none ${className}`}
    />
  );
}

export default function HomeLoading() {
  return (
    <div aria-busy="true" aria-label="Home 데이터를 불러오는 중">
      <div className="grid gap-[18px] lg:grid-cols-2 xl:grid-cols-3">
        <SkeletonBlock className="h-[470px] md:h-[626px]" />
        <SkeletonBlock className="h-[322px] md:h-[626px]" />
        <SkeletonBlock className="h-[220px] md:h-[626px]" />
      </div>
      <div className="mt-10">
        <div className="h-7 w-40 animate-pulse rounded bg-home-card motion-reduce:animate-none" />
        <SkeletonBlock className="mt-4 h-32 md:h-[242px]" />
      </div>
    </div>
  );
}
