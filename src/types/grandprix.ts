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
