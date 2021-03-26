import Genres from './Genres';
import { useState, useEffect } from 'react';

export default function SortByGenres({ setStories }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(async () => {
    // effect hook that fires every time selected genres is updated.
    // it builds a URL with genre query strings (e.g. /api/getStories?genres=hasar&genres=spenna)
    // and then fetches all stories with those genres.
    let url = '/api/getStories';
    if (selectedGenres.length > 0) {
      url += '?';
      selectedGenres.forEach((genre, i) => {
        url += 'genres=' + genre;
        if (i !== selectedGenres.length - 1) {
          url += '&';
        }
      })
    }

    // fetch stories
    const res = await fetch(url);
    const stories = await res.json();
    setStories(stories);
  }, [selectedGenres]);

  const onGenreClick = (e) => {
    if (e.target.checked) {
      // add genre to selected genres
      const genres = [...selectedGenres];
      genres.push(e.target.value);
      setSelectedGenres(genres);
    } else {
      // remove genre from selected genres
      const genres = [...selectedGenres];
      const index = genres.indexOf(e.target.value);
      if (index !== -1) {
        genres.splice(index, 1);
        setSelectedGenres(genres);
      }
    }
  }
  
  return (
    <Genres onClick={onGenreClick} />
  )
}
