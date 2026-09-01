import ChampionshipRow, {
  type ChampionshipRowItem,
} from '@/components/home/ChampionshipRow';
import { Button } from '@/components/ui/button';
import { CURRENT_SEASON } from '@/constants/grandPrix';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ChampionshipSectionProps {
  title: string;
  items: ChampionshipRowItem[];
  mobileLimit: number;
  paginate?: boolean;
}

const PAGE_SIZE = 11;

export default function ChampionshipSection({
  title,
  items,
  mobileLimit,
  paginate = false,
}: ChampionshipSectionProps) {
  const [page, setPage] = useState(0);
  const totalPages = paginate
    ? Math.max(1, Math.ceil(items.length / PAGE_SIZE))
    : 1;
  const currentPage = Math.min(page, totalPages - 1);
  const desktopItems = paginate
    ? items.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    : items;
  const mobileItems = items.slice(0, mobileLimit);

  const handlePreviousPage = () => {
    setPage((previousPage) => Math.max(0, previousPage - 1));
  };

  const handleNextPage = () => {
    setPage((previousPage) => Math.min(totalPages - 1, previousPage + 1));
  };

  return (
    <section className="min-w-0 md:flex md:h-[626px] md:flex-col md:rounded-[22px] md:border md:border-home-border md:bg-home-card md:p-3">
      <div className="mb-3 md:mb-0 md:px-2 md:pt-1">
        <p className="hidden text-[10px] leading-4 font-bold text-home-primary md:block">
          {CURRENT_SEASON} SEASON
        </p>
        <h2 className="text-[18px] leading-7 font-bold text-home-text md:mt-1 md:text-xl">
          {title}
        </h2>
      </div>

      <div className="space-y-1.5 md:hidden">
        {mobileItems.length > 0 ? (
          mobileItems.map((item) => (
            <ChampionshipRow compact item={item} key={item.id} />
          ))
        ) : (
          <p className="rounded-xl border border-home-border bg-home-card p-5 text-sm text-home-muted">
            표시할 순위 데이터가 없습니다.
          </p>
        )}
      </div>

      <div className="mt-2 hidden md:block">
        <div className="grid h-7 grid-cols-[30px_30px_minmax(0,1fr)_52px_34px] items-center gap-x-3 border-home-border border-b px-2 text-[9px] font-bold text-home-muted">
          <span>순위</span>
          <span>팀</span>
          <span>이름</span>
          <span className="justify-self-end">포인트</span>
          <span className="justify-self-end">변동</span>
        </div>

        <div className="mt-1">
          {desktopItems.length > 0 ? (
            desktopItems.map((item) => (
              <ChampionshipRow item={item} key={item.id} />
            ))
          ) : (
            <p className="py-20 text-center text-sm text-home-muted">
              표시할 순위 데이터가 없습니다.
            </p>
          )}
        </div>
      </div>

      {paginate && totalPages > 1 ? (
        <div className="mt-auto hidden h-12 items-end justify-end gap-2 px-1 md:flex">
          <span className="mr-auto pb-2 text-[9px] text-home-muted">
            {currentPage * PAGE_SIZE + 1}–
            {Math.min((currentPage + 1) * PAGE_SIZE, items.length)}위
          </span>
          <Button
            aria-label="이전 순위 페이지"
            className="size-9 border-home-border bg-home-elevated text-home-text hover:bg-home-row hover:text-home-text"
            disabled={currentPage === 0}
            onClick={handlePreviousPage}
            size="icon"
            type="button"
            variant="outline"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </Button>
          <Button
            aria-label="다음 순위 페이지"
            className="size-9 border-home-border bg-home-elevated text-home-text hover:bg-home-row hover:text-home-text"
            disabled={currentPage >= totalPages - 1}
            onClick={handleNextPage}
            size="icon"
            type="button"
            variant="outline"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      ) : null}
    </section>
  );
}
