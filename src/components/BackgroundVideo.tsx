import { useEffect, useRef } from 'react';

const VIDEO_URL = new URL(
  '../../img/cursor_tracking_character.mp4',
  import.meta.url,
).href;
const SENSITIVITY = 0.5;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;
      let nextTarget = targetTimeRef.current + timeOffset;
      nextTarget = Math.max(0, Math.min(duration, nextTarget));
      targetTimeRef.current = nextTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = nextTarget;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;
      let nextTarget = targetTimeRef.current + timeOffset;
      nextTarget = Math.max(0, Math.min(duration, nextTarget));
      targetTimeRef.current = nextTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = nextTarget;
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      isSeekingRef.current = false;
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      targetTimeRef.current = video.currentTime || 0;
    }
  };

  return (
    <video
      id="hero-background-video"
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      onSeeked={handleSeeked}
      className="fixed inset-0 w-full h-full object-cover select-none pointer-events-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        objectFit: 'cover',
        objectPosition: '70% center',
      }}
    />
  );
}
