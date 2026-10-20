import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '../config/weddingData';

// ── Dust particles ────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: Math.random() * 10 + 14,
  drift: (Math.random() - 0.5) * 80,
}));

// ── Assets / fonts to preload ─────────────────────────────────────────────────
const PRELOAD_IMAGES = [wedding.loadingBg];
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Amiri:wght@400;700&family=Reem+Kufi:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap';

function preloadAll(onProgress) {
  let loaded = 0;
  const total = PRELOAD_IMAGES.length + 1; // +1 for font
  const tick = () => { loaded++; onProgress(Math.min(100, Math.round((loaded / total) * 100))); };

  // Images
  PRELOAD_IMAGES.forEach((src) => {
    const img = new Image();
    img.onload = img.onerror = tick;
    img.src = src;
  });

  // Font
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = GOOGLE_FONTS_URL;
  link.onload = link.onerror = tick;
  document.head.appendChild(link);
}

export default function LoadingScreen({ onEnter }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const minTimeRef = useRef(false);
  const loadDoneRef = useRef(false);

  // Enforce minimum 3.5s display
  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeRef.current = true;
      if (loadDoneRef.current) setReady(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Real preload
  useEffect(() => {
    let fakeInterval;
    // Fake incremental progress so bar always moves
    let fake = 0;
    fakeInterval = setInterval(() => {
      fake = Math.min(fake + Math.random() * 4, 92);
      setProgress(Math.round(fake));
    }, 120);

    preloadAll((p) => {
      clearInterval(fakeInterval);
      setProgress(100);
      loadDoneRef.current = true;
      if (minTimeRef.current) setReady(true);
    });

    return () => clearInterval(fakeInterval);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.55 + 0.4, duration: 0.9, ease: 'easeOut' },
    }),
  };

  return (
    <div className="loading-screen select-none" dir="rtl">
      {/* Background with Ken Burns */}
      <img
        src={wedding.loadingBg}
        alt=""
        className="loading-bg"
        draggable={false}
      />

      {/* Dark gradient overlay — heavier at top, lighter near gazebo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,7,4,0.72) 0%, rgba(10,7,4,0.45) 55%, rgba(10,7,4,0.1) 100%)',
          zIndex: 1,
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-10px',
            '--drift': `${p.drift}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Content column */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 'clamp(60px, 12vh, 120px)',
          gap: '8px',
        }}
      >
        {/* Arabic subtitle */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="embossed-text"
          style={{
            fontFamily: 'Aref Ruqaa, serif',
            fontSize: 'clamp(1.1rem, 4.2vw, 1.5rem)',
            letterSpacing: '0.18em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '0.85em', color: '#D4B86A', opacity: 0.85 }}>✦</span>
          <span>{'\u062F\u0639\u0648\u0629 \u0632\u0641\u0627\u0641'}</span>
          <span style={{ fontSize: '0.85em', color: '#D4B86A', opacity: 0.85 }}>✦</span>
        </motion.p>

        {/* Main names */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="embossed-gold"
          style={{
            fontFamily: 'Aref Ruqaa, serif',
            fontSize: 'clamp(2.6rem, 10vw, 4.4rem)',
            lineHeight: 1.2,
            textAlign: 'center',
            marginTop: '2px',
          }}
        >
          {'\u0635\u0644\u0627\u062D \u0026 \u0633\u0627\u0631\u0629'}
        </motion.h1>

        {/* English names */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(0.95rem, 3.6vw, 1.35rem)',
            color: '#EFE5CE',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 16px rgba(212, 184, 106, 0.25)',
            marginTop: '4px',
          }}
        >
          Salah &amp; Sara
        </motion.p>

        {/* Delicate gold divider */}
        <motion.div
          custom={2.5}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '180px',
            margin: '8px auto 0',
            gap: 8,
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,184,106,0.7))' }} />
          <span style={{ color: '#D4B86A', fontSize: '10px' }}>◆</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,184,106,0.7))' }} />
        </motion.div>

        {/* Progress / button */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        >
          <AnimatePresence mode="wait">
            {!ready ? (
              <motion.div key="bar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <p style={{
                  color: '#DFD2B7',
                  fontSize: '0.75rem',
                  textAlign: 'center',
                  marginTop: 8,
                  fontFamily: 'Cormorant Garamond, serif',
                  letterSpacing: '0.15em',
                  textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                }}>
                  {progress}%
                </p>
              </motion.div>
            ) : (
              <motion.button
                key="btn"
                className="open-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onEnter}
              >
                <span
                  style={{
                    fontFamily: 'Aref Ruqaa, serif',
                    fontSize: 'clamp(1.15rem, 4.6vw, 1.55rem)',
                    color: '#FFFDF7',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 16px rgba(212,184,106,0.7)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {'\u0627\u0641\u062A\u062D \u0627\u0644\u062F\u0639\u0648\u0629'}
                </span>
                <span
                  style={{
                    color: '#DFD2B7',
                    fontSize: '0.68rem',
                    fontFamily: 'Cormorant Garamond, serif',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  Open the Invitation
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
