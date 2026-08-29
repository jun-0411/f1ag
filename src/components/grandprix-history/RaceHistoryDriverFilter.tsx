import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { GrandPrixHistoryDriver } from '@/types/grandprix';
import { getHistoryDriverColor } from '@/utils/grandPrixHistory';
import type { CSSProperties } from 'react';

interface RaceHistoryDriverFilterProps {
  drivers: GrandPrixHistoryDriver[];
  onClear: () => void;
  onSelectAll: () => void;
  onToggle: (driverId: number) => void;
  selectedDriverIds: Set<number>;
}

interface DriverSelectionRowProps {
  driver: GrandPrixHistoryDriver;
  isSelected: boolean;
  onToggle: (driverId: number) => void;
}

function DriverSelectionRow({
  driver,
  isSelected,
  onToggle,
}: DriverSelectionRowProps) {
  const color = getHistoryDriverColor(driver);

  return (
    <label className="flex min-h-9 cursor-pointer items-center gap-2.5 rounded-[7px] px-2 py-1.5 odd:bg-grand-prix-card/60 hover:bg-grand-prix-card">
      <span
        aria-hidden="true"
        className="h-[3px] w-[18px] shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="w-9 shrink-0 text-[11px] font-bold text-grand-prix-text">
        {driver.name}
      </span>
      <span className="min-w-0 flex-1 truncate text-[10px] text-grand-prix-muted-mobile">
        {driver.team}
      </span>
      <Checkbox
        aria-label={`${driver.name} ${isSelected ? '선택 해제' : '선택'}`}
        checked={isSelected}
        className="data-[state=checked]:bg-[var(--driver-color)]"
        onCheckedChange={() => onToggle(driver.driver_id)}
        style={{ '--driver-color': color } as CSSProperties}
      />
    </label>
  );
}

export default function RaceHistoryDriverFilter({
  drivers,
  onClear,
  onSelectAll,
  onToggle,
  selectedDriverIds,
}: RaceHistoryDriverFilterProps) {
  return (
    <section className="hidden h-[720px] rounded-[16px] border border-grand-prix-border bg-grand-prix-deep p-2.5 min-[1400px]:block">
      <div className="flex items-start justify-between px-2 pt-1.5">
        <div>
          <h3 className="text-lg font-bold text-grand-prix-text">드라이버</h3>
          <p className="mt-1 text-[11px] text-grand-prix-muted">
            {selectedDriverIds.size} / {drivers.length} 선택
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            className="h-7 px-2 text-[10px] text-grand-prix-primary hover:bg-grand-prix-row"
            onClick={onSelectAll}
            type="button"
            variant="ghost"
          >
            전체 선택
          </Button>
          <Button
            className="h-7 px-2 text-[10px] text-grand-prix-muted hover:bg-grand-prix-row hover:text-grand-prix-text"
            onClick={onClear}
            type="button"
            variant="ghost"
          >
            전체해제
          </Button>
        </div>
      </div>
      <div className="mt-3 h-[642px] space-y-0.5 overflow-y-auto pr-1">
        {drivers.map((driver) => (
          <DriverSelectionRow
            driver={driver}
            isSelected={selectedDriverIds.has(driver.driver_id)}
            key={driver.driver_id}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}

export { DriverSelectionRow };
