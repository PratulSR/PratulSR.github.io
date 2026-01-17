'use client';

import { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import profileData from '@/data/profile.json';

export default function Biography() {
    const [expanded, setExpanded] = useState(false);

    return (
        <section>
            <SectionHeader
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                }
            >
                Biography
            </SectionHeader>

            <div className="prose prose-invert max-w-none">
                <p className={`text-[#AAAAAA] leading-relaxed whitespace-pre-line ${!expanded ? 'line-clamp-4' : ''}`}>
                    {profileData.bio.full}
                </p>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-sm text-[#5799EF] hover:text-[#7DB3FF] transition-colors"
                >
                    {expanded ? '← Show less' : 'Read more →'}
                </button>
            </div>

            {/* Core Themes */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {profileData.coreThemes.map((theme, index) => (
                    <div
                        key={index}
                        className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]"
                    >
                        <h4 className="text-sm font-semibold text-[#F5C518] mb-2">
                            {theme.title}
                        </h4>
                        <p className="text-xs text-[#AAAAAA] leading-relaxed">
                            {theme.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
