export interface ApiFilm {
  adult?: boolean;
  backdrop_path?: string;
  id?: number;
  title?: string;
  name?: string;
  original_language?: string;
  original_name?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  genre_ids?: number[];
  genre_names?: string[];
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
