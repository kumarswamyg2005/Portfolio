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
      { name: 'JavaScript',  icon: 'SiJavascript',      color: '#F7DF1E' },
      { name: 'TypeScript',  icon: 'SiTypescript',      color: '#3178C6' },
      { name: 'C / C++',     icon: 'SiCplusplus',       color: '#00599C' },
      { name: 'HTML5',       icon: 'SiHtml5',           color: '#E34F26' },
      { name: 'CSS3',        icon: 'SiCss',             color: '#1572B6' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'React',        icon: 'SiReact',          color: '#61DAFB' },
      { name: 'Node.js',      icon: 'SiNodedotjs',      color: '#339933' },
      { name: 'Express',      icon: 'SiExpress',        color: '#ffffff' },
      { name: 'FastAPI',      icon: 'SiFastapi',        color: '#009688' },
      { name: 'TensorFlow',   icon: 'SiTensorflow',     color: '#FF6F00' },
      { name: 'PyTorch',      icon: 'SiPytorch',        color: '#EE4C2C' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss',    color: '#06B6D4' },
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'Git',          icon: 'SiGit',            color: '#F05032' },
      { name: 'GitHub',       icon: 'SiGithub',         color: '#ffffff' },
      { name: 'Docker',       icon: 'SiDocker',         color: '#2496ED' },
      { name: 'MongoDB',      icon: 'SiMongodb',        color: '#47A248' },
      { name: 'PostgreSQL',   icon: 'SiPostgresql',     color: '#4169E1' },
      { name: 'Linux',        icon: 'SiLinux',          color: '#FCC624' },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { name: 'Scikit-Learn', icon: 'SiScikitlearn',    color: '#F7931E' },
      { name: 'Keras',        icon: 'SiKeras',          color: '#D00000' },
      { name: 'OpenCV',       icon: 'SiOpencv',         color: '#5C3EE8' },
      { name: 'Pandas',       icon: 'SiPandas',         color: '#150458' },
      { name: 'NumPy',        icon: 'SiNumpy',          color: '#4DABCF' },
      { name: 'Jupyter',      icon: 'SiJupyter',        color: '#F37626' },
    ],
  },
]

export default skills
