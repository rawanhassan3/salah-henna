import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { wedding } from '../config/weddingData';

function pad(n) { return String(n).padStart(2, '0'); }

const LABELS = [
  { key: 'days', ar: '\u064A\u0648\u0645' },
  { key: 'hours', ar: '\u0633\u0627\u0639\u0629' },
  { key: 'minutes', ar: '\u062F\u0642\u064A\u0642\u0629' },
  { key: 'seconds', ar: '\u062B\u0627\u0646\u064A\u0629' },
];

export default function Countdown() {
  const target = new Date(wedding.weddingDate);

  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc());

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  // ICS download
  const downloadICS = () => {
    const dt = new Date(wedding.weddingDate);
    const fmt = (d) => d.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
    const end = new Date(dt.getTime() + 4 * 3600000);
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//WeddingInvitation//AR',
      'BEGIN:VEVENT',
      `DTSTART:${fmt(dt)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${wedding.icsTitle}`,
      `LOCATION:${wedding.icsLocation}`,
      `DESCRIPTION:${wedding.duaWatermark}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wedding-salah-sarah.ics';
    a.click();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ padding: '40px 20px', maxWidth: 430, margin: '0 auto', direction: 'rtl' }}
    >
      <p style={{ fontFamily: 'Amiri, serif', fontSize: '1rem', color: '#8C7B69', textAlign: 'center', marginBottom: 20 }}>
        {'\u062A\u0628\u0642\u0649 \u062D\u062A\u0649 \u0627\u0644\u0641\u0631\u062D'}
      </p>

      {/* Timer boxes */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
        {LABELS.map(({ key, ar }) => (
          <div key={key} className="countdown-box" style={{ flex: 1, textAlign: 'center', padding: '14px 4px', borderRadius: 10 }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem,7vw,2.4rem)', color: '#8A7040', lineHeight: 1 }}>
              {pad(time[key])}
            </div>
            <div style={{ fontFamily: 'Reem Kufi, sans-serif', fontSize: '0.65rem', color: '#8C7B69', marginTop: 4 }}>
              {ar}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="action-btn" onClick={downloadICS} id="add-to-calendar-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {'\u0623\u0636\u0641 \u0644\u0644\u062A\u0642\u0648\u064A\u0645'}
        </button>
        <a href={wedding.mapsUrl} target="_blank" rel="noopener noreferrer" className="action-btn" id="open-maps-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {'\u0627\u0641\u062A\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629'}
        </a>
      </div>
    </motion.section>
  );
}
