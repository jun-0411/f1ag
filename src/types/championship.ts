export interface ChampionshipRequest {
  season?: number;
  after_round?: number;
}

export interface ChampionshipDriverItem {
  driver_id: number;
  name: string;
  teamname: string;
  team_image_id: number | null;
  points: number;
  rank_change: number;
}

export interface ChampionshipDriverResponse {
  driver: ChampionshipDriverItem[];
}

export interface ChampionshipConstructorItem {
  team_id: number;
  team_name: string;
  team_image_id: number | null;
  points: number;
  rank_change: number;
}

export interface ChampionshipConstructorResponse {
  team: ChampionshipConstructorItem[];
}
