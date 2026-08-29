export interface CircuitRecordItem {
  record_type: string;
  driver_id: number | null;
  driver_name: string | null;
  record_year: number | null;
  driver_team: string | null;
  record_time: string | null;
}

export interface CircuitResponse {
  circuit_korean_name: string | null;
  circuit_english_name: string;
  circuit_image_id: number | null;
  circuit_one_lap_length: number | null;
  circuit_corners: number | null;
  circuit_opening_year: number | null;
  record: CircuitRecordItem[];
}
