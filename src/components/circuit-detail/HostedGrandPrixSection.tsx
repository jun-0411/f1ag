import { Button } from '@/components/ui/button';
import { getGrandPrixDisplay } from '@/constants/grandPrix';
import type { CircuitGrandPrixItem } from '@/types/circuit';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

interface HostedGrandPrixSectionProps {
  error: Error | null;
  grandPrixItems: CircuitGrandPrixItem[];
  isPending: boolean;
  onRetry: () => void;
}

const sortGrandPrixItems = (
  grandPrixItems: CircuitGrandPrixItem[]
): CircuitGrandPrixItem[] =>
  [...grandPrixItems].sort(
    (left, right) =>
      right.season_year - left.season_year || right.round - left.round
  );

export default function HostedGrandPrixSection({
  error,
  grandPrixItems,
  isPending,
  onRetry,
}: HostedGrandPrixSectionProps) {
  const sortedGrandPrixItems = sortGrandPrixItems(grandPrixItems);

  return (
    <section
      aria-labelledby="hosted-grand-prix-heading"
      className="min-[1400px]:flex min-[1400px]:min-h-[96px] min-[1400px]:items-center min-[1400px]:gap-6 min-[1400px]:rounded-2xl min-[1400px]:border min-[1400px]:border-grand-prix-border min-[1400px]:bg-[#121720] min-[1400px]:px-[22px] min-[1400px]:py-[18px]"
    >
      <div className="shrink-0">
        <p className="hidden text-[10px] font-bold text-grand-prix-primary min-[1400px]:block">
          HOSTED GRAND PRIX
        </p>
        <h2
          className="text-xl font-bold text-grand-prix-text min-[1400px]:mt-1"
          id="hosted-grand-prix-heading"
        >
          이 서킷에서 열린 그랑프리
        </h2>
      </div>

      {isPending ? (
        <div
          aria-label="개최 그랑프리 정보를 불러오는 중"
          className="mt-4 flex animate-pulse flex-col gap-2 motion-reduce:animate-none min-[1400px]:mt-0 min-[1400px]:ml-auto min-[1400px]:flex-row min-[1400px]:flex-wrap min-[1400px]:justify-end"
          role="status"
        >
          {Array.from({ length: 3 }, (_, index) => (
            <div
              className="h-[52px] rounded-[10px] bg-grand-prix-row min-[1400px]:h-[58px] min-[1400px]:w-[138px]"
              key={index}
            />
          ))}
        </div>
      ) : error !== null ? (
        <div className="mt-4 flex min-h-[72px] flex-1 flex-col items-center justify-center gap-3 rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-4 py-3 text-center min-[1400px]:mt-0 min-[1400px]:ml-auto min-[1400px]:min-h-[58px] min-[1400px]:max-w-[576px] min-[1400px]:flex-row min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-row">
          <p className="text-xs leading-5 text-grand-prix-muted">
            개최 이력을 불러오지 못했습니다.
          </p>
          <Button
            className="border-grand-prix-border bg-grand-prix-card text-grand-prix-text hover:bg-grand-prix-row"
            onClick={onRetry}
            size="sm"
            type="button"
            variant="outline"
          >
            다시 시도
          </Button>
        </div>
      ) : sortedGrandPrixItems.length === 0 ? (
        <p className="mt-4 flex min-h-[72px] flex-1 items-center justify-center rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-5 text-center text-xs leading-5 text-grand-prix-muted min-[1400px]:mt-0 min-[1400px]:ml-auto min-[1400px]:min-h-[58px] min-[1400px]:max-w-[576px] min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-row">
          아직 제공된 개최 이력이 없습니다.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2 min-[1400px]:mt-0 min-[1400px]:ml-auto min-[1400px]:flex-row min-[1400px]:flex-wrap min-[1400px]:justify-end">
          {sortedGrandPrixItems.map((grandPrix) => {
            const display = getGrandPrixDisplay(grandPrix.name);

            return (
              <li key={grandPrix.grand_prix_id}>
                <Link
                  aria-label={`${grandPrix.season_year} ${display.koreanName} 상세 보기`}
                  className="group flex h-[52px] w-full items-center gap-3 rounded-[10px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-3 text-grand-prix-text transition-colors hover:border-grand-prix-primary/60 hover:bg-grand-prix-row focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grand-prix-primary motion-reduce:transition-none min-[1400px]:h-[58px] min-[1400px]:w-[138px] min-[1400px]:gap-2 min-[1400px]:border-grand-prix-border min-[1400px]:bg-grand-prix-row min-[1400px]:px-3"
                  to={`/grandprix/${grandPrix.grand_prix_id}`}
                >
                  <span className="text-sm font-bold">
                    {grandPrix.season_year}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11px] text-grand-prix-muted">
                    {display.koreanName}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-grand-prix-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
