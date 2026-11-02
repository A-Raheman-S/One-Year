import React, { useEffect, useState } from 'react';
import { initLenisAndScrollTrigger } from './animations/gsapConfig';
import { CustomCursor } from './components/CustomCursor';
import { FloatingDecorations } from './components/FloatingDecorations';
import { IntroLoader } from './components/IntroLoader';

// The 12 Sections in precise order
import { Hero } from './components/Hero'; // 01
import { RelationshipCounter } from './components/RelationshipCounter'; // 02
import { StoryTimeline } from './components/StoryTimeline'; // 03
import { BeforeAfterSlider } from './components/BeforeAfterSlider'; // 04
import { ReasonsCards } from './components/ReasonsCards'; // 05
import { LoveLetter } from './components/LoveLetter'; // 06
import { MusicSection } from './components/MusicSection'; // 07
import { VoiceNotePlayer } from './components/VoiceNotePlayer'; // 08
import { PromiseSection } from './components/PromiseSection'; // 09
import { AnniversaryCountdown } from './components/AnniversaryCountdown'; // 10
import { FinalSection } from './components/FinalSection'; // 11
import { ThemeToolbar } from './components/ThemeToolbar'; // 12

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth inertia scrolling & GSAP ticker
    const lenis = initLenisAndScrollTrigger();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-[#F5E8D8] overflow-x-hidden selection:bg-[#EF6389]/30 selection:text-[#F5E8D8]">
      {/* Cinematic Intro Animation */}
      {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}

      {/* Desktop Custom Trailing Cursor */}
      <CustomCursor />

      {/* Ambient Floating Hearts, Sparkles & Petals */}
      <FloatingDecorations />

      {/* SECTION 01 — CINEMATIC HERO */}
      <Hero />

      {/* SECTION 02 — RELATIONSHIP COUNTER */}
      <RelationshipCounter />

      {/* SECTION 03 — THE STORY OF US */}
      <StoryTimeline />

      {/* SECTION 04 — THEN & NOW */}
      <BeforeAfterSlider />

      {/* SECTION 05 — REASONS I STILL CHOOSE YOU */}
      <ReasonsCards />

      {/* SECTION 06 — A LETTER, FROM MY HEART */}
      <LoveLetter />

      {/* SECTION 07 — THE SONG THAT FEELS LIKE US */}
      <MusicSection />

      {/* SECTION 08 — VOICE NOTE PLAYER */}
      <VoiceNotePlayer />

      {/* SECTION 09 — MY PROMISES TO YOU */}
      <PromiseSection />

      {/* SECTION 10 — NEXT ANNIVERSARY COUNTDOWN */}
      <AnniversaryCountdown />

      {/* SECTION 11 — FINAL SECTION */}
      <FinalSection />

      {/* SECTION 12 — FLOATING INTERFACE AND THEME TOOLBAR */}
      <ThemeToolbar />
    </div>
  );
};

export default App;
