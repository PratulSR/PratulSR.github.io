import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import experienceData from '@/data/experience.json';

export default function Filmography() {
    return (
        <section>
            <SectionHeader
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                }
                action={
                    <Link href="/experience" className="text-sm text-[#5799EF] hover:text-[#7DB3FF] transition-colors">
                        Full filmography →
                    </Link>
                }
            >
                Filmography
            </SectionHeader>

            <div className="space-y-4">
                {experienceData.experience.map((job, index) => (
                    <div
                        key={job.id}
                        className="group p-4 rounded-lg hover:bg-[#1A1A1A] transition-colors border-l-2 border-transparent hover:border-[#F5C518]"
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                            {/* Date Range */}
                            <div className="flex-shrink-0 md:w-36">
                                <span className="text-sm text-[#6B6B6B] font-mono">
                                    {job.startDate} – {job.endDate}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="text-base font-semibold text-white group-hover:text-[#F5C518] transition-colors">
                                        {job.role}
                                    </h3>
                                    {job.current && (
                                        <Badge variant="gold" size="sm">Current</Badge>
                                    )}
                                    <Badge variant="muted" size="sm">{job.type}</Badge>
                                </div>

                                <p className="text-sm text-[#AAAAAA] mb-2">
                                    {job.company}
                                    <span className="mx-2 text-[#3A3A3A]">·</span>
                                    <span className="text-[#6B6B6B]">{job.location}</span>
                                </p>

                                <p className="text-sm text-[#6B6B6B] mb-3">
                                    {job.description}
                                </p>

                                {/* Highlights */}
                                <ul className="space-y-1.5">
                                    {job.highlights.slice(0, 2).map((highlight, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[#AAAAAA]">
                                            <span className="text-[#F5C518] mt-1.5">•</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack */}
                                {job.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {job.techStack.slice(0, 5).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 bg-[#1F1F1F] text-[#AAAAAA] text-xs rounded border border-[#2A2A2A]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
