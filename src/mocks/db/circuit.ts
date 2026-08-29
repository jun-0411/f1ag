import type { CircuitResponse } from '@/types/circuit';

export const circuitMockById: Record<number, CircuitResponse> = {
  13: {
    circuit_korean_name: null,
    circuit_english_name: 'Autodromo Nazionale di Monza',
    circuit_image_id: null,
    circuit_one_lap_length: null,
    circuit_corners: null,
    circuit_opening_year: null,
    record: [],
  },
  18: {
    circuit_korean_name: null,
    circuit_english_name: 'Silverstone Circuit',
    circuit_image_id: 42,
    circuit_one_lap_length: null,
    circuit_corners: null,
    circuit_opening_year: null,
    record: [
      {
        record_type: 'LASTWIN',
        driver_id: 21,
        driver_name: 'Charles Leclerc',
        record_year: 2026,
        driver_team: 'Ferrari',
        record_time: null,
      },
    ],
  },
};
