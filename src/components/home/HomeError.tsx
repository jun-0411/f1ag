import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface HomeErrorProps {
  error: Error;
  onRetry: () => void;
}

export default function HomeError({ error, onRetry }: HomeErrorProps) {
  return (
    <section className="rounded-[22px] border border-home-border bg-home-card px-6 py-16 text-center">
      <h1 className="text-xl font-bold text-home-text">
        Home 데이터를 불러오지 못했습니다.
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-home-muted">
        {error.message || '잠시 후 다시 시도해 주세요.'}
      </p>
      <Button
        className="mt-6 bg-home-primary px-5 text-white hover:bg-home-primary/85"
        onClick={onRetry}
        type="button"
      >
        <RefreshCw aria-hidden="true" className="size-4" />
        다시 시도
      </Button>
    </section>
  );
}
