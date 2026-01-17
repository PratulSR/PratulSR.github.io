'use client';

import { useEffect, useState } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import KnownFor from '@/components/profile/KnownFor';
import Filmography from '@/components/profile/Filmography';
import Biography from '@/components/profile/Biography';
import Trivia from '@/components/profile/Trivia';
import Sidebar from '@/components/profile/Sidebar';

export default function Home() {
  const [isXRayMode, setIsXRayMode] = useState(false);

  // Konami Code Easter Egg
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          setIsXRayMode(prev => !prev);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply X-Ray mode to html element
  useEffect(() => {
    if (isXRayMode) {
      document.documentElement.classList.add('x-ray-mode');
    } else {
      document.documentElement.classList.remove('x-ray-mode');
    }
  }, [isXRayMode]);

  return (
    <>
      {/* X-Ray Mode Overlay */}
      {isXRayMode && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#00aaff] text-6xl md:text-8xl font-black opacity-10 rotate-6">
              DEBUG_MODE
            </p>
            <p className="text-[#00aaff] text-sm opacity-50 mt-4">
              Press Konami code again to exit
            </p>
          </div>
        </div>
      )}

      <div className="container-prdb py-8">
        {/* Profile Header */}
        <section className="mb-8">
          <ProfileHeader />
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
    </>
  );
}