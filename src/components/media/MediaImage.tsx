import { getMediaImageUrl } from '@/api/media/media';
import type { ImgHTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { useState } from 'react';

interface MediaImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  fallback: ReactNode;
  imageId: number | null;
}

export default function MediaImage({
  fallback,
  imageId,
  ...imageProps
}: MediaImageProps) {
  const imageUrl = getMediaImageUrl(imageId);

  if (imageUrl === null) {
    return fallback;
  }

  return (
    <ResolvedMediaImage
      {...imageProps}
      fallback={fallback}
      imageUrl={imageUrl}
      key={imageUrl}
    />
  );
}

interface ResolvedMediaImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  fallback: ReactNode;
  imageUrl: string;
}

function ResolvedMediaImage({
  fallback,
  imageUrl,
  onError,
  ...imageProps
}: ResolvedMediaImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(event);
  };

  if (hasError) {
    return fallback;
  }

  return <img {...imageProps} onError={handleError} src={imageUrl} />;
}
