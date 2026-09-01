import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';

type MeasurementKey =
  | 'fastestlap'
  | 'theoretical'
  | 'sector1'
  | 'sector2'
  | 'sector3'
  | 'speedtrap';

interface MeasurementDescription {
  label: string;
  description: string;
}

const DESCRIPTION_BY_KEY: Record<MeasurementKey, MeasurementDescription> = {
  fastestlap: {
    label: '패스티스트 랩',
    description:
      '선수가 이 세션에서 완주한 유효 랩 가운데 가장 빠른 한 바퀴 기록입니다.',
  },
  theoretical: {
    label: '얼티미트 랩',
    description:
      '선수의 섹터 1·2·3 최고 기록을 합산한 이론상 최속 랩입니다. 실제 한 랩에서 나온 기록이 아닐 수 있습니다.',
  },
  sector1: {
    label: '섹터 1',
    description: '출발선부터 첫 번째 섹터 경계까지 기록한 구간 시간입니다.',
  },
  sector2: {
    label: '섹터 2',
    description:
      '첫 번째 섹터 경계부터 두 번째 섹터 경계까지 기록한 구간 시간입니다.',
  },
  sector3: {
    label: '섹터 3',
    description: '두 번째 섹터 경계부터 결승선까지 기록한 구간 시간입니다.',
  },
  speedtrap: {
    label: '스피드 트랩',
    description: '서킷의 지정된 측정 지점에서 기록한 최고 속도입니다.',
  },
};

interface MeasurementInfoTooltipProps {
  measurement: MeasurementKey;
  compact?: boolean;
}

export default function MeasurementInfoTooltip({
  measurement,
  compact = false,
}: MeasurementInfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const content = DESCRIPTION_BY_KEY[measurement];

  return (
    <TooltipProvider>
      <Tooltip onOpenChange={setOpen} open={open}>
        <TooltipTrigger asChild>
          <Button
            aria-label={`${content.label} 측정 기준 보기`}
            className={`h-auto min-w-0 justify-start rounded px-0 py-0 text-inherit underline decoration-dotted underline-offset-4 hover:bg-transparent hover:text-grand-prix-text ${
              compact ? 'text-[10px]' : 'text-xs'
            }`}
            onClick={() => setOpen((current) => !current)}
            type="button"
            variant="ghost"
          >
            {content.label}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-1.5 size-2 shrink-0 rounded-full bg-grand-prix-performance"
            />
            <div>
              <p className="text-sm font-bold">{content.label}</p>
              <p className="mt-1 text-xs leading-5 text-grand-prix-tooltip-text">
                {content.description}
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
