'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Card3DProps {
  href: string;
  image: string;
  title: string;
  description: string;
  color: string;
}

export default function Card3D({ href, image, title, description, color }: Card3DProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 14;
    const rotateY = (x - 0.5) * 14;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  const cardBg = '#111';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ perspective: 800 }}
    >
      <Link
        ref={cardRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          textDecoration: 'none',
          position: 'relative',
          width: '100%',
          height: 364,
          borderRadius: 8,
          background: cardBg,
          boxShadow: `1px 1px 3px ${color}33, 12px 42px 24px -8px ${color}15, 10px 24px 42px 0 ${color}15, 1px 4px 12px 0 ${color}22`,
          transform,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          cursor: 'pointer',
          overflow: 'visible',
        }}
      >
        {/* Overflow container — image breaks out of card top */}
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            width: '200%',
            height: '200%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            top: '-100%',
            left: '-50%',
            clipPath: 'polygon(0 0, 100% 0, 100% 60%, 75% 60%, 75% 100%, 25% 100%, 25% 60%, 0 60%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '50%',
              height: '50%',
              bottom: '-5%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={image}
              alt={title}
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
                objectFit: 'contain',
                filter: `drop-shadow(0 4px 20px ${color}44)`,
                transition: 'transform 0.4s ease, filter 0.4s ease',
              }}
              className="card3d-img"
            />
          </div>
        </div>

        {/* Glass gradient overlay */}
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '80%',
            background: `linear-gradient(transparent, ${cardBg} 80%)`,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {/* Progressive gradient blur layers */}
          <div className="gradient-blur-card">
            <div /><div /><div /><div /><div /><div />
          </div>
        </div>

        {/* Glare effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 8,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 50%)`,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        {/* Content at bottom */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '12px 24px',
            direction: 'rtl',
            textAlign: 'right',
            width: '100%',
          }}
        >
          <h2
            style={{
              margin: '0 0 8px 0',
              padding: 0,
              lineHeight: '124%',
              fontWeight: 700,
              fontFamily: "'Heebo', sans-serif",
              fontSize: 18,
              color: '#fff',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              margin: '0 0 16px 0',
              padding: 0,
              lineHeight: '150%',
              fontWeight: 500,
              fontFamily: "'Heebo', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
