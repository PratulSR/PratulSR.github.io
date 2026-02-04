'use client';

import { useEffect, useState, useRef } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import KnownFor from '@/components/profile/KnownFor';
import Filmography from '@/components/profile/Filmography';
import Biography from '@/components/profile/Biography';
import Trivia from '@/components/profile/Trivia';
import Sidebar from '@/components/profile/Sidebar';
import TerminalMode from '@/components/TerminalMode';

export default function Home() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Konami Code Easter Egg (keyboard)
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          setIsTerminalMode(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle secret tap for mobile (tap PRDb rating 7 times)
  const handleSecretTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Clear previous timeout
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    // Reset after 2 seconds of no taps
    tapTimeoutRef.current = setTimeout(() => {
      setTapCount(0);
    }, 2000);

    // Activate terminal mode after 7 taps
    if (newCount >= 7) {
      setIsTerminalMode(true);
      setTapCount(0);
    }
  };

  // Show Terminal Mode
  if (isTerminalMode) {
    return <TerminalMode onExit={() => setIsTerminalMode(false)} />;
  }

  return (
    <div className="container-prdb py-8">
      {/* Profile Header with secret tap zone */}
      <section className="mb-8">
        <ProfileHeader onSecretTap={handleSecretTap} tapCount={tapCount} />
      </section>

      {/* Known For - Full Width */}
      <section className="mb-10">
        <KnownFor />
      </section>

      {/* Main Content + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <Filmography />
          <Biography />
          <Trivia />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}