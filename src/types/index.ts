/* ═══════════════════════════════════════════════════════════════════════════
   TYPE DEFINITIONS — 3D Porsche Portfolio
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  video?: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "frontend" | "fullstack" | "mobile" | "3d" | "ai";
}

export interface Skill {
  name: string;
  icon: string;
  proficiency: number; // 0–100
  category: SkillCategory;
}

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Tools"
  | "Design";

export interface Education {
  id: string;
  year: string;
  degree: string;
  institution: string;
  description?: string;
  gpa?: string;
  honors?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
  icon: string;
  stat?: string;
  statLabel?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface StatCounter {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
