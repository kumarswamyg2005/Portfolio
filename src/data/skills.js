/**
 * ─── SKILLS DATA ────────────────────────────────────────────────────────────
 * Edit categories and skill names/colors freely.
 * Icons are resolved inside Skills.jsx via a static import map —
 * add new icons to the ICON_MAP there as well.
 */

const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'Python',      icon: 'SiPython',          color: '#3776AB' },
      { name: 'TypeScript',  icon: 'SiTypescript',      color: '#3178C6' },
      { name: 'JavaScript',  icon: 'SiJavascript',      color: '#F7DF1E' },
      { name: 'SQL',         icon: 'SiPostgresql',      color: '#4169E1' },
      { name: 'HTML5',       icon: 'SiHtml5',           color: '#E34F26' },
      { name: 'CSS3',        icon: 'SiCss',             color: '#1572B6' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React',        icon: 'SiReact',          color: '#61DAFB' },
      { name: 'Next.js',      icon: 'SiNextdotjs',      color: '#ffffff' },
      { name: 'Redux Toolkit',icon: 'SiRedux',          color: '#764ABC' },
      { name: 'Three.js',     icon: 'SiThreedotjs',     color: '#ffffff' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss',    color: '#06B6D4' },
      { name: 'Vite',         icon: 'SiVite',           color: '#646CFF' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js',      icon: 'SiNodedotjs',      color: '#339933' },
      { name: 'Express',      icon: 'SiExpress',        color: '#ffffff' },
      { name: 'FastAPI',      icon: 'SiFastapi',        color: '#009688' },
      { name: 'Flask',        icon: 'SiFlask',          color: '#ffffff' },
      { name: 'Socket.io',    icon: 'SiSocketdotio',    color: '#ffffff' },
      { name: 'JWT Auth',     icon: 'SiJsonwebtokens',  color: '#d63aff' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL',   icon: 'SiPostgresql',     color: '#4169E1' },
      { name: 'MongoDB',      icon: 'SiMongodb',        color: '#47A248' },
      { name: 'Redis',        icon: 'SiRedis',          color: '#DC382D' },
      { name: 'Prisma ORM',   icon: 'SiPrisma',         color: '#ffffff' },
    ],
  },
  {
    category: 'GenAI & LLM Systems',
    items: [
      { name: 'MCP',          icon: 'SiOpenai',         color: '#ffffff' },
      { name: 'ONNX Runtime', icon: 'SiOnnx',           color: '#a78bfa' },
      { name: 'PyTorch',      icon: 'SiPytorch',        color: '#EE4C2C' },
      { name: 'TensorFlow',   icon: 'SiTensorflow',     color: '#FF6F00' },
      { name: 'OpenCV',       icon: 'SiOpencv',         color: '#5C3EE8' },
      { name: 'Pandas',       icon: 'SiPandas',         color: '#a78bfa' },
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'Docker',       icon: 'SiDocker',         color: '#2496ED' },
      { name: 'GitHub Actions',icon: 'SiGithubactions', color: '#2088FF' },
      { name: 'Git',          icon: 'SiGit',            color: '#F05032' },
      { name: 'GitHub',       icon: 'SiGithub',         color: '#ffffff' },
      { name: 'pytest',       icon: 'SiPytest',         color: '#0A9EDC' },
      { name: 'Jest',         icon: 'SiJest',           color: '#C21325' },
      { name: 'Stripe',       icon: 'SiStripe',         color: '#635BFF' },
      { name: 'Vercel',       icon: 'SiVercel',         color: '#ffffff' },
    ],
  },
]

export default skills
