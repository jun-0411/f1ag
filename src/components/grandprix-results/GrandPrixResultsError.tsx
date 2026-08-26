import { Button } from '@/components/ui/button';

interface GrandPrixResultsErrorProps {
  onRetry: () => void;
}

export default function GrandPrixResultsError({
  onRetry,
}: GrandPrixResultsErrorProps) {
  return (
    <div className="mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-6 text-center min-[1400px]:mt-0 min-[1400px]:rounded-[22px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-card">
      <h2 className="text-xl font-bold text-grand-prix-text">
        경기 결과를 불러오지 못했습니다
      </h2>
      <p className="mt-2 text-sm text-grand-prix-muted-mobile">
        잠시 후 다시 시도해 주세요.
      </p>
      <Button
        className="mt-6 bg-grand-prix-primary text-white hover:bg-grand-prix-primary/90"
        onClick={onRetry}
        type="button"
      >
        다시 시도
      </Button>
    </div>
  );
}
