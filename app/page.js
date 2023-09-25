'use client'
import Image from 'next/image';
import { useState } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import AudioPlayer from 'react-audio-player';


export default function Home() {
  const [music, setMusic] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    setMusic(!music)
    const audioElement = document.querySelector("audio");
    if (isPlaying) {
      audioElement.pause();
    } else {
      setTimeout(() => {
        audioElement.play();
      }, 100); // Add a short delay (e.g., 100 milliseconds) before playing
    }
  };


  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setMusic(true);
    setIsPlaying(true);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setMusic(true);
    setIsPlaying(true);
  };

  const songs = [
    {
      name: 'Faded',
      singer: 'Alan Walker',
      link: '/faded.mp3',
      songImg: '/faded_img.jpg', // Add the background image path for this song
      bgColor:'#b0c7eb'
    },
    {
      name: 'Hurts So Good',
      singer: 'Astrid S',
      link: '/hurts.mp3',
      songImg: '/hurts_img.jpg', // Add the background image path for this song
      bgColor:'#f7d6cd'
    },
    {
      name: 'Sigma Male',
      singer: 'Zedline',
      link: '/sigma.mp3',
      songImg: '/sigma_img.jpg', // Add the background image path for this song
      bgColor:'#bbabc4'
    },
    {
      name: 'Bella Ciao',
      singer: 'Hardwell, Maddix',
      link: '/bella.mp3',
      songImg: '/bella_img.jpg', // Add the background image path for this song
      bgColor:'#e0949d'
    },
  ];


  const currentSong = songs[currentSongIndex];

  return (
    <>
      <div className='min-h-screen w-full bg-gray-300 flex justify-center items-center'>
        {/* MUSIC CONTAINER */}
        <div style={{backgroundColor:currentSong.bgColor}}  className={`absolute md:w-[20%] h-[70%] w-[80%] flex items-center md:h-3/4 shadow-xl shadow-gray-400 rounded-xl`} >
          {/* INNER CONTAINER */}
          <div className='p-4 text-center m-auto flex-col h-[80%] flex justify-between w-fit'>
            <div className='text-xl md:text-2xl text-gray-900'>{currentSong.name}</div>
            <div className='text-base md:text-lg text-gray-600 -mt-12 capitalize'>{currentSong.singer}</div>
            
            <div
              className={`w-[195px] h-[195px] md:w-[230px] md:h-[230px] rounded-full bgImg shadow-lg shadow-gray-800 ${!music ? 'img_stop_rotate' : 'img_rotate'}`}
              style={{ backgroundImage: `url(${currentSong.songImg})` }}
            ></div>

            <div className='flex justify-between'>
              <div className='hover:cursor-pointer active:bg-gray-800 active:text-white p-[6px] rounded-full' onClick={prevSong}>
                <FaBackward />
              </div>
              <div className='hover:cursor-pointer  active:bg-gray-800 active:text-white p-[6px] rounded-full' onClick={toggleMusic}>
                {music ? <FaPause /> : <FaPlay />}
              </div>
              <div className='hover:cursor-pointer active:bg-gray-800 active:text-white p-[6px] rounded-full' onClick={nextSong}>
                <FaForward />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player (Place it outside the div with play/pause button) */}
      <AudioPlayer
        src={currentSong.link}
        autoPlay={isPlaying}
        controls={false} // Hide default controls
      />
    </>
  );
}
