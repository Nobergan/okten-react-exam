export interface ApiGenre {
  id: number;
  name: string;
}

export interface ApiGenresResponse {
  genres: ApiGenre[];
}
