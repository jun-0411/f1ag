const MEDIA_API_PATH = '/api/media';

export const getMediaImageUrl = (imageId: number | null): string | null => {
  if (imageId === null || !Number.isSafeInteger(imageId) || imageId <= 0) {
    return null;
  }

  // 서명 URL을 저장하지 않고 같은 origin을 거쳐야 개발 proxy와 Vercel rewrite를 함께 사용할 수 있다.
  return `${MEDIA_API_PATH}/${imageId}`;
};
