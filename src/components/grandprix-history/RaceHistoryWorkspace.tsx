import RaceHistoryChart from '@/components/grandprix-history/RaceHistoryChart';
import RaceHistoryDriverFilter from '@/components/grandprix-history/RaceHistoryDriverFilter';
import RaceHistoryLegend from '@/components/grandprix-history/RaceHistoryLegend';
import {
  RaceHistoryMobileChartDialog,
  RaceHistoryMobileDriverSelection,
} from '@/components/grandprix-history/RaceHistoryMobileDialogs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import type { GrandPrixHistoryResponse } from '@/types/grandprix';
import type { RaceHistoryMetric } from '@/utils/grandPrixHistory';
import { useState } from 'react';

interface RaceHistoryWorkspaceProps {
  history: GrandPrixHistoryResponse;
}

interface MetricOption {
  label: string;
  value: RaceHistoryMetric;
}

const METRIC_OPTIONS: MetricOption[] = [
  { value: 'position', label: '시간에 따른 순위' },
  { value: 'laptime', label: '1랩당 시간' },
  { value: 'gaptime', label: '1위와의 갭' },
];

export default function RaceHistoryWorkspace({
  history,
}: RaceHistoryWorkspaceProps) {
  const [metric, setMetric] = useState<RaceHistoryMetric>('position');
  const [showFlags, setShowFlags] = useState(true);
  const [selectedDriverIds, setSelectedDriverIds] = useState(
    () => new Set(history.driver.slice(0, 5).map((driver) => driver.driver_id))
  );

  const handleDriverToggle = (driverId: number) => {
    setSelectedDriverIds((current) => {
      const next = new Set(current);

      if (next.has(driverId)) {
        next.delete(driverId);
      } else {
        next.add(driverId);
      }

      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedDriverIds(
      new Set(history.driver.map((driver) => driver.driver_id))
    );
  };

  const handleClear = () => {
    setSelectedDriverIds(new Set());
  };

  return (
    <div className="mt-7 space-y-6 min-[1400px]:mt-0 min-[1400px]:rounded-[22px] min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card min-[1400px]:p-6">
      <header>
        <p className="text-[9px] font-bold text-grand-prix-primary min-[1400px]:text-[11px]">
          RACE HISTORY
        </p>
        <h2 className="mt-1 text-xl font-bold text-grand-prix-text min-[1400px]:mt-2 min-[1400px]:text-2xl">
          경기 흐름을 차트로 비교
        </h2>
      </header>

      <div className="flex flex-col gap-4 min-[1400px]:flex-row min-[1400px]:items-center min-[1400px]:justify-between">
        <div
          aria-label="차트 지표"
          className="grid h-12 grid-cols-[1fr_1fr_1.05fr] rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-[3px] min-[1400px]:h-[46px] min-[1400px]:w-[590px] min-[1400px]:grid-cols-3 min-[1400px]:rounded-xl min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-row min-[1400px]:p-0"
          role="group"
        >
          {METRIC_OPTIONS.map((option) => {
            const isActive = metric === option.value;

            return (
              <Button
                aria-pressed={isActive}
                className={`h-10 rounded-[9px] px-1 text-[10px] shadow-none min-[1400px]:h-[44px] min-[1400px]:rounded-xl min-[1400px]:text-sm ${
                  isActive
                    ? 'bg-grand-prix-info font-bold text-grand-prix-page hover:bg-grand-prix-info min-[1400px]:bg-grand-prix-primary min-[1400px]:text-white min-[1400px]:hover:bg-grand-prix-primary'
                    : 'bg-grand-prix-row font-medium text-grand-prix-muted-mobile hover:bg-grand-prix-row/80 min-[1400px]:text-grand-prix-muted'
                }`}
                key={option.value}
                onClick={() => setMetric(option.value)}
                type="button"
                variant="ghost"
              >
                {option.label}
              </Button>
            );
          })}
        </div>

        <div className="flex h-[52px] items-center justify-between rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-3.5 min-[1400px]:h-[46px] min-[1400px]:w-[248px] min-[1400px]:rounded-xl min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-row min-[1400px]:px-4">
          <p className="font-bold text-grand-prix-text">
            <span className="text-[11px] min-[1400px]:hidden">
              드라이버 {selectedDriverIds.size}명 선택
            </span>
            <span className="hidden text-[13px] min-[1400px]:inline">
              플래그 표시
            </span>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-grand-prix-muted-mobile min-[1400px]:hidden">
              플래그 표시
            </span>
            <Switch
              aria-label="경기 이벤트 플래그 구간 표시"
              checked={showFlags}
              className="h-5 w-[30px] p-0.5 min-[1400px]:h-7 min-[1400px]:w-14 min-[1400px]:p-1 [&_[data-slot=switch-thumb]]:size-4 data-[state=checked]:[&_[data-slot=switch-thumb]]:translate-x-[10px] min-[1400px]:[&_[data-slot=switch-thumb]]:size-5 min-[1400px]:data-[state=checked]:[&_[data-slot=switch-thumb]]:translate-x-7"
              onCheckedChange={setShowFlags}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 min-[1400px]:grid-cols-[minmax(0,1fr)_258px] min-[1400px]:gap-5">
        <RaceHistoryChart
          drivers={history.driver}
          flags={history.flags}
          metric={metric}
          selectedDriverIds={selectedDriverIds}
          showFlags={showFlags}
        />
        <RaceHistoryDriverFilter
          drivers={history.driver}
          onClear={handleClear}
          onSelectAll={handleSelectAll}
          onToggle={handleDriverToggle}
          selectedDriverIds={selectedDriverIds}
        />
      </div>

      <RaceHistoryMobileDriverSelection
        drivers={history.driver}
        onClear={handleClear}
        onSelectAll={handleSelectAll}
        onToggle={handleDriverToggle}
        selectedDriverIds={selectedDriverIds}
      />

      <div>
        <RaceHistoryLegend />
        <RaceHistoryMobileChartDialog
          drivers={history.driver}
          flags={history.flags}
          metric={metric}
          selectedDriverIds={selectedDriverIds}
          showFlags={showFlags}
        />
      </div>
    </div>
  );
}
