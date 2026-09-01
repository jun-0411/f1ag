import MediaImage from '@/components/media/MediaImage';
import { getGrandPrixDisplay } from '@/constants/grandPrix';

interface GrandPrixFlagProps {
  grandPrixName: string;
  imageId: number | null;
  size?: 'small' | 'large' | 'overview';
}

export default function GrandPrixFlag({
  grandPrixName,
  imageId,
  size = 'large',
}: GrandPrixFlagProps) {
  const display = getGrandPrixDisplay(grandPrixName);
  const isSmall = size === 'small';
  const isOverview = size === 'overview';
  const sizeClass = isOverview
    ? 'h-[27px] w-[42px] min-[1400px]:h-[50px] min-[1400px]:w-[78px]'
    : isSmall
      ? 'h-7 w-[42px]'
      : 'h-[30px] w-[46px]';

  return (
    <span
      className={`${sizeClass} shrink-0 overflow-hidden rounded-[5px] bg-home-elevated`}
    >
      <MediaImage
        alt={`${display.countryCode} 국기`}
        className="size-full object-cover"
        fallback={
          <span
            aria-label="국기 이미지 준비 중"
            className="grid size-full place-items-center text-[9px] font-bold text-home-muted"
          >
            {display.countryCode}
          </span>
        }
        height={isOverview ? 50 : isSmall ? 28 : 30}
        imageId={imageId}
        width={isOverview ? 78 : isSmall ? 42 : 46}
      />
    </span>
  );
}
