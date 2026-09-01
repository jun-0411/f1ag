import { Button } from '@/components/ui/button';
import { createGrandPrixNavigationItems } from '@/utils/grandPrixNavigation';
import { Link } from 'react-router';

interface GrandPrixNavigationProps {
  activePageName: string;
  grandPrixId: number;
  isSprint: boolean;
}

export default function GrandPrixNavigation({
  activePageName,
  grandPrixId,
  isSprint,
}: GrandPrixNavigationProps) {
  const navigationItems = createGrandPrixNavigationItems(grandPrixId, isSprint);

  return (
    <nav
      aria-label="그랑프리 상세 메뉴"
      className="sticky top-[88px] hidden self-start rounded-[14px] border border-[#242b38] bg-grand-prix-nav p-[9px] min-[1400px]:block"
    >
      {navigationItems.map((item) => {
        const isCurrent = item.pageName === activePageName;

        return (
          <Button
            asChild
            aria-current={isCurrent ? 'page' : undefined}
            className={`relative h-[38px] w-full justify-start rounded-[9px] px-4 text-[13px] shadow-none ${
              isCurrent
                ? 'bg-grand-prix-active font-bold text-grand-prix-text hover:bg-grand-prix-active'
                : 'font-normal text-[#929baa] hover:bg-grand-prix-row hover:text-grand-prix-text'
            }`}
            key={item.to}
            variant="ghost"
          >
            <Link to={item.to}>
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
  );
}
