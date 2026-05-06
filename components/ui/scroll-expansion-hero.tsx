'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Pure scroll-position-driven — no event prevention, no page lock
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollable = wrapperRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showContent = progress >= 0.9;

  // Media frame grows from 320×400 to near-full-screen
  const frameW = 320 + progress * (isMobile ? 500 : 1100);
  const frameH = 400 + progress * (isMobile ? 180 : 380);
  // Title words drift apart
  const drift = progress * (isMobile ? 22 : 18);

  const firstHalf = title ? title.split(' ').slice(0, 3).join(' ') : '';
  const secondHalf = title ? title.split(' ').slice(3).join(' ') : '';

  const embedSrc = mediaSrc.includes('watch?v=')
    ? mediaSrc.replace('watch?v=', 'embed/') +
      '?autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1&playlist=' +
      mediaSrc.split('v=')[1]
    : mediaSrc;

  return (
    // Wrapper is 300vh — section sticks while user scrolls through it
    <div ref={wrapperRef} style={{ height: '300vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0e0c09',
        }}
      >
        {/* Background fades out as media expands */}
        <motion.div
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          animate={{ opacity: 1 - progress * 1.2 }}
          transition={{ duration: 0.05 }}
        >
          <Image
            src={bgImageSrc}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
        </motion.div>

        {/* Growing media frame */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${frameW}px`,
            height: `${frameH}px`,
            maxWidth: '95vw',
            maxHeight: '88vh',
            borderRadius: `${Math.max(4, 20 - progress * 20)}px`,
            overflow: 'hidden',
            boxShadow: '0 8px 60px rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        >
          {mediaType === 'image' ? (
            <Image src={mediaSrc} alt={title || ''} fill style={{ objectFit: 'cover' }} />
          ) : (
            <iframe
              src={embedSrc}
              title={title || 'Nassau video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
            />
          )}
          {/* Overlay dims as animation progresses */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `rgba(0,0,0,${0.45 - progress * 0.35})`,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Title + sub-labels — absolutely centered over the video frame, fades out when content appears */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            pointerEvents: 'none',
            width: '100%',
            textAlign: 'center',
            opacity: showContent ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
          className={textBlend ? 'mix-blend-difference' : ''}
        >
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1,
              transform: `translateX(-${drift}vw)`,
              display: 'block',
              textShadow: '0 2px 24px rgba(0,0,0,0.7)',
              transition: 'transform 0.05s linear',
            }}
          >
            {firstHalf}
          </span>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 800,
              color: '#F5A020',
              lineHeight: 1,
              transform: `translateX(${drift}vw)`,
              display: 'block',
              textShadow: '0 2px 24px rgba(0,0,0,0.6)',
              transition: 'transform 0.05s linear',
            }}
          >
            {secondHalf}
          </span>

          {/* Sub-labels */}
          {(date || scrollToExpand) && !showContent && (
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '1rem',
              }}
            >
              {date && (
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '1.25rem',
                    color: 'rgba(245,224,178,0.85)',
                    transform: `translateX(-${drift * 0.6}vw)`,
                    display: 'block',
                    transition: 'transform 0.05s linear',
                    textShadow: '0 1px 8px rgba(0,0,0,0.8)',
                  }}
                >
                  {date}
                </span>
              )}
              {scrollToExpand && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'rgba(240,237,232,0.6)',
                    transform: `translateX(${drift * 0.6}vw)`,
                    display: 'block',
                    textTransform: 'uppercase',
                    transition: 'transform 0.05s linear',
                    alignSelf: 'center',
                    textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                  }}
                >
                  {scrollToExpand}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content revealed at full expansion */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            padding: '2rem 1.5rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
