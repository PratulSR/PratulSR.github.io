import profileData from '@/data/profile.json';
import projectsData from '@/data/projects.json';

// Award links mapping
const awardLinks: { [key: string]: string } = {
    "Sydney International Student Award": "https://www.sydney.edu.au/study/fees-and-loans/scholarships/sydney-international-student-award.html",
    "Engineering Sydney Industry Placement Scholarship": "https://www.sydney.edu.au/engineering/study/scholarships/engineering-sydney-industry-placement-scholarship.html"
};

export default function Sidebar() {
    return (
        <aside className="space-y-6">
            {/* Personal Details */}
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-[#2A2A2A]">
                    Personal Details
                </h3>

                <dl className="space-y-3 text-sm">
                    <div>
                        <dt className="text-[#6B6B6B]">Based in</dt>
                        <dd className="text-[#AAAAAA]">{profileData.personalDetails.basedIn}</dd>
                    </div>
                    <div>
                        <dt className="text-[#6B6B6B]">Education</dt>
                        <dd className="text-[#AAAAAA]">
                            {profileData.personalDetails.degree}
                            <br />
                            <span className="text-[#F5C518]">{profileData.personalDetails.honours}</span>
                        </dd>
                    </div>
                    <div>
                        <dt className="text-[#6B6B6B]">Languages</dt>
                        <dd className="text-[#AAAAAA]">{profileData.personalDetails.languages.join(', ')}</dd>
                    </div>
                </dl>
            </div>

            {/* Contact Info */}
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-[#2A2A2A]">
                    Contact Info
                </h3>

                <ul className="space-y-3">
                    <li>
                        <a
                            href={`mailto:${profileData.social.email}`}
                            className="flex items-center gap-2 text-sm text-[#AAAAAA] hover:text-[#F5C518] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                        </a>
                    </li>
                    <li>
                        <a
                            href={profileData.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#AAAAAA] hover:text-[#F5C518] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            href={profileData.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#AAAAAA] hover:text-[#F5C518] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>

            {/* Awards */}
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-[#2A2A2A]">
                    Awards & Recognition
                </h3>

                <ul className="space-y-2">
                    {profileData.awards.map((award, index) => {
                        const link = awardLinks[award];
                        return (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-[#F5C518]">🏆</span>
                                {link ? (
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#AAAAAA] hover:text-[#F5C518] transition-colors underline decoration-dotted underline-offset-2"
                                    >
                                        {award}
                                    </a>
                                ) : (
                                    <span className="text-[#AAAAAA]">{award}</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Skills Stats */}
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-[#2A2A2A]">
                    Quick Stats
                </h3>

                <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-[#121212] rounded">
                        <div className="text-2xl font-bold text-[#F5C518]">
                            {projectsData.projects.length}
                        </div>
                        <div className="text-xs text-[#6B6B6B]">Projects</div>
                    </div>
                    <div className="p-3 bg-[#121212] rounded">
                        <div className="text-2xl font-bold text-[#F5C518]">
                            {projectsData.skills.cloud.length}
                        </div>
                        <div className="text-xs text-[#6B6B6B]">Cloud Skills</div>
                    </div>
                    <div className="p-3 bg-[#121212] rounded">
                        <div className="text-2xl font-bold text-[#F5C518]">
                            335+
                        </div>
                        <div className="text-xs text-[#6B6B6B]">Students Taught</div>
                    </div>
                    <div className="p-3 bg-[#121212] rounded">
                        <div className="text-2xl font-bold text-[#F5C518]">
                            1,800+
                        </div>
                        <div className="text-xs text-[#6B6B6B]">Club Members Led</div>
                    </div>
                </div>
            </div>

            {/* Did You Know */}
            <div className="p-4 bg-gradient-to-br from-[#F5C518]/10 to-[#1A1A1A] rounded-lg border border-[#F5C518]/20">
                <h3 className="text-sm font-semibold text-[#F5C518] mb-2">
                    💡 Did You Know?
                </h3>
                <p className="text-sm text-[#AAAAAA] leading-relaxed">
                    I can name every country in the world in under 10 minutes.
                    Challenge me if you dare!
                </p>
            </div>
        </aside>
    );
}
