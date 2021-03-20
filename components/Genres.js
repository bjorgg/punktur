import React from 'react';

export default function GenresArray() {
  
  const Genres = [
    'börn',
    'hryllingur',
    'rómantík',
    'kómedía',
    'tragedía',
    'spenna',
    'hasar',
    'vísindaskáldskapur',
    'ævintýri',
    'sannsögulegt',
    'nútíma',
    'hversdagsleiki',
    'áskorun mánaðarins'
  ] 

  return (
    <div>
      {Genres &&
        Genres.map((genre) => (
            <div id='storyGenres' key={genre}>
              <input type="checkbox" name="genre" value={genre}/>
              <label for="genre">{genre}</label>
            </div>
        ))}
    </div>
  )
};