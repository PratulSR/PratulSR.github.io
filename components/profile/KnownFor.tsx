import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import projectsData from '@/data/projects.json';

export default function KnownFor() {
    const featuredProjects = projectsData.projects.filter(p => p.featured);

    return (
        <section>
            <SectionHeader
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                }
                action={
                    <Link href="/projects" className="text-sm text-[#5799EF] hover:text-[#7DB3FF] transition-colors">
                        See all projects →
                    </Link>
                }
            >
                Known For
            </SectionHeader>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {featuredProjects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="group flex-shrink-0 w-40"
                    >
                        {/* Poster */}
                        <div className="relative aspect-[2/3] bg-[#1F1F1F] rounded-lg overflow-hidden border border-[#2A2A2A] group-hover:border-[#F5C518]/50 transition-all mb-2">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                            {/* Project icon/placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl">
                                    {project.genre[0] === 'AI/ML' && '🤖'}
                                    {project.genre[0] === 'Cloud' && '☁️'}
                                    {project.genre[0] === 'Full-Stack' && '🔧'}
                                    {project.genre[0] === 'Leadership' && '👥'}
                                    {project.genre[0] === 'Serverless' && '⚡'}
                                </span>
                            </div>

                            {/* Year badge */}
                            <div className="absolute top-2 right-2 z-20">
                                <span className="px-2 py-0.5 bg-[#F5C518] text-black text-xs font-bold rounded">
                                    {project.year}
                                </span>
                            </div>

                            {/* Complexity badge */}
                            <div className="absolute bottom-2 left-2 right-2 z-20">
                                <p className="text-xs text-[#AAAAAA] truncate">
                                    {project.ratings.complexity} Level
                                </p>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-medium text-white group-hover:text-[#F5C518] transition-colors line-clamp-2">
                            {project.title}
                        </h3>
                        <p className="text-xs text-[#6B6B6B] mt-0.5 line-clamp-1">
                            {project.tagline}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
