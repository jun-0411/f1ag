import type {
  CircuitGrandPrixResponse,
  CircuitResponse,
} from '@/types/circuit';

export const circuitMockById: Record<number, CircuitResponse> = {
  13: {
    circuit_korean_name: null,
    circuit_english_name: 'Autodromo Nazionale di Monza',
    nation_flag_image_id: null,
    circuit_image_id: null,
    circuit_images: [],
    circuit_one_lap_length: null,
    circuit_corners: null,
    circuit_opening_year: null,
    record: [],
  },
  18: {
    circuit_korean_name: null,
    circuit_english_name: 'Silverstone Circuit',
    nation_flag_image_id: null,
    circuit_image_id: 42,
    circuit_images: [
      {
        image_id: 42,
        image_type: 'MAP',
        display_order: 0,
      },
    ],
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
  20: {
    circuit_korean_name: '스즈카 서킷',
    circuit_english_name: 'Suzuka Circuit',
    nation_flag_image_id: 1,
    circuit_image_id: 36,
    circuit_images: [
      {
        image_id: 36,
        image_type: 'MAP',
        display_order: 0,
      },
    ],
    circuit_one_lap_length: 5.807,
    circuit_corners: 18,
    circuit_opening_year: 1962,
    record: [
      {
        record_type: 'LAP',
        driver_id: 3,
        driver_name: 'Andrea Kimi Antonelli',
        record_year: 2025,
        driver_team: 'Mercedes',
        record_time: '1:30.965',
      },
      {
        record_type: 'TRACK',
        driver_id: 30,
        driver_name: 'Max Verstappen',
        record_year: 2025,
        driver_team: 'Red Bull',
        record_time: '1:26.983',
      },
      {
        record_type: 'LASTWIN',
        driver_id: 3,
        driver_name: 'Andrea Kimi Antonelli',
        record_year: 2026,
        driver_team: 'Mercedes',
        record_time: null,
      },
    ],
  },
};

export const circuitGrandPrixMockById: Record<
  number,
  CircuitGrandPrixResponse
> = {
  13: {
    grand_prix: [],
  },
  18: {
    grand_prix: [
      {
        grand_prix_id: 9,
        season_year: 2026,
        round: 9,
        name: 'British Grand Prix',
        date: '2026-07-05T14:00:00',
        winner_driver_id: 21,
        winner_driver_name: 'Charles Leclerc',
        winner_driver_image_id: 10,
      },
    ],
  },
  20: {
    grand_prix: [
      {
        grand_prix_id: 3,
        season_year: 2026,
        round: 3,
        name: 'Japanese Grand Prix',
        date: '2026-03-29T05:00:00',
        winner_driver_id: 3,
        winner_driver_name: 'Andrea Kimi Antonelli',
        winner_driver_image_id: 4,
      },
    ],
  },
};
