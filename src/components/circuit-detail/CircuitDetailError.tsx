import { Button } from '@/components/ui/button';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router';

interface CircuitDetailErrorProps {
  isNotFound: boolean;
  onRetry?: () => void;
}

export default function CircuitDetailError({
  isNotFound,
  onRetry,
}: CircuitDetailErrorProps) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-grand-prix-page px-4 py-12">
      <div className="w-full max-w-lg rounded-[22px] border border-grand-prix-border bg-grand-prix-card p-8 text-center">
        <p className="text-[11px] font-bold text-grand-prix-primary">CIRCUIT</p>
        <h1 className="mt-3 text-xl font-bold text-grand-prix-text">
          {isNotFound
            ? '해당 서킷을 찾을 수 없습니다.'
            : '서킷 정보를 불러오지 못했습니다.'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-grand-prix-muted">
          {isNotFound
            ? '주소의 Circuit ID를 확인하거나 홈에서 다른 경기를 선택해 주세요.'
            : '잠시 후 다시 시도해 주세요.'}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {!isNotFound && onRetry !== undefined ? (
            <Button
              className="bg-grand-prix-primary text-white hover:bg-grand-prix-primary/80"
              onClick={onRetry}
              type="button"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              다시 시도
            </Button>
          ) : null}
          <Button
            asChild
            className="border-grand-prix-border bg-grand-prix-card text-grand-prix-text hover:bg-grand-prix-row"
            variant="outline"
          >
            <Link to="/">
              <ChevronLeft aria-hidden="true" className="size-4" />
              Home으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
