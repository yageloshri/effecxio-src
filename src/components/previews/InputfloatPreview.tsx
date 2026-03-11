'use client';

import { memo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function InputfloatPreview() {
  const prefersReduced = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const isActive = focused || value.length > 0;
  const dur = prefersReduced ? '0s' : '0.25s';

  return (
    <div
      style={{
        width: '100%',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: 220 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: '18px 14px 8px',
            fontSize: 14,
            color: 'var(--text)',
            background: 'var(--surface)',
            border: `2px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 10,
            outline: 'none',
            fontFamily: 'inherit',
            transition: `border-color 0.3s ease`,
          }}
        />
        {/* Floating label */}
        <span
          style={{
            position: 'absolute',
            left: 14,
            top: isActive ? 8 : '50%',
            transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
            fontSize: isActive ? 10 : 14,
            color: focused ? 'var(--accent)' : 'var(--muted)',
            pointerEvents: 'none',
            transition: `top ${dur} ease, font-size ${dur} ease, color ${dur} ease, transform ${dur} ease`,
          }}
        >
          Type here...
        </span>

        {/* Expanding line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: focused ? '0%' : '50%',
            width: focused ? '100%' : '0%',
            height: 2,
            background: 'var(--accent)',
            borderRadius: '0 0 10px 10px',
            transition: `width 0.3s ease, left 0.3s ease`,
          }}
        />
      </div>
    </div>
  );
}

export default memo(InputfloatPreview);
