import React from 'react';


export default function Genres({ onClick }) {
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
    'ljóð',
    'áskorun mánaðarins'
  ] 

  return (
    <div>
      {Genres &&
        Genres.map((genre, i) => (
            <div id='storyGenres' key={ genre }>
              <input id={`genre${i}`} type="checkbox" name="genre" value={ genre } onClick={onClick}/>
              <label htmlFor={`genre${i}`}>{ genre }</label>
            </div>
        ))}
    </div>
  )
};