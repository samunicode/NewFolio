export interface Project {
    id: string
    title: string
    category: string
    description: string
    tech: string[]
    date: string
    thumbnail: string
    link: string
}

export interface Experience {
    id: string
    title: string
    company: string
    type: string
    period: string
    description: string
    color: string
    isActive: boolean
}

export interface Education {
    id: string
    title: string
    company: string
    type: string
    period: string
    description: string
    color: string
    isActive: boolean
}

export interface Certification {
    id: string
    title: string
    authority: string
    description: string
    tech: string[]
    date: string
    thumbnail: string
    link: string
}

export interface CertificationSection {
    title: string
    certifications: Certification[]
}

export interface SocialLink {
    id: string
    name: string
    url: string
    icon: string
}

export interface PersonalInfo {
    name: string
    title: string
    description: string
    email: string
    profileImage: string
    resumeUrl: string
    blogUrl: string
}

// Personal Information
export const personalInfo: PersonalInfo = {
    name: "Sameer Chauhan",
    title: "ML Enthusiast with a Full-Stack Mindset",
    description: "Passionate about machine learning, full-stack development, and creating innovative solutions.",
    email: "mail@sameer.nz",
    profileImage: "/profilepic.png",
    resumeUrl: "https://drive.google.com/file/d/1HmzoCTr6aNKEZaiJONwKIoIEl6ng2S9s/view",
    blogUrl: "https://blog.sameer.nz"
}

// Social Links
export const socialLinks: SocialLink[] = [
    {
        id: "github",
        name: "GitHub",
        url: "https://github.com/samunicode",
        icon: "Github"
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/cbsameer/",
        icon: "Linkedin"
    },
    {
        id: "instagram",
        name: "Instagram",
        url: "https://instagram.com/sameerch4n/",
        icon: "Instagram"
    },
    {
        id: "email",
        name: "Email",
        url: "mailto:mail@sameer.nz",
        icon: "Mail"
    }
]

// Projects Data
export const projects: Project[] = [
    {
        id: "chanakya-gpt",
        title: "ChanakyaGPT",
        category: "AI & NLP",
        description: "A GPT-powered assistant delivering context-aware answers inspired by ancient Indian wisdom, tailored for students and career guidance.",
        tech: ["OpenAI API", "TailwindCSS", "Vercel"],
        date: "July 2023",
        thumbnail: "/pro1.png?height=200&width=300",
        link: "https://chanakya-gpt.vercel.app/"
    },
    {
        id: "muj-central",
        title: "MUJ Central",
        category: "Campus Utility Web App",
        description: "All-in-one student platform for Manipal University Jaipur — includes results, attendance tracker, event info, and quick access tools.",
        tech: ["HTML", "CSS", "JavaScript", "Firebase"],
        date: "Sep 2022",
        thumbnail: "/pro2.png?height=200&width=300",
        link: "https://mujcentral.in/"
    },
    {
        id: "digipin",
        title: "DigiPin",
        category: "Public Awareness Tool",
        description: "A user-friendly tool that explains and simplifies the usage of India's new 4x4-character DigiPIN for document eSign and digital identity verification.",
        tech: ["Next.js", "TailwindCSS", "SEO", "Accessibility"],
        date: "June 2025",
        thumbnail: "/pro3.png?height=200&width=300",
        link: "https://mydigipin.org/"
    }
]

// Experience Data
export const experienceData: Experience[] = [
    {
        id: "deloitte-analyst",
        title: "Upcoming Analyst",
        company: "Deloitte",
        type: "Full-time",
        period: "2025",
        description: "Secured a full-time position as an Analyst at Deloitte, starting in July 2025, after successfully completing the recruitment process.",
        color: "from-purple-500 to-blue-500",
        isActive: true
    },
    {
        id: "pwc-intern",
        title: "Data Analyst Intern",
        company: "PwC AC India",
        type: "Full-time",
        period: "2024",
        description: "Received mentorship from PwC specialists through the PwC Launchpad Program, enhancing professional skills and industry knowledge.",
        color: "from-blue-500 to-cyan-500",
        isActive: false
    }
]

// Education Data
export const educationData: Education[] = [
    {
        id: "btech-cse",
        title: "BTech CSE",
        company: "Manipal Jaipur",
        type: "Undergrad",
        period: "2021-2025",
        description: "Graduated with Dean's Award for Academic Excellence. Created MUJ Central, largest college-student centric portal. Lead CodeChef Coding Club and got actively involved in IEEE, GDSC, ACM College Clubs.",
        color: "from-cyan-500 to-blue-500",
        isActive: false
    }
]

// Certifications Data
export const certificationSections: CertificationSection[] = [
    {
        title: "Academic Certifications",
        certifications: [
            {
                id: "deans-award-7th",
                title: "Dean's Award (7th Semester)",
                authority: "Manipal University Jaipur",
                description: "Awarded for outstanding academic performance in the 7th Semester of Undergraduate Studies.",
                tech: ["Academics", "Computer Science", "Award"],
                date: "Feb 2025",
                thumbnail: "/DLA/1.png",
                link: "https://drive.google.com/file/d/12q-VRF9_XcAFnKW202qJ-KaIq_4A5FNC/view"
            },
            {
                id: "deans-award-6th",
                title: "Dean's Award (6th Semester)",
                authority: "Manipal University Jaipur",
                description: "Awarded for outstanding academic performance in the 6th Semester of Undergraduate Studies.",
                tech: ["Academics", "Computer Science", "Award"],
                date: "Nov 2024",
                thumbnail: "/DLA/2.png",
                link: "https://drive.google.com/file/d/17jLCy0QiJkCTuwYXnDakkFU-aAj53Gt0/view"
            },
            {
                id: "deans-award-5th",
                title: "Dean's Award (5th Semester)",
                authority: "Manipal University Jaipur",
                description: "Awarded for outstanding academic performance in the 5th Semester of Undergraduate Studies.",
                tech: ["Academics", "Computer Science", "Award"],
                date: "May 2024",
                thumbnail: "/DLA/3.png",
                link: "https://drive.google.com/file/d/1NEeCh-8mVMvelGEQl-lonRIGz6Nlz1Cy/view"
            }
        ]
    },
    {
        title: "Data Science, ML & GenAI",
        certifications: [
            {
                id: "pwc-internship",
                title: "PwC Data Analytics Internship",
                authority: "PwC AC India",
                description: "Completed a 5 Months internship with PwC India, focusing on basics of IT and Data Analytics.",
                tech: ["Python", "SQL", "Cloud Fundamentals"],
                date: "May 2024",
                thumbnail: "/DLA/7.png",
                link: "https://drive.google.com/file/d/1lfhw1A6ldTYtEZmHCa0nSN3VY1DsWzch/view"
            },
            {
                id: "dsa-nptel",
                title: "Data Structures & Algorithms (NPTEL - IITM)",
                authority: "IIT Madras via NPTEL",
                description: "Completed a 8 week course on DSA, covering advanced topics and practical applications.",
                tech: ["Python", "Data Structures", "Algorithms", "Problem Solving"],
                date: "Apr 2025",
                thumbnail: "/DLA/4.png",
                link: "https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs59/Course/NPTEL25CS59S44760005201365533.pdf"
            },
            {
                id: "foundational-data-science",
                title: "Foundational Course in Data Science (IITM)",
                authority: "IIT Madras",
                description: "Completed a Foundational Course in Data Science, covering essential concepts and tools.",
                tech: ["Databases", "Data Structures", "Algorithms", "Problem Solving"],
                date: "May 2023",
                thumbnail: "/DLA/6.png",
                link: "https://drive.google.com/file/d/17Hxgb6vys-Sw3I_oYm0oLHoyCwkrugAs/view"
            },
            {
                id: "python-crash-course",
                title: "Crash Course in Python",
                authority: "Google via Coursera",
                description: "Completed a Crash Course in Python, focusing on the fundamentals of programming and data manipulation.",
                tech: ["Python", "Programming", "Data Manipulation"],
                date: "Oct 2022",
                thumbnail: "/DLA/5.png",
                link: "https://www.coursera.org/account/accomplishments/verify/G7ZWTDS5XRZR"
            }
        ]
    },
    {
        title: "DSA & Core Computer Science",
        certifications: [
            {
                id: "dsa-nptel-duplicate",
                title: "Data Structures & Algorithms (NPTEL - IITM)",
                authority: "IIT Madras via NPTEL",
                description: "Completed a 8 week course on DSA, covering advanced topics and practical applications.",
                tech: ["Python", "Data Structures", "Algorithms", "Problem Solving"],
                date: "Apr 2025",
                thumbnail: "/DLA/4.png",
                link: "https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs59/Course/NPTEL25CS59S44760005201365533.pdf"
            },
            {
                id: "computer-networks",
                title: "Computer Networks and Internet Protocol",
                authority: "IIT KGP via NPTEL",
                description: "Completed a 12 week course on Computer Networks and Internet Protocols, covering advanced networking concepts.",
                tech: ["IT", "Networking", "Linux", "Support"],
                date: "Apr 2024",
                thumbnail: "/DLA/8.png",
                link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM1/Ecertificates/106/noc24-cs19/Course/NPTEL24CS19S35040005530688844.pdf"
            }
        ]
    }
]