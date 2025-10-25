import { Navigate, useParams } from 'react-router';

import { FilmDetailsComponent } from '@components';

import type { MediaType } from '@types';

export const FilmDetailsPage = () => {
  const { mediaType, id } = useParams<{ mediaType: MediaType; id: string }>();
  const parsedId = Number(id);
  const isValidMedia = mediaType === 'movie' || mediaType === 'tv';

  if (!isValidMedia || Number.isNaN(parsedId) || parsedId <= 0) {
    return <Navigate to='/' replace />;
  }

  return <FilmDetailsComponent mediaType={mediaType} id={parsedId} />;
};
