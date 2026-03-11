'use client';

interface DifficultyDotsProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const LEVELS = {
  beginner:     { filled: 1, color: 'var(--accent)',  label: 'מתחיל' },
  intermediate: { filled: 2, color: 'var(--accent3)', label: 'בינוני' },
  advanced:     { filled: 3, color: 'var(--accent2)', label: 'מתקדם' },
};

export default function DifficultyDots({ difficulty }: DifficultyDotsProps) {
  const { filled, color, label } = LEVELS[difficulty];
  return (
    <div className="flex items-center gap-1" title={label}>
      {[1, 2, 3].map(i => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i <= filled ? color : 'var(--border)',
          }}
        />
      ))}
    </div>
  );
}
