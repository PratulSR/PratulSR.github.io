'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
            <div className="container-prdb">
                <ul className="flex items-center gap-1 overflow-x-auto py-1 -mx-2 px-2 scrollbar-hide">
                    {navItems.map((item) => {
                        const isActive =
                            item.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(item.href);

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                    inline-flex items-center px-4 py-2 text-sm font-medium rounded
                    transition-colors whitespace-nowrap
                    ${isActive
                                            ? 'bg-[#F5C518]/10 text-[#F5C518]'
                                            : 'text-[#AAAAAA] hover:text-white hover:bg-[#252525]'
                                        }
                  `}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
