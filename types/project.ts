// Type definitions for project data

export interface TechStack {
    name: string;
    role: string;
}

export interface Ratings {
    complexity: 'Intern' | 'Junior' | 'Mid' | 'Senior' | 'Principal';
    coffee: number;
    documentation: number;
    wouldBuildAgain: 'Absolutely' | 'Yes' | 'Maybe' | 'No';
    duration: string;
}

export interface Metric {
    label: string;
    value: string;
}

export interface CaseStudy {
    challenge: string;
    solution: string;
    impact: string;
}

export interface ProjectLinks {
    live?: string | null;
    github?: string | null;
    appStore?: string | null;
    website?: string | null;
}

export interface Project {
    slug: string;
    title: string;
    tagline: string;
    year: number;
    featured: boolean;
    poster: string;
    synopsis: string;
    genre: string[];
    techStack: TechStack[];
    ratings: Ratings;
    metrics: Metric[];
    caseStudy: CaseStudy;
    links: ProjectLinks;
    screenshots: string[];
}

export interface Skills {
    core: string[];
    cloud: string[];
    databases: string[];
    languages: string[];
    tools: string[];
    ai: string[];
}

export interface ProjectsData {
    projects: Project[];
    skills: Skills;
}
