import type { CircuitRecordItem } from '@/types/circuit';

interface CircuitRecordsProps {
  records: CircuitRecordItem[];
}

interface RecordPresentation {
  accentClassName: string;
  label: string;
}

const getRecordPresentation = (recordType: string): RecordPresentation => {
  const normalizedRecordType = recordType.trim().toUpperCase();

  if (normalizedRecordType === 'LASTWIN') {
    return {
      accentClassName: 'text-grand-prix-primary',
      label: 'PREVIOUS WINNER',
    };
  }

  return {
    accentClassName: 'text-grand-prix-muted',
    label: normalizedRecordType || 'RECORD',
  };
};

const getRecordMeta = (record: CircuitRecordItem): string => {
  const meta = [record.driver_team, record.record_year?.toString()].filter(
    (value): value is string => value !== null && value !== undefined
  );

  return meta.length === 0 ? '정보 없음' : meta.join(' · ');
};

export default function CircuitRecords({ records }: CircuitRecordsProps) {
  return (
    <section
      aria-labelledby="circuit-records-heading"
      className="min-[1400px]:mt-7 min-[1400px]:border-grand-prix-border min-[1400px]:border-t min-[1400px]:pt-6"
    >
      <h2
        className="text-xl font-bold text-grand-prix-text min-[1400px]:sr-only"
        id="circuit-records-heading"
      >
        기록
      </h2>

      <div className="mt-4 overflow-hidden rounded-[14px] border border-grand-prix-border-mobile bg-grand-prix-card-mobile px-3 min-[1400px]:mt-0 min-[1400px]:rounded-none min-[1400px]:border-0 min-[1400px]:bg-transparent min-[1400px]:px-0">
        {records.length === 0 ? (
          <p className="flex min-h-36 items-center justify-center px-4 text-center text-xs leading-5 text-grand-prix-muted">
            아직 제공된 기록이 없습니다.
          </p>
        ) : (
          <ul>
            {records.map((record, index) => {
              const presentation = getRecordPresentation(record.record_type);
              const recordKey = `${record.record_type}-${record.driver_id ?? 'unknown'}-${index}`;

              return (
                <li
                  className="grid min-h-[124px] grid-cols-[minmax(0,1fr)_132px] items-center gap-3 border-grand-prix-border-mobile border-b last:border-b-0 min-[1400px]:min-h-[136px] min-[1400px]:grid-cols-[minmax(0,1fr)_150px] min-[1400px]:border-grand-prix-border"
                  key={recordKey}
                >
                  <div className="min-w-0">
                    <p
                      className={`truncate text-[9px] font-bold ${presentation.accentClassName} min-[1400px]:text-[11px]`}
                    >
                      {presentation.label}
                    </p>
                    <p className="mt-2 truncate text-[17px] font-bold text-grand-prix-text min-[1400px]:text-[21px]">
                      {record.driver_name ?? '정보 없음'}
                    </p>
                    <p className="mt-1 truncate text-[9px] text-grand-prix-muted-mobile min-[1400px]:text-xs min-[1400px]:text-grand-prix-muted">
                      {getRecordMeta(record)}
                    </p>
                  </div>

                  <p className="flex h-[58px] min-w-0 items-center justify-center overflow-hidden rounded-xl border border-grand-prix-border-mobile bg-grand-prix-row px-2 text-center text-[15px] font-bold text-grand-prix-text min-[360px]:text-xl min-[1400px]:border-grand-prix-border min-[1400px]:text-[21px]">
                    {record.record_time ?? '기록 없음'}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
