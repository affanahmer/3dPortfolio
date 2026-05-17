import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Velocity Dashboard",
    description:
      "A real-time analytics dashboard with WebSocket-powered data streams, interactive charts, and dark mode UI. Built for monitoring high-frequency trading systems with sub-millisecond latency visualization.",
    shortDescription: "Real-time analytics dashboard with live data streams",
    image: "/projects/velocity-dashboard.webp",
    techStack: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js", "Redis"],
    features: [
      "Real-time data streaming via WebSocket",
      "Interactive D3.js charting with zoom/pan",
      "Sub-millisecond latency monitoring",
      "Custom dark theme design system",
    ],
    liveUrl: "https://velocity-dash.example.com",
    githubUrl: "https://github.com/username/velocity-dashboard",
    category: "fullstack",
  },
  {
    id: "project-2",
    title: "Neural Canvas",
    description:
      "An AI-powered creative tool that transforms text prompts into generative art using Stable Diffusion. Features a custom canvas editor with layers, masks, and real-time preview of AI-generated compositions.",
    shortDescription: "AI-powered generative art creation tool",
    image: "/projects/neural-canvas.webp",
    techStack: ["Next.js", "Python", "FastAPI", "Stable Diffusion", "Canvas API", "PostgreSQL"],
    features: [
      "Text-to-image generation with Stable Diffusion",
      "Layer-based canvas editor",
      "Real-time AI preview",
      "Gallery sharing system",
    ],
    liveUrl: "https://neural-canvas.example.com",
    githubUrl: "https://github.com/username/neural-canvas",
    category: "ai",
  },
  {
    id: "project-3",
    title: "Apex Mobile",
    description:
      "A cross-platform mobile fitness app with AR-powered exercise form analysis, personalized training plans, and social challenges. Uses device sensors for accurate rep counting and motion tracking.",
    shortDescription: "AR-powered fitness tracking mobile app",
    image: "/projects/apex-mobile.webp",
    techStack: ["React Native", "TypeScript", "TensorFlow Lite", "Firebase", "ARKit"],
    features: [
      "AR exercise form analysis",
      "AI-generated training plans",
      "Social challenge system",
      "Sensor-based rep counting",
    ],
    githubUrl: "https://github.com/username/apex-mobile",
    category: "mobile",
  },
  {
    id: "project-4",
    title: "Horizon Engine",
    description:
      "A WebGL-powered 3D product configurator for e-commerce. Customers can customize colors, materials, and components of products in real-time with photorealistic rendering and AR placement preview.",
    shortDescription: "3D product configurator with AR preview",
    image: "/projects/horizon-engine.webp",
    techStack: ["Three.js", "React", "GLSL", "Node.js", "Stripe", "AWS"],
    features: [
      "Real-time 3D product customization",
      "PBR material system",
      "AR placement via WebXR",
      "E-commerce integration with Stripe",
    ],
    liveUrl: "https://horizon-engine.example.com",
    githubUrl: "https://github.com/username/horizon-engine",
    category: "3d",
  },
  {
    id: "project-5",
    title: "Codex Platform",
    description:
      "A collaborative code review platform with AI-assisted suggestions, inline commenting, real-time cursors, and automated code quality scoring. Built for engineering teams to ship faster with fewer bugs.",
    shortDescription: "AI-assisted collaborative code review platform",
    image: "/projects/codex-platform.webp",
    techStack: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "OpenAI"],
    features: [
      "AI-powered code review suggestions",
      "Real-time collaborative editing",
      "Automated quality scoring",
      "GitHub/GitLab integration",
    ],
    liveUrl: "https://codex-platform.example.com",
    githubUrl: "https://github.com/username/codex-platform",
    category: "fullstack",
  },
  {
    id: "project-6",
    title: "Drift UI Kit",
    description:
      "An open-source React component library with 50+ animated components, dark mode support, and full TypeScript coverage. Designed with a focus on motion design and developer experience.",
    shortDescription: "Open-source animated React component library",
    image: "/projects/drift-ui.webp",
    techStack: ["React", "TypeScript", "Framer Motion", "Storybook", "Rollup", "CSS Modules"],
    features: [
      "50+ production-ready components",
      "Built-in animation system",
      "Full TypeScript support",
      "Storybook documentation",
    ],
    liveUrl: "https://drift-ui.example.com",
    githubUrl: "https://github.com/username/drift-ui",
    category: "frontend",
  },
];
