import GrandPrixFlag from '@/components/home/GrandPrixFlag';
import { CURRENT_SEASON, getGrandPrixDisplay } from '@/constants/grandPrix';
import type { GrandPrixResponse } from '@/types/grandprix';
import { Link } from 'react-router';

interface GrandPrixHeaderProps {
  grandPrix: GrandPrixResponse;
  isSessionPage?: boolean;
  mobilePageName?: string;
  pageName: string;
}

export default function GrandPrixHeader({
  grandPrix,
  isSessionPage = false,
  mobilePageName,
  pageName,
}: GrandPrixHeaderProps) {
  const display = getGrandPrixDisplay(grandPrix.name);

  return (
    <header className="pt-6 min-[1400px]:h-[220px] min-[1400px]:pt-5">
      <div className="flex items-center gap-3 min-[1400px]:gap-[22px]">
        <GrandPrixFlag grandPrixName={grandPrix.name} size="overview" />
        <div className="min-w-0">
          <h1
            className={`truncate leading-tight font-bold text-grand-prix-text min-[1400px]:text-[40px] ${isSessionPage ? 'text-xl' : 'text-[22px]'}`}
          >
            <span
              className={
                mobilePageName === undefined
                  ? undefined
                  : 'hidden min-[1400px]:inline'
              }
            >
              {CURRENT_SEASON} {display.koreanName} {pageName}
            </span>
            {mobilePageName === undefined ? null : (
              <span className="min-[1400px]:hidden">
                {CURRENT_SEASON} {display.koreanName} {mobilePageName}
              </span>
            )}
          </h1>
          <div className="mt-2 hidden items-center text-sm font-bold tracking-[-0.01em] text-grand-prix-primary uppercase min-[1400px]:flex">
            <Link
              className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-grand-prix-primary"
              to={`/circuit/${grandPrix.circuit_id}`}
            >
              {grandPrix.circuit_name} ↗
            </Link>
            <span>&nbsp;· Round {grandPrix.round}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center text-[10px] font-bold tracking-[-0.01em] text-grand-prix-primary uppercase min-[1400px]:hidden">
        <Link
          className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-grand-prix-primary"
          to={`/circuit/${grandPrix.circuit_id}`}
        >
          {grandPrix.circuit_name} ↗
        </Link>
        <span>&nbsp;· Round {grandPrix.round}</span>
      </div>
    </header>
  );
}
