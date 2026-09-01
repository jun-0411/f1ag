import { Button } from '@/components/ui/button';

export type TimeMode = 'mine' | 'local';

interface TimeZoneToggleProps {
  timeMode: TimeMode;
  isLocalTimeAvailable: boolean;
  onTimeModeChange: (timeMode: TimeMode) => void;
}

export default function TimeZoneToggle({
  timeMode,
  isLocalTimeAvailable,
  onTimeModeChange,
}: TimeZoneToggleProps) {
  const handleMyTimeClick = () => {
    onTimeModeChange('mine');
  };

  const handleLocalTimeClick = () => {
    onTimeModeChange('local');
  };

  return (
    <div
      aria-label="일정 시간대"
      className="flex h-[34px] w-[158px] rounded-[9px] bg-grand-prix-row min-[1400px]:h-11 min-[1400px]:w-[252px] min-[1400px]:rounded-xl min-[1400px]:border min-[1400px]:border-grand-prix-border"
      role="group"
    >
      <Button
        aria-pressed={timeMode === 'mine'}
        className={`h-[34px] w-[78px] rounded-[9px] text-[10px] font-bold shadow-none min-[1400px]:h-11 min-[1400px]:w-[126px] min-[1400px]:rounded-xl min-[1400px]:text-sm ${
          timeMode === 'mine'
            ? 'bg-grand-prix-info text-grand-prix-page hover:bg-grand-prix-info'
            : 'text-grand-prix-muted-mobile hover:bg-grand-prix-row hover:text-grand-prix-text min-[1400px]:text-grand-prix-text'
        }`}
        onClick={handleMyTimeClick}
        type="button"
        variant="ghost"
      >
        내 시간
      </Button>
      <Button
        aria-describedby={
          isLocalTimeAvailable ? undefined : 'local-time-unavailable'
        }
        aria-pressed={timeMode === 'local'}
        className={`h-[34px] w-20 rounded-[9px] text-[10px] font-bold shadow-none opacity-100 min-[1400px]:h-11 min-[1400px]:w-[126px] min-[1400px]:rounded-xl min-[1400px]:text-sm ${
          timeMode === 'local'
            ? 'bg-grand-prix-info text-grand-prix-page hover:bg-grand-prix-info'
            : 'text-grand-prix-muted-mobile hover:bg-grand-prix-row hover:text-grand-prix-text min-[1400px]:text-grand-prix-text'
        }`}
        disabled={!isLocalTimeAvailable}
        onClick={handleLocalTimeClick}
        title={
          isLocalTimeAvailable
            ? undefined
            : '서킷 현지 시간 정보가 준비되지 않았습니다.'
        }
        type="button"
        variant="ghost"
      >
        현지 시간
      </Button>
      {!isLocalTimeAvailable ? (
        <span className="sr-only" id="local-time-unavailable">
          서킷 현지 시간 정보가 준비되지 않아 선택할 수 없습니다.
        </span>
      ) : null}
    </div>
  );
}
