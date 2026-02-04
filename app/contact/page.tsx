import { Metadata } from 'next';
import profileData from '@/data/profile.json';

export const metadata: Metadata = {
    title: 'Contact | PRDb - Pratul Singh Raghava',
    description: 'Get in touch with Pratul Singh Raghava. Open to opportunities, collaborations, and interesting conversations.',
};

export default function ContactPage() {
    return (
        <div className="container-prdb py-8">
            {/* Page Header */}
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h1 className="text-3xl font-bold text-white mb-4">Get In Touch</h1>
                <p className="text-[#AAAAAA]">
                    Open to opportunities, collaborations, and interesting conversations about
                    cloud architecture, AI systems, or why the A350 is the best aircraft ever built.
                </p>
            </div>

            {/* Contact Cards */}
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Email */}
                <a
                    href={`mailto:${profileData.social.email}`}
                    className="group p-6 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] hover:border-[#F5C518]/50 transition-all text-center"
                >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F5C518]/10 flex items-center justify-center group-hover:bg-[#F5C518]/20 transition-colors">
                        <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-[#F5C518] transition-colors">
                        Email
                    </h2>
                    <p className="text-sm text-[#AAAAAA]">{profileData.social.email}</p>
                </a>

                {/* LinkedIn */}
                <a
                    href={profileData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] hover:border-[#F5C518]/50 transition-all text-center"
                >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#0A66C2]/10 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                        <svg className="w-6 h-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-[#F5C518] transition-colors">
                        LinkedIn
                    </h2>
                    <p className="text-sm text-[#AAAAAA]">Connect professionally</p>
                </a>

                {/* GitHub */}
                <a
                    href={profileData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] hover:border-[#F5C518]/50 transition-all text-center"
                >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-[#F5C518] transition-colors">
                        GitHub
                    </h2>
                    <p className="text-sm text-[#AAAAAA]">Check out my code</p>
                </a>
            </div>

            {/* Availability Card */}
            <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-[#F5C518]/10 via-[#1A1A1A] to-[#F5C518]/10 rounded-lg border border-[#F5C518]/20">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 font-semibold">{profileData.status}</span>
                </div>
                <p className="text-center text-[#AAAAAA] text-sm">
                    Currently looking for roles in <span className="text-white">Cloud Architecture</span>,
                    <span className="text-white"> AI/ML Engineering</span>, or
                    <span className="text-white"> Full-Stack Development</span>.
                    <br />
                    Based in Sydney, open to remote opportunities worldwide.
                </p>
            </div>
        </div>
    );
}
