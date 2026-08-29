import type { GrandPrixHistoryDriver } from '@/types/grandprix';
import {
  type RaceHistoryMetric,
  createHistoryChartData,
  findTireStint,
  formatHistoryMetricValue,
  getHistoryDriverColor,
  getHistoryDriverDataKey,
  getHistoryMaxLap,
  getHistoryMaxPosition,
  getTireDisplay,
  getTireStintMetricValue,
  hasHistoryMetricData,
  normalizeHistoryFlags,
} from '@/utils/grandPrixHistory';
import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  type MouseHandlerDataParam,
  ReferenceArea,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface RaceHistoryChartProps {
  detailed?: boolean;
  drivers: GrandPrixHistoryDriver[];
  flags: Parameters<typeof normalizeHistoryFlags>[0];
  metric: RaceHistoryMetric;
  selectedDriverIds: Set<number>;
  showFlags: boolean;
}

interface MetricDisplay {
  emptyMessage: string;
  hint: string;
  title: string;
}

interface DriverLineDistance {
  distance: number;
  driverId: number;
}

interface DriverLineYCache {
  detailed: boolean;
  drivers: GrandPrixHistoryDriver[];
  metric: RaceHistoryMetric;
  selectedDriverIds: Set<number>;
  values: Map<string, number>;
}

const DRIVER_LINE_CLASS_PREFIX = 'race-history-driver-line-';
const HOVER_ACQUIRE_DISTANCE = 8;
const HOVER_RELEASE_DISTANCE = 14;
const HOVER_SWITCH_ADVANTAGE = 4;
const PATH_SEARCH_ITERATIONS = 12;

// 여러 선의 투명 영역이 겹치는 오인식을 피하기 위해 실제 SVG 경로에서 포인터와 가장 가까운 Y 좌표를 찾는다.
const getPathYAtX = (path: SVGPathElement, targetX: number): number | null => {
  let totalLength: number;

  try {
    totalLength = path.getTotalLength();
  } catch {
    return null;
  }

  if (totalLength <= 0) {
    return null;
  }

  let lowerLength = 0;
  let upperLength = totalLength;

  for (let iteration = 0; iteration < PATH_SEARCH_ITERATIONS; iteration += 1) {
    const middleLength = (lowerLength + upperLength) / 2;
    const middlePoint = path.getPointAtLength(middleLength);

    if (middlePoint.x < targetX) {
      lowerLength = middleLength;
    } else {
      upperLength = middleLength;
    }
  }

  const lowerPoint = path.getPointAtLength(lowerLength);
  const upperPoint = path.getPointAtLength(upperLength);

  return Math.abs(lowerPoint.x - targetX) <= Math.abs(upperPoint.x - targetX)
    ? lowerPoint.y
    : upperPoint.y;
};

const getNextHoveredDriverId = (
  distances: DriverLineDistance[],
  currentDriverId: number | null
): number | null => {
  const nearestDriver = distances.reduce<DriverLineDistance | null>(
    (nearest, candidate) =>
      nearest === null || candidate.distance < nearest.distance
        ? candidate
        : nearest,
    null
  );

  if (nearestDriver === null) {
    return null;
  }

  const currentDriver = distances.find(
    (candidate) => candidate.driverId === currentDriverId
  );

  if (
    currentDriver !== undefined &&
    currentDriver.distance <= HOVER_RELEASE_DISTANCE
  ) {
    const shouldSwitchDriver =
      nearestDriver.driverId !== currentDriver.driverId &&
      nearestDriver.distance + HOVER_SWITCH_ADVANTAGE < currentDriver.distance;

    return shouldSwitchDriver ? nearestDriver.driverId : currentDriver.driverId;
  }

  return nearestDriver.distance <= HOVER_ACQUIRE_DISTANCE
    ? nearestDriver.driverId
    : null;
};

const METRIC_DISPLAY: Record<RaceHistoryMetric, MetricDisplay> = {
  position: {
    title: '시간에 따른 순위',
    hint: '1위가 위쪽에 표시됩니다.',
    emptyMessage: '순위 데이터가 아직 제공되지 않습니다.',
  },
  laptime: {
    title: '1랩당 시간',
    hint: '랩타임이 짧을수록 위쪽에 표시됩니다.',
    emptyMessage: '랩타임 데이터가 아직 제공되지 않습니다.',
  },
  gaptime: {
    title: '1위와의 갭',
    hint: '선두와의 시간 차이를 초 단위로 표시합니다.',
    emptyMessage: '1위와의 갭 데이터가 아직 제공되지 않습니다.',
  },
};

export default function RaceHistoryChart({
  detailed = false,
  drivers,
  flags,
  metric,
  selectedDriverIds,
  showFlags,
}: RaceHistoryChartProps) {
  const [hoveredDriverId, setHoveredDriverId] = useState<number | null>(null);
  const lineYCacheRef = useRef<DriverLineYCache>({
    detailed,
    drivers,
    metric,
    selectedDriverIds,
    values: new Map(),
  });
  const chartData = createHistoryChartData(drivers, metric);
  const selectedDrivers = drivers.filter((driver) =>
    selectedDriverIds.has(driver.driver_id)
  );
  const maximumLap = getHistoryMaxLap(drivers);
  const flagRanges = normalizeHistoryFlags(flags, maximumLap);
  const metricDisplay = METRIC_DISPLAY[metric];
  const hasData = hasHistoryMetricData(chartData, selectedDriverIds);
  const maximumPosition = getHistoryMaxPosition(drivers);
  const yAxisDomain =
    metric === 'position' ? [1, maximumPosition] : ['auto', 'auto'];

  if (
    lineYCacheRef.current.detailed !== detailed ||
    lineYCacheRef.current.drivers !== drivers ||
    lineYCacheRef.current.metric !== metric ||
    lineYCacheRef.current.selectedDriverIds !== selectedDriverIds
  ) {
    lineYCacheRef.current = {
      detailed,
      drivers,
      metric,
      selectedDriverIds,
      values: new Map(),
    };
  }

  const handleChartMouseMove = (
    chartState: MouseHandlerDataParam,
    event: ReactMouseEvent<SVGGraphicsElement>
  ) => {
    const activeCoordinate = chartState.activeCoordinate;
    const lapNumber = Number(chartState.activeLabel);

    if (
      activeCoordinate === undefined ||
      !Number.isInteger(lapNumber) ||
      lapNumber < 1 ||
      lapNumber > chartData.length
    ) {
      setHoveredDriverId(null);
      return;
    }

    const activeLapData = chartData[lapNumber - 1];
    const distances = selectedDrivers.flatMap<DriverLineDistance>((driver) => {
      const dataKey = getHistoryDriverDataKey(driver.driver_id);
      if (activeLapData[dataKey] === null) {
        return [];
      }

      const cacheKey = `${driver.driver_id}-${lapNumber}`;
      const cachedLineY = lineYCacheRef.current.values.get(cacheKey);
      if (cachedLineY !== undefined) {
        return [
          {
            driverId: driver.driver_id,
            distance: Math.abs(cachedLineY - activeCoordinate.y),
          },
        ];
      }

      const linePath = event.currentTarget.querySelector<SVGPathElement>(
        `.${DRIVER_LINE_CLASS_PREFIX}${driver.driver_id} .recharts-line-curve`
      );
      if (linePath === null) {
        return [];
      }

      const lineY = getPathYAtX(linePath, activeCoordinate.x);
      if (lineY === null) {
        return [];
      }

      lineYCacheRef.current.values.set(cacheKey, lineY);

      return [
        {
          driverId: driver.driver_id,
          distance: Math.abs(lineY - activeCoordinate.y),
        },
      ];
    });

    setHoveredDriverId((currentDriverId) =>
      getNextHoveredDriverId(distances, currentDriverId)
    );
  };

  if (maximumLap === 0) {
    return (
      <ChartShell detailed={detailed} metricDisplay={metricDisplay}>
        <ChartEmptyState message="랩 데이터가 아직 없습니다." />
      </ChartShell>
    );
  }

  if (selectedDrivers.length === 0) {
    return (
      <ChartShell detailed={detailed} metricDisplay={metricDisplay}>
        <ChartEmptyState message="비교할 드라이버를 선택해 주세요." />
      </ChartShell>
    );
  }

  if (!hasData) {
    return (
      <ChartShell detailed={detailed} metricDisplay={metricDisplay}>
        <ChartEmptyState message={metricDisplay.emptyMessage} />
      </ChartShell>
    );
  }

  return (
    <ChartShell detailed={detailed} metricDisplay={metricDisplay}>
      <div
        aria-label={`${metricDisplay.title} 차트. ${selectedDrivers.length}명의 드라이버, 총 ${maximumLap}랩.`}
        className={
          detailed
            ? 'h-[560px] min-w-[760px]'
            : 'h-[340px] min-[1400px]:h-[610px]'
        }
        role="img"
      >
        <ResponsiveContainer
          height="100%"
          onResize={() => lineYCacheRef.current.values.clear()}
          width="100%"
        >
          <ComposedChart
            data={chartData}
            margin={
              detailed
                ? { top: 26, right: 30, bottom: 20, left: 12 }
                : { top: 26, right: 18, bottom: 14, left: 0 }
            }
            onMouseLeave={() => setHoveredDriverId(null)}
            onMouseMove={handleChartMouseMove}
          >
            <CartesianGrid
              horizontal
              stroke="#303a4b"
              strokeOpacity={0.62}
              vertical
            />
            <XAxis
              dataKey="lap"
              interval="preserveStartEnd"
              minTickGap={24}
              stroke="#6f7a8d"
              tick={{ fill: '#98a2b3', fontSize: detailed ? 11 : 9 }}
              tickLine={false}
              type="number"
              domain={[1, maximumLap]}
            />
            <YAxis
              allowDecimals={metric !== 'position'}
              domain={yAxisDomain}
              reversed
              stroke="#6f7a8d"
              tick={{ fill: '#98a2b3', fontSize: detailed ? 11 : 9 }}
              tickFormatter={(value) => {
                if (metric === 'laptime') {
                  return formatHistoryMetricValue(metric, Number(value));
                }

                if (metric === 'gaptime') {
                  return `+${Number(value).toFixed(1)}`;
                }

                return String(Math.round(Number(value)));
              }}
              tickLine={false}
              width={metric === 'laptime' ? 54 : 34}
            />

            {showFlags
              ? flagRanges.map((range) => (
                  <ReferenceArea
                    fill={range.type === 'red' ? '#ff2442' : '#ffd24a'}
                    fillOpacity={range.type === 'red' ? 0.18 : 0.15}
                    key={`${range.type}-${range.startLap}-${range.endLap}`}
                    x1={Math.max(1, range.startLap - 0.5)}
                    x2={Math.min(maximumLap, range.endLap + 0.5)}
                  />
                ))
              : null}

            <Tooltip
              content={({ active, label, payload }) => {
                if (
                  !active ||
                  hoveredDriverId === null ||
                  payload === undefined ||
                  payload.length === 0
                ) {
                  return null;
                }

                const lapNumber = Number(label);
                const hoveredDriver = selectedDrivers.find(
                  (driver) => driver.driver_id === hoveredDriverId
                );
                const hoveredDataKey = getHistoryDriverDataKey(hoveredDriverId);
                const hoveredPayload = payload.find(
                  (item) => item.name === hoveredDataKey
                );

                if (
                  hoveredDriver === undefined ||
                  hoveredPayload === undefined
                ) {
                  return null;
                }

                const numericValue = Number(hoveredPayload.value);
                const tire = findTireStint(hoveredDriver, lapNumber);
                const isTireChangeLap = tire?.startlap === lapNumber;

                return (
                  <div className="max-h-72 max-w-56 overflow-y-auto rounded-xl border border-grand-prix-border bg-grand-prix-row p-3 text-[11px] shadow-xl">
                    <p className="font-bold text-grand-prix-primary">
                      LAP {lapNumber}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-bold text-grand-prix-text">
                          {hoveredDriver.name}
                        </span>
                        <span className="text-grand-prix-muted">
                          {formatHistoryMetricValue(metric, numericValue)}
                          {tire === null || isTireChangeLap
                            ? ''
                            : ` · ${getTireDisplay(tire.tire_type).label}`}
                        </span>
                      </div>
                      {isTireChangeLap ? (
                        <div className="flex items-center justify-between gap-4 border-t border-grand-prix-border pt-1.5">
                          <span className="font-medium text-grand-prix-muted">
                            타이어 교체
                          </span>
                          <span className="font-bold text-grand-prix-text">
                            {getTireDisplay(tire.tire_type).label} · LAP{' '}
                            {tire.startlap}–{tire.endlap}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              }}
              cursor={
                hoveredDriverId === null
                  ? false
                  : { stroke: '#98a2b3', strokeDasharray: '3 3' }
              }
            />

            {selectedDrivers.map((driver) => (
              <Line
                activeDot={
                  hoveredDriverId === driver.driver_id
                    ? { r: detailed ? 5 : 4 }
                    : false
                }
                className={`${DRIVER_LINE_CLASS_PREFIX}${driver.driver_id}`}
                connectNulls={false}
                dataKey={getHistoryDriverDataKey(driver.driver_id)}
                dot={false}
                isAnimationActive={false}
                key={driver.driver_id}
                name={getHistoryDriverDataKey(driver.driver_id)}
                stroke={getHistoryDriverColor(driver)}
                strokeOpacity={
                  hoveredDriverId === null ||
                  hoveredDriverId === driver.driver_id
                    ? 1
                    : 0.25
                }
                strokeWidth={
                  hoveredDriverId === driver.driver_id
                    ? detailed
                      ? 3
                      : 2.75
                    : detailed
                      ? 2.5
                      : 2
                }
                type="linear"
              />
            ))}

            {selectedDrivers.flatMap((driver) =>
              driver.tire.flatMap((stint) => {
                const value = getTireStintMetricValue(driver, stint, metric);
                if (value === null) {
                  return [];
                }

                const tireDisplay = getTireDisplay(stint.tire_type);

                return [
                  <ReferenceDot
                    fill={tireDisplay.color}
                    key={`${driver.driver_id}-${stint.startlap}-${metric}`}
                    r={detailed ? 5 : 4}
                    stroke="#0b0d12"
                    strokeWidth={2}
                    style={{ pointerEvents: 'none' }}
                    x={stint.startlap}
                    y={value}
                  />,
                ];
              })
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <ul className="sr-only">
        {selectedDrivers.flatMap((driver) =>
          driver.tire.map((stint) => (
            <li key={`${driver.driver_id}-${stint.startlap}`}>
              {driver.name}, {stint.startlap}랩부터 {stint.endlap}랩까지{' '}
              {getTireDisplay(stint.tire_type).label}
            </li>
          ))
        )}
      </ul>
    </ChartShell>
  );
}

interface ChartShellProps {
  children: ReactNode;
  detailed: boolean;
  metricDisplay: MetricDisplay;
}

function ChartShell({ children, detailed, metricDisplay }: ChartShellProps) {
  return (
    <section
      className={
        detailed
          ? 'min-w-[760px] rounded-[14px] bg-grand-prix-deep p-5'
          : 'rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-4 min-[1400px]:h-[720px] min-[1400px]:rounded-[16px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-deep min-[1400px]:p-6'
      }
    >
      <h3 className="text-base font-bold text-grand-prix-text min-[1400px]:text-lg">
        {metricDisplay.title}
      </h3>
      <p className="mt-1 hidden text-xs text-grand-prix-muted min-[1400px]:block">
        {metricDisplay.hint}
      </p>
      <div className="mt-3 min-[1400px]:mt-5">{children}</div>
    </section>
  );
}

function ChartEmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-[340px] items-center justify-center rounded-xl border border-dashed border-grand-prix-border-mobile px-6 text-center text-sm text-grand-prix-muted-mobile min-[1400px]:h-[610px] min-[1400px]:border-grand-prix-border">
      {message}
    </div>
  );
}
