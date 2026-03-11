'use client';

import { memo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function ToggleswitchPreview() {
  const prefersReduced = useReducedMotion();
  const [checked, setChecked] = useState(false);

  const dur = prefersReduced ? '0s' : '0.35s';
  const bezier = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

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
        gap: 14,
      }}
    >
      <span style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 600 }}>
        OFF
      </span>

      {/* Toggle body */}
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => setChecked((c) => !c)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            setChecked((c) => !c);
          }
        }}
        style={{
          position: 'relative',
          width: 56,
          height: 30,
          borderRadius: 15,
          background: checked ? 'var(--accent)' : 'var(--border)',
          cursor: 'pointer',
          transition: `background 0.4s ease`,
          flexShrink: 0,
        }}
      >
        {/* Knob */}
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 29 : 3, /* 56 - 24 - 3 = 29 */
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            transition: `left ${dur} ${bezier}`,
          }}
        />
      </div>

      <span
        style={{
          color: checked ? 'var(--accent)' : 'var(--muted)',
          fontSize: 13,
          fontWeight: 600,
          transition: 'color 0.3s',
          minWidth: 24,
        }}
      >
        ON
      </span>
    </div>
  );
}

export default memo(ToggleswitchPreview);
