'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import projectsData from '@/data/projects.json';
import experienceData from '@/data/experience.json';
import { ProjectsData } from '@/types/project';

const projects = (projectsData as ProjectsData).projects;
const skills = (projectsData as ProjectsData).skills;
const experience = experienceData.experience;

type SearchResultType = 'project' | 'skill' | 'experience';

interface SearchResult {
    id: string;
    type: SearchResultType;
    title: string;
    subtitle: string;
    href: string;
    image?: string;
    tags?: string[];
    icon?: string;
}

// Build search index
function buildSearchIndex(): SearchResult[] {
    const results: SearchResult[] = [];

    // Add projects
    projects.forEach((project) => {
        results.push({
            id: `project-${project.slug}`,
            type: 'project',
            title: project.title,
            subtitle: `${project.tagline} · ${project.year}`,
            href: `/projects/${project.slug}`,
            tags: project.genre,
            icon: project.genre[0] === 'AI/ML' ? '🤖' :
                project.genre[0] === 'Cloud' ? '☁️' :
                    project.genre[0] === 'Full-Stack' ? '🔧' :
                        project.genre[0] === 'Leadership' ? '👥' : '⚡',
        });
    });

    // Add experiences
    experience.forEach((exp) => {
        results.push({
            id: `exp-${exp.id}`,
            type: 'experience',
            title: exp.role,
            subtitle: `${exp.company} · ${exp.startDate} – ${exp.endDate}`,
            href: '/experience',
            image: exp.logo || undefined,
            tags: exp.techStack.slice(0, 3).map((t: any) => typeof t === 'string' ? t : t.name),
        });
    });

    // Add skill categories
    const skillCategories = [
        { name: 'Core Engineering', skills: skills.core },
        { name: 'Cloud & Infrastructure', skills: skills.cloud },
        { name: 'Languages', skills: skills.languages },
        { name: 'AI & ML', skills: skills.ai },
        { name: 'Databases', skills: skills.databases },
        { name: 'Tools', skills: skills.tools },
    ];

    skillCategories.forEach((cat) => {
        results.push({
            id: `skill-${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
            type: 'skill',
            title: cat.name,
            subtitle: `${cat.skills.length} skills`,
            href: '/projects#skills',
            tags: cat.skills.slice(0, 4),
            icon: '🎯',
        });
    });

    return results;
}

// Simple fuzzy match
function fuzzyMatch(text: string, query: string): boolean {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    return lowerText.includes(lowerQuery);
}

function searchIndex(index: SearchResult[], query: string): SearchResult[] {
    if (!query.trim()) return [];

    return index.filter((item) => {
        const searchableText = [
            item.title,
            item.subtitle,
            ...(item.tags || []),
        ].join(' ');

        return fuzzyMatch(searchableText, query);
    }).slice(0, 8); // Limit to 8 results
}

interface SearchDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function SearchDropdown({
    isOpen,
    onClose,
    searchQuery,
    onSearchChange,
    inputRef,
}: SearchDropdownProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Build index once
    const index = useMemo(() => buildSearchIndex(), []);

    // Search results
    const results = useMemo(() => searchIndex(index, searchQuery), [index, searchQuery]);

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(-1);
    }, [results]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < results.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && results[selectedIndex]) {
                    router.push(results[selectedIndex].href);
                    onClose();
                }
                break;
            case 'Escape':
                e.preventDefault();
                onClose();
                break;
        }
    }, [isOpen, results, selectedIndex, router, onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                inputRef?.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, inputRef]);

    if (!isOpen) return null;

    const typeLabels: Record<SearchResultType, string> = {
        project: 'Project',
        skill: 'Skills',
        experience: 'Experience',
    };

    const typeColors: Record<SearchResultType, string> = {
        project: 'text-[#F5C518]',
        skill: 'text-[#5799EF]',
        experience: 'text-[#10B981]',
    };

    return (
        <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-2xl overflow-hidden z-50"
        >
            {results.length === 0 && searchQuery.trim() ? (
                <div className="p-4 text-center text-[#6B6B6B]">
                    No results found for "{searchQuery}"
                </div>
            ) : results.length === 0 ? (
                <div className="p-4">
                    <p className="text-sm text-[#6B6B6B] mb-3">Try searching for:</p>
                    <div className="flex flex-wrap gap-2">
                        {['Done. Life', 'AWS', 'Python', 'Accenture'].map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => onSearchChange(suggestion)}
                                className="px-3 py-1.5 bg-[#252525] hover:bg-[#2A2A2A] text-sm text-[#AAAAAA] rounded border border-[#2A2A2A] transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <ul className="max-h-96 overflow-y-auto">
                    {results.map((result, index) => (
                        <li key={result.id}>
                            <Link
                                href={result.href}
                                onClick={onClose}
                                className={`
                  flex items-start gap-3 p-3 transition-colors
                  ${index === selectedIndex ? 'bg-[#252525]' : 'hover:bg-[#252525]'}
                `}
                            >
                                {/* Icon/Image */}
                                <div className="flex-shrink-0 w-10 h-10 bg-[#252525] rounded flex items-center justify-center overflow-hidden">
                                    {result.image ? (
                                        <Image
                                            src={result.image}
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="text-lg">{result.icon || '📄'}</span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="font-medium text-white truncate">
                                            {result.title}
                                        </span>
                                        <span className={`text-xs ${typeColors[result.type]}`}>
                                            {typeLabels[result.type]}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#6B6B6B] truncate">
                                        {result.subtitle}
                                    </p>
                                    {result.tags && result.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                            {result.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-1.5 py-0.5 bg-[#1F1F1F] text-[#AAAAAA] text-xs rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* Keyboard hints */}
            <div className="px-3 py-2 border-t border-[#2A2A2A] bg-[#151515]">
                <div className="flex items-center gap-4 text-xs text-[#6B6B6B]">
                    <span><kbd className="px-1.5 py-0.5 bg-[#252525] rounded">↑↓</kbd> Navigate</span>
                    <span><kbd className="px-1.5 py-0.5 bg-[#252525] rounded">Enter</kbd> Select</span>
                    <span><kbd className="px-1.5 py-0.5 bg-[#252525] rounded">Esc</kbd> Close</span>
                </div>
            </div>
        </div>
    );
}
