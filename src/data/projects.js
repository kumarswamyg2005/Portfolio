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
    id: 'mental-health-signal-detector',
    title: 'Early Mental Health Signal Detector',
    description:
      'Privacy-first NLP decision-support tool for counselors and clinicians. Combines BERT embeddings with LIWC-style linguistic features, LIME explanations, and a Streamlit dashboard for local-only risk signal review.',
    tags: ['Python', 'BERT', 'NLP', 'LIME', 'Streamlit', 'PyTorch'],
    github: 'https://github.com/kumarswamyg2005/Early-Mental-Health-Signal-Detector',
    demoUrl: '',
    featured: true,
  },
  {
    id: 'real-air',
    title: 'Real-Air',
    description:
      'Real-time air quality and health-risk predictor for major Indian cities. Uses OpenAQ and Open-Meteo data, PyTorch LSTM forecasting, Prophet baselines, FastAPI, and a React + Leaflet geospatial dashboard.',
    tags: ['React', 'FastAPI', 'PyTorch', 'LSTM', 'Leaflet', 'SQLite'],
    github: 'https://github.com/kumarswamyg2005/Real-Air-Real-time-Air-Quality-Health-Risk-Predictor',
    demoUrl: '',
    featured: true,
  },
  {
    id: 'pricing-intelligence',
    title: 'Competitive Pricing Intelligence Dashboard',
    description:
      'Business analytics dashboard that turns competitor pricing, discounts, and customer review sentiment into strategy recommendations. Includes Selenium data capture, ARIMA forecasting, Groq LLM insights, and Slack sharing.',
    tags: ['Python', 'Streamlit', 'Plotly', 'Selenium', 'ARIMA', 'Groq'],
    github: 'https://github.com/kumarswamyg2005/Competitive-Pricing-Intelligence-Dashboard',
    demoUrl: '',
    featured: false,
  },
  {
    id: 'anime-tracker',
    title: 'AniVault — Anime Tracker',
    description:
      'Modern anime and manga tracking app with Netflix-style browsing, library status management, detail modals, comparison tools, profile stats, theme switching, and localStorage persistence.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    github: 'https://github.com/kumarswamyg2005/Anime-Tracker',
    demoUrl: '',
    featured: false,
  },
  {
    id: 'nlp-sentiment-dashboard',
    title: 'NLP Sentiment & Text Analytics Dashboard',
    description:
      'Full-stack text analytics platform for product review intelligence. Runs sentiment, NER, keyword extraction, BERTopic topic modeling, and BART summarization behind an interactive React + FastAPI dashboard.',
    tags: ['React', 'FastAPI', 'Transformers', 'spaCy', 'KeyBERT', 'BERTopic'],
    github: 'https://github.com/kumarswamyg2005/NLP-Sentiment-Text-Analytics-Dashboard',
    demoUrl: '',
    featured: false,
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
