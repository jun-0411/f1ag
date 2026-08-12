import { getGrandPrixList } from '@/api/grandprix/grandprix';
import GrandPrixFlag from '@/components/home/GrandPrixFlag';
import { Button } from '@/components/ui/button';
import { CURRENT_SEASON, getGrandPrixDisplay } from '@/constants/grandPrix';
import { formatGrandPrixDate } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';

export default function GrandPrixDetail() {
  const { grandPrixId } = useParams();
  const parsedGrandPrixId = Number(grandPrixId);
  const grandPrixQuery = useQuery({
    queryKey: ['grandprix', 'list', { season: CURRENT_SEASON }],
    queryFn: () => getGrandPrixList({ season: CURRENT_SEASON }),
  });
  const grandPrix = grandPrixQuery.data?.grandprix.find(
    (item) => item.grandprix_id === parsedGrandPrixId
  );

  if (grandPrixQuery.isPending) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-home-page px-4 py-10">
        <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-[22px] border border-home-border bg-home-card motion-reduce:animate-none" />
      </div>
    );
  }

  if (grandPrixQuery.error || !Number.isInteger(parsedGrandPrixId)) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-home-page px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-[22px] border border-home-border bg-home-card p-8 text-center">
          <h1 className="text-xl font-bold text-home-text">
            그랑프리 정보를 불러오지 못했습니다.
          </h1>
          <Button asChild className="mt-6 bg-home-primary text-white">
            <Link to="/">Home으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!grandPrix) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-home-page px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-[22px] border border-home-border bg-home-card p-8 text-center">
          <h1 className="text-xl font-bold text-home-text">
            해당 그랑프리를 찾을 수 없습니다.
          </h1>
          <Button asChild className="mt-6 bg-home-primary text-white">
            <Link to="/">Home으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  const display = getGrandPrixDisplay(grandPrix.name);
  const status = grandPrix.is_current
    ? '최근 경기'
    : grandPrix.is_next
      ? '다음 경기'
      : grandPrix.first_driver_id === null
        ? '예정'
        : '종료';

  return (
    <div className="min-h-[calc(100vh-64px)] bg-home-page px-4 py-8 md:px-8 md:py-12">
      <article className="mx-auto max-w-3xl overflow-hidden rounded-[22px] border border-home-border bg-home-card">
        <div className="h-[5px] bg-home-primary" />
        <div className="p-6 md:p-10">
          <Button
            asChild
            className="mb-8 -ml-2 text-home-muted hover:bg-home-row hover:text-home-text"
            variant="ghost"
          >
            <Link to="/">
              <ChevronLeft aria-hidden="true" className="size-4" />
              Home
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            <GrandPrixFlag grandPrixName={grandPrix.name} />
            <div>
              <p className="text-xs font-bold text-home-primary">
                {CURRENT_SEASON} · R-{grandPrix.round} · {status}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-home-text md:text-4xl">
                {display.koreanName}
              </h1>
            </div>
          </div>

          <dl className="mt-8 grid gap-3 rounded-2xl border border-home-border bg-home-row/60 p-5 text-sm md:grid-cols-2">
            <div>
              <dt className="text-home-muted">경기 일시</dt>
              <dd className="mt-1 font-bold text-home-text">
                {formatGrandPrixDate(grandPrix.date)}
              </dd>
            </div>
            <div>
              <dt className="text-home-muted">Grand Prix ID</dt>
              <dd className="mt-1 font-bold text-home-text">
                {grandPrix.grandprix_id}
              </dd>
            </div>
          </dl>

          <p className="mt-8 text-sm leading-6 text-home-muted">
            Home에서 상세 경로로 이동할 수 있도록 기본 진입 화면을 먼저
            연결했습니다. 세션 결과와 경기 분석은 Grand Prix 상세 API 작업에서
            이어서 구현합니다.
          </p>
        </div>
      </article>
    </div>
  );
}
