'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import SearchDropdown from '@/components/ui/SearchDropdown';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Close menu and search on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Open search dropdown when typing
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  }, [searchQuery]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="container-prdb">
          <div className="flex items-center justify-between h-14">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 -ml-2 text-white hover:bg-[#2A2A2A] rounded transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-[#F5C518]">PR</span>
                <span className="text-white">Db</span>
              </span>
            </Link>

            {/* Search Bar - Desktop Only */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[#6B6B6B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search projects, skills, experience..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1F1F1F] border border-[#2A2A2A] rounded text-sm text-white placeholder-[#6B6B6B] focus:outline-none focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]/50 transition-all"
                />

                {/* Search Dropdown */}
                <SearchDropdown
                  isOpen={isSearchOpen}
                  onClose={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  inputRef={searchInputRef}
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Resume Download - Desktop */}
              <a
                href="/resume/You-Gotta-Hire-Pratul.pdf"
                download
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#AAAAAA] hover:text-white border border-[#2A2A2A] hover:border-[#3A3A3A] rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </a>

              {/* Contact CTA */}
              <Link
                href="/contact"
                className="btn-gold text-xs md:text-sm"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <div className="container-prdb">
          <ul className="flex items-center gap-1 py-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      inline-flex items-center px-4 py-2 text-sm font-medium rounded
                      transition-colors whitespace-nowrap
                      ${isActive
                        ? 'bg-[#F5C518]/10 text-[#F5C518]'
                        : 'text-[#AAAAAA] hover:text-white hover:bg-[#252525]'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-14 left-0 bottom-0 w-72 z-50 
          bg-[#121212] border-r border-[#2A2A2A]
          transform transition-transform duration-300 ease-out
          md:hidden
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Search */}
        <div className="p-4 border-b border-[#2A2A2A]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={mobileSearchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#2A2A2A] rounded text-sm text-white placeholder-[#6B6B6B] focus:outline-none focus:border-[#F5C518]"
            />

            {/* Mobile Search Dropdown */}
            <SearchDropdown
              isOpen={isSearchOpen && isMenuOpen}
              onClose={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              inputRef={mobileSearchInputRef}
            />
          </div>
        </div>

        {/* Mobile Nav Links */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors text-base font-medium
                      ${isActive
                        ? 'bg-[#F5C518]/10 text-[#F5C518]'
                        : 'text-[#AAAAAA] hover:text-white hover:bg-[#1A1A1A]'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Resume Download */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2A2A2A]">
          <a
            href="/resume/You-Gotta-Hire-Pratul.pdf"
            download
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1A1A1A] hover:bg-[#252525] text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
