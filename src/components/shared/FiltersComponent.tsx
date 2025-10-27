import React from 'react';
import Select from 'react-select';
import { UseGenres } from '@hooks';
import { GENRES_SELECT_STYLES } from '@constants';

type FiltersProps = {
  mediaType: 'movie' | 'tv';
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
};

export const FiltersComponent: React.FC<FiltersProps> = ({
  mediaType,
  selectedGenre,
  onGenreChange
}) => {
  const { genreMaps } = UseGenres();

  const options = Array.from(genreMaps[mediaType].entries()).map(
    ([id, name]) => ({
      value: id,
      label: name
    })
  );

  return (
    <div className='flex justify-start py-4 sm:justify-center'>
      <div className='w-full max-w-[280px] sm:max-w-[320px]'>
        <Select
          instanceId='genre-select'
          options={options}
          value={
            selectedGenre
              ? options.find((option) => option.value === selectedGenre)
              : null
          }
          onChange={(option) => onGenreChange(option ? option.value : null)}
          placeholder='Жанр'
          isClearable
          styles={GENRES_SELECT_STYLES}
        />
      </div>
    </div>
  );
};
