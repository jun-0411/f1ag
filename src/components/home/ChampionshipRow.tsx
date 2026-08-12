import TeamBadge from '@/components/home/TeamBadge';
import { cn } from '@/utils/cn';

export interface ChampionshipRowItem {
  id: number;
  rank: number;
  name: string;
  teamName: string;
  points: number;
  rankChange: number;
}

interface ChampionshipRowProps {
  item: ChampionshipRowItem;
  compact?: boolean;
}

const getRankChangeLabel = (rankChange: number): string => {
  if (rankChange > 0) {
    return `상승 ${rankChange}`;
  }

  if (rankChange < 0) {
    return `하락 ${Math.abs(rankChange)}`;
  }

  return '변동 없음';
};

export default function ChampionshipRow({
  item,
  compact = false,
}: ChampionshipRowProps) {
  const rankChangeText =
    item.rankChange > 0
      ? `↑${item.rankChange}`
      : item.rankChange < 0
        ? `↓${Math.abs(item.rankChange)}`
        : '—';

  return (
    <div
      className={cn(
        'grid items-center rounded-lg text-[12px] font-bold text-home-text',
        compact
          ? 'h-10 grid-cols-[22px_28px_minmax(0,1fr)_44px_30px] gap-x-2 border border-home-border bg-home-card px-2'
          : 'h-10 grid-cols-[30px_30px_minmax(0,1fr)_52px_34px] gap-x-3 px-2 even:bg-home-row/60'
      )}
    >
      <span className={cn(item.rank <= 3 && 'text-home-primary')}>
        {item.rank}
      </span>
      <TeamBadge teamName={item.teamName} />
      <span className="min-w-0 truncate" title={item.name}>
        {item.name}
      </span>
      <span className="justify-self-end tabular-nums">{item.points}</span>
      <span
        aria-label={getRankChangeLabel(item.rankChange)}
        className={cn(
          'justify-self-end text-[11px] tabular-nums',
          item.rankChange > 0 && 'text-home-positive',
          item.rankChange < 0 && 'text-home-primary',
          item.rankChange === 0 && 'text-home-muted'
        )}
      >
        {rankChangeText}
      </span>
    </div>
  );
}
