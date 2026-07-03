'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TerminalModeProps {
    onExit: () => void;
}

// ASCII Art Resume
const RESUME_ASCII = `
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                      ║
║   ██████╗ ██████╗  █████╗ ████████╗██╗   ██╗██╗                                     ║
║   ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║   ██║██║                                     ║
║   ██████╔╝██████╔╝███████║   ██║   ██║   ██║██║                                     ║
║   ██╔═══╝ ██╔══██╗██╔══██║   ██║   ██║   ██║██║                                     ║
║   ██║     ██║  ██║██║  ██║   ██║   ╚██████╔╝███████╗                                ║
║   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝                                ║
║                                                                                      ║
║   ╔═════════════════════════════════════════════════════════════════════════════╗   ║
║   ║  SOFTWARE ENGINEER | PRODUCT LEAD | LOVES ABCD                             ║   ║
║   ║  (Anything Backend Cloud & Data)                                            ║   ║
║   ╚═════════════════════════════════════════════════════════════════════════════╝   ║
║                                                                                      ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐   ║
║   │ EXPERIENCE                                                                   │   ║
║   ├─────────────────────────────────────────────────────────────────────────────┤   ║
║   │ > Software Eng @ Nexivity                  May 2026 - Present              │   ║
║   │   BackupMeraki SaaS | Cisco Meraki Backups | Sole Feature Engineer         │   ║
║   │                                                                            │   ║
║   │ > Software Eng & Product Lead @ Done Life  Dec 2025 - Present              │   ║
║   │   AI-first productivity platform | Product + Eng | App Store deployed      │   ║
║   │                                                                            │   ║
║   │ > Software Engineer @ Accenture            Jun 2024 - Dec 2024             │   ║
║   │   Serverless APIs | 80% automation | Event-driven architecture             │   ║
║   │                                                                            │   ║
║   │ > Casual Academic @ USYD                   Feb 2024 - Present              │   ║
║   │   450+ students | ML & Python | 95% positive feedback                      │   ║
║   └─────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                      ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐   ║
║   │ SKILLS                                                                       │   ║
║   ├─────────────────────────────────────────────────────────────────────────────┤   ║
║   │ Cloud:  AWS Lambda | EventBridge | Step Functions | DynamoDB | OpenSearch  │   ║
║   │ AI/ML:  OpenAI API | LangChain | Prompt Engineering | Computer Vision      │   ║
║   │ Backend: Python | TypeScript | Node.js | PostgreSQL | REST APIs            │   ║
║   │ Tools:  Git | CloudFormation | Terraform | Docker | Agile/Scrum            │   ║
║   └─────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                      ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐   ║
║   │ EDUCATION                                                                    │   ║
║   ├─────────────────────────────────────────────────────────────────────────────┤   ║
║   │ University of Sydney                                                        │   ║
║   │ B.Eng (Hons) Software Engineering | First Class Honours                    │   ║
║   │ Honours WAM: 79.2 | Overall WAM: 76.8                                       │   ║
║   └─────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                      ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐   ║
║   │ CONTACT                                                                      │   ║
║   ├─────────────────────────────────────────────────────────────────────────────┤   ║
║   │ Email:    hire@hellopratul.com                                              │   ║
║   │ LinkedIn: linkedin.com/in/pratulsinghraghava                                │   ║
║   │ GitHub:   github.com/PratulSR                                               │   ║
║   │ Website:  hellopratul.com                                                   │   ║
║   └─────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
`;

// Command outputs
const COMMANDS: { [key: string]: string | (() => string) } = {
    help: `
Available commands:
  help       - Show this help message
  whoami     - Learn about Pratul
  skills     - View technical skills
  projects   - List featured projects
  resume     - Display ASCII resume
  hire       - Get contact information
  clear      - Clear the terminal
  exit       - Exit terminal mode

Tip: Type a command and press Enter
`,
    whoami: `
┌──────────────────────────────────────────────────────────────┐
│                       $ whoami                                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Name:      Pratul Singh Raghava                             │
│  Title:     Software Engineer & Product Lead                 │
│  Location:  Sydney, Australia                                │
│  Status:    Open to opportunities                            │
│                                                               │
│  Tagline:   "Loves ABCD - Anything Backend Cloud & Data"     │
│                                                               │
│  Bio:       Ships production systems end-to-end AND owns     │
│             the product calls that go with them - backend    │
│             logic, cloud infra, and user-centric delivery.    │
│             First Class Honours from USYD.                   │
│                                                               │
│  Fun Facts:                                                   │
│  - Can name every country in the world in under 10 mins     │
│  - Watches every F1 race religiously 🏎️                      │
│  - Scaled USYD Robotics Club to 1,800+ members               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
`,
    skills: `
┌──────────────────────────────────────────────────────────────┐
│                      Technical Skills                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ████ CLOUD (Expert)                                         │
│  └─ AWS Lambda • EventBridge • Step Functions                │
│  └─ DynamoDB • OpenSearch • CloudFormation                   │
│  └─ S3 • API Gateway • IAM                                   │
│                                                               │
│  ███░ AI/ML (Advanced)                                       │
│  └─ OpenAI API • LangChain • Prompt Engineering             │
│  └─ Computer Vision • Scikit-learn • Pandas                 │
│                                                               │
│  ████ BACKEND (Expert)                                       │
│  └─ Python • TypeScript • Node.js                           │
│  └─ PostgreSQL • REST APIs • Serverless                     │
│                                                               │
│  ███░ TOOLS (Advanced)                                       │
│  └─ Git • Docker • Terraform • Jira • Agile/Scrum           │
│                                                               │
└──────────────────────────────────────────────────────────────┘
`,
    projects: `
┌──────────────────────────────────────────────────────────────┐
│                     Featured Projects                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [1] BackupMeraki @ Nexivity (2026)                          │
│      Cisco Meraki Backup/Restore SaaS | Feature Engineer     │
│      "Sole engineer shipping features across 8 repos"        │
│                                                               │
│  [2] Done Life (2025)                                        │
│      AI Productivity Platform | Software Eng & Product Lead  │
│      "97% faster ingestion via Gmail push mailhooks"         │
│                                                               │
│  [3] Accenture Permissions Engine (2024)                     │
│      Enterprise Security Automation | Software Engineer      │
│      "80% reduction in manual provisioning"                  │
│                                                               │
│  [4] USYD Robotics Club (2022-2025)                         │
│      Technical Community Leadership | President              │
│      "Scaled from 230 to 1,800+ members"                     │
│                                                               │
│  [5] Scholar Score (2024)                                    │
│      Course Review Platform | Personal Project               │
│      "Rate My Professor for USYD courses"                    │
│                                                               │
│  [6] Privacy Finance Tracker (2023)                          │
│      Full-Stack Application | Personal Project               │
│      "Local-first expense tracking"                          │
│                                                               │
│  Type 'exit' and visit /projects for full details            │
│                                                               │
└──────────────────────────────────────────────────────────────┘
`,
    resume: RESUME_ASCII,
    hire: `
╔══════════════════════════════════════════════════════════════╗
║                      LET'S CONNECT!                          ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║   📧 Email:    hire@hellopratul.com                          ║
║                                                               ║
║   💼 LinkedIn: linkedin.com/in/pratulsinghraghava            ║
║                                                               ║
║   🐙 GitHub:   github.com/PratulSR                           ║
║                                                               ║
║   🌐 Website:  hellopratul.com                               ║
║                                                               ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║   Currently: Open to opportunities in                        ║
║   • Cloud Architecture                                        ║
║   • AI/ML Engineering                                         ║
║   • Full-Stack Development                                    ║
║                                                               ║
║   Based in Sydney, open to remote worldwide 🌏               ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
`,
};

export default function TerminalMode({ onExit }: TerminalModeProps) {
    const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
        {
            type: 'output', content: `
╔═══════════════════════════════════════════════════════════════════╗
║                                                                    ║
║   ██████╗ ██████╗ ██████╗ ██████╗                                 ║
║   ██╔══██╗██╔══██╗██╔══██╗██╔══██╗                                ║
║   ██████╔╝██████╔╝██║  ██║██████╔╝                                ║
║   ██╔═══╝ ██╔══██╗██║  ██║██╔══██╗                                ║
║   ██║     ██║  ██║██████╔╝██████╔╝                                ║
║   ╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═════╝                                 ║
║                                                                    ║
║   Welcome to PRDb Terminal v1.0                                   ║
║   The Pratul Database - Command Line Interface                    ║
║                                                                    ║
║   Type 'help' to see available commands                           ║
║   Type 'exit' to return to the website                            ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
` },
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom when history changes
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = useCallback((cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        // Add to command history
        if (trimmedCmd) {
            setCommandHistory(prev => [trimmedCmd, ...prev.slice(0, 49)]);
            setHistoryIndex(-1);
        }

        // Add input to history
        setHistory(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

        if (trimmedCmd === 'exit' || trimmedCmd === 'quit' || trimmedCmd === 'q') {
            setHistory(prev => [...prev, { type: 'output', content: 'Exiting terminal mode...' }]);
            setTimeout(onExit, 500);
            return;
        }

        if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
            setHistory([]);
            return;
        }

        const output = COMMANDS[trimmedCmd];
        if (output) {
            const content = typeof output === 'function' ? output() : output;
            setHistory(prev => [...prev, { type: 'output', content }]);
        } else if (trimmedCmd === '') {
            // Do nothing for empty input
        } else {
            setHistory(prev => [...prev, {
                type: 'output',
                content: `Command not found: ${trimmedCmd}\nType 'help' for available commands.`
            }]);
        }
    }, [onExit]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Escape') {
            onExit();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black flex flex-col font-mono"
            onClick={() => inputRef.current?.focus()}
        >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-green-500/30">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-green-500 text-sm">prdb@terminal ~ </span>
                <button
                    onClick={onExit}
                    className="text-green-500/50 hover:text-green-500 transition-colors text-sm"
                >
                    [ESC to exit]
                </button>
            </div>

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-4 text-green-500 text-sm leading-relaxed"
            >
                {history.map((item, index) => (
                    <div
                        key={index}
                        className={`whitespace-pre-wrap ${item.type === 'input' ? 'text-green-300' : 'text-green-500/80'}`}
                    >
                        {item.content}
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-300">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-green-300 outline-none caret-green-500"
                        spellCheck={false}
                        autoComplete="off"
                        autoCapitalize="off"
                    />
                    <span className="w-2 h-4 bg-green-500 animate-pulse"></span>
                </div>
            </div>

            {/* Quick Commands Bar */}
            <div className="px-4 py-3 bg-[#1a1a1a] border-t border-green-500/30">
                <div className="flex flex-wrap gap-2 text-xs">
                    {['help', 'whoami', 'skills', 'projects', 'resume', 'hire', 'exit'].map((cmd) => (
                        <button
                            key={cmd}
                            onClick={() => {
                                handleCommand(cmd);
                            }}
                            className="px-3 py-1.5 border border-green-500/30 text-green-500/70 hover:text-green-500 hover:border-green-500/60 rounded transition-colors"
                        >
                            {cmd}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
