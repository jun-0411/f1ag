import SessionDetailView from '@/components/grandprix-session-detail/SessionDetailView';
import { Button } from '@/components/ui/button';
import {
  getWeekendSessionCodes,
  isGrandPrixSessionCode,
} from '@/constants/grandPrix';
import useGrandPrixDetailData from '@/hooks/useGrandPrixDetailData';
import type { GrandPrixLayoutContext } from '@/routes/GrandPrixLayout';
import type { GrandPrixSessionCode } from '@/types/grandprix';
import { isAxiosError } from 'axios';
import { RotateCcw } from 'lucide-react';
import { useOutletContext, useParams } from 'react-router';

export default function GrandPrixSessionDetail() {
  const { sessionCode } = useParams();
  const { grandPrix, grandPrixId } = useOutletContext<GrandPrixLayoutContext>();

  if (
    !isGrandPrixSessionCode(sessionCode) ||
    !getWeekendSessionCodes(grandPrix.is_sprint).includes(sessionCode)
  ) {
    return (
      <SessionDetailMessage message="이 그랑프리에서 진행하지 않는 세션입니다." />
    );
  }

  return (
    <GrandPrixSessionDetailContent
      grandPrixId={grandPrixId}
      key={`${grandPrixId}-${sessionCode}`}
      session={sessionCode}
    />
  );
}

interface GrandPrixSessionDetailContentProps {
  grandPrixId: number;
  session: GrandPrixSessionCode;
}

function GrandPrixSessionDetailContent({
  grandPrixId,
  session,
}: GrandPrixSessionDetailContentProps) {
  const detailQuery = useGrandPrixDetailData(grandPrixId, session);

  if (detailQuery.isPending) {
    return <SessionDetailLoading />;
  }

  if (detailQuery.error !== null || detailQuery.detail === undefined) {
    const isNotFound =
      isAxiosError(detailQuery.error) &&
      detailQuery.error.response?.status === 404;

    return (
      <SessionDetailMessage
        action={
          isNotFound ? undefined : (
            <Button
              className="mt-5 bg-grand-prix-primary text-white hover:bg-grand-prix-primary/80"
              onClick={() => void detailQuery.refetch()}
              type="button"
            >
              <RotateCcw aria-hidden="true" /> 다시 시도
            </Button>
          )
        }
        message={
          isNotFound
            ? '해당 세션의 상세 결과를 찾을 수 없습니다.'
            : '세션 상세 결과를 불러오지 못했습니다.'
        }
      />
    );
  }

  if (detailQuery.detail.driver.length === 0) {
    return <SessionDetailMessage message="아직 등록된 세션 결과가 없습니다." />;
  }

  return (
    <SessionDetailView drivers={detailQuery.detail.driver} session={session} />
  );
}

interface SessionDetailMessageProps {
  action?: React.ReactNode;
  message: string;
}

function SessionDetailMessage({ action, message }: SessionDetailMessageProps) {
  return (
    <div className="mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-grand-prix-border bg-grand-prix-card px-6 text-center text-sm text-grand-prix-muted min-[1400px]:mt-0">
      <p>{message}</p>
      {action}
    </div>
  );
}

function SessionDetailLoading() {
  return (
    <div
      aria-label="세션 상세 결과 불러오는 중"
      className="mt-7 animate-pulse min-[1400px]:mt-0"
      role="status"
    >
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <div className="h-3 w-32 rounded bg-grand-prix-row" />
          <div className="mt-3 h-8 w-52 rounded bg-grand-prix-row" />
        </div>
        <div className="hidden h-[92px] w-[310px] rounded-2xl bg-grand-prix-row min-[1400px]:block" />
      </div>
      <div className="h-[620px] rounded-[20px] border border-grand-prix-border bg-grand-prix-card" />
    </div>
  );
}
