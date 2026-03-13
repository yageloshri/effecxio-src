'use client';

interface Props {
  show: boolean;
  message?: string;
}

export default function MobileCopyToast({ show, message }: Props) {
  return (
    <div
      className={`copy-toast-mobile ${show ? 'show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {message ?? '✓ הועתק!'}
    </div>
  );
}
