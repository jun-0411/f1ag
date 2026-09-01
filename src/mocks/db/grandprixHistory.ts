import grandPrixHistorySnapshot from '@/mocks/db/grandprixHistory.snapshot.json';
import type {
  GrandPrixHistoryResponse,
  GrandPrixSessionCode,
} from '@/types/grandprix';

// 실제 백엔드 응답과 차트 값이 달라지지 않도록 9번 레이스 응답을 그대로 보존한다.
const raceHistoryMock: GrandPrixHistoryResponse = grandPrixHistorySnapshot;

export const grandPrixHistoryMockById: Record<
  number,
  Partial<Record<GrandPrixSessionCode, GrandPrixHistoryResponse>>
> = {
  9: { R: raceHistoryMock },
};
