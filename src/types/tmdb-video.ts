export interface ApiVideoItem {
  key: string;
  site: string;
  type: string;
  official?: boolean;
  name?: string;
}

export interface ApiVideosResponse {
  id: number;
  results: ApiVideoItem[];
}
