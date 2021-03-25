import React, { useState, useEffect } from "react";
import styles from '../styles/Story.module.css'
import Image from 'next/image'

const useAudio = url => {
    const [audio] = useState( typeof Audio !== "undefined" && new Audio(url));
    const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const AudioPlayer = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button className={styles.listenBtn} onClick={toggle} >
        {playing ? "Pása" : "Hlusta"}
        <Image  
            src="/img/sound.svg"
            alt="Hlusta"
            width={24}
            height={24}
        /></button>
    </div>
  );
};

export default AudioPlayer;