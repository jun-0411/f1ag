export interface GrandPrixListRequest {
  season?: number;
}

export interface GrandPrixListItem {
  grandprix_id: number;
  is_current: boolean;
  is_next: boolean;
  name: string;
  round: number;
  nation_flag_image_id: number | null;
  first_driver_id: number | null;
  first_driver_image_id: number | null;
  date: string | null;
}

export interface GrandPrixListResponse {
  grandprix: GrandPrixListItem[];
}

export type GrandPrixSessionCode =
  | 'FP1'
  | 'FP2'
  | 'FP3'
  | 'Q'
  | 'SQ'
  | 'S'
  | 'R';

export interface GrandPrixResponse {
  name: string;
  round: number;
  circuit_name: string;
  circuit_id: number;
  nation_flag_image_id: number | null;
  is_sprint: boolean;
}

export interface GrandPrixScheduleItem {
  session_code: GrandPrixSessionCode;
  time: string | null;
}

export interface GrandPrixWeatherItem {
  session_code: GrandPrixSessionCode;
  temperature: number | null;
  rainfall?: boolean | null;
}

export interface GrandPrixTireOverviewItem {
  tire_code: number;
  tire_type: string | null;
  tire_set: number | null;
}

export interface GrandPrixCircuitOverview {
  circuit_korean_name: string | null;
  circuit_english_name: string;
  circuit_region_name: string | null;
  circuit_image_id: number | null;
  circuit_laps: number | null;
  circuit_one_lap_length: number | null;
  circuit_total_length: number | null;
}

export interface GrandPrixOverviewResponse {
  schedule: GrandPrixScheduleItem[];
  weather: GrandPrixWeatherItem[];
  tire: GrandPrixTireOverviewItem[];
  circuit: GrandPrixCircuitOverview;
}
