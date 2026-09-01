interface CircuitMetricsProps {
  corners: number | null;
  oneLapLength: number | null;
  openingYear: number | null;
}

interface CircuitMetric {
  label: string;
  unit: string;
  value: string;
}

const formatMetricValue = (value: number | null, fractionDigits = 0): string =>
  value === null ? '정보 없음' : value.toFixed(fractionDigits);

export default function CircuitMetrics({
  corners,
  oneLapLength,
  openingYear,
}: CircuitMetricsProps) {
  const metrics: CircuitMetric[] = [
    {
      label: '1바퀴 길이',
      unit: 'KM',
      value: formatMetricValue(oneLapLength, 3),
    },
    {
      label: '코너 수',
      unit: 'CORNERS',
      value: formatMetricValue(corners),
    },
    {
      label: '개장 연도',
      unit: 'YEAR',
      value: formatMetricValue(openingYear),
    },
  ];

  return (
    <section aria-labelledby="circuit-metrics-heading">
      <p className="hidden text-xs font-semibold text-grand-prix-muted min-[1400px]:block">
        CIRCUIT FACTS
      </p>
      <h2
        className="text-xl font-bold text-grand-prix-text min-[1400px]:mt-1 min-[1400px]:text-2xl"
        id="circuit-metrics-heading"
      >
        주요 정보
      </h2>

      <dl className="mt-4 grid grid-cols-3 gap-2 min-[1400px]:mt-4 min-[1400px]:grid-cols-1 min-[1400px]:gap-4">
        {metrics.map((metric) => {
          const hasValue = metric.value !== '정보 없음';

          return (
            <div
              className="flex min-h-24 min-w-0 flex-col rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-3 min-[1400px]:min-h-[76px] min-[1400px]:flex-row min-[1400px]:items-center min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-row min-[1400px]:px-[18px] min-[1400px]:py-3"
              key={metric.label}
            >
              <dt className="text-[9px] text-grand-prix-muted-mobile min-[1400px]:w-[46%] min-[1400px]:text-xs min-[1400px]:font-medium min-[1400px]:text-grand-prix-muted">
                {metric.label}
              </dt>
              <dd className="mt-auto min-w-0 min-[1400px]:mt-0 min-[1400px]:flex min-[1400px]:flex-1 min-[1400px]:items-baseline min-[1400px]:justify-between min-[1400px]:gap-3">
                <span
                  className={`block break-keep font-bold text-grand-prix-text ${
                    hasValue
                      ? 'text-[17px] min-[1400px]:text-[27px]'
                      : 'text-[11px] min-[1400px]:text-sm'
                  }`}
                >
                  {metric.value}
                </span>
                {hasValue ? (
                  <span className="mt-1 block text-[8px] font-bold text-grand-prix-unit min-[1400px]:mt-0 min-[1400px]:text-[11px] min-[1400px]:font-semibold">
                    {metric.unit}
                  </span>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
