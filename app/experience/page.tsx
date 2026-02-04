import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import experienceData from '@/data/experience.json';

export const metadata: Metadata = {
    title: 'Professional Journey | PRDb - Pratul Singh Raghava',
    description: 'Full work history and professional journey of Pratul Singh Raghava. Software Engineer, Founding Engineer, and Technical Leader.',
};

// Helper component for experience cards
function ExperienceCard({ job, showLogo = true }: { job: any; showLogo?: boolean }) {
    const hasSlug = !!job.slug;

    const cardContent = (
        <div className="p-6 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors h-full">
            {/* Header with Logo */}
            <div className="flex items-start gap-4 mb-4">
                {showLogo && job.logo && (
                    <div className="flex-shrink-0 w-12 h-12">
                        <Image
                            src={job.logo}
                            alt={`${job.company} logo`}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-lg font-semibold text-white group-hover:text-[#F5C518] transition-colors">
                            {job.role || (job.roles && job.roles[0]?.title)}
                        </h2>
                        {job.current && (
                            <Badge variant="gold" size="sm">Current</Badge>
                        )}
                    </div>
                    <p className="text-sm text-[#AAAAAA]">
                        {job.company}
                        <span className="mx-2 text-[#3A3A3A]">·</span>
                        <span className="text-[#6B6B6B]">{job.location}</span>
                    </p>
                </div>
            </div>

            {/* Date and Type */}
            <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" size="sm">{job.type}</Badge>
                <span className="text-xs text-[#6B6B6B] font-mono">
                    {job.startDate} – {job.endDate}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#6B6B6B] mb-3">
                {job.description}
            </p>

            {/* Highlights (show first 2) */}
            <ul className="space-y-1.5 mb-3">
                {job.highlights.slice(0, 2).map((highlight: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#AAAAAA]">
                        <span className="text-[#F5C518] mt-0.5">▸</span>
                        <span className="line-clamp-1">{highlight}</span>
                    </li>
                ))}
            </ul>

            {/* Tech Stack */}
            {job.techStack && job.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#2A2A2A]">
                    {job.techStack.slice(0, 4).map((tech: any, index: number) => {
                        const techName = typeof tech === 'string' ? tech : tech.name;
                        return (
                            <span
                                key={`${techName}-${index}`}
                                className="px-2 py-0.5 bg-[#121212] text-xs text-[#AAAAAA] rounded border border-[#2A2A2A]"
                            >
                                {techName}
                            </span>
                        );
                    })}
                    {job.techStack.length > 4 && (
                        <span className="px-2 py-0.5 text-[#6B6B6B] text-xs">
                            +{job.techStack.length - 4}
                        </span>
                    )}
                </div>
            )}

            {hasSlug && (
                <div className="mt-3 text-xs text-[#5799EF]">
                    View details →
                </div>
            )}
        </div>
    );

    if (hasSlug) {
        return (
            <Link href={`/experience/${job.slug}`} className="group block">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}

export default function ExperiencePage() {
    const { experience, leadership, variousRoles, education } = experienceData;

    return (
        <div className="container-prdb py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Professional Journey</h1>
                <p className="text-[#AAAAAA]">
                    A complete timeline of roles, projects, and professional experience.
                </p>
            </div>

            {/* Professional Experience Section */}
            <section className="mb-12">
                <SectionHeader
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    }
                >
                    Professional Experience
                </SectionHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {experience.map((job) => (
                        <ExperienceCard key={job.id} job={job} />
                    ))}
                </div>
            </section>

            {/* Leadership & Community Section */}
            <section className="mb-12">
                <SectionHeader
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                >
                    Leadership & Community
                </SectionHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {leadership.map((job) => (
                        <ExperienceCard key={job.id} job={job} />
                    ))}
                </div>
            </section>

            {/* Various Roles Section */}
            <section className="mb-12">
                <SectionHeader
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    }
                >
                    Various Roles
                </SectionHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {variousRoles.map((job) => (
                        <ExperienceCard key={job.id} job={job} />
                    ))}
                </div>
            </section>

            {/* Education Section */}
            <section>
                <SectionHeader
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    }
                >
                    Education
                </SectionHeader>

                <div className="grid grid-cols-1 gap-6">
                    {education.map((edu, index) => (
                        <div key={index} className="p-6 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-[#AAAAAA]">
                                        {edu.institution}
                                        <span className="mx-2 text-[#3A3A3A]">·</span>
                                        <span className="text-[#6B6B6B]">{edu.field}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Badge variant="gold" size="sm">{edu.honours}</Badge>
                                    <p className="text-sm text-[#6B6B6B] mt-1">
                                        {edu.startDate} – {edu.endDate}
                                    </p>
                                </div>
                            </div>

                            {/* WAM */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-[#121212] rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#F5C518]">{edu.honoursWam}</div>
                                    <div className="text-xs text-[#6B6B6B]">Honours WAM</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{edu.wam}</div>
                                    <div className="text-xs text-[#6B6B6B]">Overall WAM</div>
                                </div>
                            </div>

                            {/* Key Courses */}
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-[#AAAAAA] mb-2">Key Courses</h4>
                                <ul className="space-y-1">
                                    {edu.highlights.map((course, i) => (
                                        <li key={i} className="text-sm text-[#6B6B6B]">
                                            {course}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Awards */}
                            <div>
                                <h4 className="text-sm font-semibold text-[#AAAAAA] mb-2">Awards</h4>
                                <div className="flex flex-wrap gap-2">
                                    {edu.awards.map((award, i) => (
                                        <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-[#F5C518]/10 text-[#F5C518] text-xs rounded border border-[#F5C518]/20">
                                            🏆 {award}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
