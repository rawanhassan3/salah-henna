import { useState, useEffect } from 'react';
import { audioPlayer } from '../utils/audioPlayer';

export default function MusicButton() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = audioPlayer.subscribe(setPlaying);
    return () => unsubscribe();
  }, []);

  const toggle = () => {
    audioPlayer.toggle();
  };

  return (
    <button
      id="music-toggle-btn"
      onClick={toggle}
      aria-label={playing ? '\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u0645\u0648\u0633\u064A\u0642\u0649' : '\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0645\u0648\u0633\u064A\u0642\u0649'}
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 100,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1px solid rgba(184,155,94,0.5)',
        background: 'rgba(244,240,232,0.9)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8A7040',
        boxShadow: '0 2px 12px rgba(140,123,105,0.2)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {playing ? (
        // Pause icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
        </svg>
      ) : (
        // Play icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
      )}
    </button>
  );
}
