export const PROJECT_CATEGORIES = [
  { id: 'featured', label: 'Featured Projects' },
  { id: 'personal', label: 'Personal Projects' },
  { id: 'hackathon', label: 'Hackathon Projects' },
  { id: 'ai', label: 'Machine Learning & AI' },
  { id: 'college', label: 'College Projects' },
  { id: 'client', label: 'Client Projects' },
  { id: 'internship', label: 'Internship Projects' },
  { id: 'apl', label: 'APL Projects' },
  { id: 'other', label: 'Other Projects' },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]['id'];
export type ProjectPriority = 'P1' | 'P2' | 'P3';

export type PortfolioProject = {
  slug: string;
  title: string;
  category: 'react' | 'python' | 'js' | 'java';
  categories: ProjectCategory[];
  priority: ProjectPriority;
  context: string;
  summary: string;
  technologies: string[];
  repository: string;
  liveUrl?: string;
  repositoryCreatedAt?: string;
  status?: 'Built' | 'Prototype' | 'Incomplete';
  image?: string;
  features: string[];
};

/** Curated portfolio inventory. Dates are GitHub repository creation dates, not development dates. */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'weathergpt', title: 'WeatherGPT', category: 'python', categories: ['featured', 'hackathon', 'ai'], priority: 'P1',
    context: 'Smart India Hackathon project', summary: 'Weather information and conversational answers grounded in meteorological data. The repository documents current weather, forecast, radar, model-comparison and language features; live provider-backed capabilities depend on its configured services.',
    technologies: ['React', 'Node.js', 'FastAPI', 'Python', 'Gemini API', 'MongoDB'], repository: 'https://github.com/Code-AkarshMishra/WeatherGPT', liveUrl: 'https://weather-gpt-srmu.vercel.app/', repositoryCreatedAt: '2026-09-06', status: 'Built',
    features: ['Weather question answering and forecast views documented in the repository', 'The README documents radar, multiple forecast sources and regional-language UI', 'Uses external weather and AI services; availability depends on deployment configuration'],
  },
  {
    slug: 'neurotrack-ai', title: 'NeuroTrack AI', category: 'python', categories: ['featured', 'hackathon', 'ai', 'college'], priority: 'P1',
    context: 'NIT Delhi hackathon project · Cognitive Load Detector', summary: 'A multimodal cognitive-load and fatigue estimation prototype combining interaction signals with short webcam sampling. Its README says raw video frames are not stored. Scores are estimates for ergonomic feedback, not a medical diagnosis; the repository does not publish verified model-evaluation metrics.',
    technologies: ['React', 'Java Spring Boot', 'Python', 'OpenCV', 'scikit-learn'], repository: 'https://github.com/Code-AkarshMishra/CognitiveLoadDetector', liveUrl: 'https://neurotrackai.vercel.app', repositoryCreatedAt: '2026-08-26', status: 'Prototype',
    features: ['Tracks keyboard, mouse and session interaction signals', 'README documents 15-second webcam sampling for facial landmarks', 'No supported accuracy claim found in the repository documentation'],
  },
  {
    slug: 'post-office-portal', title: 'PostOffice Agent Window', category: 'react', categories: ['featured', 'personal'], priority: 'P1',
    context: 'India Post agent workflow portal', summary: 'A private agent and customer portal for recurring-deposit records and collections. The repository describes account search, deposit tracking, customer balance and maturity views, PDF ledger import, and collection workflows. No customer count is claimed here.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'], repository: 'https://github.com/Code-AkarshMishra/postofficeagentwindow', liveUrl: 'https://postofficeagentwindow.vercel.app', repositoryCreatedAt: '2026-05-01', status: 'Built',
    features: ['Recurring-deposit and collection record workflows described in the README', 'PDF ledger parsing for bulk account updates', 'Customer records are private and are not included in this portfolio'],
  },
  {
    slug: 'framesutra', title: 'FrameSutra', category: 'python', categories: ['featured', 'college', 'ai'], priority: 'P1',
    context: 'Local-first video analysis workspace', summary: 'A React and FastAPI workspace for analyzing local recordings or public YouTube videos. It supports transcripts, structured notes, search, study material, exports and source-grounded answers. The README explains that configured AI providers may receive transcript text or selected frames.',
    technologies: ['Python', 'FastAPI', 'React', 'Whisper', 'Chroma', 'SQLite'], repository: 'https://github.com/Code-AkarshMishra/FrameSutra', liveUrl: 'https://framesutra.onrender.com/', repositoryCreatedAt: '2026-10-25', status: 'Built',
    features: ['Transcription, summaries, notes and timestamped source excerpts', 'Search and question answering over analyzed material', 'Single-user local workspace; review repository privacy notes before processing sensitive media'],
  },
  {
    slug: 'medrx', title: 'MedRx — Medical Report AI', category: 'react', categories: ['featured', 'college', 'ai'], priority: 'P1',
    context: 'Semester 6 college capstone', summary: 'A full-stack MVP that accepts JPG, PNG and PDF medical reports, extracts text with OCR/PDF parsing, identifies health parameters and generates simple English or Hinglish explanations. Its output is informational and is not a diagnosis or a replacement for a clinician.',
    technologies: ['React', 'Express', 'MongoDB', 'Tesseract.js', 'pdf-parse', 'Gemini API'], repository: 'https://github.com/Code-AkarshMishra/MedRx', liveUrl: 'https://medrx-beta.vercel.app', repositoryCreatedAt: '2026-04-09', status: 'Built', image: '/projects/medrx.png',
    features: ['Image and PDF report input', 'OCR extraction and parameter explanations', 'Optional account-based report history is described in the repository'],
  },
  {
    slug: 'sparsh-trading', title: 'Sparsh Trading', category: 'react', categories: ['featured', 'client'], priority: 'P1',
    context: 'Client website · metal fabrication and uPVC services', summary: 'A business website presenting fabrication, uPVC and interior services, customer enquiry paths and company information. The repository also contains customer and admin workflows; the portfolio does not imply that financial trading is provided.',
    technologies: ['Next.js', 'TypeScript', 'MongoDB'], repository: 'https://github.com/Code-AkarshMishra/Sparsh-Trading', liveUrl: 'https://sparshtrading.vercel.app', repositoryCreatedAt: '2026-08-21', status: 'Built',
    features: ['Business and product/service presentation', 'Enquiry and customer-facing flows described in repository documentation', 'No securities or trading transactions are claimed'],
  },
  {
    slug: 'mahakalswarnbuilder', title: 'Mahakal Swarn Builder', category: 'react', categories: ['featured', 'client'], priority: 'P1',
    context: 'Client website · property and construction services', summary: 'A public business website and admin portal for presenting real-estate and construction services. The repository README describes configurable rates, materials, package specifications, tax settings and company details.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'], repository: 'https://github.com/Code-AkarshMishra/mahakalswarnbuilder', liveUrl: 'https://mahakalswarnbuilder.vercel.app', repositoryCreatedAt: '2026-05-03', status: 'Built',
    features: ['Public business and service information', 'Admin-managed rates and package details described in repository setup notes'],
  },
  {
    slug: 'leetsync', title: 'LeetSync', category: 'js', categories: ['featured', 'personal'], priority: 'P1',
    context: 'Browser extension · LeetCode to GitHub sync', summary: 'A Manifest V3 browser extension documented to sync accepted LeetCode submissions to GitHub, organize solutions by language/topic/question, and support bulk historical synchronization.',
    technologies: ['JavaScript', 'Chrome Extension APIs', 'LeetCode GraphQL', 'GitHub REST API'], repository: 'https://github.com/Code-AkarshMishra/LEETSYNC', repositoryCreatedAt: '2026-08-08', status: 'Built',
    features: ['Accepted-submission synchronization', 'Bulk historical sync with progress UI', 'Requires the user to configure a GitHub token locally in the extension'],
  },
  {
    slug: 'prepbot', title: 'PrepBot.AI', category: 'react', categories: ['hackathon'], priority: 'P2',
    context: 'HackWithUP project', summary: 'A learning platform with sign-in and routes for dashboards, academic levels, subjects, videos and theory. The source includes placeholder Quiz, Test and Report pages, so those workflows are not presented as complete.',
    technologies: ['React', 'Vite', 'React Router', 'Clerk'], repository: 'https://github.com/Code-AkarshMishra/Prepbot.ai', repositoryCreatedAt: '2025-11-02', status: 'Prototype', image: '/projects/prepbot.png',
    features: ['Signed-in learning routes for subjects, videos and theory', 'Quiz, test and report routes are explicit placeholders in the source'],
  },
  {
    slug: 'green-path', title: 'GreenPath', category: 'react', categories: ['hackathon'], priority: 'P3',
    context: 'TechFest project · environmental routing concept', summary: 'A project site for a proposed lower-pollution route planner. The repository has a landing page and describes a roadmap for mapping, route optimization and analytics; those roadmap items are not claimed as implemented.',
    technologies: ['Next.js', 'TypeScript', 'Mapbox'], repository: 'https://github.com/Code-AkarshMishra/GreenPath', repositoryCreatedAt: '2026-05-19', status: 'Prototype',
    features: ['Landing page with feature, demo, how-it-works and pricing sections', 'Repository roadmap lists route optimization and data integrations as planned work'],
  },
  {
    slug: 'enrole', title: 'ENROLE', category: 'python', categories: ['personal'], priority: 'P3',
    context: 'Recruitment platform concept', summary: 'The public repository currently contains a README placeholder stating that documentation will be updated. The interview, resume-analysis and scheduling capabilities have not been verified in the repository, so this is listed as an incomplete project record.',
    technologies: ['Python'], repository: 'https://github.com/Code-AkarshMishra/ENROLE', repositoryCreatedAt: '2026-04-27', status: 'Incomplete',
    features: ['No implemented recruitment workflow could be verified from the available repository documentation'],
  },
  {
    slug: 'simon-says', title: 'Simon Says Game', category: 'js', categories: ['personal'], priority: 'P3',
    context: 'Personal browser game', summary: 'A responsive memory game with start/restart controls, sound effects, animations and a high score saved in localStorage, as described by its repository.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'localStorage'], repository: 'https://github.com/Code-AkarshMishra/simon-says-game', liveUrl: 'https://code-akarshmishra.github.io/simon-says-game/', repositoryCreatedAt: '2025-08-04', status: 'Built',
    features: ['Repeat an increasing cue sequence', 'Sound and animation feedback', 'Local high-score tracking'],
  },
  {
    slug: 'krishna-turtle', title: 'Krishna Turtle Graphics', category: 'python', categories: ['personal'], priority: 'P3',
    context: 'Python Turtle Graphics', summary: 'A Python Turtle project that draws a Radha-Krishna themed image, according to its repository description.',
    technologies: ['Python', 'Turtle Graphics'], repository: 'https://github.com/Code-AkarshMishra/Krishna.tutleGraphics', repositoryCreatedAt: '2025-08-17', status: 'Built',
    features: ['Programmatic drawing using Python Turtle'],
  },
  {
    slug: 'audio-analyser-pro', title: 'Audio Analyser Pro', category: 'python', categories: ['personal'], priority: 'P2',
    context: 'Python audio analysis tool', summary: 'A Python tool with live microphone capture and recorded-clip analysis. The source uses PyAudio, NumPy, Matplotlib, SciPy and librosa; analysis/export options are being checked against the implementation.',
    technologies: ['Python', 'PyAudio', 'NumPy', 'Matplotlib', 'SciPy', 'librosa'], repository: 'https://github.com/Code-AkarshMishra/Audio-Analyzer-pro', repositoryCreatedAt: '2025-11-10', status: 'Built',
    features: ['15-second mono audio capture in the inspected implementation', 'Live visualization and post-recording analysis', 'Offers low-pass, high-pass and band-pass output files in source'],
  },
  {
    slug: 'qr-code-generator', title: 'QR Code Generator', category: 'python', categories: ['personal'], priority: 'P2',
    context: 'Flask utility · not deployed', summary: 'A Flask application with single QR image generation and bulk ZIP generation. The source logs submitted text in a local SQLite database; the repository says the planned Vercel deployment is not active.',
    technologies: ['Python', 'Flask', 'qrcode', 'SQLite'], repository: 'https://github.com/Code-AkarshMishra/QR-code-genrator', repositoryCreatedAt: '2026-03-13', status: 'Prototype',
    features: ['Download a QR PNG for one input', 'Generate a ZIP for multiple inputs', 'No live deployment is claimed'],
  },
  {
    slug: 'todo-python', title: 'To-Do List Using Python', category: 'python', categories: ['internship'], priority: 'P3',
    context: 'Vault of Codes Python internship', summary: 'A command-line task manager from the internship project. The source stores tasks in a local text file and supports adding, viewing, editing and deleting tasks.',
    technologies: ['Python', 'Text file storage'], repository: 'https://github.com/Code-AkarshMishra/To_Do_List-Uasing-python', repositoryCreatedAt: '2024-10-14', status: 'Built',
    features: ['Add, list, edit and delete tasks', 'Persists task rows to tasks.txt'],
  },
  {
    slug: 'registration-form', title: 'Registration Form — Assignment 2', category: 'js', categories: ['internship'], priority: 'P3',
    context: 'Vault of Codes web development internship', summary: 'A student registration form with identity/contact fields, password-strength feedback, date of birth, gender and language-interest selections. Submission behavior is documented in the source page.',
    technologies: ['HTML', 'CSS', 'JavaScript'], repository: 'https://github.com/Code-AkarshMishra/Assignment-2-Registration-Form-vaultofcodes', repositoryCreatedAt: '2026-02-03', status: 'Built',
    features: ['Required form fields and email input', 'Password-strength feedback and confirmation field', 'Language-interest checkboxes'],
  },
  {
    slug: 'vaultofcodes-portfolio', title: 'Portfolio Website — Vault of Codes', category: 'js', categories: ['internship'], priority: 'P3',
    context: 'Vault of Codes web development internship', summary: 'A responsive personal-portfolio assignment describing skills, interests, projects and contact information.',
    technologies: ['HTML', 'CSS', 'JavaScript'], repository: 'https://github.com/Code-AkarshMishra/Assignment-Portfolio-vaultofcodes', repositoryCreatedAt: '2026-02-03', status: 'Built',
    features: ['Profile, skill and project presentation', 'Contact information section'],
  },
  {
    slug: 'recipe-card', title: 'Recipe Card', category: 'js', categories: ['internship'], priority: 'P3',
    context: 'Vault of Codes frontend internship', summary: 'An interactive recipe card with toggleable ingredients and cooking steps. Its JavaScript advances a highlighted step when the visitor selects Start Cooking.',
    technologies: ['HTML', 'CSS', 'JavaScript'], repository: 'https://github.com/Code-AkarshMishra/RecipeCard', liveUrl: 'https://code-akarshmishra.github.io/RecipeCard/', repositoryCreatedAt: '2026-02-03', status: 'Built',
    features: ['Show or hide ingredients and steps', 'Step-by-step cooking focus control'],
  },
  {
    slug: 'amazon-clone', title: 'Amazon Clone', category: 'js', categories: ['internship'], priority: 'P3',
    context: 'Frontend practice project', summary: 'A static HTML/CSS storefront page inspired by an e-commerce layout. No real checkout or purchasing functionality is claimed; this is not affiliated with Amazon.',
    technologies: ['HTML', 'CSS'], repository: 'https://github.com/Code-AkarshMishra/AmazonStaticClone', repositoryCreatedAt: '2025-06-05', status: 'Built',
    features: ['Static storefront layout and product imagery'],
  },
  {
    slug: 'quickbuild', title: 'QuickBuild — Vault of Codes', category: 'js', categories: ['internship'], priority: 'P3',
    context: 'Vault of Codes internship task', summary: 'A single-page internship listings/portal landing page. Repository metadata describes responsive cards styled with Flexbox and hover effects; it is not a construction or software-building product.',
    technologies: ['HTML', 'CSS'], repository: 'https://github.com/Code-AkarshMishra/QuickBuild-taskVaultofcodes', repositoryCreatedAt: '2026-02-03', status: 'Built',
    features: ['Internship listing cards', 'Responsive Flexbox layout and hover treatment'],
  },
  {
    slug: 'hotel-booking-system', title: 'Hotel Booking System', category: 'js', categories: ['internship'], priority: 'P3',
    context: 'Vault of Codes web development internship', summary: 'A frontend booking-cost calculator. It calculates room, add-on, service and GST amounts from form selections and dates; it does not make real reservations or payments.',
    technologies: ['HTML', 'CSS', 'JavaScript'], repository: 'https://github.com/Code-AkarshMishra/Hotel-Booking-System', repositoryCreatedAt: '2026-02-03', status: 'Built',
    features: ['Room and add-on selection', 'Stay-duration and charge calculation', 'No backend reservation or payment workflow'],
  },
  {
    slug: 'jansunwai', title: 'JanSunwai', category: 'react', categories: ['apl', 'other'], priority: 'P2',
    context: 'APL project', summary: 'A web application project in the APL repository. The public repository describes its context but does not provide enough accessible documentation to claim a specific government relationship or live grievance-resolution workflow.',
    technologies: ['JavaScript', 'React'], repository: 'https://github.com/Code-AkarshMishra/jansunwai', liveUrl: 'https://jansunwai-xi.vercel.app', repositoryCreatedAt: '2026-05-22', status: 'Prototype',
    features: ['Project page available at the linked deployment', 'Not represented as an official government service'],
  },
];

export function getPortfolioProject(slug: string) {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
}
