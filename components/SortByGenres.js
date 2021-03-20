import Genres from './Genres';
import { useState, useEffect } from 'react';

export default function SortByGenres() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(async () => {
    let url = '/api/getStoriesByGenre';
    if (selectedGenres.length > 0) {
      url += '?';
      selectedGenres.forEach((genre, i) => {
        url += 'genres=' + genre;
        if (i !== selectedGenres.length - 1) {
          url += '&';
        }
      })
    }
    console.log(url)
    const res = await fetch(url);
    const stories = await res.text();
    console.log(stories)
  })

  const onGenreClick = (e) => {
    if (e.target.checked) {
      // alert(e.target.value + ' clicked')
      const genres = [...selectedGenres];
      genres.push(e.target.value);
      setSelectedGenres(genres);
    } else {
      // alert(e.target.value + ' unclicked')
      const genres = [...selectedGenres];
      const index = genres.indexOf(e.target.value);
      if (index !== -1) {
        genres.splice(index, 1);
        setSelectedGenres(genres);
      }
    }
    // console.log(selectedGenres)
  }
  
  return (
    <Genres onClick={onGenreClick} />
  )
}
