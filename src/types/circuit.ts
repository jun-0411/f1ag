export interface CircuitRecordItem {
  record_type: string;
  driver_id: number | null;
  driver_name: string | null;
  record_year: number | null;
  driver_team: string | null;
  record_time: string | null;
}

interface CircuitImageItem {
  image_id: number;
  image_type: string;
  display_order: number;
}

export interface CircuitResponse {
  circuit_korean_name: string | null;
  circuit_english_name: string;
  nation_flag_image_id: number | null;
  circuit_image_id: number | null;
  circuit_images: CircuitImageItem[];
  circuit_one_lap_length: number | null;
  circuit_corners: number | null;
  circuit_opening_year: number | null;
  record: CircuitRecordItem[];
}

export interface CircuitGrandPrixItem {
  grand_prix_id: number;
  season_year: number;
  round: number;
  name: string;
  date: string | null;
  winner_driver_id: number | null;
  winner_driver_name: string | null;
  winner_driver_image_id: number | null;
}

export interface CircuitGrandPrixResponse {
  grand_prix: CircuitGrandPrixItem[];
}
