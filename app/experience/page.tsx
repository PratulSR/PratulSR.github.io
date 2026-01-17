import { Metadata } from 'next';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import experienceData from '@/data/experience.json';

export const metadata: Metadata = {
    title: 'Experience | PRDb - Pratul Singh Raghava',
    description: 'Full work history and filmography of Pratul Singh Raghava. Software Engineer, Founding Engineer, and Technical Leader.',
};

export default function ExperiencePage() {
    const { experience, education } = experienceData;

    return (
        <div className="container-prdb py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Full Filmography</h1>
                <p className="text-[#AAAAAA]">
                    A complete timeline of roles, projects, and professional experience.
                </p>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-[#2A2A2A]" />

                {/* Experience Items */}
                <div className="space-y-8">
                    {experience.map((job, index) => (
                        <div key={job.id} className="relative pl-12 md:pl-20">
                            {/* Timeline Dot */}
                            <div className={`absolute left-2 md:left-6 w-4 h-4 rounded-full border-2 ${job.current
                                    ? 'bg-[#F5C518] border-[#F5C518]'
                                    : 'bg-[#121212] border-[#2A2A2A]'
                                }`} />

                            {/* Card */}
                            <div className="p-6 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h2 className="text-xl font-semibold text-white">
                                                {job.role}
                                            </h2>
                                            {job.current && (
                                                <Badge variant="gold" size="sm">Current</Badge>
                                            )}
                                        </div>
                                        <p className="text-[#AAAAAA]">
                                            {job.company}
                                            <span className="mx-2 text-[#3A3A3A]">·</span>
                                            <span className="text-[#6B6B6B]">{job.location}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" size="sm">{job.type}</Badge>
                                        <span className="text-sm text-[#6B6B6B] font-mono">
                                            {job.startDate} – {job.endDate}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-[#6B6B6B] mb-4">
                                    {job.description}
                                </p>

                                {/* Highlights */}
                                <ul className="space-y-2 mb-4">
                                    {job.highlights.map((highlight, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[#AAAAAA]">
                                            <span className="text-[#F5C518] mt-0.5">▸</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack */}
                                {job.techStack.length > 0 && (
                                    <div className="pt-4 border-t border-[#2A2A2A]">
                                        <div className="flex flex-wrap gap-2">
                                            {job.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 bg-[#121212] text-xs text-[#AAAAAA] rounded border border-[#2A2A2A]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education Section */}
            <section className="mt-16">
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
