import RaceHistoryChart from '@/components/grandprix-history/RaceHistoryChart';
import { DriverSelectionRow } from '@/components/grandprix-history/RaceHistoryDriverFilter';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type {
  GrandPrixHistoryDriver,
  GrandPrixHistoryFlag,
} from '@/types/grandprix';
import {
  type RaceHistoryMetric,
  getHistoryDriverColor,
} from '@/utils/grandPrixHistory';
import { ArrowRight } from 'lucide-react';

interface RaceHistoryMobileDriverSelectionProps {
  drivers: GrandPrixHistoryDriver[];
  onClear: () => void;
  onSelectAll: () => void;
  onToggle: (driverId: number) => void;
  selectedDriverIds: Set<number>;
}

export function RaceHistoryMobileDriverSelection({
  drivers,
  onClear,
  onSelectAll,
  onToggle,
  selectedDriverIds,
}: RaceHistoryMobileDriverSelectionProps) {
  const selectedDrivers = drivers.filter((driver) =>
    selectedDriverIds.has(driver.driver_id)
  );

  return (
    <section
      className="min-[1400px]:hidden"
      aria-labelledby="driver-selection-title"
    >
      <h3
        className="mb-3 text-xl font-bold text-grand-prix-text"
        id="driver-selection-title"
      >
        드라이버 선택
      </h3>
      <div className="rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile p-3">
        <p className="text-right text-[9px] text-grand-prix-muted-mobile">
          {selectedDriverIds.size} / {drivers.length} 선택
        </p>
        <div className="mt-1 space-y-1">
          {selectedDrivers.length === 0 ? (
            <p className="py-6 text-center text-xs text-grand-prix-muted-mobile">
              선택된 드라이버가 없습니다.
            </p>
          ) : (
            selectedDrivers.slice(0, 5).map((driver) => (
              <div
                className="flex h-9 items-center gap-2.5 px-1.5"
                key={driver.driver_id}
              >
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: getHistoryDriverColor(driver) }}
                />
                <span className="w-9 text-[10px] font-bold text-grand-prix-text">
                  {driver.name}
                </span>
                <span className="min-w-0 flex-1 truncate text-[9px] text-grand-prix-muted-mobile">
                  {driver.team}
                </span>
                <span
                  aria-label="선택됨"
                  className="flex size-6 items-center justify-center rounded-[6px] text-[11px] font-bold text-white"
                  style={{ backgroundColor: getHistoryDriverColor(driver) }}
                >
                  ✓
                </span>
              </div>
            ))
          )}
          {selectedDrivers.length > 5 ? (
            <p className="px-1.5 py-1 text-[10px] text-grand-prix-muted-mobile">
              외 {selectedDrivers.length - 5}명
            </p>
          ) : null}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="mt-2 h-11 w-full justify-center rounded-[11px] border-grand-prix-border-mobile bg-grand-prix-row text-[11px] font-bold text-grand-prix-text hover:bg-grand-prix-row/80"
              type="button"
              variant="outline"
            >
              다른 드라이버 선택
              <ArrowRight className="ml-auto size-4 text-grand-prix-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>드라이버 선택</DialogTitle>
              <DialogDescription>
                차트에서 비교할 드라이버를 선택하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-grand-prix-muted-mobile">
                {selectedDriverIds.size} / {drivers.length} 선택
              </p>
              <div className="flex gap-1">
                <Button
                  className="text-grand-prix-info hover:bg-grand-prix-row"
                  onClick={onSelectAll}
                  type="button"
                  variant="ghost"
                >
                  전체 선택
                </Button>
                <Button
                  className="text-grand-prix-muted-mobile hover:bg-grand-prix-row hover:text-grand-prix-text"
                  onClick={onClear}
                  type="button"
                  variant="ghost"
                >
                  전체해제
                </Button>
              </div>
            </div>
            <div className="mt-3 max-h-[60vh] space-y-0.5 overflow-y-auto pr-1">
              {drivers.map((driver) => (
                <DriverSelectionRow
                  driver={driver}
                  isSelected={selectedDriverIds.has(driver.driver_id)}
                  key={driver.driver_id}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

interface RaceHistoryMobileChartDialogProps {
  drivers: GrandPrixHistoryDriver[];
  flags: GrandPrixHistoryFlag[];
  metric: RaceHistoryMetric;
  selectedDriverIds: Set<number>;
  showFlags: boolean;
}

export function RaceHistoryMobileChartDialog({
  drivers,
  flags,
  metric,
  selectedDriverIds,
  showFlags,
}: RaceHistoryMobileChartDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="mt-3 h-11 w-full justify-center rounded-[11px] border-grand-prix-border-mobile bg-grand-prix-row text-[11px] font-bold text-grand-prix-text hover:bg-grand-prix-row/80 min-[1400px]:hidden"
          type="button"
          variant="outline"
        >
          차트 상세 보기
          <ArrowRight className="ml-auto size-4 text-grand-prix-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-24px)] overflow-hidden p-4">
        <DialogHeader>
          <DialogTitle>레이스 히스토리 상세 차트</DialogTitle>
          <DialogDescription>
            좌우로 스크롤해 전체 랩을 자세히 확인하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5 overflow-x-auto pb-2">
          <RaceHistoryChart
            detailed
            drivers={drivers}
            flags={flags}
            metric={metric}
            selectedDriverIds={selectedDriverIds}
            showFlags={showFlags}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
