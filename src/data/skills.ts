import { Skill } from "@/types";

export const skills: Skill[] = [
  // ─── Languages ─────────────────────────────────────────────────────
  { name: "TypeScript", icon: "TS", proficiency: 95, category: "Languages" },
  { name: "JavaScript", icon: "JS", proficiency: 95, category: "Languages" },
  { name: "Python", icon: "PY", proficiency: 85, category: "Languages" },
  { name: "Rust", icon: "RS", proficiency: 60, category: "Languages" },
  { name: "Go", icon: "GO", proficiency: 55, category: "Languages" },
  { name: "SQL", icon: "SQL", proficiency: 80, category: "Languages" },

  // ─── Frontend ──────────────────────────────────────────────────────
  { name: "React", icon: "⚛️", proficiency: 95, category: "Frontend" },
  { name: "Next.js", icon: "▲", proficiency: 90, category: "Frontend" },
  { name: "Three.js", icon: "3D", proficiency: 85, category: "Frontend" },
  { name: "Framer Motion", icon: "FM", proficiency: 88, category: "Frontend" },
  { name: "Tailwind CSS", icon: "TW", proficiency: 92, category: "Frontend" },
  { name: "GSAP", icon: "GS", proficiency: 80, category: "Frontend" },

  // ─── Backend ───────────────────────────────────────────────────────
  { name: "Node.js", icon: "NJ", proficiency: 90, category: "Backend" },
  { name: "Express", icon: "EX", proficiency: 85, category: "Backend" },
  { name: "FastAPI", icon: "FA", proficiency: 75, category: "Backend" },
  { name: "PostgreSQL", icon: "PG", proficiency: 82, category: "Backend" },
  { name: "MongoDB", icon: "MG", proficiency: 78, category: "Backend" },
  { name: "Redis", icon: "RD", proficiency: 70, category: "Backend" },

  // ─── DevOps ────────────────────────────────────────────────────────
  { name: "Docker", icon: "🐳", proficiency: 80, category: "DevOps" },
  { name: "AWS", icon: "☁️", proficiency: 75, category: "DevOps" },
  { name: "CI/CD", icon: "⚙️", proficiency: 78, category: "DevOps" },
  { name: "Kubernetes", icon: "K8", proficiency: 60, category: "DevOps" },

  // ─── Tools ─────────────────────────────────────────────────────────
  { name: "Git", icon: "GIT", proficiency: 92, category: "Tools" },
  { name: "Figma", icon: "FG", proficiency: 85, category: "Tools" },
  { name: "VS Code", icon: "VS", proficiency: 95, category: "Tools" },
  { name: "Storybook", icon: "SB", proficiency: 78, category: "Tools" },

  // ─── Design ────────────────────────────────────────────────────────
  { name: "UI/UX Design", icon: "🎨", proficiency: 82, category: "Design" },
  { name: "Motion Design", icon: "🎬", proficiency: 80, category: "Design" },
  { name: "3D Modeling", icon: "📐", proficiency: 65, category: "Design" },
];
