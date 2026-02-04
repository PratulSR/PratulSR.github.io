import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import projectsDataRaw from '@/data/projects.json';
import { ProjectsData } from '@/types/project';

const projectsData = projectsDataRaw as ProjectsData;

export const metadata: Metadata = {
    title: 'Projects | PRDb - Pratul Singh Raghava',
    description: 'Explore all projects by Pratul Singh Raghava. From AI-powered productivity apps to enterprise cloud platforms.',
};

export default function ProjectsPage() {
    const { projects, skills } = projectsData;

    return (
        <div className="container-prdb py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">All Projects</h1>
                <p className="text-[#AAAAAA]">
                    A complete filmography of technical work, side projects, and leadership initiatives.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="group card p-6"
                    >
                        <div className="flex gap-4">
                            {/* Poster */}
                            <div className="relative flex-shrink-0 w-24 h-36 bg-[#1F1F1F] rounded-lg overflow-hidden border border-[#2A2A2A] group-hover:border-[#F5C518]/50 transition-colors">
                                <Image
                                    src={project.poster}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-lg font-semibold text-white group-hover:text-[#F5C518] transition-colors truncate">
                                        {project.title}
                                    </h2>
                                    <span className="text-sm text-[#6B6B6B]">({project.year})</span>
                                </div>

                                <p className="text-sm text-[#AAAAAA] mb-2">{project.tagline}</p>

                                {/* Genres/Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {project.genre.map((g) => (
                                        <Badge key={g} variant="outline" size="sm">{g}</Badge>
                                    ))}
                                </div>

                                {/* Synopsis Preview */}
                                <p className="text-sm text-[#6B6B6B] line-clamp-2">
                                    {project.synopsis}
                                </p>

                                {/* Ratings */}
                                <div className="flex items-center gap-4 mt-3 text-xs text-[#AAAAAA]">
                                    <span>☕ {project.ratings.coffee}/5</span>
                                    <span>🎓 {project.ratings.complexity}</span>
                                    <span>👍 {project.ratings.wouldBuildAgain}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Skills Section */}
            <section>
                <SectionHeader
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    }
                >
                    Technical Skills
                </SectionHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Core Engineering */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-[#F5C518] mb-3">Core Engineering</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.core.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-[#121212] text-xs text-[#AAAAAA] rounded border border-[#2A2A2A]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Cloud */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-[#F5C518] mb-3">Cloud & Infrastructure</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.cloud.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-[#121212] text-xs text-[#AAAAAA] rounded border border-[#2A2A2A]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-[#F5C518] mb-3">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.languages.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-[#121212] text-xs text-[#AAAAAA] rounded border border-[#2A2A2A]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* AI */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-[#F5C518] mb-3">AI & ML</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.ai.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-[#121212] text-xs text-[#AAAAAA] rounded border border-[#2A2A2A]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Databases */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-[#F5C518] mb-3">Databases</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.databases.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-[#121212] text-xs text-[#AAAAAA] rounded border border-[#2A2A2A]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-[#F5C518] mb-3">Tools & Workflow</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.tools.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-[#121212] text-xs text-[#AAAAAA] rounded border border-[#2A2A2A]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
