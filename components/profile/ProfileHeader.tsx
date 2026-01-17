import Image from 'next/image';
import StarRating from '@/components/ui/StarRating';
import profileData from '@/data/profile.json';

export default function ProfileHeader() {
    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Photo */}
            <div className="flex-shrink-0">
                <div className="relative w-32 h-40 md:w-48 md:h-60 bg-[#1F1F1F] rounded-lg overflow-hidden border border-[#2A2A2A]">
                    {/* Placeholder - replace with actual image when available */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-2 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                                <span className="text-3xl md:text-5xl font-bold text-[#F5C518]">
                                    {profileData.name.charAt(0)}
                                </span>
                            </div>
                            <p className="text-xs text-[#6B6B6B]">Add headshot</p>
                        </div>
                    </div>
                    {
                        <Image
                            src={profileData.photo}
                            alt={profileData.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    }
                </div>
            </div>

            {/* Info */}
            <div className="flex-1">
                {/* Name */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {profileData.name}
                </h1>

                {/* Title & Location */}
                <p className="text-lg text-[#AAAAAA] mb-3">
                    {profileData.title}
                    <span className="mx-2 text-[#3A3A3A]">·</span>
                    {profileData.location}
                </p>

                {/* Tagline */}
                <p className="text-[#F5C518] font-medium mb-4">
                    {profileData.tagline}
                </p>

                {/* Rating */}
                <div className="mb-4">
                    <StarRating
                        score={profileData.rating.score}
                        count={profileData.rating.count}
                        source={profileData.rating.source}
                        size="lg"
                    />
                </div>

                {/* Status Badge */}
                <div className="status-available">
                    {profileData.status}
                </div>

                {/* Quick Bio */}
                <p className="mt-4 text-sm text-[#AAAAAA] leading-relaxed max-w-2xl">
                    {profileData.bio.short}
                </p>
            </div>
        </div>
    );
}
