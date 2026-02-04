import Link from 'next/link';
import Image from 'next/image';
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
                        Full journey →
                    </Link>
                }
            >
                Professional Journey
            </SectionHeader>

            <div className="space-y-4">
                {experienceData.experience.map((job) => (
                    <Link
                        key={job.id}
                        href={`/experience/${job.slug}`}
                        className="group block p-4 rounded-lg hover:bg-[#1A1A1A] transition-colors border-l-2 border-transparent hover:border-[#F5C518]"
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                            {/* Company Logo - No enclosing box */}
                            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14">
                                {job.logo ? (
                                    <Image
                                        src={job.logo}
                                        alt={`${job.company} logo`}
                                        width={56}
                                        height={56}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#1F1F1F] rounded-lg flex items-center justify-center border border-[#2A2A2A]">
                                        <span className="text-lg font-bold text-[#F5C518]">
                                            {job.company.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="text-base font-semibold text-white group-hover:text-[#F5C518] transition-colors">
                                        {job.role}
                                    </h3>
                                    {job.current && (
                                        <Badge variant="gold" size="sm">Current</Badge>
                                    )}
                                    <Badge variant="muted" size="sm">{job.type}</Badge>
                                </div>

                                <p className="text-sm text-[#AAAAAA] mb-1">
                                    {job.company}
                                    <span className="mx-2 text-[#3A3A3A]">·</span>
                                    <span className="text-[#6B6B6B]">{job.location}</span>
                                </p>

                                <p className="text-xs text-[#6B6B6B] font-mono mb-2">
                                    {job.startDate} – {job.endDate}
                                </p>

                                <p className="text-sm text-[#6B6B6B] mb-3 hidden md:block line-clamp-2">
                                    {job.description}
                                </p>

                                {/* Tech Stack - Show more */}
                                {job.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {job.techStack.slice(0, 6).map((tech, index) => {
                                            const techName = typeof tech === 'string' ? tech : tech.name;
                                            return (
                                                <span
                                                    key={`${techName}-${index}`}
                                                    className="px-2 py-0.5 bg-[#1F1F1F] text-[#AAAAAA] text-xs rounded border border-[#2A2A2A]"
                                                >
                                                    {techName}
                                                </span>
                                            );
                                        })}
                                        {job.techStack.length > 6 && (
                                            <span className="px-2 py-0.5 text-[#6B6B6B] text-xs">
                                                +{job.techStack.length - 6} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Click indicator */}
                                <p className="text-xs text-[#5799EF] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    View details →
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
