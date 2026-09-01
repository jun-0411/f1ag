import { type MediaMockItem, mediaMockById } from '@/mocks/db/media';
import type { ApiErrorResponse } from '@/types/api';
import { http, HttpResponse } from 'msw';

const createMediaIdValidationError = (input: string): ApiErrorResponse => ({
  detail: [
    {
      type: 'int_parsing',
      loc: ['path', 'image_id'],
      msg: 'Input should be a valid integer, unable to parse string as an integer',
      input,
    },
  ],
});

const parseMediaId = (
  parameter: string | readonly string[] | undefined
): number | null => {
  if (typeof parameter !== 'string' || !/^[+-]?\d+$/.test(parameter)) {
    return null;
  }

  return Number(parameter);
};

const escapeSvgText = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => {
    const entityByCharacter: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };

    return entityByCharacter[character] ?? character;
  });

const createMediaSvg = (media: MediaMockItem): string => {
  const label = escapeSvgText(media.label);

  // Mock에서도 local 사진 경로를 우회하지 않고 image endpoint 자체가 표시 가능한 응답을 반환한다.
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="${media.backgroundColor}" />
      <circle cx="600" cy="330" r="190" fill="${media.accentColor}" opacity="0.82" />
      <path d="M170 620 C 360 460, 430 720, 600 560 S 890 470, 1030 610" fill="none" stroke="${media.accentColor}" stroke-width="32" stroke-linecap="round" opacity="0.9" />
      <text x="600" y="720" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="700" text-anchor="middle">${label}</text>
    </svg>
  `.trim();
};

export const mediaHandlers = [
  http.get('*/api/media/:imageId', ({ params }) => {
    const imageIdParameter = params.imageId;
    const imageId = parseMediaId(imageIdParameter);

    if (imageId === null) {
      return HttpResponse.json<ApiErrorResponse>(
        createMediaIdValidationError(String(imageIdParameter)),
        { status: 422 }
      );
    }

    const media = mediaMockById[imageId];
    if (media === undefined) {
      return HttpResponse.json<ApiErrorResponse>(
        { detail: 'Media asset not found' },
        { status: 404 }
      );
    }

    return new HttpResponse(createMediaSvg(media), {
      headers: {
        'Cache-Control': 'private, max-age=240',
        'Content-Type': 'image/svg+xml',
      },
    });
  }),
];
