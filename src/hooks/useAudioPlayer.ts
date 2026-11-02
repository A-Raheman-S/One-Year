import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudioPlayer(audioSrc: string, fallbackDurationSec: number = 42) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDurationSec);
  const [volume, setVolume] = useState(0.85);
  const [waveformData, setWaveformData] = useState<number[]>(new Array(32).fill(10));
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const synthTimeRef = useRef(0);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous'; // Required for Web Audio API on GitHub Pages
    audio.src = audioSrc;
    audio.volume = volume;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      // Audio file not found or can't load — will fallback to synth
      console.warn('Audio file could not be loaded, synth fallback will be used.');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [audioSrc]);

  // Audio Context & Analyser
  const setupAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;

      audioContextRef.current = ctx;
      analyserRef.current = analyser;

      if (audioRef.current) {
        try {
          const source = ctx.createMediaElementSource(audioRef.current);
          source.connect(analyser);
          analyser.connect(ctx.destination);
          sourceNodeRef.current = source;
        } catch {
          // May already be connected or CORS restricted
        }
      }
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  // Update waveform animation loop
  const updateWaveform = useCallback(() => {
    if (analyserRef.current && (isPlaying || isSynthPlaying)) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Map to 32 bars with nice heights
      const bars: number[] = [];
      const step = Math.max(1, Math.floor(dataArray.length / 32));
      for (let i = 0; i < 32; i++) {
        const val = dataArray[i * step] || 0;
        // Normalize between 10% and 100%
        const normalized = Math.max(12, Math.min(100, (val / 255) * 100));
        bars.push(normalized);
      }
      setWaveformData(bars);
      animationFrameRef.current = requestAnimationFrame(updateWaveform);
    } else {
      // Resting bars
      setWaveformData(new Array(32).fill(12));
    }
  }, [isPlaying, isSynthPlaying]);

  useEffect(() => {
    if (isPlaying || isSynthPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateWaveform);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setWaveformData(new Array(32).fill(12));
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isSynthPlaying, updateWaveform]);

  // Fallback melodic synth if local file is missing or blocked
  const playRomanticChime = useCallback(() => {
    setupAudioContext();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Harmonic pentatonic frequencies (warm romantic music box chords)
    const notes = [261.63, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99]; // C4, E4, G4, A4, C5, D5, E5, G5
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const note = notes[Math.floor(Math.random() * notes.length)];
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, ctx.currentTime);

    gain.gain.setValueAtTime(0.08 * volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    if (analyserRef.current) {
      osc.connect(gain);
      gain.connect(analyserRef.current);
    } else {
      osc.connect(gain);
      gain.connect(ctx.destination);
    }

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  }, [setupAudioContext, volume]);

  const togglePlay = async () => {
    setupAudioContext();
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying || isSynthPlaying) {
      // Pause
      audio.pause();
      setIsPlaying(false);
      setIsSynthPlaying(false);
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
    } else {
      // Try HTML5 Audio play
      try {
        // Check if audio source loaded properly
        if (audioRef.current && audioRef.current.readyState === 0) {
          throw new Error('Audio not loaded');
        }
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Fallback to soothing ambient synth player
        setIsSynthPlaying(true);
        synthTimeRef.current = currentTime;
        playRomanticChime();

        if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = window.setInterval(() => {
          synthTimeRef.current += 0.5;
          setCurrentTime(synthTimeRef.current);
          if (Math.random() > 0.3) {
            playRomanticChime();
          }

          if (synthTimeRef.current >= duration) {
            if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
            setIsSynthPlaying(false);
            setCurrentTime(0);
            synthTimeRef.current = 0;
          }
        }, 500);
      }
    }
  };

  const replay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCurrentTime(0);
    synthTimeRef.current = 0;
    if (!isPlaying && !isSynthPlaying) {
      togglePlay();
    }
  };

  const seek = (timeInSec: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSec;
    }
    synthTimeRef.current = timeInSec;
    setCurrentTime(timeInSec);
  };

  const changeVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  return {
    isPlaying: isPlaying || isSynthPlaying,
    currentTime,
    duration,
    volume,
    waveformData,
    togglePlay,
    replay,
    seek,
    changeVolume,
  };
}
