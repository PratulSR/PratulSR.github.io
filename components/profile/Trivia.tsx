import SectionHeader from '@/components/ui/SectionHeader';
import profileData from '@/data/profile.json';

export default function Trivia() {
    return (
        <section>
            <SectionHeader
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            >
                Trivia
            </SectionHeader>

            <ul className="space-y-3">
                {profileData.trivia.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors group"
                    >
                        <span className="flex-shrink-0 text-xl group-hover:scale-110 transition-transform">
                            {item.icon}
                        </span>
                        <div>
                            <p className="text-sm text-[#AAAAAA] group-hover:text-white transition-colors">
                                {item.fact}
                            </p>
                            <span className="text-xs text-[#6B6B6B]">
                                {item.category}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
