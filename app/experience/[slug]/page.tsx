import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import experienceData from '@/data/experience.json';

// Type for experience entries
interface TechStackItem {
    name: string;
    role: string;
}

interface Metric {
    label: string;
    value: string;
}

interface CaseStudy {
    challenge: string;
    solution: string;
    impact: string;
}

interface Testimonial {
    quote: string;
    author: string;
}

interface Ratings {
    complexity: string;
    coffee: number;
    documentation: number;
    wouldBuildAgain: string;
    duration: string;
}

interface BaseExperience {
    id: string;
    slug: string;
    company: string;
    logo: string;
    type: string;
    startDate: string;
    endDate: string;
    current: boolean;
    location: string;
    description: string;
    synopsis: string;
    tagline?: string;
    genre?: string[];
    highlights: string[];
    techStack: TechStackItem[] | string[];
    ratings?: Ratings;
    metrics?: Metric[];
    caseStudy?: CaseStudy;
    testimonials?: Testimonial[];
    links?: Record<string, string | null>;
    screenshots?: string[];
}

interface SingleRoleExperience extends BaseExperience {
    role: string;
}

interface MultiRoleExperience extends BaseExperience {
    roles: Array<{
        title: string;
        startDate: string;
        endDate: string;
    }>;
}

type Experience = SingleRoleExperience | MultiRoleExperience;

// Combine all experience types for lookup
const allExperiences: Experience[] = [
    ...experienceData.experience as SingleRoleExperience[],
    ...experienceData.leadership as MultiRoleExperience[],
    ...experienceData.variousRoles as SingleRoleExperience[],
];

export async function generateStaticParams() {
    return allExperiences.map((exp) => ({
        slug: exp.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const exp = allExperiences.find((e) => e.slug === slug);

    if (!exp) {
        return {
            title: 'Experience Not Found | PRDb',
        };
    }

    const title = 'role' in exp ? exp.role : exp.roles[0]?.title;

    return {
        title: `${title} at ${exp.company} | PRDb`,
        description: exp.synopsis || exp.description,
    };
}

// Complexity color mapping
const complexityConfig: Record<string, { color: string }> = {
    'Entry': { color: 'text-green-400' },
    'Mid': { color: 'text-yellow-400' },
    'Senior': { color: 'text-orange-400' },
    'Principal': { color: 'text-red-400' },
};

export default async function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const exp = allExperiences.find((e) => e.slug === slug);

    if (!exp) {
        notFound();
    }

    // Check if this is a leadership role with multiple titles
    const hasMultipleRoles = 'roles' in exp;
    const roles = hasMultipleRoles ? exp.roles : null;
    const primaryRole = hasMultipleRoles ? exp.roles[0]?.title : (exp as SingleRoleExperience).role;

    // Check for rich content
    const hasRatings = exp.ratings && Object.keys(exp.ratings).length > 0;
    const hasMetrics = exp.metrics && exp.metrics.length > 0;
    const hasCaseStudy = exp.caseStudy && exp.caseStudy.challenge;
    const hasTestimonials = exp.testimonials && exp.testimonials.length > 0;
    const hasTechStackObjects = exp.techStack.length > 0 && typeof exp.techStack[0] === 'object';

    const complexity = exp.ratings?.complexity ? complexityConfig[exp.ratings.complexity] || complexityConfig['Mid'] : null;

    return (
        <div className="container-prdb py-8">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
                <ol className="flex items-center gap-2 text-[#6B6B6B]">
                    <li><Link href="/" className="hover:text-[#F5C518] transition-colors">PRDb</Link></li>
                    <li>›</li>
                    <li><Link href="/experience" className="hover:text-[#F5C518] transition-colors">Experience</Link></li>
                    <li>›</li>
                    <li className="text-[#AAAAAA]">{exp.company}</li>
                </ol>
            </nav>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <div className="relative w-48 h-48 md:w-48 md:h-48 bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A] flex items-center justify-center p-6">
                        {exp.logo ? (
                            <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={150}
                                height={150}
                                className="object-contain"
                                priority
                            />
                        ) : (
                            <span className="text-6xl font-bold text-[#F5C518]">
                                {exp.company.charAt(0)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {primaryRole}
                        </h1>
                    </div>

                    {/* Tagline */}
                    {exp.tagline && (
                        <p className="text-lg text-[#F5C518] font-medium mb-4">
                            {exp.tagline}
                        </p>
                    )}

                    <p className="text-xl text-[#AAAAAA] mb-2">
                        {exp.company}
                        <span className="mx-3 text-[#3A3A3A]">·</span>
                        <span className="text-[#6B6B6B]">{exp.location}</span>
                    </p>

                    <p className="text-[#6B6B6B] font-mono mb-4">
                        {exp.startDate} – {exp.endDate}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" size="md">{exp.type}</Badge>
                        {exp.current && <Badge variant="gold" size="md">Current</Badge>}
                        {exp.genre?.map((g) => (
                            <Badge key={g} variant="muted" size="sm">{g}</Badge>
                        ))}
                    </div>

                    {/* Multiple Roles */}
                    {hasMultipleRoles && roles && (
                        <div className="mb-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                            <h3 className="text-sm font-semibold text-white mb-3">Roles Held</h3>
                            <div className="space-y-2">
                                {roles.map((role, i: number) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <span className="text-white font-medium">{role.title}</span>
                                        <span className="text-[#6B6B6B] font-mono">{role.startDate} – {role.endDate}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Ratings Grid */}
                    {hasRatings && exp.ratings && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                            <div className="text-center">
                                <div className="text-2xl mb-1">
                                    {'☕'.repeat(exp.ratings.coffee)}
                                </div>
                                <div className="text-xs text-[#6B6B6B]">Coffee Required</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-lg mb-1 ${complexity?.color || 'text-white'}`}>
                                    {exp.ratings.complexity}
                                </div>
                                <div className="text-xs text-[#6B6B6B]">Complexity</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-1">
                                    {'⭐'.repeat(exp.ratings.documentation)}
                                </div>
                                <div className="text-xs text-[#6B6B6B]">Documentation</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg mb-1">
                                    {exp.ratings.wouldBuildAgain === 'Absolutely' && '👍👍'}
                                    {exp.ratings.wouldBuildAgain === 'Yes' && '👍'}
                                    {exp.ratings.wouldBuildAgain === 'Maybe' && '🤔'}
                                </div>
                                <div className="text-xs text-[#6B6B6B]">Would Do Again</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Synopsis */}
                    <section>
                        <SectionHeader
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                        >
                            Synopsis
                        </SectionHeader>
                        <p className="text-[#AAAAAA] leading-relaxed">
                            {exp.synopsis || exp.description}
                        </p>
                    </section>

                    {/* Case Study - The Making Of */}
                    {hasCaseStudy && exp.caseStudy && (
                        <section>
                            <SectionHeader
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                }
                            >
                                The Making Of
                            </SectionHeader>

                            <div className="space-y-6">
                                {/* Challenge */}
                                <div className="p-4 bg-[#1A1A1A] rounded-lg border-l-4 border-red-500/50">
                                    <h4 className="text-sm font-semibold text-red-400 mb-2">🎯 The Challenge</h4>
                                    <p className="text-sm text-[#AAAAAA] leading-relaxed">
                                        {exp.caseStudy.challenge}
                                    </p>
                                </div>

                                {/* Solution */}
                                <div className="p-4 bg-[#1A1A1A] rounded-lg border-l-4 border-blue-500/50">
                                    <h4 className="text-sm font-semibold text-blue-400 mb-2">💡 The Solution</h4>
                                    <p className="text-sm text-[#AAAAAA] leading-relaxed">
                                        {exp.caseStudy.solution}
                                    </p>
                                </div>

                                {/* Impact */}
                                <div className="p-4 bg-[#1A1A1A] rounded-lg border-l-4 border-green-500/50">
                                    <h4 className="text-sm font-semibold text-green-400 mb-2">🚀 The Impact</h4>
                                    <p className="text-sm text-[#AAAAAA] leading-relaxed">
                                        {exp.caseStudy.impact}
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Key Contributions */}
                    <section>
                        <SectionHeader
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        >
                            Key Contributions
                        </SectionHeader>

                        <ul className="space-y-3">
                            {exp.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-3 p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                                    <span className="text-[#F5C518] mt-0.5 font-bold">{i + 1}</span>
                                    <span className="text-[#AAAAAA]">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Metrics */}
                    {hasMetrics && exp.metrics && (
                        <section>
                            <SectionHeader
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                }
                            >
                                Key Metrics
                            </SectionHeader>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {exp.metrics.map((metric, index) => (
                                    <div key={index} className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] text-center">
                                        <div className="text-2xl font-bold text-[#F5C518] mb-1">
                                            {metric.value}
                                        </div>
                                        <div className="text-xs text-[#6B6B6B]">
                                            {metric.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Testimonials */}
                    {hasTestimonials && exp.testimonials && (
                        <section>
                            <SectionHeader
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                }
                            >
                                Student Reviews
                            </SectionHeader>

                            <div className="space-y-4">
                                {exp.testimonials.map((testimonial, index) => (
                                    <div key={index} className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                                        <div className="flex gap-3">
                                            <div className="text-2xl text-[#F5C518]">"</div>
                                            <div>
                                                <p className="text-[#AAAAAA] italic leading-relaxed mb-2">
                                                    {testimonial.quote}
                                                </p>
                                                <p className="text-sm text-[#6B6B6B]">
                                                    — {testimonial.author}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Tech Stack */}
                    {exp.techStack && exp.techStack.length > 0 && (
                        <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                            <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-[#2A2A2A]">
                                Skills & Technologies
                            </h3>
                            {hasTechStackObjects ? (
                                <ul className="space-y-3">
                                    {(exp.techStack as TechStackItem[]).map((tech, index) => (
                                        <li key={index} className="flex justify-between text-sm">
                                            <span className="text-white font-medium">{tech.name}</span>
                                            <span className="text-[#6B6B6B]">{tech.role}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {(exp.techStack as string[]).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 bg-[#121212] text-sm text-[#AAAAAA] rounded border border-[#2A2A2A]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quick Info */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-[#2A2A2A]">
                            Quick Info
                        </h3>
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-[#6B6B6B]">Company</dt>
                                <dd className="text-[#AAAAAA]">{exp.company}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#6B6B6B]">Location</dt>
                                <dd className="text-[#AAAAAA]">{exp.location}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#6B6B6B]">Type</dt>
                                <dd className="text-[#AAAAAA]">{exp.type}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#6B6B6B]">Duration</dt>
                                <dd className="text-[#AAAAAA]">{exp.ratings?.duration || `${exp.startDate} – ${exp.endDate}`}</dd>
                            </div>
                            {exp.ratings?.complexity && (
                                <div className="flex justify-between">
                                    <dt className="text-[#6B6B6B]">Complexity</dt>
                                    <dd className="text-[#AAAAAA]">{exp.ratings.complexity}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* Back Link */}
                    <Link
                        href="/experience"
                        className="block p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] text-center text-sm text-[#AAAAAA] hover:text-[#F5C518] hover:border-[#F5C518]/50 transition-colors"
                    >
                        ← Back to All Experience
                    </Link>
                </div>
            </div>
        </div>
    );
}
