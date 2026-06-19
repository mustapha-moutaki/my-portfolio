export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  tags?: string[]
}

export const posts: BlogPost[] = [
  {
    id: "1",
    slug: "scaling-spring-boot-microservices",
    title: "Scaling Spring Boot Microservices Without Losing Your Mind",
    excerpt:
      "Lessons from breaking a monolith into services — what worked, what broke production, and the patterns that actually held up under load.",
    category: "Backend",
    date: "2026-05-12",
    readTime: "9 min read",
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    featured: true,
    tags: ["Spring Boot", "Microservices", "Java"] 
  },
  {
    id: "2",
    slug: "angular-signals-deep-dive",
    title: "Angular Signals: A Practical Deep Dive",
    excerpt:
      "Why signals change how you think about reactivity in Angular, and how to migrate an existing component tree without a rewrite.",
    category: "Frontend",
    date: "2026-04-28",
    readTime: "7 min read",
    coverImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop",
    tags: ["Spring Boot", "Microservices", "Java"] 
  },
  {
    id: "3",
    slug: "designing-rest-apis-that-dont-suck",
    title: "Designing REST APIs That Don't Suck",
    excerpt:
      "A field guide to versioning, pagination, and error shapes — the boring decisions that decide whether an API is a joy or a chore.",
    category: "Architecture",
    date: "2026-04-10",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
      tags: ["Spring Boot", "Microservices", "Java"] 
  },
  {
    id: "4",
    slug: "java-21-virtual-threads",
    title: "Java 21 Virtual Threads: What Changes in Practice",
    excerpt:
      "Benchmarks and gotchas from swapping platform threads for virtual threads in a real production workload.",
    category: "Backend",
    date: "2026-03-22",
    readTime: "8 min read",
    coverImage:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop",
      tags: ["Spring Boot", "Microservices", "Java"] 
  },
  {
    id: "5",
    slug: "ci-cd-pipeline-from-scratch",
    title: "Building a CI/CD Pipeline From Scratch",
    excerpt:
      "GitHub Actions, Docker, and a staging environment that doesn't lie to you — a walkthrough of a pipeline built for a small team.",
    category: "DevOps",
    date: "2026-03-02",
    readTime: "10 min read",
    coverImage:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1600&auto=format&fit=crop",
       tags: ["Spring Boot", "Microservices", "Java"] 
  },
  {
    id: "6",
    slug: "state-management-2026",
    title: "State Management in 2026: Do You Even Need a Library?",
    excerpt:
      "A look at where context, signals, and server state have made traditional state libraries optional for most apps.",
    category: "Frontend",
    date: "2026-02-14",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1600&auto=format&fit=crop",
       tags: [] 
  },
];