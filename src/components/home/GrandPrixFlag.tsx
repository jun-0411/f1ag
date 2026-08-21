import { getGrandPrixDisplay } from '@/constants/grandPrix';
import { getNationFlagImage } from '@/constants/images';

interface GrandPrixFlagProps {
  grandPrixName: string;
  size?: 'small' | 'large' | 'overview';
}

export default function GrandPrixFlag({
  grandPrixName,
  size = 'large',
}: GrandPrixFlagProps) {
  const display = getGrandPrixDisplay(grandPrixName);
  const imagePath = getNationFlagImage(display.countryCode);
  const isSmall = size === 'small';
  const isOverview = size === 'overview';
  const sizeClass = isOverview
    ? 'h-[27px] w-[42px] min-[1400px]:h-[50px] min-[1400px]:w-[78px]'
    : isSmall
      ? 'h-7 w-[42px]'
      : 'h-[30px] w-[46px]';

  if (imagePath === null) {
    return (
      <span
        aria-label="국기 이미지 준비 중"
        className={`${sizeClass} grid shrink-0 place-items-center rounded-[5px] bg-home-elevated text-[9px] font-bold text-home-muted`}
      >
        {display.countryCode}
      </span>
    );
  }

  return (
    <span className={`${sizeClass} shrink-0 overflow-hidden rounded-[5px]`}>
      <img
        alt={`${display.countryCode} 국기`}
        className="size-full object-cover"
        height={isOverview ? 50 : isSmall ? 28 : 30}
        src={imagePath}
        width={isOverview ? 78 : isSmall ? 42 : 46}
      />
    </span>
  );
}
