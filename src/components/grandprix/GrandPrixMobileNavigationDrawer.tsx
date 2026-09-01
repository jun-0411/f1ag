import { Button } from '@/components/ui/button';
import { CURRENT_SEASON, getGrandPrixDisplay } from '@/constants/grandPrix';
import useMobileNavigationStore from '@/stores/useMobileNavigationStore';
import type { GrandPrixResponse } from '@/types/grandprix';
import { createGrandPrixNavigationItems } from '@/utils/grandPrixNavigation';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

interface GrandPrixMobileNavigationDrawerProps {
  activePageName: string;
  grandPrix: GrandPrixResponse;
  grandPrixId: number;
}

export default function GrandPrixMobileNavigationDrawer({
  activePageName,
  grandPrix,
  grandPrixId,
}: GrandPrixMobileNavigationDrawerProps) {
  const isOpen = useMobileNavigationStore((state) => state.isOpen);
  const close = useMobileNavigationStore((state) => state.close);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  const display = getGrandPrixDisplay(grandPrix.name);
  const navigationItems = createGrandPrixNavigationItems(
    grandPrixId,
    grandPrix.is_sprint
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    activeLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 top-16 bottom-0 z-[90] md:hidden"
      id="mobile-grand-prix-navigation"
    >
      <button
        aria-label="메뉴 닫기"
        className="absolute inset-0 cursor-default bg-grand-prix-page/55"
        onClick={close}
        type="button"
      />

      <aside
        aria-label="그랑프리 상세 메뉴"
        aria-modal="true"
        className="relative h-full w-[min(316px,calc(100vw-48px))] overflow-y-auto bg-grand-prix-card-mobile px-3.5 pt-6 pb-8"
        role="dialog"
      >
        <div className="px-1.5">
          <h2 className="text-xl font-bold text-grand-prix-text">
            {CURRENT_SEASON} {display.koreanName}
          </h2>
          <p className="mt-1 text-[10px] font-normal text-grand-prix-muted-mobile uppercase">
            Round {grandPrix.round}
          </p>
          <div className="mt-[18px] h-px bg-grand-prix-border-mobile" />
        </div>

        <nav aria-label="모바일 그랑프리 상세 메뉴" className="mt-[19px]">
          {navigationItems.map((item) => {
            const isCurrent = item.pageName === activePageName;

            return (
              <Button
                asChild
                aria-current={isCurrent ? 'page' : undefined}
                className={`relative mb-2.5 h-[42px] w-full justify-start rounded-[10px] px-[18px] text-sm shadow-none ${
                  isCurrent
                    ? 'bg-grand-prix-active font-bold text-grand-prix-text hover:bg-grand-prix-active'
                    : 'font-normal text-grand-prix-muted-mobile hover:bg-grand-prix-row hover:text-grand-prix-text'
                }`}
                key={item.to}
                variant="ghost"
              >
                <Link
                  onClick={close}
                  ref={isCurrent ? activeLinkRef : undefined}
                  to={item.to}
                >
                  {isCurrent ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 h-6 w-[3px] bg-grand-prix-primary"
                    />
                  ) : null}
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
