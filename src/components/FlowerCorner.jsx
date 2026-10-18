/**
 * FlowerCorner.jsx
 * Renders the embossed 3D white flower cluster using pure SVG/CSS.
 * Placed top-right and bottom-left of the invitation card.
 */
export default function FlowerCorner({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
    >
      <defs>
        {/* Petal gradient — white with subtle shadow */}
        <radialGradient id="petGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="60%" stopColor="#EDE8DF" stopOpacity="1" />
          <stop offset="100%" stopColor="#D8D3CA" stopOpacity="1" />
        </radialGradient>
        {/* Gold center */}
        <radialGradient id="goldCtr" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F5E4B0" />
          <stop offset="50%" stopColor="#B89B5E" />
          <stop offset="100%" stopColor="#8A7040" />
        </radialGradient>
        <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feOffset dx="1" dy="2" result="offset" />
          <feComposite in="SourceGraphic" in2="offset" operator="over" />
        </filter>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#8C7B69" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#softShadow)">
        {/* Large center flower */}
        <g transform="translate(90,90)">
          {[0,45,90,135,180,225,270,315].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 28}
              cy={Math.sin((angle * Math.PI) / 180) * 28}
              rx="16"
              ry="10"
              transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 28} ${Math.sin((angle * Math.PI) / 180) * 28})`}
              fill="url(#petGrad)"
              stroke="#D8D3CA"
              strokeWidth="0.5"
              filter="url(#emboss)"
            />
          ))}
          <circle cx="0" cy="0" r="11" fill="url(#goldCtr)" />
        </g>

        {/* Small flower top-left */}
        <g transform="translate(28,38)">
          {[0,60,120,180,240,300].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 17}
              cy={Math.sin((angle * Math.PI) / 180) * 17}
              rx="10"
              ry="6"
              transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 17} ${Math.sin((angle * Math.PI) / 180) * 17})`}
              fill="url(#petGrad)"
              stroke="#D8D3CA"
              strokeWidth="0.4"
            />
          ))}
          <circle cx="0" cy="0" r="7" fill="url(#goldCtr)" />
        </g>

        {/* Tiny flower */}
        <g transform="translate(155,35)">
          {[0,72,144,216,288].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 11}
              cy={Math.sin((angle * Math.PI) / 180) * 11}
              rx="7"
              ry="4"
              transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 11} ${Math.sin((angle * Math.PI) / 180) * 11})`}
              fill="url(#petGrad)"
              stroke="#D8D3CA"
              strokeWidth="0.3"
            />
          ))}
          <circle cx="0" cy="0" r="4.5" fill="url(#goldCtr)" />
        </g>

        {/* Leaf stems */}
        <path d="M 55 130 Q 80 110 110 90" stroke="#C8C0B2" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M 30 70 Q 55 55 80 45" stroke="#C8C0B2" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M 130 30 Q 150 50 160 75" stroke="#C8C0B2" strokeWidth="1" fill="none" opacity="0.4" />

        {/* Leaf shapes */}
        {[
          { d: "M 60 120 Q 72 102 88 108 Q 75 118 60 120 Z", opacity: 0.45 },
          { d: "M 40 58 Q 55 42 68 50 Q 58 62 40 58 Z", opacity: 0.4 },
        ].map((leaf, i) => (
          <path key={i} d={leaf.d} fill="#C8C2B5" opacity={leaf.opacity} />
        ))}
      </g>
    </svg>
  );
}
