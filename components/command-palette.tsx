"use client"

import { useState, useEffect } from "react"
import { Command } from "cmdk"
import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    Instagram,
    ExternalLink,
    Download,
    User,
    Briefcase,
    BookOpen,
    Award,
    Code,
    FileText,
    Search,
    X,
    ArrowUpRight,
    ArrowLeft,
    Calendar,
    Building,
    GraduationCap
} from "lucide-react"
import {
    personalInfo,
    socialLinks,
    projects,
    experienceData,
    educationData,
    certificationSections,
    type Project,
    type Experience,
    type Education,
    type Certification
} from "@/data/portfolio-data"

interface CommandPaletteProps {
    isOpen: boolean
    onClose: () => void
}

type ViewMode = 'main' | 'projects' | 'experience' | 'education' | 'certifications' | 'blogs'

interface Blog {
    title: string
    brief: string
    slug: string
    coverImage?: { url: string }
    publishedAt: string
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const [search, setSearch] = useState("")
    const [currentView, setCurrentView] = useState<ViewMode>('main')
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onClose()
            }
            if (e.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [onClose])

    // Focus the command input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                const input = document.querySelector('[cmdk-input]') as HTMLInputElement
                if (input) {
                    input.focus()
                }
            }, 100)
        }
    }, [isOpen])

    // Fetch blogs when modal opens
    useEffect(() => {
        if (isOpen && blogs.length === 0) {
            const fetchBlogs = async () => {
                const query = `
                query Publication {
                    publication(host: "blog.sameer.nz") {
                        posts(first: 10) {
                            edges {
                                node {
                                    title
                                    brief
                                    slug
                                    coverImage {
                                        url
                                    }
                                    publishedAt
                                }
                            }
                        }
                    }
                }
                `

                try {
                    const res = await fetch("https://gql.hashnode.com/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ query })
                    })

                    const json = await res.json()
                    const nodes = json?.data?.publication?.posts?.edges?.map((edge: any) => edge.node) || []
                    setBlogs(nodes)
                } catch (error) {
                    console.error("Hashnode fetch error:", error)
                }
            }

            fetchBlogs()
        }
    }, [isOpen, blogs.length])

    // Reset view when modal closes
    useEffect(() => {
        if (!isOpen) {
            setCurrentView('main')
            setSearch('')
        }
    }, [isOpen])

    if (!isOpen) return null

    // Helper function to get breadcrumb text
    const getBreadcrumb = () => {
        switch (currentView) {
            case 'projects': return 'Projects'
            case 'experience': return 'Experience'
            case 'education': return 'Education'
            case 'certifications': return 'Certifications'
            case 'blogs': return 'Blogs'
            default: return ''
        }
    }

    // Helper function to go back to main view
    const goBack = () => {
        setCurrentView('main')
    }

    // Main navigation commands using shared data
    const mainCommands = [
        // Navigation
        {
            id: "about",
            title: "About Me",
            subtitle: "Learn more about my background",
            icon: <User className="w-4 h-4" />,
            action: () => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                onClose()
            },
            category: "Navigation"
        },
        {
            id: "experience",
            title: "Experience",
            subtitle: `View my work experience (${experienceData.length} items)`,
            icon: <Briefcase className="w-4 h-4" />,
            action: () => {
                setCurrentView('experience')
            },
            category: "Navigation"
        },
        {
            id: "projects",
            title: "Projects",
            subtitle: `Explore my projects (${projects.length} items)`,
            icon: <Code className="w-4 h-4" />,
            action: () => {
                setCurrentView('projects')
            },
            category: "Navigation"
        },
        {
            id: "blogs",
            title: "Blog Posts",
            subtitle: `Read my latest articles (${blogs.length} items)`,
            icon: <BookOpen className="w-4 h-4" />,
            action: () => {
                setCurrentView('blogs')
            },
            category: "Navigation"
        },
        {
            id: "certifications",
            title: "Certifications",
            subtitle: `View my certifications (${certificationSections.reduce((acc, section) => acc + section.certifications.length, 0)} items)`,
            icon: <Award className="w-4 h-4" />,
            action: () => {
                setCurrentView('certifications')
            },
            category: "Navigation"
        },

        // Social Links from shared data
        ...socialLinks.map(social => ({
            id: social.id,
            title: social.name,
            subtitle: `Visit my ${social.name} profile`,
            icon: social.icon === 'Github' ? <Github className="w-4 h-4" /> :
                social.icon === 'Linkedin' ? <Linkedin className="w-4 h-4" /> :
                    social.icon === 'Instagram' ? <Instagram className="w-4 h-4" /> :
                        social.icon === 'Mail' ? <Mail className="w-4 h-4" /> :
                            <ExternalLink className="w-4 h-4" />,
            action: () => {
                window.open(social.url, "_blank")
                onClose()
            },
            category: "Social"
        })),

        // Actions using shared data
        {
            id: "resume",
            title: "Download Resume",
            subtitle: "Download my latest resume",
            icon: <Download className="w-4 h-4" />,
            action: () => {
                window.open(personalInfo.resumeUrl, "_blank")
                onClose()
            },
            category: "Actions"
        },
        {
            id: "blog-site",
            title: "Visit Blog",
            subtitle: "Visit my blog website",
            icon: <ExternalLink className="w-4 h-4" />,
            action: () => {
                window.open(personalInfo.blogUrl, "_blank")
                onClose()
            },
            category: "Actions"
        }
    ]

    // Generate all nested commands for unified search
    const getAllNestedCommands = () => {
        const nestedCommands = [
            // Projects
            ...projects.map(project => ({
                id: `project-${project.id}`,
                title: project.title,
                subtitle: `Project • ${project.description}`,
                icon: <Code className="w-4 h-4" />,
                action: () => {
                    window.open(project.link, "_blank")
                    onClose()
                },
                category: `Projects > ${project.category}`,
                searchTerms: [...project.tech, project.category, project.date, 'project'],
                isNested: true
            })),

            // Experience
            ...experienceData.map(exp => ({
                id: `experience-${exp.id}`,
                title: exp.title,
                subtitle: `Experience • ${exp.company} • ${exp.period}`,
                icon: <Building className="w-4 h-4" />,
                action: () => {
                    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                    onClose()
                },
                category: "Experience",
                searchTerms: [exp.company, exp.type, exp.period, 'experience', 'work'],
                isNested: true
            })),

            // Blogs
            ...blogs.map(blog => ({
                id: `blog-${blog.slug}`,
                title: blog.title,
                subtitle: `Blog • ${blog.brief}`,
                icon: <BookOpen className="w-4 h-4" />,
                action: () => {
                    window.open(`${personalInfo.blogUrl}/${blog.slug}`, "_blank")
                    onClose()
                },
                category: "Blog Posts",
                searchTerms: [blog.title, blog.brief, 'blog', 'article'],
                isNested: true
            })),

            // Certifications
            ...certificationSections.flatMap(section =>
                section.certifications.map(cert => ({
                    id: `cert-${cert.id}`,
                    title: cert.title,
                    subtitle: `Certification • ${cert.authority} • ${cert.date}`,
                    icon: <Award className="w-4 h-4" />,
                    action: () => {
                        window.open(cert.link, "_blank")
                        onClose()
                    },
                    category: `Certifications > ${section.title}`,
                    searchTerms: [...cert.tech, cert.authority, cert.date, 'certification', 'cert'],
                    isNested: true
                }))
            )
        ]

        return nestedCommands
    }

    // Get commands based on current view
    const getCommands = () => {
        switch (currentView) {
            case 'projects':
                return [
                    {
                        id: "back",
                        title: "← Back to main",
                        subtitle: "Return to main menu",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        action: goBack,
                        category: "Navigation"
                    },
                    ...projects.map(project => ({
                        id: project.id,
                        title: project.title,
                        subtitle: project.description,
                        icon: <Code className="w-4 h-4" />,
                        action: () => {
                            window.open(project.link, "_blank")
                            onClose()
                        },
                        category: project.category,
                        searchTerms: [...project.tech, project.category, project.date]
                    }))
                ]

            case 'experience':
                return [
                    {
                        id: "back",
                        title: "← Back to main",
                        subtitle: "Return to main menu",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        action: goBack,
                        category: "Navigation"
                    },
                    ...experienceData.map(exp => ({
                        id: exp.id,
                        title: exp.title,
                        subtitle: `${exp.company} • ${exp.period}`,
                        icon: <Building className="w-4 h-4" />,
                        action: () => {
                            document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                            onClose()
                        },
                        category: "Experience",
                        searchTerms: [exp.company, exp.type, exp.period]
                    }))
                ]

            case 'blogs':
                return [
                    {
                        id: "back",
                        title: "← Back to main",
                        subtitle: "Return to main menu",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        action: goBack,
                        category: "Navigation"
                    },
                    ...blogs.slice(0, 5).map(blog => ({
                        id: blog.slug,
                        title: blog.title,
                        subtitle: blog.brief,
                        icon: <BookOpen className="w-4 h-4" />,
                        action: () => {
                            window.open(`${personalInfo.blogUrl}/${blog.slug}`, "_blank")
                            onClose()
                        },
                        category: "Blog Posts",
                        searchTerms: [blog.title, blog.brief]
                    })),
                    ...(blogs.length > 5 ? [{
                        id: "view-all-blogs",
                        title: "View All Blog Posts",
                        subtitle: `See all ${blogs.length} blog posts`,
                        icon: <ExternalLink className="w-4 h-4" />,
                        action: () => {
                            window.open(personalInfo.blogUrl, "_blank")
                            onClose()
                        },
                        category: "Actions"
                    }] : [])
                ]

            case 'certifications':
                return [
                    {
                        id: "back",
                        title: "← Back to main",
                        subtitle: "Return to main menu",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        action: goBack,
                        category: "Navigation"
                    },
                    ...certificationSections.flatMap(section =>
                        section.certifications.map(cert => ({
                            id: cert.id,
                            title: cert.title,
                            subtitle: `${cert.authority} • ${cert.date}`,
                            icon: <Award className="w-4 h-4" />,
                            action: () => {
                                window.open(cert.link, "_blank")
                                onClose()
                            },
                            category: section.title,
                            searchTerms: [...cert.tech, cert.authority, cert.date]
                        }))
                    )
                ]

            default:
                // In main view, only show main commands by default
                // Nested commands will be included only when searching
                if (search.trim()) {
                    // Include nested commands only when user is searching
                    return [...mainCommands, ...getAllNestedCommands()]
                } else {
                    // Show only main commands when no search query
                    return mainCommands
                }
        }
    }

    const commands = getCommands()

    const filteredCommands = commands.filter(command => {
        const searchLower = search.toLowerCase().trim()
        
        // If no search query, show all commands
        if (!searchLower) return true
        
        const matchesTitle = command.title.toLowerCase().includes(searchLower)
        const matchesSubtitle = command.subtitle.toLowerCase().includes(searchLower)
        const matchesCategory = command.category.toLowerCase().includes(searchLower)
        const matchesSearchTerms = (command as any).searchTerms?.some((term: string) =>
            term.toLowerCase().includes(searchLower)
        )

        return matchesTitle || matchesSubtitle || matchesCategory || matchesSearchTerms
    })

    const groupedCommands = filteredCommands.reduce((acc, command) => {
        if (!acc[command.category]) {
            acc[command.category] = []
        }
        acc[command.category].push(command)
        return acc
    }, {} as Record<string, typeof commands>)

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
                <Command
                    key={`${currentView}-${search}`}
                    className="mx-4 overflow-hidden rounded-2xl backdrop-blur-md shadow-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(0, 0, 0, 0.85) 100%)',
                        boxShadow: 'inset 0 0 0 1px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(16, 185, 129, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.3), 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 80px rgba(16, 185, 129, 0.1)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    shouldFilter={false}
                >
                    <div
                        className="flex items-center px-4"
                        style={{
                            borderBottom: '1px solid rgba(16, 185, 129, 0.15)'
                        }}
                    >
                        <Search className="mr-3 h-5 w-5 shrink-0 text-emerald-300" />
                        <Command.Input
                            placeholder={currentView === 'main' ? "Search for apps and commands..." : `Search in ${getBreadcrumb()}...`}
                            className="flex h-14 w-full bg-transparent py-3 text-base text-white outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 font-space-grotesk"
                            value={search}
                            onValueChange={setSearch}
                            autoFocus
                        />
                        <button
                            onClick={onClose}
                            className="ml-3 rounded-[8px] p-1.5 text-gray-400 hover:text-white transition-all duration-200"
                            style={{
                                background: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(0, 0, 0, 0.4) 100%)'
                                e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(16, 185, 129, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.5)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <Command.List className="max-h-96 overflow-y-auto p-2">
                        <Command.Empty className="py-8 text-center text-sm text-gray-400 font-space-grotesk">
                            No results found.
                        </Command.Empty>

                        {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                            <Command.Group key={category} heading={category} className="mb-2">
                                {categoryCommands.map((command) => (
                                    <Command.Item
                                        key={command.id}
                                        onSelect={command.action}
                                        className="flex cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm text-white transition-all duration-200"
                                        style={{
                                            background: 'transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(0, 0, 0, 0.2) 100%)'
                                            e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(16, 185, 129, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.3)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gray-800/30 text-emerald-300">
                                            {command.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-white font-space-grotesk">
                                                {command.title}
                                            </div>
                                            <div className="text-xs text-gray-400 font-space-grotesk">
                                                {command.subtitle}
                                            </div>
                                        </div>
                                        <div className="text-xs text-emerald-400">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        ))}
                    </Command.List>

                    <div
                        className="px-4 py-3 text-xs text-gray-400"
                        style={{
                            borderTop: '1px solid rgba(16, 185, 129, 0.15)'
                        }}
                    >
                        {/* Desktop layout */}
                        <div className="hidden sm:flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <kbd
                                    className="rounded-[4px] px-1.5 py-0.5 text-[18px] text-emerald-300"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(0, 0, 0, 0.4) 100%)',
                                        boxShadow: 'inset 0 0 0 1px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(16, 185, 129, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.5)'
                                    }}
                                >⌘</kbd>
                                <kbd
                                    className="rounded-[4px] px-1.5 py-0.5 text-xs text-emerald-300"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(0, 0, 0, 0.4) 100%)',
                                        boxShadow: 'inset 0 0 0 1px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(16, 185, 129, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.5)'
                                    }}
                                >K</kbd>
                                <span className="font-space-grotesk">to close</span>
                            </div>
                            <div className="text-lg font-space-grotesk text-white font-bold">
                                Sameer C<span className="text-xl text-emerald-400 font-bold">.</span>
                            </div>
                        </div>

                        {/* Mobile layout - only centered logo */}
                        <div className="flex sm:hidden items-center justify-center">
                            <div className="text-lg font-space-grotesk text-white font-bold">
                                Sameer C<span className="text-xl text-emerald-400 font-bold">.</span>
                            </div>
                        </div>
                    </div>
                </Command>
            </div>
        </div>
    )
}