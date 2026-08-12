import GrandPrixFlag from '@/components/home/GrandPrixFlag';
import { Button } from '@/components/ui/button';
import { getGrandPrixDisplay } from '@/constants/grandPrix';
import type { GrandPrixListItem } from '@/types/grandprix';
import { formatGrandPrixDate } from '@/utils/date';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface GrandPrixScheduleProps {
  items: GrandPrixListItem[];
  nextGrandPrix: GrandPrixListItem | null;
}

const MAX_DESKTOP_ITEMS = 4;

const getInitialIndex = (
  items: GrandPrixListItem[],
  nextGrandPrix: GrandPrixListItem | null
): number => {
  const nextIndex = items.findIndex(
    (item) => item.grandprix_id === nextGrandPrix?.grandprix_id
  );
  return nextIndex >= 0 ? nextIndex : 0;
};

const getDesktopWindow = (
  items: GrandPrixListItem[],
  selectedIndex: number
): GrandPrixListItem[] => {
  const maxStart = Math.max(0, items.length - MAX_DESKTOP_ITEMS);
  const start = Math.min(Math.max(0, selectedIndex - 1), maxStart);
  return items.slice(start, start + MAX_DESKTOP_ITEMS);
};

export default function GrandPrixSchedule({
  items,
  nextGrandPrix,
}: GrandPrixScheduleProps) {
  const [selectedIndex, setSelectedIndex] = useState(() =>
    getInitialIndex(items, nextGrandPrix)
  );
  const nextGrandPrixId = nextGrandPrix?.grandprix_id;

  useEffect(() => {
    const nextIndex = items.findIndex(
      (item) => item.grandprix_id === nextGrandPrixId
    );
    setSelectedIndex(nextIndex >= 0 ? nextIndex : 0);
  }, [items, nextGrandPrixId]);

  const handlePrevious = () => {
    setSelectedIndex((currentIndex) => Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setSelectedIndex((currentIndex) =>
      Math.min(items.length - 1, currentIndex + 1)
    );
  };

  if (items.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold text-home-text">그랑프리 일정</h2>
        <p className="mt-4 rounded-[22px] border border-home-border bg-home-card p-8 text-sm text-home-muted">
          등록된 그랑프리 일정이 없습니다.
        </p>
      </section>
    );
  }

  const mobileItems = [
    ...items.slice(getInitialIndex(items, nextGrandPrix)),
    ...items.slice(0, getInitialIndex(items, nextGrandPrix)),
  ];
  const desktopItems = getDesktopWindow(items, selectedIndex);
  const selectedGrandPrix = items[selectedIndex] ?? items[0];

  return (
    <section>
      <h2 className="text-[18px] leading-7 font-bold text-home-text md:text-2xl">
        그랑프리 일정
      </h2>
      <p className="mt-1 text-[12px] leading-5 text-home-muted md:mt-2 md:text-[13px]">
        카드를 넘겨 다음 경기와 지난 경기 일정을 확인하세요.
      </p>

      <div className="mt-3 md:hidden">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobileItems.map((item) => {
            const display = getGrandPrixDisplay(item.name);

            return (
              <Link
                aria-label={`${display.koreanName} 상세 보기`}
                className="min-w-full snap-start rounded-xl border border-home-border bg-home-card p-3 text-home-text no-underline outline-none focus-visible:ring-2 focus-visible:ring-home-primary"
                key={item.grandprix_id}
                to={`/grandprix/${item.grandprix_id}`}
              >
                <div className="flex items-center gap-2">
                  <GrandPrixFlag grandPrixName={item.name} size="small" />
                  <span className="text-[9px] font-bold text-home-primary">
                    R-{item.round}
                    {item.is_next ? ' · NEXT RACE' : ''}
                  </span>
                </div>
                <h3 className="mt-3 text-[17px] leading-7 font-bold">
                  {display.koreanName}
                </h3>
                <p className="mt-1 text-[11px] text-home-muted">
                  {formatGrandPrixDate(item.date)}
                </p>
                <p className="mt-2 text-[9px] text-home-muted">
                  카드를 옆으로 넘겨 일정을 확인하세요
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="relative mt-7 hidden h-[242px] overflow-hidden rounded-[22px] border border-home-border bg-[#0f131a] md:block">
        <Button
          aria-label="이전 그랑프리 선택"
          className="absolute top-1/2 left-3 z-20 size-[38px] -translate-y-1/2 border-home-border bg-home-elevated text-home-text hover:bg-home-row hover:text-home-text"
          disabled={selectedIndex === 0}
          onClick={handlePrevious}
          size="icon"
          type="button"
          variant="outline"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </Button>

        <div className="flex h-[207px] items-end justify-center gap-3 overflow-hidden px-[70px] pb-4">
          {desktopItems.map((item) => {
            const display = getGrandPrixDisplay(item.name);
            const isSelected =
              item.grandprix_id === selectedGrandPrix.grandprix_id;

            return (
              <Link
                aria-label={`${display.koreanName} 상세 보기`}
                className={
                  isSelected
                    ? 'relative z-10 flex h-[158px] w-[338px] shrink-0 flex-col rounded-[18px] border-2 border-home-primary bg-home-elevated p-4 text-home-text shadow-[0_10px_12px_rgba(0,0,0,0.35)] no-underline outline-none transition-transform focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none'
                    : 'flex h-[126px] min-w-0 flex-1 basis-[220px] flex-col rounded-[18px] border border-home-border bg-home-row/70 p-4 text-home-text no-underline opacity-75 outline-none transition-[opacity,transform] hover:-translate-y-1 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-home-primary motion-reduce:transition-none'
                }
                key={item.grandprix_id}
                to={`/grandprix/${item.grandprix_id}`}
              >
                <div className="flex items-start gap-4">
                  <GrandPrixFlag grandPrixName={item.name} size="small" />
                  <span
                    className={
                      isSelected
                        ? 'text-[11px] font-bold text-home-primary'
                        : 'text-[11px] font-bold text-home-muted'
                    }
                  >
                    R-{item.round}
                  </span>
                  {item.is_next ? (
                    <span className="ml-auto rounded-full bg-home-primary px-4 py-2 text-[9px] leading-none font-bold text-white">
                      NEXT RACE
                    </span>
                  ) : null}
                </div>
                <h3
                  className={
                    isSelected
                      ? 'mt-3 truncate text-[21px] leading-8 font-bold'
                      : 'mt-3 truncate text-[17px] leading-7 font-bold'
                  }
                >
                  {display.koreanName}
                </h3>
                <p
                  className={
                    isSelected
                      ? 'mt-auto text-[12px] text-home-text'
                      : 'mt-auto truncate text-[11px] text-home-muted'
                  }
                >
                  {formatGrandPrixDate(item.date)}
                </p>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-home-muted">
          선택된 그랑프리는 위로 올라오고, 다른 카드는 아래에 포개집니다.
        </p>

        <Button
          aria-label="다음 그랑프리 선택"
          className="absolute top-1/2 right-3 z-20 size-[38px] -translate-y-1/2 border-home-border bg-home-elevated text-home-text hover:bg-home-row hover:text-home-text"
          disabled={selectedIndex >= items.length - 1}
          onClick={handleNext}
          size="icon"
          type="button"
          variant="outline"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </Button>
      </div>
    </section>
  );
}
