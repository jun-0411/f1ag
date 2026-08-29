export default function HostedGrandPrixSection() {
  return (
    <section
      aria-labelledby="hosted-grand-prix-heading"
      className="min-[1400px]:rounded-2xl min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-[#121720] min-[1400px]:px-[22px] min-[1400px]:py-[18px]"
    >
      <p className="hidden text-[10px] font-bold text-grand-prix-primary min-[1400px]:block">
        HOSTED GRAND PRIX
      </p>
      <h2
        className="text-xl font-bold text-grand-prix-text min-[1400px]:mt-1"
        id="hosted-grand-prix-heading"
      >
        이 서킷에서 열린 그랑프리
      </h2>
      <div className="mt-4 flex min-h-24 items-center justify-center rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-5 text-center text-xs leading-5 text-grand-prix-muted min-[1400px]:mt-0 min-[1400px]:ml-auto min-[1400px]:min-h-[58px] min-[1400px]:max-w-[576px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-row">
        개최 이력 API 준비 중
      </div>
    </section>
  );
}
