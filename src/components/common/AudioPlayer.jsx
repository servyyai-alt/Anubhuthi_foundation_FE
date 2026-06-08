import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaRedo, FaUndo } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AudioPlayer({ src, title, artist, cover }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Reset player when source changes
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play interrupted:", err));
    }
  };

  const onPlayPause = () => {
    if (!audioRef.current) return;
    setIsPlaying(!audioRef.current.paused);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const onAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const skipTime = (amount) => {
    if (!audioRef.current) return;
    let newTime = audioRef.current.currentTime + amount;
    if (newTime < 0) newTime = 0;
    if (newTime > duration) newTime = duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressChange = (e) => {
    if (!audioRef.current) return;
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const percentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-gradient-to-br from-[#07284A] to-[#0c3761] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-white/10 overflow-hidden relative">
      <audio
        ref={audioRef}
        src={src}
        onPlay={onPlayPause}
        onPause={onPlayPause}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onAudioEnded}
      />
      
      {/* Dynamic background visualization */}
      <div className="absolute inset-0 opacity-5 flex items-end justify-between pointer-events-none px-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-white rounded-t-full transition-all duration-300"
            style={{
              height: isPlaying ? `${Math.random() * 80 + 10}%` : '5%',
              transition: isPlaying ? 'height 0.1s ease-in-out' : 'all 0.5s ease'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
        {/* Cover Art / Audio Equalizer Overlay */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-gradient-to-br from-[#C58A2B] to-[#00142D] flex items-center justify-center">
          {cover ? (
            <img
              src={cover}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-105' : ''}`}
            />
          ) : (
            <div className="text-[#C58A2B] text-4xl">
              <FaPlay className={isPlaying ? 'animate-pulse' : ''} />
            </div>
          )}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-xs">
              {/* Equalizer animation */}
              <div className="flex items-end gap-1 h-6">
                {[0.6, 1.0, 0.4, 0.8].map((initialHeight, idx) => (
                  <motion.span
                    key={idx}
                    className="w-1 bg-[#C58A2B] rounded-full"
                    animate={{
                      height: ['20%', '100%', '20%']
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: idx * 0.15,
                      ease: 'easeInOut'
                    }}
                    style={{ height: `${initialHeight * 100}%` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div className="mb-3 text-center sm:text-left">
            <h3 className="font-serif font-bold text-lg text-white line-clamp-1">{title || 'Untitled Episode'}</h3>
            <p className="text-white/60 text-xs mt-0.5">{artist || 'Anubhuthi Podcast'}</p>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-1.5 mb-3">
            <div className="relative w-full h-1.5 group">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="absolute inset-0 bg-white/20 rounded-full z-0 group-hover:h-2 transition-all duration-150" />
              <div
                className="absolute left-0 top-0 h-full bg-[#C58A2B] rounded-full z-10 pointer-events-none group-hover:h-2 transition-all duration-150"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-white/50 px-0.5 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Buttons & Volume */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-5 mx-auto sm:mx-0">
              {/* Skip Back 10s */}
              <button
                type="button"
                onClick={() => skipTime(-10)}
                className="text-white/70 hover:text-[#C58A2B] transition-colors focus:outline-none cursor-pointer"
                title="Rewind 10s"
              >
                <FaUndo size={16} />
              </button>

              {/* Play / Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-12 h-12 bg-[#C58A2B] hover:bg-[#A36E1E] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
              >
                {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} className="ml-0.5" />}
              </button>

              {/* Skip Forward 10s */}
              <button
                type="button"
                onClick={() => skipTime(10)}
                className="text-white/70 hover:text-[#C58A2B] transition-colors focus:outline-none cursor-pointer"
                title="Forward 10s"
              >
                <FaRedo size={16} />
              </button>
            </div>

            {/* Volume controls */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-start">
              <button
                type="button"
                onClick={toggleMute}
                className="text-white/70 hover:text-[#C58A2B] transition-colors focus:outline-none cursor-pointer"
              >
                {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C58A2B] hover:bg-white/30 transition-all duration-150"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
