export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function copyToClipboard(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    return true;
  } finally {
    document.body.removeChild(textarea);
  }
}

export function getDifficultyLabel(d: string) {
  return { beginner: 'מתחיל', intermediate: 'בינוני', advanced: 'מתקדם' }[d] ?? d;
}

export function getCategoryLabel(c: string) {
  return {
    all: 'הכל', text: 'טקסט', background: 'רקע', button: 'כפתורים',
    scroll: 'גלילה', cursor: 'עכבר', card: 'כרטיסים', hover: 'hover',
    loader: 'טעינה', media: 'מדיה', interaction: 'אינטראקציה'
  }[c] ?? c;
}
