import type { ApiFilm } from './api-film-response.model.ts';

export interface ApiFilms {
  page: number;
  results: ApiFilm[] | null;
  total_pages: number;
  total_results: number;
}
