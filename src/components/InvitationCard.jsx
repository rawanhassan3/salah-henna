import { motion } from 'framer-motion';
import { wedding } from '../config/weddingData';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
});

/* ─── Thin gold divider with diamond ───────────────────────────────── */
function Divider({ width = '60%', my = 12 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        margin: `${my}px auto`,
        gap: 7,
      }}
    >
      <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to right, transparent, #B89B5E)' }} />
      <svg width="7" height="7" viewBox="0 0 10 10">
        <rect
          x="1"
          y="1"
          width="8"
          height="8"
          rx="0.5"
          transform="rotate(45 5 5)"
          fill="#B89B5E"
          opacity="0.85"
        />
      </svg>
      <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to left, transparent, #B89B5E)' }} />
    </div>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────── */
const iconProps = {
  width: 18,
  height: 18,
  fill: 'none',
  stroke: '#B89B5E',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const CalIcon = () => (
  <svg viewBox="0 0 24 24" {...iconProps}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const FoodIcon = () => (
  <svg viewBox="0 0 24 24" {...iconProps}>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const HennaIcon = () => (
  <svg viewBox="0 0 24 24" {...iconProps}>
    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" {...iconProps}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function InvitationCard() {
  const infoItems = [
    { icon: <CalIcon />, label: 'الموعد', text: wedding.displayDayAr },
    { icon: <FoodIcon />, label: 'الغداء', text: wedding.ghadaTime },
    { icon: <HennaIcon />, label: 'الحنة', text: wedding.hennaTime },
    { icon: <PinIcon />, label: 'العنوان', text: wedding.venueAr, link: wedding.mapsUrl },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', background: '#E8E3DA' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.9 } }}
        style={{
          width: '100%',
          maxWidth: 430,
          minHeight: '100vh',
          backgroundImage: `url(${wedding.cardBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          direction: 'rtl',
        }}
      >
        {/* Soft radial overlay for perfect text contrast on paper */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(252,250,246,0.36) 0%, rgba(240,234,224,0.12) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Content Container ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 'clamp(50px, 10vw, 75px) clamp(28px, 7vw, 48px) clamp(40px, 8vw, 60px)',
            gap: 0,
          }}
        >
          {/* Basmala */}
          <motion.p
            variants={fadeUp(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'Aref Ruqaa, serif',
              fontSize: 'clamp(1.05rem, 3.6vw, 1.3rem)',
              fontWeight: 700,
              color: '#34271D',
              textAlign: 'center',
              letterSpacing: '0.06em',
              marginBottom: 6,
            }}
          >
            {wedding.basmala}
          </motion.p>

          {/* Quranic Verse */}
          <motion.p
            variants={fadeUp(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'Amiri, serif',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
              fontWeight: 700,
              color: '#423326',
              textAlign: 'center',
              lineHeight: 1.9,
              maxWidth: '340px',
              margin: '0 auto 10px',
            }}
          >
            {wedding.quranVerse}
          </motion.p>

          <Divider width="45%" my={8} />

          {/* Family Heading */}
          <motion.h2
            variants={fadeUp(0.18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'Aref Ruqaa, serif',
              fontSize: 'clamp(1.25rem, 4.6vw, 1.65rem)',
              fontWeight: 700,
              color: '#281D14',
              textAlign: 'center',
              letterSpacing: '0.04em',
              marginTop: 4,
              marginBottom: 6,
            }}
          >
            {wedding.familyHeading}
          </motion.h2>

          {/* Fathers */}
          <motion.div
            variants={fadeUp(0.24)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'Amiri, serif',
              fontSize: 'clamp(0.82rem, 2.6vw, 0.96rem)',
              fontWeight: 700,
              color: '#382B1F',
              textAlign: 'center',
              lineHeight: 1.85,
              marginBottom: 10,
            }}
          >
            <span>الحاج / </span>
            <strong style={{ color: '#281D14', fontWeight: 700 }}>{wedding.father1}</strong>
            <span style={{ margin: '0 8px', color: '#B89B5E' }}>،</span>
            <span>الحاج / </span>
            <strong style={{ color: '#281D14', fontWeight: 700 }}>{wedding.father2}</strong>
          </motion.div>

          {/* Invitation Intro Phrase */}
          <motion.p
            variants={fadeUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'Amiri, serif',
              fontSize: 'clamp(0.86rem, 2.7vw, 1rem)',
              fontWeight: 700,
              color: '#423326',
              textAlign: 'center',
              lineHeight: 1.65,
              marginBottom: 12,
            }}
          >
            {wedding.invitationIntro}
          </motion.p>

          <Divider width="70%" my={4} />

          {/* ── Couple Names & Titles (Perfect symmetrical layout) ── */}
          <motion.div
            variants={fadeUp(0.38)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              padding: '16px 0 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Arabic Names + Titles (Symmetrical, never breaks/wraps awkwardly) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(10px, 3.5vw, 22px)',
                width: '100%',
                maxWidth: '380px',
              }}
            >
              {/* Groom Block */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Amiri, serif',
                    fontSize: 'clamp(0.85rem, 2.7vw, 1.05rem)',
                    color: '#8A7040',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: '2px',
                  }}
                >
                  الدكتور
                </span>
                <span
                  style={{
                    fontFamily: 'Aref Ruqaa, serif',
                    fontSize: 'clamp(2.1rem, 8.5vw, 3.2rem)',
                    fontWeight: 700,
                    background:
                      'linear-gradient(135deg, #7A6030 0%, #C8A85A 35%, #F0DEB4 50%, #C8A85A 65%, #7A6030 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.15,
                    filter: 'drop-shadow(0 2px 4px rgba(120,90,30,0.22))',
                    whiteSpace: 'nowrap',
                  }}
                >
                  صـلاح
                </span>
              </div>

              {/* Center Ampersand & Diamond Ornament */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.6rem, 5.5vw, 2.3rem)',
                    color: '#B89B5E',
                    fontWeight: 400,
                    lineHeight: 1,
                    filter: 'drop-shadow(0 1px 2px rgba(140,110,50,0.25))',
                  }}
                >
                  &amp;
                </span>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    background: '#B89B5E',
                    transform: 'rotate(45deg)',
                    marginTop: '4px',
                    opacity: 0.85,
                  }}
                />
              </div>

              {/* Bride Block */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Amiri, serif',
                    fontSize: 'clamp(0.85rem, 2.7vw, 1.05rem)',
                    color: '#8A7040',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: '2px',
                  }}
                >
                  الدكتورة
                </span>
                <span
                  style={{
                    fontFamily: 'Aref Ruqaa, serif',
                    fontSize: 'clamp(2.1rem, 8.5vw, 3.2rem)',
                    fontWeight: 700,
                    background:
                      'linear-gradient(135deg, #7A6030 0%, #C8A85A 35%, #F0DEB4 50%, #C8A85A 65%, #7A6030 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.15,
                    filter: 'drop-shadow(0 2px 4px rgba(120,90,30,0.22))',
                    whiteSpace: 'nowrap',
                  }}
                >
                  سـارة
                </span>
              </div>
            </div>
          </motion.div>

          <Divider width="70%" my={4} />

          {/* ── Exact Details Paragraph ── */}
          <motion.p
            variants={fadeUp(0.46)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'Amiri, serif',
              fontSize: 'clamp(0.86rem, 2.7vw, 1.02rem)',
              fontWeight: 700,
              color: '#34271D',
              textAlign: 'center',
              lineHeight: 2.1,
              maxWidth: '350px',
              margin: '12px auto 16px',
            }}
          >
            {wedding.detailsParagraph}
          </motion.p>

          {/* ── Quick Glance Info Row ── */}
          <motion.div
            variants={fadeUp(0.54)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'flex',
              width: '100%',
              borderTop: '0.5px solid rgba(184,155,94,0.35)',
              borderBottom: '0.5px solid rgba(184,155,94,0.35)',
              padding: '12px 0',
              marginBottom: 18,
            }}
          >
            {infoItems.map((item, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5,
                  padding: '0 3px',
                  borderRight:
                    i < infoItems.length - 1 ? '0.5px solid rgba(184,155,94,0.28)' : 'none',
                }}
              >
                {item.icon}
                <span
                  style={{
                    fontFamily: 'Reem Kufi, sans-serif',
                    fontSize: 'clamp(0.6rem, 1.8vw, 0.72rem)',
                    color: '#8A7040',
                    fontWeight: 700,
                  }}
                >
                  {item.label}
                </span>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'Reem Kufi, sans-serif',
                      fontSize: 'clamp(0.52rem, 1.5vw, 0.65rem)',
                      color: '#4A3B2E',
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.35,
                      textDecoration: 'underline',
                      textDecorationColor: 'rgba(184,155,94,0.5)',
                    }}
                  >
                    {item.text}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: 'Reem Kufi, sans-serif',
                      fontSize: 'clamp(0.52rem, 1.5vw, 0.65rem)',
                      color: '#4A3B2E',
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.text}
                  </span>
                )}
              </div>
            ))}
          </motion.div>

          {/* ── Closing phrase ── */}
          <motion.p
            variants={fadeUp(0.62)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: 'Aref Ruqaa, serif',
              fontSize: 'clamp(1.2rem, 4.6vw, 1.6rem)',
              fontWeight: 700,
              textAlign: 'center',
              color: '#281D14',
              textShadow: '0 0 18px rgba(184,155,94,0.3), 0 1px 2px rgba(255,255,255,0.7)',
              lineHeight: 1.4,
              letterSpacing: '0.03em',
              marginBottom: 16,
            }}
          >
            {wedding.closingPhrase}
          </motion.p>

          {/* ── Address link at the bottom ── */}
          <motion.div
            variants={fadeUp(0.68)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              marginTop: 'auto',
              paddingTop: 10,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'Amiri, serif',
                fontSize: 'clamp(0.72rem, 2.2vw, 0.85rem)',
                color: '#8C7B69',
                marginBottom: 4,
              }}
            >
              مكتوب في الأسفل العنوان:
            </p>
            <a
              href={wedding.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'Amiri, serif',
                fontSize: 'clamp(0.85rem, 2.6vw, 1rem)',
                fontWeight: 700,
                color: '#8A7040',
                textDecoration: 'underline',
                textDecorationColor: '#B89B5E',
              }}
            >
              <PinIcon />
              <span>{wedding.venueAr}</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
