/**
 * audioPlayer.js
 * Plays YouTube video audio (e.g. Sherine - Ya Lela Beda) via YouTube IFrame API.
 * Includes Web Audio API synth as resilient fallback.
 */

class RomanticAudioPlayer {
  constructor() {
    this.ctx = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.ytPlayer = null;
    this.ytReady = false;
    this.pendingPlay = false;
    this._listeners = [];
    this._synthTimer = null;
    this.videoId = 'PJrfUKDy3E4'; // Default to user's requested song
  }

  initYouTube(videoId = 'PJrfUKDy3E4') {
    this.videoId = videoId;
    const createPlayer = () => {
      if (window.YT && window.YT.Player && !this.ytPlayer) {
        try {
          this.ytPlayer = new window.YT.Player('youtube-audio-player', {
            height: '1',
            width: '1',
            videoId: this.videoId,
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              loop: 1,
              playlist: this.videoId,
              playsinline: 1,
              rel: 0,
            },
            events: {
              onReady: () => {
                this.ytReady = true;
                if (this.pendingPlay) {
                  this.pendingPlay = false;
                  this.play();
                }
              },
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  this.isPlaying = true;
                  this._notify(true);
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  this.isPlaying = false;
                  this._notify(false);
                }
              },
              onError: () => {
                console.warn('YouTube playback error, switching to synth');
                if (this.isPlaying) {
                  this._startSynthFallback();
                }
              },
            },
          });
        } catch (e) {
          console.warn('Could not instantiate YT player:', e);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const existing = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof existing === 'function') existing();
        createPlayer();
      };
    }
  }

  start() {
    this.play();
  }

  play() {
    this.isPlaying = true;

    // Try YouTube first
    if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.playVideo === 'function') {
      try {
        this.ytPlayer.playVideo();
        this._notify(true);
        return;
      } catch (err) {
        console.warn('YouTube play failed:', err);
      }
    } else if (!this.ytReady) {
      this.pendingPlay = true;
    }

    // Also prime audio context for seamless experience
    this._startSynthFallback();
    this._notify(true);
  }

  pause() {
    this.isPlaying = false;
    this.pendingPlay = false;
    if (this.ytPlayer && typeof this.ytPlayer.pauseVideo === 'function') {
      try {
        this.ytPlayer.pauseVideo();
      } catch (e) {}
    }
    this._stopSynth();
    this._notify(false);
  }

  stop() {
    this.pause();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  subscribe(callback) {
    this._listeners.push(callback);
    callback(this.isPlaying);
    return () => {
      this._listeners = this._listeners.filter((fn) => fn !== callback);
    };
  }

  _notify(val) {
    this._listeners.forEach((fn) => {
      try {
        fn(val);
      } catch (e) {}
    });
  }

  /* ── Synth fallback ── */
  _initCtx() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = 0;
    this.gainNode.connect(this.ctx.destination);
  }

  _startSynthFallback() {
    this._initCtx();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Only play synth if YouTube is not actively playing
    if (this.ytReady && this.ytPlayer && typeof this.ytPlayer.getPlayerState === 'function') {
      if (this.ytPlayer.getPlayerState() === 1) return;
    }

    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2);

    const progression = [
      [293.66, 369.99, 440.0],
      [220.0, 277.18, 329.63],
      [246.94, 293.66, 369.99],
      [185.0, 220.0, 277.18],
    ];
    let idx = 0;
    const schedule = () => {
      if (!this.isPlaying) return;
      if (this.ytPlayer && typeof this.ytPlayer.getPlayerState === 'function') {
        if (this.ytPlayer.getPlayerState() === 1) {
          this._stopSynth();
          return;
        }
      }
      const chord = progression[idx % progression.length];
      chord.forEach((freq, i) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const st = this.ctx.currentTime + i * 0.22;
        env.gain.setValueAtTime(0, st);
        env.gain.linearRampToValueAtTime(0.05, st + 0.05);
        env.gain.exponentialRampToValueAtTime(0.001, st + 2.2);
        osc.connect(env);
        env.connect(this.gainNode);
        osc.start(st);
        osc.stop(st + 2.3);
      });
      idx++;
      this._synthTimer = setTimeout(schedule, 2800);
    };
    schedule();
  }

  _stopSynth() {
    clearTimeout(this._synthTimer);
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
    }
  }
}

export const audioPlayer = new RomanticAudioPlayer();
