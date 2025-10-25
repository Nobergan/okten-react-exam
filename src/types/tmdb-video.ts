export type TmdbVideo = {
  id: string;
  key: string;
  name: string;
  site: 'YouTube' | 'Vimeo' | string;
  type: 'Trailer' | 'Teaser' | 'Clip' | string;
};
