import { getTeamDisplay } from '@/constants/teams';

interface TeamBadgeProps {
  teamName: string;
}

export default function TeamBadge({ teamName }: TeamBadgeProps) {
  const team = getTeamDisplay(teamName);

  return (
    <span
      aria-label={teamName}
      className="grid size-[26px] shrink-0 place-items-center rounded-[7px] text-[8px] leading-none font-bold text-white"
      style={{ backgroundColor: team.color }}
      title={teamName}
    >
      {team.code}
    </span>
  );
}
