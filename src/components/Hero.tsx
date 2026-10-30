import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  'Glad you stopped in. This is a test; but in the mean time, we are actually building something great!';

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText('hello@mainframe.co');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = 'hello@mainframe.co';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const pillClass = 'inline-flex items-center justify-center bg-black text-white border border-white/20 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-white hover:text-black transition-colors duration-200';

  return (
    <section id="hero-section" className="relative z-[1] w-full h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div id="hero-content-container" className="max-w-xl relative z-10">
        <div id="hero-intro-label" className="pointer-events-none select-none mb-5 sm:mb-6" style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.3, fontWeight: 400, color: '#fff' }}>
          Hey there, meet Phatlines.inc,<br />
          AI Creator and Tech enthusiast.      
          </div>

        <p id="hero-typewriter-text" className="text-white mb-5 sm:mb-6" style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.35, fontWeight: 400, minHeight: '54px' }}>
          {displayed}
          {!done && <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" aria-hidden="true" />}
        </p>

        <div id="hero-action-pills" className="flex flex-wrap gap-y-1" style={{ opacity: pillsVisible ? 1 : 0, transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
          <button type="button" className={pillClass}>Pitch us an idea</button>
          <button type="button" className={pillClass}>Come work here</button>
          <button type="button" className={pillClass}>Send a brief hello</button>
          <button type="button" className={pillClass}>See how we operate</button>
          <button type="button" onClick={handleCopyEmail} title="Click to copy email address" className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-white hover:text-black gap-2 sm:gap-3 transition-colors duration-200">
            <span>Reach us: <span className="underline underline-offset-1">{copied ? 'Copied!' : 'arcphats@gmail.com'}</span></span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" className="shrink-0" aria-hidden="true">
              <rect x="3.5" y="1" width="6.5" height="7" rx="0.75" />
              <rect x="1.5" y="3.5" width="6.5" height="7" rx="0.75" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
