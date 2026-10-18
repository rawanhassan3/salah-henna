import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import InvitationCard from './components/InvitationCard';
import Countdown from './components/Countdown';
import MusicButton from './components/MusicButton';
import { audioPlayer } from './utils/audioPlayer';
import { wedding } from './config/weddingData';

// Detect prefers-reduced-motion
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [stage, setStage] = useState('loading'); // 'loading' | 'transition' | 'invitation'

  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    // Pre-initialize YouTube audio player for seamless user interaction
    audioPlayer.initYouTube(wedding.youtubeVideoId || 'PJrfUKDy3E4');
  }, []);

  const handleEnter = () => {
    // Start music inside user gesture (autoplay policy)
    audioPlayer.play();

    if (prefersReduced) {
      // Simple fast fade for accessibility
      setStage('invitation');
      return;
    }

    setStage('transition');
    // After transition animation, show invitation
    setTimeout(() => setStage('invitation'), 1850);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F4F0E8', position: 'relative' }}>
      <AnimatePresence>
        {stage === 'loading' && (
          <motion.div
            key="loading"
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 1.15, transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] } }}
          >
            <LoadingScreen onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition overlay — zooms gazebo, then fades out */}
      <AnimatePresence>
        {stage === 'transition' && (
          <motion.div
            key="overlay"
            className="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.8, times: [0, 0.4, 1], ease: 'easeInOut' }}
            onAnimationComplete={() => {}}
          />
        )}
      </AnimatePresence>

      {/* Main invitation content */}
      <AnimatePresence>
        {(stage === 'transition' || stage === 'invitation') && (
          <motion.main
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.2, delay: 0.3 } }}
            style={{ position: 'relative', zIndex: 1 }}
            dir="rtl"
          >
            {/* Invitation card (replaces hero) */}
            <InvitationCard />

            {/* ── Sections below ── */}
            <div
              style={{
                background: 'linear-gradient(180deg, #EDE8DF 0%, #F4F0E8 100%)',
                paddingBottom: 20,
              }}
            >
              {/* Countdown + calendar + map */}
              <Countdown />
            </div>

            {/* Floating music toggle */}
            <MusicButton />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
