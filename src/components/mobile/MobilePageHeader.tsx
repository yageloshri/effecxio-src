'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface MobilePageHeaderProps {
  title: string;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export default function MobilePageHeader({
  title,
  onSearch,
  searchPlaceholder = 'חיפוש...',
}: MobilePageHeaderProps) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
    onSearch?.('');
  };

  return (
    <div className="mobile-page-header">
      <button
        className="mobile-header-btn"
        onClick={() => router.push('/')}
        aria-label="חזרה לדף הבית"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <span className="mobile-page-header-title">{title}</span>

      {onSearch && (
        <button
          className="mobile-header-btn"
          onClick={() => setShowSearch(true)}
          aria-label="חיפוש"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      )}

      {!onSearch && <div style={{ width: 44 }} />}

      {showSearch && (
        <div className="mobile-search-bar">
          <button
            className="mobile-header-btn"
            onClick={handleCloseSearch}
            aria-label="סגור חיפוש"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" /><path d="M6 6l12 12" />
            </svg>
          </button>
          <input
            ref={inputRef}
            className="mobile-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </div>
      )}
    </div>
  );
}
