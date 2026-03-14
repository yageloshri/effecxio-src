import { useState } from 'react';
import { ColorPalette } from './useColorStudio';

const EXAMPLES = [
  'יום קיץ בים ביפן',
  'סטארטאפ טכנולוגי עתידני',
  'קפה איטלקי בפירנצה',
  'לילה בניו יורק',
  'ספא יוקרתי בבאלי',
  'גלריה אמנות בברלין',
];

interface AIColorGenProps {
  isLoading: boolean;
  onGenerate: (palette: ColorPalette) => void;
  setLoading: (v: boolean) => void;
}

export function AIColorGen({ isLoading, onGenerate, setLoading }: AIColorGenProps) {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  const generate = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (!response.ok) throw new Error('Failed');
      const palette: ColorPalette = await response.json();
      onGenerate(palette);
    } catch {
      setError('לא הצלחנו ליצור פלטה. נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-gen">
      <p className="ai-description">
        תאר מצב רוח, מקום, או תחושה — ה-AI ייצור פלטת צבעים מושלמת.
      </p>

      <div className="ai-input-wrap">
        <textarea
          className="ai-input"
          placeholder="יום קיץ בים ביפן..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              generate(prompt);
            }
          }}
          rows={2}
        />
        <button
          className="ai-submit"
          onClick={() => generate(prompt)}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? <span className="ai-spinner">&#x27F3;</span> : '\u2192'}
        </button>
      </div>

      {error && <div className="ai-error">{error}</div>}

      <div className="ai-examples">
        <span className="ai-examples-label">לדוגמה:</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex}
            className="ai-chip"
            onClick={() => {
              setPrompt(ex);
              generate(ex);
            }}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
