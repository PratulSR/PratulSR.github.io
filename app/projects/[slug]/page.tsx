import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import projectsDataRaw from '@/data/projects.json';
import { ProjectsData, Project } from '@/types/project';

const projectsData = projectsDataRaw as ProjectsData;

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all projects
export async function generateStaticParams() {
    return projectsData.projects.map((project) => ({
        slug: project.slug,
    }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projectsData.projects.find((p) => p.slug === slug);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return {
        title: `${project.title} (${project.year}) | PRDb`,
        description: project.synopsis,
    };
}

// Complexity icon/label mapping
const complexityConfig: Record<string, { icon: string; color: string }> = {
    'Intern': { icon: '🎓', color: 'text-green-400' },
    'Junior': { icon: '🎓🎓', color: 'text-blue-400' },
    'Mid': { icon: '🎓🎓🎓', color: 'text-yellow-400' },
    'Senior': { icon: '🎓🎓🎓🎓', color: 'text-orange-400' },
    'Principal': { icon: '🎓🎓🎓🎓🎓', color: 'text-red-400' },
};

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = projectsData.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const complexity = complexityConfig[project.ratings.complexity] || complexityConfig['Mid'];

    return (
        <div className="container-prdb py-8">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
                <ol className="flex items-center gap-2 text-[#6B6B6B]">
                    <li><Link href="/" className="hover:text-[#F5C518] transition-colors">PRDb</Link></li>
                    <li>›</li>
                    <li><Link href="/projects" className="hover:text-[#F5C518] transition-colors">Projects</Link></li>
                    <li>›</li>
                    <li className="text-[#AAAAAA]">{project.title}</li>
                </ol>
            </nav>

            {/* Project Header */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10">
                {/* Poster */}
                <div className="flex-shrink-0">
                    <div className="w-48 h-72 bg-[#1F1F1F] rounded-lg flex items-center justify-center border border-[#2A2A2A]">
                        <span className="text-6xl">
                            {project.genre[0] === 'AI/ML' && '🤖'}
                            {project.genre[0] === 'Cloud' && '☁️'}
                            {project.genre[0] === 'Full-Stack' && '🔧'}
                            {project.genre[0] === 'Leadership' && '👥'}
                            {project.genre[0] === 'Serverless' && '⚡'}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {project.title}
                        </h1>
                        <span className="text-2xl text-[#6B6B6B]">({project.year})</span>
                    </div>

                    <p className="text-lg text-[#F5C518] font-medium mb-4">
                        {project.tagline}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.genre.map((g) => (
                            <Badge key={g} variant="outline" size="md">{g}</Badge>
                        ))}
                    </div>

                    {/* Ratings Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] mb-4">
                        <div className="text-center">
                            <div className="text-2xl mb-1">
                                {'☕'.repeat(project.ratings.coffee)}
                            </div>
                            <div className="text-xs text-[#6B6B6B]">Coffee Required</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-lg mb-1 ${complexity.color}`}>
                                {project.ratings.complexity}
                            </div>
                            <div className="text-xs text-[#6B6B6B]">Complexity</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-1">
                                {'⭐'.repeat(project.ratings.documentation)}
                            </div>
                            <div className="text-xs text-[#6B6B6B]">Documentation</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg mb-1">
                                {project.ratings.wouldBuildAgain === 'Absolutely' && '👍👍'}
                                {project.ratings.wouldBuildAgain === 'Yes' && '👍'}
                                {project.ratings.wouldBuildAgain === 'Maybe' && '🤔'}
                            </div>
                            <div className="text-xs text-[#6B6B6B]">Would Build Again</div>
                        </div>
                    </div>

                    {/* Duration */}
                    <p className="text-sm text-[#AAAAAA]">
                        <span className="text-[#6B6B6B]">Duration:</span> {project.ratings.duration}
                    </p>

                    {/* Action Buttons */}
                    {(project.links.live || project.links.github) && (
                        <div className="flex gap-3 mt-4">
                            {project.links.live && (
                                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn-gold">
                                    View Live →
                                </a>
                            )}
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                    View Code
                                </a>
                            )}
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
                            {project.synopsis}
                        </p>
                    </section>

                    {/* Case Study */}
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
                                    {project.caseStudy.challenge}
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="p-4 bg-[#1A1A1A] rounded-lg border-l-4 border-blue-500/50">
                                <h4 className="text-sm font-semibold text-blue-400 mb-2">💡 The Solution</h4>
                                <p className="text-sm text-[#AAAAAA] leading-relaxed">
                                    {project.caseStudy.solution}
                                </p>
                            </div>

                            {/* Impact */}
                            <div className="p-4 bg-[#1A1A1A] rounded-lg border-l-4 border-green-500/50">
                                <h4 className="text-sm font-semibold text-green-400 mb-2">🚀 The Impact</h4>
                                <p className="text-sm text-[#AAAAAA] leading-relaxed">
                                    {project.caseStudy.impact}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Metrics */}
                    {project.metrics.length > 0 && (
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
                                {project.metrics.map((metric, index) => (
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
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Tech Stack */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-[#2A2A2A]">
                            Tech Stack (Cast & Crew)
                        </h3>
                        <ul className="space-y-3">
                            {project.techStack.map((tech, index) => (
                                <li key={index} className="flex justify-between text-sm">
                                    <span className="text-white font-medium">{tech.name}</span>
                                    <span className="text-[#6B6B6B]">{tech.role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Info */}
                    <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                        <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-[#2A2A2A]">
                            Quick Info
                        </h3>
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-[#6B6B6B]">Year</dt>
                                <dd className="text-[#AAAAAA]">{project.year}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#6B6B6B]">Duration</dt>
                                <dd className="text-[#AAAAAA]">{project.ratings.duration}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#6B6B6B]">Complexity</dt>
                                <dd className="text-[#AAAAAA]">{project.ratings.complexity}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#6B6B6B]">Featured</dt>
                                <dd className="text-[#AAAAAA]">{project.featured ? 'Yes' : 'No'}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Back to Projects */}
                    <Link
                        href="/projects"
                        className="block p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] text-center text-sm text-[#AAAAAA] hover:text-[#F5C518] hover:border-[#F5C518]/50 transition-colors"
                    >
                        ← Back to All Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}
