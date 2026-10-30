import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        id="navbar"
        className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center"
      >
        <div id="brand-logo" className="flex items-center gap-3">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Phatlines®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        <nav
          id="desktop-nav-links"
          className="hidden md:flex items-center text-[23px] text-white"
          aria-label="Desktop Main Navigation"
        >
          <a href="#labs" className="hover:opacity-60 transition-opacity">Portfolio</a>
          <span>.&nbsp;</span>
          <a href="#studio" className="hover:opacity-60 transition-opacity">Studio</a>
          <span>.&nbsp;</span>
          <a href="#openings" className="hover:opacity-60 transition-opacity">Agents</a>
          <span>.&nbsp;</span>
          <a href="#shop" className="hover:opacity-60 transition-opacity">Store</a>
        </nav>

        <div id="desktop-cta-container" className="hidden md:block">
          <a
            id="desktop-cta-button"
            href="mailto:hello@mainframe.co"
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          id="mobile-hamburger-button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none z-20 cursor-pointer"
        >
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 transform origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 transform origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      <div
        id="mobile-navigation-overlay"
        className={`fixed inset-0 z-[9] bg-black/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <a href="#labs" onClick={() => setMenuOpen(false)} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Labs</a>
        <a href="#studio" onClick={() => setMenuOpen(false)} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Studio</a>
        <a href="#openings" onClick={() => setMenuOpen(false)} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Openings</a>
        <a href="#shop" onClick={() => setMenuOpen(false)} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Shop</a>
        <a href="mailto:hello@mainframe.co" onClick={() => setMenuOpen(false)} className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity">Get in touch</a>
      </div>
    </>
  );
}
