import React from 'react';
import styles from "../styles/Genres.module.css";
import Image from 'next/image'


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
      <h4>Síur</h4>
      <div className={`tags ${styles.tags}`}>
        {Genres &&
          Genres.map((genre, i) => (
            <div>
              <div className={styles.container} id='storyGenres' key={ genre }>
                <input id={`genre${i}`} type="checkbox" name="genre" value={ genre } onClick={onClick}/>
                <label className={styles.label} htmlFor={`genre${i}`}>{ genre }</label>
                  {/* <Image  
                    src="/img/triangle.svg"
                    alt=""
                    className={styles.triangle}
                    width={19}
                    height={30}/> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
};
