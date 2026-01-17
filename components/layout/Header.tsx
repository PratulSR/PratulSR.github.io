'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
            <div className="container-prdb">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1 group">
                        <span className="text-2xl font-black tracking-tight">
                            <span className="text-[#F5C518]">PR</span>
                            <span className="text-white">Db</span>
                        </span>
                    </Link>

                    {/* Search Bar */}
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
                                type="text"
                                placeholder="Search projects, skills, experience..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-[#1F1F1F] border border-[#2A2A2A] rounded text-sm text-white placeholder-[#6B6B6B] focus:outline-none focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Watchlist / Contact CTA */}
                        <Link
                            href="mailto:pratulsr26@gmail.com"
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
    );
}
