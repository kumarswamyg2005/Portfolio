/**
 * ─── PROJECT DATA ───────────────────────────────────────────────────────────
 * Add / edit projects here. Each project auto-renders a card in the Projects section.
 *
 * Fields:
 *   id          – unique string key
 *   title       – project name
 *   description – 1-2 sentence summary
 *   tags        – tech stack array (shown as badges)
 *   github      – GitHub repo URL
 *   demoUrl     – live demo URL. Set to null or '' to show "Coming Soon" button.
 *   featured    – if true, card gets an accent highlight border
 */

const projects = [
  {
    id: 'cropscan',
    title: 'CropScan — AI Crop Disease Detector',
    description:
      'End-to-end deep learning application that identifies plant diseases from leaf images across 38 disease classes with 99.3% test accuracy. Built for farmers and agronomists to get instant, reliable diagnoses.',
    tags: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Flask', 'React'],
    github: 'https://github.com/kumarswamyg2005',
    demoUrl: 'https://crop-disease-detector-three.vercel.app/',
    featured: true,
  },
  {
    id: 'stocksensei',
    title: 'StockSensei AI',
    description:
      'AI-powered stock market analysis and prediction platform. Combines technical indicators, sentiment analysis, and deep learning models to forecast price movements and surface actionable insights.',
    tags: ['Python', 'React', 'TensorFlow', 'FastAPI', 'Pandas', 'MongoDB'],
    github: 'https://github.com/kumarswamyg2005/StockSense-Ai',
    demoUrl: 'https://stock-sense-ai-sigma.vercel.app/',
    featured: true,
  },
  {
    id: 'resume-builder',
    title: 'AI-Powered Resume Builder',
    description:
      'Generates polished, ATS-optimised professional resumes from a simple form input. Uses large language models to tailor bullet points, summaries, and keyword density per job description.',
    tags: ['React', 'Node.js', 'Express', 'OpenAI API', 'Tailwind CSS'],
    github: 'https://github.com/kumarswamyg2005/AI-Powered-Resume-Builder',
    demoUrl: 'https://ai-powered-resume-builder-lemon.vercel.app/',
    featured: false,
  },
  {
    id: 'sign-bridge',
    title: 'Sign Bridge',
    description:
      'Real-time sign language recognition and translation tool. Captures hand gestures via webcam, classifies them with a CNN, and outputs text/audio translations to bridge communication gaps.',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'React', 'WebSockets'],
    github: 'https://github.com/kumarswamyg2005/SignBridge',
    demoUrl: '',
    featured: false,
  },
  {
    id: 'manga-translator',
    title: 'Manga Translator',
    description:
      'AI-based manga and comic panel translation tool. Detects speech bubbles, extracts text with OCR, translates via NLP models, and re-renders translated text back into the original artwork layout.',
    tags: ['Python', 'PyTorch', 'OpenCV', 'EasyOCR', 'Flask'],
    github: 'https://github.com/kumarswamyg2005/Manga-translator',
    demoUrl: '',
    featured: false,
  },
]

export default projects
