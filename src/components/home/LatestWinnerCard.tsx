import GrandPrixFlag from '@/components/home/GrandPrixFlag';
import { getGrandPrixDisplay } from '@/constants/grandPrix';
import { getWinnerImage } from '@/constants/images';
import { getTeamDisplay } from '@/constants/teams';
import type { ChampionshipDriverItem } from '@/types/championship';
import type { GrandPrixListItem } from '@/types/grandprix';
import { Link } from 'react-router';

interface LatestWinnerCardProps {
  grandPrix: GrandPrixListItem | null;
  winner: ChampionshipDriverItem | null;
}

export default function LatestWinnerCard({
  grandPrix,
  winner,
}: LatestWinnerCardProps) {
  if (grandPrix === null) {
    return (
      <section className="relative grid h-[470px] place-items-center overflow-hidden rounded-[22px] border border-home-border bg-home-card px-8 text-center md:h-[626px]">
        <span className="absolute inset-x-[-1px] top-[-1px] h-[5px] rounded-[3px] bg-home-primary" />
        <div>
          <p className="text-lg font-bold text-home-text">
            최근 그랑프리 정보가 없습니다.
          </p>
          <p className="mt-2 text-sm leading-6 text-home-muted">
            `is_current` 경기 정보가 등록되면 우승자를 표시합니다.
          </p>
        </div>
      </section>
    );
  }

  const grandPrixDisplay = getGrandPrixDisplay(grandPrix.name);
  const teamDisplay = getTeamDisplay(winner?.teamname ?? '');
  const winnerName = winner?.name ?? '우승자 정보 준비 중';

  return (
    <Link
      aria-label={`${grandPrixDisplay.koreanName} 상세 보기`}
      className="group relative block h-[470px] overflow-hidden rounded-[22px] border border-home-border bg-home-card p-3 text-left no-underline outline-none transition-[border-color,transform] hover:border-home-primary focus-visible:ring-2 focus-visible:ring-home-primary motion-reduce:transition-none md:h-[626px] md:p-4"
      to={`/grandprix/${grandPrix.grandprix_id}`}
    >
      <span className="absolute inset-x-[-1px] top-[-1px] h-[5px] rounded-[3px] bg-home-primary" />

      <div className="flex h-[67px] items-start gap-3 px-0.5 pt-2 md:h-[92px] md:px-1 md:pt-1.5">
        <GrandPrixFlag grandPrixName={grandPrix.name} />
        <div className="min-w-0">
          <p className="text-[11px] leading-4 font-bold text-home-primary">
            R-{grandPrix.round}
          </p>
          <h2 className="truncate text-[18px] leading-7 font-bold text-home-text md:text-[22px]">
            {grandPrixDisplay.koreanName}
          </h2>
        </div>
        <span className="ml-auto mt-11 hidden rounded-full bg-home-primary px-6 py-2 text-[10px] leading-none font-bold text-white md:block">
          WINNER
        </span>
      </div>

      <div className="relative h-[327px] overflow-hidden rounded-[14px] border border-home-border md:h-[442px] md:rounded-2xl">
        <img
          alt={`${winnerName} 우승자 사진`}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          src={getWinnerImage(grandPrix.first_driver_id)}
        />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-home-page via-home-page/85 to-transparent" />
        <span className="absolute top-3 right-3 rounded-full bg-home-primary px-6 py-2 text-[10px] leading-none font-bold text-white md:hidden">
          WINNER
        </span>
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-5">
          <p className="truncate text-xl leading-8 font-bold text-white md:text-[25px]">
            {winnerName.toUpperCase()}
          </p>
          <p className="truncate text-[10px] leading-5 font-bold text-home-secondary md:text-[11px]">
            {teamDisplay.fullName}
          </p>
        </div>
      </div>
    </Link>
  );
}
