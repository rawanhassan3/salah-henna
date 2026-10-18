import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '../config/weddingData';

export default function RSVP() {
  const [form, setForm] = useState({ name: '', guests: '1', attending: 'yes', note: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('RSVP:', form);
    setSubmitted(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ padding: '40px 20px 60px', maxWidth: 430, margin: '0 auto', direction: 'rtl' }}
    >
      <div className="gold-divider" style={{ marginBottom: 24 }} />

      <h2 style={{ fontFamily: 'Aref Ruqaa, serif', fontSize: 'clamp(1.2rem,5vw,1.6rem)', color: '#8C7B69', textAlign: 'center', marginBottom: 6 }}>
        {'\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0636\u0648\u0631'}
      </h2>
      <p style={{ fontFamily: 'Amiri, serif', fontSize: '0.9rem', color: '#B0A090', textAlign: 'center', marginBottom: 24 }}>
        {'\u0633\u064A\u0643\u0648\u0646 \u062D\u0636\u0648\u0631\u0643\u0645 \u0628\u0647\u062C\u0629 \u0644\u0646\u0627'}
      </p>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <input
              id="rsvp-name"
              className="rsvp-input"
              type="text"
              placeholder={'\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0631\u064A\u0645'}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <select
              id="rsvp-guests"
              className="rsvp-input"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
            >
              {[1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? '\u0634\u062E\u0635' : '\u0623\u0634\u062E\u0627\u0635'}</option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { value: 'yes', label: '\u0633\u0623\u062D\u0636\u0631 \u0628\u0625\u0630\u0646 \u0627\u0644\u0644\u0647' },
                { value: 'no', label: '\u0622\u0633\u0641 \u0644\u0646 \u0623\u062A\u0645\u0643\u0646' },
              ].map(opt => (
                <label
                  key={opt.value}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px',
                    border: `1px solid ${form.attending === opt.value ? '#B89B5E' : 'rgba(184,155,94,0.3)'}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontFamily: 'Amiri, serif',
                    fontSize: '0.9rem',
                    color: form.attending === opt.value ? '#8A7040' : '#8C7B69',
                    background: form.attending === opt.value ? 'rgba(184,155,94,0.08)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={opt.value}
                    checked={form.attending === opt.value}
                    onChange={(e) => setForm({ ...form, attending: e.target.value })}
                    style={{ accentColor: '#B89B5E' }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            <textarea
              id="rsvp-note"
              className="rsvp-input"
              placeholder={'\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629...'}
              rows={3}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              style={{ resize: 'none' }}
            />
            <button type="submit" className="rsvp-btn" id="rsvp-submit-btn">
              {'\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0623\u0643\u064A\u062F'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } }}
            style={{ textAlign: 'center', padding: '40px 20px' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🌸</div>
            <p style={{ fontFamily: 'Aref Ruqaa, serif', fontSize: '1.4rem', color: '#8A7040', marginBottom: 8 }}>
              {'\u062C\u0632\u0627\u0643\u0645 \u0627\u0644\u0644\u0647 \u062E\u064A\u0631\u0627\u064B'}
            </p>
            <p style={{ fontFamily: 'Amiri, serif', fontSize: '1rem', color: '#8C7B69' }}>
              {'\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0631\u062F\u0643\u0645 \u0628\u0646\u062C\u0627\u062D'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <div className="gold-divider" style={{ marginBottom: 16 }} />
        <p style={{ fontFamily: 'Aref Ruqaa, serif', fontSize: '1rem', color: '#B89B5E' }}>
          {'\u0628\u0645\u062D\u0628\u0629 — \u0635\u0644\u0627\u062D \u0648 \u0633\u0627\u0631\u0629'}
        </p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#C0B09A', fontSize: '0.8rem', marginTop: 4, letterSpacing: '0.15em' }}>
          With love — Salah &amp; Sarah
        </p>
      </div>
    </motion.section>
  );
}
