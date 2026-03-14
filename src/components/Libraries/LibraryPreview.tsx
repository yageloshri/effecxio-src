'use client';

import React from 'react';

interface LibraryPreviewProps {
  libraryId: string;
}

export function LibraryPreview({ libraryId }: LibraryPreviewProps) {
  const renderPreview = () => {
    switch (libraryId) {
      // ANIMATION (15) - #c8f53b
      case 'gsap':
        return (
          <div className="preview-container">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="gsap-bar"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case 'framer-motion':
        return (
          <div className="preview-container">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="framer-card"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        );

      case 'anime':
        return (
          <div className="preview-container">
            <svg viewBox="0 0 100 100" className="anime-svg">
              <path className="anime-morph" />
            </svg>
          </div>
        );

      case 'lottie':
        return (
          <div className="preview-container">
            <div className="lottie-ball" />
          </div>
        );

      case 'auto-animate':
        return (
          <div className="preview-container auto-animate-grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="auto-animate-item"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );

      case 'motion':
        return (
          <div className="preview-container">
            <div className="motion-text">
              {'MOTION'.split('').map((char, i) => (
                <span
                  key={i}
                  className="motion-char"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        );

      case 'react-spring':
        return (
          <div className="preview-container">
            <div className="spring-ball" />
          </div>
        );

      case 'tsparticles':
        return (
          <div className="preview-container">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${(i * 37 + 13) % 100}%`,
                  top: `${(i * 53 + 7) % 100}%`,
                  animationDelay: `${(i * 0.13) % 2}s`,
                }}
              />
            ))}
            <svg className="particle-lines">
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  className="particle-line"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </svg>
          </div>
        );

      case 'canvas-confetti':
        return (
          <div className="preview-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${(i * 23 + 5) % 100}%`,
                  animationDelay: `${(i * 0.1) % 2}s`,
                  backgroundColor: ['#c8f53b', '#ff3cac', '#44aaff', '#f59e0b'][
                    i % 4
                  ],
                }}
              />
            ))}
          </div>
        );

      case 'popmotion':
        return (
          <div className="preview-container">
            <div className="pendulum-container">
              <div className="pendulum-line" />
              <div className="pendulum-ball" />
            </div>
          </div>
        );

      case 'typed':
        return (
          <div className="preview-container">
            <div className="typed-text">
              <span className="typed-content">Hello World</span>
              <span className="typed-cursor">|</span>
            </div>
          </div>
        );

      case 'splitting':
        return (
          <div className="preview-container">
            <div className="splitting-text">
              {'SPLIT'.split('').map((char, i) => (
                <span
                  key={i}
                  className="splitting-char"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        );

      case 'number-flow':
        return (
          <div className="preview-container">
            <div className="number-flow">
              <div className="number-slot" />
            </div>
          </div>
        );

      case 'react-countup':
        return (
          <div className="preview-container">
            <div className="countup">1,234</div>
          </div>
        );

      case 'aos':
        return (
          <div className="preview-container">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aos-element"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        );

      // 3D (8) - #ff3cac
      case 'three':
        return (
          <div className="preview-container">
            <div className="three-cube" />
          </div>
        );

      case 'react-three-fiber':
        return (
          <div className="preview-container">
            <div className="r3f-sphere" />
          </div>
        );

      case 'spline-runtime':
        return (
          <div className="preview-container">
            <div className="spline-shape" />
          </div>
        );

      case 'ogl':
        return (
          <div className="preview-container">
            <div className="ogl-grid">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="ogl-cell" />
              ))}
            </div>
          </div>
        );

      case 'curtains':
        return (
          <div className="preview-container">
            <div className="curtains-image" />
          </div>
        );

      case 'babylon':
        return (
          <div className="preview-container">
            <div className="babylon-torus" />
          </div>
        );

      case 'theatre':
        return (
          <div className="preview-container">
            <div className="theatre-timeline">
              <div className="theatre-playhead" />
            </div>
          </div>
        );

      case 'postprocessing':
        return (
          <div className="preview-container">
            <div className="postprocessing-glow" />
          </div>
        );

      // UI (15) - #44aaff
      case 'shadcn':
        return (
          <div className="preview-container shadcn-stack">
            <div className="shadcn-button" />
            <div className="shadcn-input" />
            <div className="shadcn-badge" />
          </div>
        );

      case 'radix':
        return (
          <div className="preview-container">
            <div className="radix-trigger" />
            <div className="radix-dropdown" />
          </div>
        );

      case 'cmdk':
        return (
          <div className="preview-container">
            <div className="cmdk-palette">
              <div className="cmdk-search" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="cmdk-item" />
              ))}
            </div>
          </div>
        );

      case 'vaul':
        return (
          <div className="preview-container">
            <div className="vaul-drawer" />
          </div>
        );

      case 'sonner':
        return (
          <div className="preview-container">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="sonner-toast"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>
        );

      case 'embla':
        return (
          <div className="preview-container embla-carousel">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="embla-card" />
            ))}
          </div>
        );

      case 'react-hot-toast':
        return (
          <div className="preview-container">
            <div className="hot-toast">
              <span className="hot-toast-emoji">🔥</span>
            </div>
          </div>
        );

      case 'floating-ui':
        return (
          <div className="preview-container">
            <div className="floating-element" />
            <div className="floating-tooltip" />
          </div>
        );

      case 'react-select':
        return (
          <div className="preview-container">
            <div className="select-trigger" />
            <div className="select-options">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="select-option" />
              ))}
            </div>
          </div>
        );

      case 'headlessui':
        return (
          <div className="preview-container">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="headless-disclosure">
                <div className="headless-trigger" />
                <div
                  className="headless-panel"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              </div>
            ))}
          </div>
        );

      case 'react-aria':
        return (
          <div className="preview-container">
            <div className="aria-calendar">
              {[...Array(28)].map((_, i) => (
                <div key={i} className="aria-date" />
              ))}
            </div>
          </div>
        );

      case 'mantine':
        return (
          <div className="preview-container mantine-grid">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="mantine-component" />
            ))}
          </div>
        );

      case 'ariakit':
        return (
          <div className="preview-container">
            <div className="ariakit-tabs">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="ariakit-tab"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
            <div className="ariakit-panel" />
          </div>
        );

      case 'aceternity':
        return (
          <div className="preview-container">
            <div className="aceternity-card">
              <div className="aceternity-spotlight" />
            </div>
          </div>
        );

      case 'magic-ui':
        return (
          <div className="preview-container">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="magic-meteor"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  top: `${(i * 17 + 3) % 40}%`,
                }}
              />
            ))}
          </div>
        );

      // CHARTS (8) - #f59e0b
      case 'recharts':
        return (
          <div className="preview-container">
            <svg viewBox="0 0 200 100" className="chart-svg">
              <polyline className="recharts-line" points="0,80 40,60 80,40 120,50 160,20 200,30" />
            </svg>
          </div>
        );

      case 'chart-js':
        return (
          <div className="preview-container chartjs-container">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="chartjs-bar"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case 'd3':
        return (
          <div className="preview-container">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="d3-node"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  left: `${30 + (i % 3) * 20}%`,
                  top: `${30 + Math.floor(i / 3) * 20}%`,
                }}
              />
            ))}
          </div>
        );

      case 'tremor':
        return (
          <div className="preview-container tremor-dashboard">
            <div className="tremor-kpi">
              <div className="tremor-value" />
            </div>
            <div className="tremor-mini-chart" />
          </div>
        );

      case 'visx':
        return (
          <div className="preview-container">
            <svg viewBox="0 0 200 100" className="visx-svg">
              <path className="visx-area" />
            </svg>
          </div>
        );

      case 'nivo':
        return (
          <div className="preview-container nivo-heatmap">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className="nivo-cell"
                style={{ animationDelay: `${i * 0.03}s` }}
              />
            ))}
          </div>
        );

      case 'apexcharts':
        return (
          <div className="preview-container apex-container">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="apex-candlestick" />
            ))}
          </div>
        );

      case 'victory':
        return (
          <div className="preview-container">
            <div className="victory-pie">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="victory-slice"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        );

      // DRAG (6) - #8b5cf6
      case 'dnd-kit':
        return (
          <div className="preview-container dnd-grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="dnd-item"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );

      case 'react-beautiful-dnd':
        return (
          <div className="preview-container rbd-kanban">
            {[...Array(2)].map((_, col) => (
              <div key={col} className="rbd-column">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="rbd-card"
                    style={{ animationDelay: `${(col * 3 + i) * 0.15}s` }}
                  />
                ))}
              </div>
            ))}
          </div>
        );

      case 'react-draggable':
        return (
          <div className="preview-container">
            <div className="draggable-box" />
          </div>
        );

      case 'pragmatic-drag-drop':
        return (
          <div className="preview-container pragmatic-grid">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="pragmatic-item"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        );

      case 'interact':
        return (
          <div className="preview-container">
            <div className="interact-box">
              <div className="interact-handle interact-handle-tl" />
              <div className="interact-handle interact-handle-br" />
            </div>
          </div>
        );

      case 'sortablejs':
        return (
          <div className="preview-container sortable-list">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="sortable-item"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );

      // SCROLL (8) - #10b981
      case 'locomotive-scroll':
        return (
          <div className="preview-container">
            <div className="loco-layer loco-back" />
            <div className="loco-layer loco-mid" />
            <div className="loco-layer loco-front" />
          </div>
        );

      case 'lenis':
        return (
          <div className="preview-container">
            <div className="lenis-content">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="lenis-line" />
              ))}
            </div>
          </div>
        );

      case 'scrollreveal':
        return (
          <div className="preview-container">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="scrollreveal-box"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
        );

      case 'react-intersection-observer':
        return (
          <div className="preview-container">
            <div className="intersection-viewport">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="intersection-element"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
            <div className="intersection-line" />
          </div>
        );

      case 'react-scroll':
        return (
          <div className="preview-container">
            <div className="scroll-nav">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="scroll-dot"
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
              ))}
            </div>
          </div>
        );

      case 'parallax-js':
        return (
          <div className="preview-container parallaxjs-container">
            <div className="parallaxjs-layer parallaxjs-layer-1" />
            <div className="parallaxjs-layer parallaxjs-layer-2" />
            <div className="parallaxjs-layer parallaxjs-layer-3" />
          </div>
        );

      case 'react-scroll-parallax':
        return (
          <div className="preview-container">
            <div className="scroll-parallax-image" />
          </div>
        );

      case 'swiper':
        return (
          <div className="preview-container">
            <div className="swiper-slides">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="swiper-slide"
                  style={{ animationDelay: `${i * 1.5}s` }}
                />
              ))}
            </div>
          </div>
        );

      // FORMS (8) - #f97316
      case 'react-hook-form':
        return (
          <div className="preview-container rhf-form">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rhf-field">
                <div className="rhf-input" />
                <div
                  className="rhf-check"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  ✓
                </div>
              </div>
            ))}
          </div>
        );

      case 'zod':
        return (
          <div className="preview-container zod-schema">
            <div className="zod-type">string</div>
            <div className="zod-arrow">→</div>
            <div className="zod-check zod-check-anim">✓</div>
          </div>
        );

      case 'formik':
        return (
          <div className="preview-container">
            <div className="formik-steps">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="formik-dot"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
          </div>
        );

      case 'react-dropzone':
        return (
          <div className="preview-container">
            <div className="dropzone">
              <div className="dropzone-icon">📁</div>
            </div>
          </div>
        );

      case 'react-colorful':
        return (
          <div className="preview-container">
            <div className="colorful-picker" />
          </div>
        );

      case 'react-number-format':
        return (
          <div className="preview-container">
            <div className="number-format">$1,234.56</div>
          </div>
        );

      case 'react-phone-input':
        return (
          <div className="preview-container phone-input">
            <div className="phone-flag">🇺🇸</div>
            <div className="phone-number">+1 (555) 123-4567</div>
          </div>
        );

      case 'tanstack-form':
        return (
          <div className="preview-container tanstack-form">
            {[
              { label: 'text', color: '#44aaff' },
              { label: 'num', color: '#f59e0b' },
              { label: 'bool', color: '#10b981' },
            ].map((field, i) => (
              <div key={i} className="tanstack-field">
                <div
                  className="tanstack-badge"
                  style={{
                    backgroundColor: field.color,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {field.label}
                </div>
              </div>
            ))}
          </div>
        );

      // MEDIA (8) - #ec4899
      case 'react-player':
        return (
          <div className="preview-container">
            <div className="player-video">
              <div className="player-play">▶</div>
            </div>
            <div className="player-progress">
              <div className="player-bar" />
            </div>
          </div>
        );

      case 'react-image-crop':
        return (
          <div className="preview-container">
            <div className="crop-image" />
            <div className="crop-marquee" />
          </div>
        );

      case 'yet-another-lightbox':
        return (
          <div className="preview-container">
            <div className="lightbox-thumb" />
            <div className="lightbox-expanded" />
          </div>
        );

      case 'react-zoom-pan-pinch':
        return (
          <div className="preview-container">
            <div className="zoom-image" />
          </div>
        );

      case 'react-pdf':
        return (
          <div className="preview-container pdf-page">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="pdf-line" />
            ))}
          </div>
        );

      case 'fabric':
        return (
          <div className="preview-container">
            <div className="fabric-circle fabric-shape" />
            <div className="fabric-rect fabric-shape" />
            <div className="fabric-triangle fabric-shape" />
          </div>
        );

      case 'wavesurfer':
        return (
          <div className="preview-container wavesurfer">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="wavesurfer-bar"
                style={{
                  height: `${30 + Math.sin(i * 0.5) * 25}%`,
                }}
              />
            ))}
            <div className="wavesurfer-playhead" />
          </div>
        );

      case 'tiptap':
        return (
          <div className="preview-container tiptap-editor">
            <div className="tiptap-toolbar">
              <div className="tiptap-btn">B</div>
              <div className="tiptap-btn">I</div>
              <div className="tiptap-btn">U</div>
            </div>
            <div className="tiptap-content">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="tiptap-line" />
              ))}
            </div>
          </div>
        );

      // UTILITY (12) - #6366f1
      case 'tanstack-query':
        return (
          <div className="preview-container">
            <div className="tq-cycle">
              <div className="tq-state tq-loading">⏳</div>
              <div className="tq-state tq-data">📊</div>
              <div className="tq-state tq-cache">💾</div>
            </div>
          </div>
        );

      case 'zustand':
        return (
          <div className="preview-container zustand-store">
            <div className="zustand-node zustand-root">Store</div>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="zustand-node zustand-child"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        );

      case 'jotai':
        return (
          <div className="preview-container">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="jotai-atom"
                style={{
                  left: `${20 + (i % 2) * 40}%`,
                  top: `${25 + Math.floor(i / 2) * 40}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
            <svg className="jotai-connections">
              <line className="jotai-line jotai-line-1" />
              <line className="jotai-line jotai-line-2" />
            </svg>
          </div>
        );

      case 'date-fns':
        return (
          <div className="preview-container datefns-calendar">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="datefns-day datefns-header">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
              </div>
            ))}
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="datefns-day datefns-date"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        );

      case 'clsx':
        return (
          <div className="preview-container clsx-merge">
            <div className="clsx-class clsx-class-1">base</div>
            <div className="clsx-class clsx-class-2">active</div>
            <div className="clsx-arrow">+</div>
            <div className="clsx-result">merged</div>
          </div>
        );

      case 'lodash':
        return (
          <div className="preview-container lodash-array">
            {[5, 2, 8, 1, 9].map((n, i) => (
              <div
                key={i}
                className="lodash-item"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {n}
              </div>
            ))}
            <div className="lodash-arrow">→</div>
            {[1, 2, 5, 8, 9].map((n, i) => (
              <div
                key={i}
                className="lodash-item lodash-sorted"
                style={{ animationDelay: `${1 + i * 0.2}s` }}
              >
                {n}
              </div>
            ))}
          </div>
        );

      case 'axios':
        return (
          <div className="preview-container axios-http">
            <div className="axios-client">Client</div>
            <div className="axios-request">→</div>
            <div className="axios-server">API</div>
            <div className="axios-response">←</div>
          </div>
        );

      case 'react-use':
        return (
          <div className="preview-container react-use-grid">
            {['📍', '⏱️', '🔔', '🖱️', '⌨️', '📱'].map((icon, i) => (
              <div
                key={i}
                className="react-use-hook"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {icon}
              </div>
            ))}
          </div>
        );

      case 'immer':
        return (
          <div className="preview-container immer-diff">
            <div className="immer-before">
              <div className="immer-prop">a: 1</div>
              <div className="immer-prop immer-old">b: 2</div>
            </div>
            <div className="immer-arrow">→</div>
            <div className="immer-after">
              <div className="immer-prop">a: 1</div>
              <div className="immer-prop immer-new">b: 3</div>
            </div>
          </div>
        );

      case 'react-hotkeys':
        return (
          <div className="preview-container">
            <div className="hotkeys-key">⌘</div>
            <div className="hotkeys-plus">+</div>
            <div className="hotkeys-key hotkeys-key-delayed">K</div>
          </div>
        );

      case 'nanoid':
        return (
          <div className="preview-container">
            <div className="nanoid-id">V1StGXR8_Z5jdHi</div>
          </div>
        );

      case 'fuse':
        return (
          <div className="preview-container fuse-search">
            <div className="fuse-query">serch</div>
            <div className="fuse-arrow">≈</div>
            <div className="fuse-match">search</div>
          </div>
        );

      // EFFECTS (10) - #c8f53b
      case 'vanilla-tilt':
        return (
          <div className="preview-container">
            <div className="tilt-card" />
          </div>
        );

      case 'react-parallax-tilt':
        return (
          <div className="preview-container">
            <div className="parallax-tilt-card">
              <div className="parallax-tilt-glare" />
            </div>
          </div>
        );

      case 'vanta':
        return (
          <div className="preview-container">
            <div className="vanta-wave" />
          </div>
        );

      case 'atropos':
        return (
          <div className="preview-container atropos-scene">
            <div className="atropos-layer atropos-layer-1" />
            <div className="atropos-layer atropos-layer-2" />
            <div className="atropos-layer atropos-layer-3" />
          </div>
        );

      case 'granim':
        return (
          <div className="preview-container">
            <div className="granim-gradient" />
          </div>
        );

      case 'zdog':
        return (
          <div className="preview-container">
            <div className="zdog-shape" />
          </div>
        );

      case 'matter-js':
        return (
          <div className="preview-container">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="matter-object"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  left: `${20 + i * 15}%`,
                }}
              />
            ))}
          </div>
        );

      case 'shaders':
        return (
          <div className="preview-container">
            <div className="shader-flow" />
          </div>
        );

      case 'proton':
        return (
          <div className="preview-container">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="proton-particle"
                style={{
                  left: `${40 + (i * 7 + 2) % 20}%`,
                  animationDelay: `${(i * 0.17) % 2}s`,
                }}
              />
            ))}
          </div>
        );

      case 'mojs':
        return (
          <div className="preview-container">
            <div className="mojs-burst">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="mojs-particle"
                  style={{ transform: `rotate(${i * 30}deg)` }}
                />
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="preview-container">
            <div style={{ color: '#666', fontSize: '12px' }}>
              No preview available
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <style>{`
        .preview-container {
          width: 100%;
          height: 220px;
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ANIMATION - GSAP */
        .gsap-bar {
          width: 8px;
          height: 60px;
          background: linear-gradient(180deg, #c8f53b, #a0d020);
          margin: 0 4px;
          animation: gsap-bounce 1.2s ease-in-out infinite;
        }
        @keyframes gsap-bounce {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-30px) scaleY(0.8); }
        }

        /* ANIMATION - Framer Motion */
        .framer-card {
          width: 60px;
          height: 80px;
          background: linear-gradient(135deg, #c8f53b, #a0d020);
          margin: 0 8px;
          border-radius: 8px;
          animation: framer-slide 2s ease-in-out infinite;
        }
        @keyframes framer-slide {
          0%, 100% { transform: translateX(0) scale(1); opacity: 1; }
          50% { transform: translateX(20px) scale(0.9); opacity: 0.6; }
        }

        /* ANIMATION - Anime */
        .anime-svg {
          width: 100px;
          height: 100px;
        }
        .anime-morph {
          fill: none;
          stroke: #c8f53b;
          stroke-width: 3;
          animation: anime-morph 3s ease-in-out infinite;
        }
        @keyframes anime-morph {
          0% { d: path("M 50 10 A 40 40 0 1 1 49.9 10"); }
          33% { d: path("M 50 10 L 80 40 L 65 75 L 35 75 L 20 40 Z"); }
          66% { d: path("M 50 20 L 70 50 L 50 80 L 30 50 Z"); }
          100% { d: path("M 50 10 A 40 40 0 1 1 49.9 10"); }
        }

        /* ANIMATION - Lottie */
        .lottie-ball {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle at 30% 30%, #c8f53b, #a0d020);
          border-radius: 50%;
          animation: lottie-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        @keyframes lottie-bounce {
          0%, 100% { transform: translateY(0) scaleY(1) scaleX(1); }
          50% { transform: translateY(-50px) scaleY(1.1) scaleX(0.9); }
          60% { transform: translateY(0) scaleY(0.8) scaleX(1.2); }
        }

        /* ANIMATION - Auto Animate */
        .auto-animate-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 200px;
        }
        .auto-animate-item {
          height: 40px;
          background: linear-gradient(135deg, #c8f53b, #a0d020);
          border-radius: 6px;
          animation: auto-shuffle 2s ease-in-out infinite;
        }
        @keyframes auto-shuffle {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-10px, 10px); }
          75% { transform: translate(5px, -5px); }
        }

        /* ANIMATION - Motion */
        .motion-text {
          display: flex;
          font-size: 32px;
          font-weight: bold;
          color: #c8f53b;
        }
        .motion-char {
          opacity: 0;
          animation: motion-reveal 0.5s ease-out forwards;
        }
        @keyframes motion-reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ANIMATION - React Spring */
        .spring-ball {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle at 30% 30%, #c8f53b, #a0d020);
          border-radius: 50%;
          animation: spring-bounce 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
        }
        @keyframes spring-bounce {
          0%, 100% { transform: translateY(60px); }
          50% { transform: translateY(-20px); }
        }

        /* ANIMATION - TSParticles */
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #c8f53b;
          border-radius: 50%;
          animation: particle-float 3s ease-in-out infinite;
        }
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(20px, -20px); opacity: 0.5; }
        }
        .particle-lines {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .particle-line {
          stroke: rgba(200, 245, 59, 0.3);
          stroke-width: 1;
          animation: particle-line-fade 2s ease-in-out infinite;
        }
        @keyframes particle-line-fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        /* ANIMATION - Canvas Confetti */
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          animation: confetti-fall 2s linear infinite;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(240px) rotate(360deg); opacity: 0; }
        }

        /* ANIMATION - Popmotion */
        .pendulum-container {
          width: 100px;
          height: 150px;
          position: relative;
        }
        .pendulum-line {
          position: absolute;
          width: 2px;
          height: 100px;
          background: #c8f53b;
          top: 0;
          left: 50%;
          transform-origin: top center;
          animation: pendulum-swing 2s ease-in-out infinite;
        }
        .pendulum-ball {
          position: absolute;
          width: 20px;
          height: 20px;
          background: #c8f53b;
          border-radius: 50%;
          bottom: 30px;
          left: 50%;
          margin-left: -10px;
          transform-origin: 50px -100px;
          animation: pendulum-swing 2s ease-in-out infinite;
        }
        @keyframes pendulum-swing {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(30deg); }
        }

        /* ANIMATION - Typed */
        .typed-text {
          font-size: 24px;
          color: #c8f53b;
          font-family: monospace;
        }
        .typed-content {
          overflow: hidden;
          border-right: 2px solid #c8f53b;
          white-space: nowrap;
          animation: typed-type 3s steps(11) infinite;
        }
        .typed-cursor {
          animation: typed-blink 1s step-end infinite;
        }
        @keyframes typed-type {
          0%, 100% { width: 0; }
          50%, 90% { width: 11ch; }
        }
        @keyframes typed-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* ANIMATION - Splitting */
        .splitting-text {
          display: flex;
          font-size: 36px;
          font-weight: bold;
          color: #c8f53b;
        }
        .splitting-char {
          animation: splitting-split 2s ease-in-out infinite;
        }
        @keyframes splitting-split {
          0%, 100% { transform: translateX(0) rotate(0deg); opacity: 1; }
          25% { transform: translateX(-20px) rotate(-15deg); opacity: 0.5; }
          50% { transform: translateX(20px) rotate(15deg); opacity: 0.5; }
          75% { transform: translateX(-10px) rotate(-5deg); opacity: 0.7; }
        }

        /* ANIMATION - Number Flow */
        .number-flow {
          font-size: 48px;
          font-weight: bold;
          color: #c8f53b;
          font-family: monospace;
        }
        .number-slot {
          width: 40px;
          height: 60px;
          background: linear-gradient(180deg,
            transparent 0%, transparent 40%,
            #c8f53b 40%, #c8f53b 60%,
            transparent 60%, transparent 100%);
          animation: number-roll 2s linear infinite;
        }
        @keyframes number-roll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-300px); }
        }

        /* ANIMATION - React CountUp */
        .countup {
          font-size: 48px;
          font-weight: bold;
          color: #c8f53b;
          animation: countup-pulse 2s ease-in-out infinite;
        }
        @keyframes countup-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* ANIMATION - AOS */
        .aos-element {
          width: 80px;
          height: 40px;
          background: linear-gradient(135deg, #c8f53b, #a0d020);
          margin: 8px;
          border-radius: 6px;
          animation: aos-reveal 3s ease-out infinite;
          opacity: 0;
        }
        @keyframes aos-reveal {
          0%, 20% { opacity: 0; transform: translateY(40px); }
          30%, 90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-40px); }
        }

        /* 3D - Three */
        .three-cube {
          width: 80px;
          height: 80px;
          border: 3px solid #ff3cac;
          position: relative;
          transform-style: preserve-3d;
          animation: three-rotate 4s linear infinite;
        }
        .three-cube::before,
        .three-cube::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid #ff3cac;
        }
        .three-cube::before {
          transform: translateZ(40px);
        }
        .three-cube::after {
          transform: translateZ(-40px);
        }
        @keyframes three-rotate {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        /* 3D - React Three Fiber */
        .r3f-sphere {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ff3cac, #8b1a5c);
          animation: r3f-spin 3s linear infinite;
        }
        @keyframes r3f-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 3D - Spline */
        .spline-shape {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ff3cac, #8b1a5c);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: spline-morph 4s ease-in-out infinite;
        }
        @keyframes spline-morph {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: rotate(0deg); }
          50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; transform: rotate(180deg); }
        }

        /* 3D - OGL */
        .ogl-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          width: 150px;
        }
        .ogl-cell {
          aspect-ratio: 1;
          background: #ff3cac;
          animation: ogl-wave 2s ease-in-out infinite;
        }
        .ogl-cell:nth-child(1) { animation-delay: 0s; }
        .ogl-cell:nth-child(2) { animation-delay: 0.1s; }
        .ogl-cell:nth-child(3) { animation-delay: 0.2s; }
        .ogl-cell:nth-child(4) { animation-delay: 0.3s; }
        .ogl-cell:nth-child(5) { animation-delay: 0.4s; }
        @keyframes ogl-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        /* 3D - Curtains */
        .curtains-image {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #ff3cac, #8b1a5c);
          animation: curtains-wave 2s ease-in-out infinite;
        }
        @keyframes curtains-wave {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          50% { clip-path: polygon(10% 5%, 90% 0, 95% 95%, 5% 100%); }
        }

        /* 3D - Babylon */
        .babylon-torus {
          width: 100px;
          height: 100px;
          border: 20px solid #ff3cac;
          border-radius: 50%;
          position: relative;
          animation: babylon-rotate 3s linear infinite;
        }
        .babylon-torus::before {
          content: '';
          position: absolute;
          width: 60px;
          height: 60px;
          border: 10px solid #8b1a5c;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        @keyframes babylon-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        /* 3D - Theatre */
        .theatre-timeline {
          width: 200px;
          height: 10px;
          background: #333;
          border-radius: 5px;
          position: relative;
        }
        .theatre-playhead {
          width: 4px;
          height: 30px;
          background: #ff3cac;
          position: absolute;
          top: -10px;
          animation: theatre-scrub 3s linear infinite;
        }
        @keyframes theatre-scrub {
          from { left: 0; }
          to { left: 100%; }
        }

        /* 3D - Postprocessing */
        .postprocessing-glow {
          width: 80px;
          height: 80px;
          background: #ff3cac;
          border-radius: 50%;
          box-shadow: 0 0 20px #ff3cac, 0 0 40px #ff3cac, 0 0 60px #ff3cac;
          animation: postprocessing-pulse 2s ease-in-out infinite;
        }
        @keyframes postprocessing-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px #ff3cac, 0 0 40px #ff3cac; }
          50% { transform: scale(1.2); box-shadow: 0 0 40px #ff3cac, 0 0 80px #ff3cac, 0 0 120px #ff3cac; }
        }

        /* UI - Shadcn */
        .shadcn-stack {
          flex-direction: column;
          gap: 12px;
        }
        .shadcn-button {
          width: 100px;
          height: 35px;
          background: #44aaff;
          border-radius: 6px;
          animation: shadcn-pulse 2s ease-in-out infinite;
        }
        .shadcn-input {
          width: 150px;
          height: 35px;
          background: transparent;
          border: 2px solid #44aaff;
          border-radius: 6px;
          animation: shadcn-pulse 2s 0.3s ease-in-out infinite;
        }
        .shadcn-badge {
          width: 60px;
          height: 25px;
          background: #44aaff;
          border-radius: 12px;
          animation: shadcn-pulse 2s 0.6s ease-in-out infinite;
        }
        @keyframes shadcn-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }

        /* UI - Radix */
        .radix-trigger {
          width: 120px;
          height: 35px;
          background: #44aaff;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .radix-dropdown {
          width: 120px;
          height: 0;
          background: #2a6aa0;
          border-radius: 6px;
          animation: radix-dropdown 2s ease-in-out infinite;
        }
        @keyframes radix-dropdown {
          0%, 100% { height: 0; opacity: 0; }
          50% { height: 80px; opacity: 1; }
        }

        /* UI - CMDK */
        .cmdk-palette {
          width: 200px;
          background: #1a1a1a;
          border: 2px solid #44aaff;
          border-radius: 8px;
          padding: 8px;
        }
        .cmdk-search {
          width: 100%;
          height: 30px;
          background: #2a2a2a;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .cmdk-item {
          width: 100%;
          height: 25px;
          background: #2a2a2a;
          border-radius: 4px;
          margin: 4px 0;
          animation: cmdk-highlight 2s ease-in-out infinite;
        }
        @keyframes cmdk-highlight {
          0%, 100% { background: #2a2a2a; }
          50% { background: #44aaff; }
        }

        /* UI - Vaul */
        .vaul-drawer {
          width: 100%;
          height: 100px;
          background: #44aaff;
          border-radius: 12px 12px 0 0;
          position: absolute;
          bottom: 0;
          animation: vaul-slide 2s ease-in-out infinite;
        }
        @keyframes vaul-slide {
          0%, 100% { transform: translateY(100%); }
          50% { transform: translateY(0); }
        }

        /* UI - Sonner */
        .sonner-toast {
          width: 180px;
          height: 50px;
          background: #44aaff;
          border-radius: 8px;
          margin: 6px;
          position: absolute;
          right: 20px;
          animation: sonner-appear 3s ease-out infinite;
        }
        .sonner-toast:nth-child(1) { top: 20px; }
        .sonner-toast:nth-child(2) { top: 80px; }
        .sonner-toast:nth-child(3) { top: 140px; }
        @keyframes sonner-appear {
          0%, 20% { transform: translateX(200px); opacity: 0; }
          30%, 80% { transform: translateX(0); opacity: 1; }
          90%, 100% { transform: translateX(200px); opacity: 0; }
        }

        /* UI - Embla */
        .embla-carousel {
          display: flex;
          gap: 12px;
          animation: embla-slide 3s ease-in-out infinite;
        }
        .embla-card {
          min-width: 80px;
          height: 100px;
          background: linear-gradient(135deg, #44aaff, #2a6aa0);
          border-radius: 8px;
        }
        @keyframes embla-slide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-50px); }
        }

        /* UI - React Hot Toast */
        .hot-toast {
          width: 150px;
          height: 60px;
          background: #44aaff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: hot-toast-pop 2s ease-out infinite;
        }
        .hot-toast-emoji {
          font-size: 32px;
          animation: hot-toast-wiggle 1s ease-in-out infinite;
        }
        @keyframes hot-toast-pop {
          0%, 20% { transform: translateY(100px) scale(0); opacity: 0; }
          30%, 80% { transform: translateY(0) scale(1); opacity: 1; }
          90%, 100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        @keyframes hot-toast-wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        /* UI - Floating UI */
        .floating-element {
          width: 60px;
          height: 60px;
          background: #44aaff;
          border-radius: 8px;
          position: absolute;
          animation: floating-move 3s ease-in-out infinite;
        }
        .floating-tooltip {
          width: 100px;
          height: 40px;
          background: #2a6aa0;
          border-radius: 6px;
          position: absolute;
          animation: floating-follow 3s ease-in-out infinite;
        }
        @keyframes floating-move {
          0%, 100% { left: 30%; top: 40%; }
          50% { left: 60%; top: 50%; }
        }
        @keyframes floating-follow {
          0%, 100% { left: 30%; top: 60%; }
          50% { left: 60%; top: 70%; }
        }

        /* UI - React Select */
        .select-trigger {
          width: 150px;
          height: 40px;
          background: transparent;
          border: 2px solid #44aaff;
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .select-options {
          width: 150px;
          background: #2a6aa0;
          border-radius: 6px;
          animation: select-expand 2s ease-in-out infinite;
        }
        .select-option {
          height: 30px;
          background: transparent;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        @keyframes select-expand {
          0%, 100% { height: 0; opacity: 0; }
          50% { height: 90px; opacity: 1; }
        }

        /* UI - HeadlessUI */
        .headless-disclosure {
          width: 180px;
          margin: 6px 0;
        }
        .headless-trigger {
          width: 100%;
          height: 35px;
          background: #44aaff;
          border-radius: 6px;
        }
        .headless-panel {
          width: 100%;
          height: 0;
          background: #2a6aa0;
          border-radius: 6px;
          margin-top: 4px;
          animation: headless-toggle 3s ease-in-out infinite;
        }
        @keyframes headless-toggle {
          0%, 100% { height: 0; opacity: 0; }
          50% { height: 40px; opacity: 1; }
        }

        /* UI - React Aria */
        .aria-calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          width: 180px;
        }
        .aria-date {
          aspect-ratio: 1;
          background: #44aaff;
          border-radius: 4px;
          animation: aria-highlight 3s ease-in-out infinite;
        }
        @keyframes aria-highlight {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* UI - Mantine */
        .mantine-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 180px;
        }
        .mantine-component {
          aspect-ratio: 1;
          background: linear-gradient(135deg, #44aaff, #2a6aa0);
          border-radius: 6px;
          animation: mantine-pop 2s ease-in-out infinite;
        }
        .mantine-component:nth-child(1) { animation-delay: 0s; }
        .mantine-component:nth-child(2) { animation-delay: 0.1s; }
        .mantine-component:nth-child(3) { animation-delay: 0.2s; }
        @keyframes mantine-pop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* UI - Ariakit */
        .ariakit-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .ariakit-tab {
          width: 60px;
          height: 35px;
          background: #2a6aa0;
          border-radius: 6px 6px 0 0;
          animation: ariakit-activate 3s ease-in-out infinite;
        }
        .ariakit-panel {
          width: 200px;
          height: 80px;
          background: #44aaff;
          border-radius: 6px;
        }
        @keyframes ariakit-activate {
          0%, 100% { background: #2a6aa0; transform: translateY(0); }
          50% { background: #44aaff; transform: translateY(-4px); }
        }

        /* UI - Aceternity */
        .aceternity-card {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        .aceternity-spotlight {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(68, 170, 255, 0.5), transparent);
          border-radius: 50%;
          position: absolute;
          animation: aceternity-spotlight 3s ease-in-out infinite;
        }
        @keyframes aceternity-spotlight {
          0%, 100% { top: -50px; left: -50px; }
          50% { top: 100px; left: 100px; }
        }

        /* UI - Magic UI */
        .magic-meteor {
          position: absolute;
          width: 4px;
          height: 40px;
          background: linear-gradient(180deg, #44aaff, transparent);
          border-radius: 2px;
          right: -20px;
          animation: magic-meteor 2s linear infinite;
        }
        @keyframes magic-meteor {
          from { transform: translate(0, 0) rotate(-45deg); opacity: 1; }
          to { transform: translate(-200px, 200px) rotate(-45deg); opacity: 0; }
        }

        /* CHARTS - Recharts */
        .chart-svg {
          width: 200px;
          height: 100px;
        }
        .recharts-line {
          fill: none;
          stroke: #f59e0b;
          stroke-width: 3;
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: recharts-draw 3s ease-out infinite;
        }
        @keyframes recharts-draw {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }

        /* CHARTS - Chart.js */
        .chartjs-container {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 120px;
        }
        .chartjs-bar {
          width: 20px;
          background: linear-gradient(180deg, #f59e0b, #d97706);
          border-radius: 4px 4px 0 0;
          height: 0;
          animation: chartjs-grow 2s ease-out infinite;
        }
        @keyframes chartjs-grow {
          0% { height: 0; }
          100% { height: 80px; }
        }

        /* CHARTS - D3 */
        .d3-node {
          position: absolute;
          width: 20px;
          height: 20px;
          background: #f59e0b;
          border-radius: 50%;
          animation: d3-bounce 2s ease-in-out infinite;
        }
        @keyframes d3-bounce {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -15px); }
        }

        /* CHARTS - Tremor */
        .tremor-dashboard {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .tremor-kpi {
          width: 150px;
          height: 60px;
          background: #2a2a2a;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tremor-value {
          width: 80px;
          height: 30px;
          background: #f59e0b;
          border-radius: 4px;
          animation: tremor-pulse 2s ease-in-out infinite;
        }
        .tremor-mini-chart {
          width: 150px;
          height: 40px;
          background: linear-gradient(90deg, transparent 0%, #f59e0b 50%, transparent 100%);
          animation: tremor-chart 2s ease-in-out infinite;
        }
        @keyframes tremor-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes tremor-chart {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* CHARTS - Visx */
        .visx-svg {
          width: 200px;
          height: 100px;
        }
        .visx-area {
          fill: #f59e0b;
          opacity: 0;
          d: path("M 0 100 L 0 80 Q 50 60 100 70 T 200 50 L 200 100 Z");
          animation: visx-fill 3s ease-out infinite;
        }
        @keyframes visx-fill {
          0% { opacity: 0; }
          100% { opacity: 0.7; }
        }

        /* CHARTS - Nivo */
        .nivo-heatmap {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
          width: 180px;
        }
        .nivo-cell {
          aspect-ratio: 1;
          background: #f59e0b;
          opacity: 0;
          animation: nivo-color 2s ease-out forwards;
        }
        @keyframes nivo-color {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* CHARTS - ApexCharts */
        .apex-container {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 120px;
        }
        .apex-candlestick {
          width: 20px;
          height: 80px;
          background: linear-gradient(180deg, #f59e0b 0%, #f59e0b 30%, #d97706 30%, #d97706 70%, #f59e0b 70%, #f59e0b 100%);
          animation: apex-flicker 2s ease-in-out infinite;
        }
        @keyframes apex-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* CHARTS - Victory */
        .victory-pie {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          position: relative;
          background: conic-gradient(
            #f59e0b 0deg 90deg,
            #d97706 90deg 180deg,
            #b45309 180deg 270deg,
            #92400e 270deg 360deg
          );
          animation: victory-spin 3s ease-in-out infinite;
        }
        .victory-slice {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        @keyframes victory-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* DRAG - DND Kit */
        .dnd-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 180px;
        }
        .dnd-item {
          aspect-ratio: 1;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          border-radius: 8px;
          animation: dnd-reorder 3s ease-in-out infinite;
        }
        @keyframes dnd-reorder {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(20px, 0); }
          66% { transform: translate(-20px, 20px); }
        }

        /* DRAG - React Beautiful DND */
        .rbd-kanban {
          display: flex;
          gap: 12px;
        }
        .rbd-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .rbd-card {
          width: 80px;
          height: 50px;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          border-radius: 6px;
          animation: rbd-shift 3s ease-in-out infinite;
        }
        @keyframes rbd-shift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        /* DRAG - React Draggable */
        .draggable-box {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          border-radius: 8px;
          animation: draggable-move 4s ease-in-out infinite;
        }
        @keyframes draggable-move {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(40px, -20px); }
          50% { transform: translate(80px, 0); }
          75% { transform: translate(40px, 20px); }
        }

        /* DRAG - Pragmatic Drag Drop */
        .pragmatic-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 150px;
        }
        .pragmatic-item {
          aspect-ratio: 1;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          border-radius: 8px;
          animation: pragmatic-swap 3s ease-in-out infinite;
        }
        @keyframes pragmatic-swap {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(0.9) translate(20px, 20px); }
          50% { transform: scale(1); }
          75% { transform: scale(0.9) translate(-20px, -20px); }
        }

        /* DRAG - Interact */
        .interact-box {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          border-radius: 8px;
          position: relative;
          animation: interact-resize 3s ease-in-out infinite;
        }
        .interact-handle {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #fff;
          border: 2px solid #8b5cf6;
          border-radius: 50%;
        }
        .interact-handle-tl { top: -6px; left: -6px; }
        .interact-handle-br { bottom: -6px; right: -6px; }
        @keyframes interact-resize {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        /* DRAG - SortableJS */
        .sortable-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 150px;
        }
        .sortable-item {
          height: 35px;
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
          border-radius: 6px;
          animation: sortable-reorder 3s ease-in-out infinite;
        }
        @keyframes sortable-reorder {
          0%, 100% { transform: translateY(0); opacity: 1; }
          25% { transform: translateY(-20px); opacity: 0.7; }
          50% { transform: translateY(40px); opacity: 0.7; }
          75% { transform: translateY(20px); opacity: 0.7; }
        }

        /* SCROLL - Locomotive Scroll */
        .loco-layer {
          position: absolute;
          width: 100%;
          height: 60px;
          border-radius: 8px;
        }
        .loco-back {
          background: #10b981;
          animation: loco-parallax-1 3s ease-in-out infinite;
        }
        .loco-mid {
          background: #059669;
          animation: loco-parallax-2 3s ease-in-out infinite;
        }
        .loco-front {
          background: #047857;
          animation: loco-parallax-3 3s ease-in-out infinite;
        }
        @keyframes loco-parallax-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes loco-parallax-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes loco-parallax-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }

        /* SCROLL - Lenis */
        .lenis-content {
          height: 150px;
          overflow: hidden;
          position: relative;
        }
        .lenis-line {
          width: 80%;
          height: 4px;
          background: #10b981;
          margin: 8px auto;
          animation: lenis-scroll 3s ease-in-out infinite;
        }
        @keyframes lenis-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-100px); }
        }

        /* SCROLL - ScrollReveal */
        .scrollreveal-box {
          width: 120px;
          height: 40px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 6px;
          margin: 8px;
          opacity: 0;
          animation: scrollreveal-reveal 3s ease-out infinite;
        }
        @keyframes scrollreveal-reveal {
          0%, 25% { opacity: 0; transform: translateY(30px); }
          35%, 95% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-30px); }
        }

        /* SCROLL - React Intersection Observer */
        .intersection-viewport {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .intersection-element {
          width: 80px;
          height: 40px;
          background: #10b981;
          border-radius: 6px;
          margin: 12px auto;
          opacity: 0.3;
          animation: intersection-highlight 3s ease-in-out infinite;
        }
        .intersection-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: #059669;
          top: 50%;
          animation: intersection-scan 3s ease-in-out infinite;
        }
        @keyframes intersection-highlight {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes intersection-scan {
          0%, 100% { top: 20%; }
          50% { top: 80%; }
        }

        /* SCROLL - React Scroll */
        .scroll-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }
        .scroll-dot {
          width: 12px;
          height: 12px;
          background: #10b981;
          border-radius: 50%;
          opacity: 0.3;
          animation: scroll-activate 3s ease-in-out infinite;
        }
        @keyframes scroll-activate {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* SCROLL - Parallax JS */
        .parallaxjs-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .parallaxjs-layer {
          position: absolute;
          border-radius: 8px;
        }
        .parallaxjs-layer-1 {
          width: 80px;
          height: 80px;
          background: #10b981;
          top: 50%;
          left: 50%;
          animation: parallaxjs-depth-1 3s ease-in-out infinite;
        }
        .parallaxjs-layer-2 {
          width: 60px;
          height: 60px;
          background: #059669;
          top: 50%;
          left: 50%;
          animation: parallaxjs-depth-2 3s ease-in-out infinite;
        }
        .parallaxjs-layer-3 {
          width: 40px;
          height: 40px;
          background: #047857;
          top: 50%;
          left: 50%;
          animation: parallaxjs-depth-3 3s ease-in-out infinite;
        }
        @keyframes parallaxjs-depth-1 {
          0%, 100% { transform: translate(-40px, -40px); }
          50% { transform: translate(-20px, -20px); }
        }
        @keyframes parallaxjs-depth-2 {
          0%, 100% { transform: translate(-30px, -30px); }
          50% { transform: translate(-10px, -10px); }
        }
        @keyframes parallaxjs-depth-3 {
          0%, 100% { transform: translate(-20px, -20px); }
          50% { transform: translate(0, 0); }
        }

        /* SCROLL - React Scroll Parallax */
        .scroll-parallax-image {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 8px;
          animation: scroll-parallax-move 3s ease-in-out infinite;
        }
        @keyframes scroll-parallax-move {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }

        /* SCROLL - Swiper */
        .swiper-slides {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .swiper-slide {
          position: absolute;
          width: 120px;
          height: 140px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 8px;
          animation: swiper-3d 4.5s ease-in-out infinite;
        }
        .swiper-slide:nth-child(1) { animation-delay: 0s; }
        .swiper-slide:nth-child(2) { animation-delay: 1.5s; }
        .swiper-slide:nth-child(3) { animation-delay: 3s; }
        @keyframes swiper-3d {
          0%, 33% { transform: translateX(0) rotateY(0deg) scale(1); opacity: 1; z-index: 2; }
          50% { transform: translateX(-150px) rotateY(-45deg) scale(0.8); opacity: 0.5; z-index: 1; }
          66%, 100% { transform: translateX(-300px) rotateY(-90deg) scale(0.6); opacity: 0; z-index: 0; }
        }

        /* FORMS - React Hook Form */
        .rhf-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .rhf-field {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rhf-input {
          width: 140px;
          height: 35px;
          background: transparent;
          border: 2px solid #f97316;
          border-radius: 6px;
        }
        .rhf-check {
          width: 30px;
          height: 30px;
          background: #f97316;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          opacity: 0;
          animation: rhf-validate 3s ease-out infinite;
        }
        @keyframes rhf-validate {
          0%, 30% { opacity: 0; transform: scale(0); }
          40%, 90% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0); }
        }

        /* FORMS - Zod */
        .zod-schema {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .zod-type {
          padding: 8px 16px;
          background: #f97316;
          border-radius: 6px;
          color: white;
          font-weight: bold;
        }
        .zod-arrow {
          font-size: 24px;
          color: #f97316;
        }
        .zod-check {
          width: 40px;
          height: 40px;
          background: #16a34a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
        }
        .zod-check-anim {
          animation: zod-validate 2s ease-in-out infinite;
        }
        @keyframes zod-validate {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        /* FORMS - Formik */
        .formik-steps {
          display: flex;
          gap: 12px;
        }
        .formik-dot {
          width: 16px;
          height: 16px;
          background: #666;
          border-radius: 50%;
          animation: formik-progress 3s ease-in-out infinite;
        }
        @keyframes formik-progress {
          0%, 100% { background: #666; transform: scale(1); }
          50% { background: #f97316; transform: scale(1.3); }
        }

        /* FORMS - React Dropzone */
        .dropzone {
          width: 150px;
          height: 150px;
          border: 3px dashed #f97316;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: dropzone-pulse 2s ease-in-out infinite;
        }
        .dropzone-icon {
          font-size: 48px;
          animation: dropzone-bounce 1s ease-in-out infinite;
        }
        @keyframes dropzone-pulse {
          0%, 100% { border-color: #f97316; }
          50% { border-color: #ea580c; }
        }
        @keyframes dropzone-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* FORMS - React Colorful */
        .colorful-picker {
          width: 120px;
          height: 120px;
          background: conic-gradient(
            red, yellow, lime, aqua, blue, magenta, red
          );
          border-radius: 50%;
          position: relative;
          animation: colorful-spin 4s linear infinite;
        }
        .colorful-picker::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid #f97316;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        @keyframes colorful-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* FORMS - React Number Format */
        .number-format {
          font-size: 36px;
          font-weight: bold;
          color: #f97316;
          font-family: monospace;
          animation: number-format-tick 2s ease-in-out infinite;
        }
        @keyframes number-format-tick {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* FORMS - React Phone Input */
        .phone-input {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #2a2a2a;
          padding: 12px 16px;
          border-radius: 8px;
          border: 2px solid #f97316;
        }
        .phone-flag {
          font-size: 32px;
        }
        .phone-number {
          color: #f97316;
          font-family: monospace;
          font-size: 16px;
        }

        /* FORMS - TanStack Form */
        .tanstack-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .tanstack-field {
          width: 150px;
          height: 40px;
          background: #2a2a2a;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 12px;
        }
        .tanstack-badge {
          padding: 4px 12px;
          border-radius: 4px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          animation: tanstack-badge-pop 2s ease-in-out infinite;
        }
        @keyframes tanstack-badge-pop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* MEDIA - React Player */
        .player-video {
          width: 180px;
          height: 120px;
          background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
        .player-play {
          font-size: 48px;
          color: #ec4899;
          animation: player-pulse 1.5s ease-in-out infinite;
        }
        .player-progress {
          width: 180px;
          height: 6px;
          background: #2a2a2a;
          border-radius: 3px;
          overflow: hidden;
        }
        .player-bar {
          height: 100%;
          background: #ec4899;
          width: 0;
          animation: player-progress 3s linear infinite;
        }
        @keyframes player-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes player-progress {
          from { width: 0; }
          to { width: 100%; }
        }

        /* MEDIA - React Image Crop */
        .crop-image {
          width: 140px;
          height: 140px;
          background: linear-gradient(135deg, #ec4899, #be185d);
          border-radius: 8px;
        }
        .crop-marquee {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 3px dashed white;
          animation: crop-move 3s ease-in-out infinite;
        }
        @keyframes crop-move {
          0%, 100% { top: 30px; left: 30px; }
          50% { top: 70px; left: 70px; }
        }

        /* MEDIA - Yet Another Lightbox */
        .lightbox-thumb {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ec4899, #be185d);
          border-radius: 6px;
          animation: lightbox-expand 2s ease-in-out infinite;
        }
        .lightbox-expanded {
          position: absolute;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #ec4899, #be185d);
          border-radius: 8px;
          opacity: 0;
          animation: lightbox-show 2s ease-in-out infinite;
        }
        @keyframes lightbox-expand {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0); opacity: 0; }
        }
        @keyframes lightbox-show {
          0%, 50% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* MEDIA - React Zoom Pan Pinch */
        .zoom-image {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #ec4899, #be185d);
          border-radius: 8px;
          animation: zoom-in-out 3s ease-in-out infinite;
        }
        @keyframes zoom-in-out {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }

        /* MEDIA - React PDF */
        .pdf-page {
          width: 150px;
          height: 180px;
          background: white;
          border-radius: 4px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pdf-line {
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ec4899, transparent);
          border-radius: 2px;
          animation: pdf-load 2s ease-out infinite;
        }
        @keyframes pdf-load {
          from { width: 0; }
          to { width: 100%; }
        }

        /* MEDIA - Fabric */
        .fabric-shape {
          position: absolute;
          animation: fabric-draw 3s ease-in-out infinite;
        }
        .fabric-circle {
          width: 60px;
          height: 60px;
          background: none;
          border: 4px solid #ec4899;
          border-radius: 50%;
          top: 30%;
          left: 20%;
        }
        .fabric-rect {
          width: 50px;
          height: 50px;
          background: none;
          border: 4px solid #be185d;
          top: 50%;
          left: 50%;
          animation-delay: 0.5s;
        }
        .fabric-triangle {
          width: 0;
          height: 0;
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
          border-bottom: 52px solid #9d174d;
          top: 40%;
          right: 15%;
          animation-delay: 1s;
        }
        @keyframes fabric-draw {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          50%, 100% { opacity: 1; transform: scale(1) rotate(45deg); }
        }

        /* MEDIA - Wavesurfer */
        .wavesurfer {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 100px;
          width: 200px;
          position: relative;
        }
        .wavesurfer-bar {
          flex: 1;
          background: #ec4899;
          min-width: 3px;
          animation: wavesurfer-pulse 2s ease-in-out infinite;
        }
        .wavesurfer-playhead {
          position: absolute;
          width: 2px;
          height: 100%;
          background: white;
          animation: wavesurfer-progress 3s linear infinite;
        }
        @keyframes wavesurfer-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes wavesurfer-progress {
          from { left: 0; }
          to { left: 100%; }
        }

        /* MEDIA - Tiptap */
        .tiptap-editor {
          width: 180px;
          background: #2a2a2a;
          border-radius: 8px;
          padding: 8px;
        }
        .tiptap-toolbar {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #444;
        }
        .tiptap-btn {
          width: 30px;
          height: 30px;
          background: #ec4899;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          animation: tiptap-active 2s ease-in-out infinite;
        }
        .tiptap-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .tiptap-line {
          width: 100%;
          height: 4px;
          background: #444;
          border-radius: 2px;
        }
        @keyframes tiptap-active {
          0%, 100% { background: #ec4899; }
          50% { background: #be185d; }
        }

        /* UTILITY - TanStack Query */
        .tq-cycle {
          display: flex;
          gap: 16px;
        }
        .tq-state {
          width: 50px;
          height: 50px;
          background: #2a2a2a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          opacity: 0.3;
        }
        .tq-loading {
          animation: tq-loading-anim 3s ease-in-out infinite;
        }
        .tq-data {
          animation: tq-data-anim 3s 1s ease-in-out infinite;
        }
        .tq-cache {
          animation: tq-cache-anim 3s 2s ease-in-out infinite;
        }
        @keyframes tq-loading-anim {
          0%, 33% { opacity: 1; transform: scale(1.2); background: #6366f1; }
          34%, 100% { opacity: 0.3; transform: scale(1); background: #2a2a2a; }
        }
        @keyframes tq-data-anim {
          0%, 33% { opacity: 1; transform: scale(1.2); background: #6366f1; }
          34%, 100% { opacity: 0.3; transform: scale(1); background: #2a2a2a; }
        }
        @keyframes tq-cache-anim {
          0%, 33% { opacity: 1; transform: scale(1.2); background: #6366f1; }
          34%, 100% { opacity: 0.3; transform: scale(1); background: #2a2a2a; }
        }

        /* UTILITY - Zustand */
        .zustand-store {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .zustand-node {
          position: absolute;
          padding: 12px 20px;
          background: #6366f1;
          border-radius: 8px;
          color: white;
          font-weight: bold;
        }
        .zustand-root {
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
        }
        .zustand-child {
          width: 50px;
          height: 50px;
          padding: 0;
          animation: zustand-connect 2s ease-in-out infinite;
        }
        .zustand-child:nth-child(2) { top: 60%; left: 20%; }
        .zustand-child:nth-child(3) { top: 60%; left: 50%; transform: translateX(-50%); }
        .zustand-child:nth-child(4) { top: 60%; right: 20%; }
        @keyframes zustand-connect {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1); }
        }

        /* UTILITY - Jotai */
        .jotai-atom {
          position: absolute;
          width: 30px;
          height: 30px;
          background: #6366f1;
          border-radius: 50%;
          animation: jotai-pulse 2s ease-in-out infinite;
        }
        .jotai-connections {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .jotai-line {
          stroke: #6366f1;
          stroke-width: 2;
          opacity: 0;
        }
        .jotai-line-1 {
          x1: 30%;
          y1: 35%;
          x2: 70%;
          y2: 35%;
          animation: jotai-line-fade 2s 0.5s ease-in-out infinite;
        }
        .jotai-line-2 {
          x1: 30%;
          y1: 75%;
          x2: 70%;
          y2: 75%;
          animation: jotai-line-fade 2s 1s ease-in-out infinite;
        }
        @keyframes jotai-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes jotai-line-fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.6; }
        }

        /* UTILITY - Date-fns */
        .datefns-calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          width: 180px;
        }
        .datefns-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 10px;
          color: #6366f1;
        }
        .datefns-header {
          font-weight: bold;
          background: #2a2a2a;
        }
        .datefns-date {
          background: #6366f1;
          color: white;
          opacity: 0;
          animation: datefns-appear 2s ease-out forwards;
        }
        @keyframes datefns-appear {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }

        /* UTILITY - Clsx */
        .clsx-merge {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .clsx-class {
          padding: 8px 16px;
          background: #6366f1;
          border-radius: 6px;
          color: white;
          font-size: 12px;
          animation: clsx-fade 2s ease-in-out infinite;
        }
        .clsx-class-1 { animation-delay: 0s; }
        .clsx-class-2 { animation-delay: 0.5s; }
        .clsx-arrow {
          font-size: 20px;
          color: #6366f1;
        }
        .clsx-result {
          padding: 8px 16px;
          background: #4f46e5;
          border-radius: 6px;
          color: white;
          font-size: 12px;
          animation: clsx-result 2s 1s ease-in-out infinite;
        }
        @keyframes clsx-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes clsx-result {
          0%, 50% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* UTILITY - Lodash */
        .lodash-array {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          max-width: 200px;
        }
        .lodash-item {
          width: 30px;
          height: 30px;
          background: #6366f1;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          opacity: 0;
          animation: lodash-appear 2s ease-out forwards;
        }
        .lodash-sorted {
          background: #4f46e5;
          animation: lodash-sorted 2s 1s ease-out forwards;
        }
        .lodash-arrow {
          font-size: 20px;
          color: #6366f1;
          width: 100%;
          text-align: center;
        }
        @keyframes lodash-appear {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lodash-sorted {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* UTILITY - Axios */
        .axios-http {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .axios-client,
        .axios-server {
          padding: 12px 20px;
          background: #6366f1;
          border-radius: 8px;
          color: white;
          font-weight: bold;
        }
        .axios-request,
        .axios-response {
          font-size: 24px;
          color: #6366f1;
        }
        .axios-request {
          animation: axios-send 2s ease-in-out infinite;
        }
        .axios-response {
          animation: axios-receive 2s 1s ease-in-out infinite;
        }
        @keyframes axios-send {
          0%, 50%, 100% { opacity: 0.3; }
          25% { opacity: 1; }
        }
        @keyframes axios-receive {
          0%, 50%, 100% { opacity: 0.3; }
          75% { opacity: 1; }
        }

        /* UTILITY - React Use */
        .react-use-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          width: 180px;
        }
        .react-use-hook {
          aspect-ratio: 1;
          background: #2a2a2a;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          opacity: 0;
          animation: react-use-pop 2s ease-out forwards;
        }
        @keyframes react-use-pop {
          from { opacity: 0; transform: scale(0) rotate(-180deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        /* UTILITY - Immer */
        .immer-diff {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .immer-before,
        .immer-after {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px;
          background: #2a2a2a;
          border-radius: 6px;
        }
        .immer-prop {
          color: #666;
          font-size: 12px;
          font-family: monospace;
        }
        .immer-old {
          color: #ef4444;
          text-decoration: line-through;
        }
        .immer-new {
          color: #10b981;
          animation: immer-highlight 2s ease-in-out infinite;
        }
        .immer-arrow {
          font-size: 20px;
          color: #6366f1;
        }
        @keyframes immer-highlight {
          0%, 100% { background: transparent; }
          50% { background: rgba(16, 185, 129, 0.2); }
        }

        /* UTILITY - React Hotkeys */
        .hotkeys-key {
          width: 50px;
          height: 50px;
          background: #6366f1;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
          box-shadow: 0 4px 0 #4f46e5;
          animation: hotkeys-press 2s ease-in-out infinite;
        }
        .hotkeys-key-delayed {
          animation-delay: 0.5s;
        }
        .hotkeys-plus {
          font-size: 24px;
          color: #6366f1;
        }
        @keyframes hotkeys-press {
          0%, 100% { transform: translateY(0); box-shadow: 0 4px 0 #4f46e5; }
          50% { transform: translateY(4px); box-shadow: 0 0 0 #4f46e5; }
        }

        /* UTILITY - Nanoid */
        .nanoid-id {
          font-family: monospace;
          font-size: 16px;
          color: #6366f1;
          letter-spacing: 2px;
          animation: nanoid-generate 3s ease-in-out infinite;
        }
        @keyframes nanoid-generate {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* UTILITY - Fuse */
        .fuse-search {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .fuse-query,
        .fuse-match {
          padding: 12px 20px;
          background: #6366f1;
          border-radius: 8px;
          color: white;
          font-family: monospace;
        }
        .fuse-query {
          background: #ef4444;
          text-decoration: line-through;
        }
        .fuse-match {
          animation: fuse-found 2s ease-in-out infinite;
        }
        .fuse-arrow {
          font-size: 24px;
          color: #6366f1;
        }
        @keyframes fuse-found {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* EFFECTS - Vanilla Tilt */
        .tilt-card {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #c8f53b, #a0d020);
          border-radius: 12px;
          animation: tilt-3d 4s ease-in-out infinite;
        }
        @keyframes tilt-3d {
          0%, 100% { transform: perspective(500px) rotateX(0deg) rotateY(0deg); }
          25% { transform: perspective(500px) rotateX(10deg) rotateY(-10deg); }
          50% { transform: perspective(500px) rotateX(-10deg) rotateY(10deg); }
          75% { transform: perspective(500px) rotateX(10deg) rotateY(10deg); }
        }

        /* EFFECTS - React Parallax Tilt */
        .parallax-tilt-card {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #c8f53b, #a0d020);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          animation: parallax-tilt 4s ease-in-out infinite;
        }
        .parallax-tilt-glare {
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, transparent, rgba(255,255,255,0.5), transparent);
          top: -50%;
          left: -50%;
          animation: parallax-glare 4s ease-in-out infinite;
        }
        @keyframes parallax-tilt {
          0%, 100% { transform: perspective(500px) rotateX(0deg) rotateY(0deg); }
          50% { transform: perspective(500px) rotateX(15deg) rotateY(15deg); }
        }
        @keyframes parallax-glare {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }

        /* EFFECTS - Vanta */
        .vanta-wave {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #c8f53b, #a0d020);
          animation: vanta-wave 3s ease-in-out infinite;
        }
        @keyframes vanta-wave {
          0%, 100% { clip-path: polygon(0 40%, 20% 45%, 40% 35%, 60% 50%, 80% 40%, 100% 45%, 100% 100%, 0 100%); }
          50% { clip-path: polygon(0 50%, 20% 35%, 40% 45%, 60% 40%, 80% 50%, 100% 35%, 100% 100%, 0 100%); }
        }

        /* EFFECTS - Atropos */
        .atropos-scene {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .atropos-layer {
          position: absolute;
          border-radius: 8px;
        }
        .atropos-layer-1 {
          width: 100px;
          height: 100px;
          background: #c8f53b;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: atropos-1 3s ease-in-out infinite;
        }
        .atropos-layer-2 {
          width: 80px;
          height: 80px;
          background: #b4e035;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: atropos-2 3s ease-in-out infinite;
        }
        .atropos-layer-3 {
          width: 60px;
          height: 60px;
          background: #a0d020;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: atropos-3 3s ease-in-out infinite;
        }
        @keyframes atropos-1 {
          0%, 100% { transform: translate(-50%, -50%) translateZ(0px); }
          50% { transform: translate(-40%, -40%) translateZ(20px); }
        }
        @keyframes atropos-2 {
          0%, 100% { transform: translate(-50%, -50%) translateZ(10px); }
          50% { transform: translate(-45%, -45%) translateZ(30px); }
        }
        @keyframes atropos-3 {
          0%, 100% { transform: translate(-50%, -50%) translateZ(20px); }
          50% { transform: translate(-50%, -50%) translateZ(40px); }
        }

        /* EFFECTS - Granim */
        .granim-gradient {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #c8f53b, #a0d020, #8bc220, #c8f53b);
          background-size: 400% 400%;
          animation: granim-flow 4s ease infinite;
        }
        @keyframes granim-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* EFFECTS - Zdog */
        .zdog-shape {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #c8f53b, #a0d020);
          border-radius: 50% 50% 20% 50%;
          animation: zdog-rotate 3s linear infinite;
        }
        @keyframes zdog-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* EFFECTS - Matter JS */
        .matter-object {
          position: absolute;
          width: 30px;
          height: 30px;
          background: #c8f53b;
          border-radius: 6px;
          top: -50px;
          animation: matter-fall 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        @keyframes matter-fall {
          0% { top: -50px; transform: rotate(0deg); }
          80% { top: 180px; transform: rotate(720deg); }
          85% { top: 170px; }
          90% { top: 180px; }
          95% { top: 175px; }
          100% { top: 180px; transform: rotate(720deg); }
        }

        /* EFFECTS - Shaders */
        .shader-flow {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #c8f53b, #a0d020, #8bc220, #c8f53b);
          background-size: 400% 400%;
          animation: shader-wave 3s ease infinite;
          position: relative;
        }
        .shader-flow::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.3), transparent);
          animation: shader-pulse 2s ease-in-out infinite;
        }
        @keyframes shader-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shader-pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        /* EFFECTS - Proton */
        .proton-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #c8f53b;
          border-radius: 50%;
          bottom: 0;
          animation: proton-rise 2s ease-out infinite;
        }
        @keyframes proton-rise {
          0% { bottom: 0; opacity: 1; transform: scale(1); }
          100% { bottom: 220px; opacity: 0; transform: scale(0.3); }
        }

        /* EFFECTS - MoJS */
        .mojs-burst {
          position: relative;
          width: 100px;
          height: 100px;
        }
        .mojs-particle {
          position: absolute;
          width: 8px;
          height: 20px;
          background: linear-gradient(180deg, #c8f53b, transparent);
          top: 50%;
          left: 50%;
          margin-left: -4px;
          margin-top: -10px;
          transform-origin: 4px 10px;
          animation: mojs-burst 2s ease-out infinite;
        }
        @keyframes mojs-burst {
          0% { opacity: 1; transform: translateY(0) scale(0); }
          50%, 100% { opacity: 0; transform: translateY(-60px) scale(1); }
        }
      `}</style>
      {renderPreview()}
    </>
  );
}
