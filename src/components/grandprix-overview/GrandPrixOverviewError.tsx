import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface GrandPrixOverviewErrorProps {
  onRetry: () => void;
}

export default function GrandPrixOverviewError({
  onRetry,
}: GrandPrixOverviewErrorProps) {
  return (
    <section className="mt-7 rounded-[22px] border border-grand-prix-border bg-grand-prix-card px-6 py-16 text-center min-[1400px]:mt-0">
      <h2 className="text-xl font-bold text-grand-prix-text">
        그랑프리 개요를 불러오지 못했습니다.
      </h2>
      <p className="mt-3 text-sm text-grand-prix-muted">
        잠시 후 다시 시도해 주세요.
      </p>
      <Button
        className="mt-6 bg-grand-prix-primary text-white hover:bg-grand-prix-primary/80"
        onClick={onRetry}
        type="button"
      >
        <RotateCcw aria-hidden="true" className="size-4" />
        다시 시도
      </Button>
    </section>
  );
}
