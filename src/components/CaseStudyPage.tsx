import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Layers, 
  Palette, 
  Smartphone, 
  Megaphone, 
  CheckCircle2, 
  ArrowDown, 
  ExternalLink,
  Layout,
  Maximize2,
  Sparkles,
  Compass,
  Zap,
  Grid
} from 'lucide-react';

interface CaseStudyPageProps {
  onBackToHome: () => void;
  onContactClick: () => void;
  onBookClick: () => void;
  initialProjectId?: string;
}

export interface CaseStudyData {
  id: string;
  category: string;
  title: string;
  tagline: string;
  heroImage: string;
  client: string;
  industry: string;
  services: string[];
  timeline: string;
  role: string;
  liveUrl?: string;
  
  // Overview
  overviewImage: string;
  overviewHeading: string;
  overviewParagraph1: string;
  overviewParagraph2: string;
  
  // Challenge
  challengeImage: string;
  businessChallenge: string;
  userChallenge: string;
  designChallenge: string;
  
  // Approach
  approachImage: string;
  approachHeading: string;
  approachStrategy: string;
  approachUserThinking: string;
  approachBusinessGoals: string;
  
  // Solution
  solutionImage: string;
  solutionHeading: string;
  solutionBrandUXUI: string;
  solutionVisualLanguage: string;
  
  // Design Highlights (4 cards)
  highlights: {
    icon: 'brand' | 'ui' | 'responsive' | 'system';
    title: string;
    description: string;
  }[];
  
  // Gallery (8 images)
  gallery: {
    url: string;
    caption: string;
    category: string;
  }[];
  
  // Project Outcome
  outcomeImage: string;
  outcomeHeading: string;
  businessValue: string;
  designImpact: string;
  metrics: { value: string; label: string }[];
}

const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'healthcare-wellness',
    category: 'Healthcare Platform',
    title: 'ApexCare — Patient Portal & Telehealth Platform',
    tagline: 'Transforming complex medical data into an empathetic, human-centered digital care experience.',
    heroImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png',
    client: 'ApexCare Health Group',
    industry: 'Digital Health & Telemedicine',
    services: ['Branding', 'UI/UX Design', 'Design System', 'Development'],
    timeline: '12 Weeks',
    role: 'Lead Product Designer',
    liveUrl: 'https://example.com/apexcare',
    
    // Overview
    overviewImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-02_55_03-PM.png',
    overviewHeading: 'Reimagining Digital Healthcare for Modern Care Teams',
    overviewParagraph1: 'ApexCare is a leading digital health provider seeking to unify patient records, virtual consultations, and clinic management into a single platform.',
    overviewParagraph2: 'Our objective was to simplify complex clinical workflows, reduce patient anxiety, and build a cohesive design system that scales across web and mobile touchpoints.',
    
    // Challenge
    challengeImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
    businessChallenge: 'High user churn during onboarding due to intimidating clinical forms and multi-step verification.',
    userChallenge: 'Patients struggled to locate prescriptions, track health metrics, and schedule appointments on smaller screens.',
    designChallenge: 'Creating an accessible WCAG AA-compliant interface that balances medical precision with warm visual aesthetics.',
    
    // Approach
    approachImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-03_18_17-PM.png',
    approachHeading: 'Empathy-Driven Research & System Strategy',
    approachStrategy: 'We conducted 24 contextual interviews with physicians and patients to map user mental models and eliminate friction.',
    approachUserThinking: 'Prioritized progressive disclosure so critical diagnostic data is clear without overwhelming the user.',
    approachBusinessGoals: 'Aligned product milestones with enterprise compliance standards to accelerate pilot deployments.',
    
    // Solution
    solutionImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png',
    solutionHeading: 'Intuitive Navigation & Unified Design System',
    solutionBrandUXUI: 'Crafted a calming visual identity using soft slate tones and vibrant cobalt accents (#2563EB) for high contrast legibility.',
    solutionVisualLanguage: 'Paired Poppins typography with custom vector iconography and a strict 8pt grid for seamless responsive behavior.',
    
    // Design Highlights
    highlights: [
      {
        icon: 'brand',
        title: 'Visual Identity',
        description: 'Modern and memorable branding system tailored for clinical clarity and warmth.'
      },
      {
        icon: 'ui',
        title: 'UX Experience',
        description: 'Simple and intuitive user journeys reducing appointment booking to 3 taps.'
      },
      {
        icon: 'responsive',
        title: 'Responsive Design',
        description: 'Optimized seamlessly across desktop, tablet, and mobile displays.'
      },
      {
        icon: 'system',
        title: 'Design System',
        description: 'Scalable reusable UI components with accessible color contrast ratios.'
      }
    ],
    
    // Gallery (8 images)
    gallery: [
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png',
        caption: 'Patient Telehealth Dashboard & Appointments View',
        category: 'UI/UX Screen'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-02_55_03-PM.png',
        caption: 'Clinical Care Plan & Medication Schedule',
        category: 'Product Mockup'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/Mobileapp.png',
        caption: 'Mobile Health Companion App Navigation',
        category: 'Mobile Interface'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
        caption: 'Enterprise Care Team Analytics Dashboard',
        category: 'SaaS Platform'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_08_37-PM.png',
        caption: 'Social Media Growth & Patient Communication System',
        category: 'Marketing'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_54_00-PM.png',
        caption: 'Healthcare Brand Collateral & Packaging Guidelines',
        category: 'Branding'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-03_18_17-PM.png',
        caption: 'Mobile Vital Signs Tracker & Live Consultations',
        category: 'App Design'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png',
        caption: 'Responsive Web Portal Layout on Desktop and Tablet',
        category: 'Design System'
      }
    ],
    
    // Outcome
    outcomeImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/Mobileapp.png',
    outcomeHeading: 'Measurable Business Growth & Increased Engagement',
    businessValue: 'Increased digital appointment bookings by 42% while reducing support desk ticket volume by 65%.',
    designImpact: 'Streamlined development handoffs using tokenized Figma libraries, cutting feature rollout speed by half.',
    metrics: [
      { value: '+42%', label: 'Appointment Conversions' },
      { value: '-65%', label: 'Support Inquiries' },
      { value: '3.8x', label: 'Engineering Velocity' },
      { value: '98%', label: 'Accessibility Score' }
    ]
  },
  {
    id: 'enterprise-mobile',
    category: 'UI/UX & Mobile App',
    title: 'FlowMobile — Enterprise Workflow Management',
    tagline: 'Designing a frictionless mobile workspace for remote operational teams and field engineers.',
    heroImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/Mobileapp.png',
    client: 'FlowLogistics Corp',
    industry: 'Enterprise Mobility & Logistics',
    services: ['UI/UX', 'Mobile App', 'Prototyping', 'Design System'],
    timeline: '10 Weeks',
    role: 'Lead UX Designer',
    liveUrl: 'https://example.com/flowmobile',
    
    // Overview
    overviewImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-03_18_17-PM.png',
    overviewHeading: 'Streamlining Complex Field Workflows into Mobile Touchpoints',
    overviewParagraph1: 'FlowMobile equips field teams with real-time asset tracking, work order management, and offline task execution.',
    overviewParagraph2: 'We redesigned the mobile interface from the ground up, prioritizing one-handed ergonomic controls and outdoor readability.',
    
    // Challenge
    challengeImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
    businessChallenge: 'Technicians wasted 90 minutes per shift navigating legacy menus and inputting repetitive status reports.',
    userChallenge: 'Difficult to inspect high-density diagnostic data under sunlight or with safety gloves.',
    designChallenge: 'Creating an intuitive, gesture-driven bottom navigation system that works flawlessly offline.',
    
    // Approach
    approachImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png',
    approachHeading: 'User-Centered Prototyping & Field Testing',
    approachStrategy: 'Mapped field technician journeys in real working environments to pinpoint operational bottlenecks.',
    approachUserThinking: 'Replaced long text fields with automated barcode scans and micro-interaction toggles.',
    approachBusinessGoals: 'Targeted zero offline data loss and instant sync upon network reconnection.',
    
    // Solution
    solutionImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/Mobileapp.png',
    solutionHeading: 'Ergonomic Architecture & High-Contrast Design',
    solutionBrandUXUI: 'Introduced bottom-sheet navigation patterns and persistent action cards for fast single-thumb usage.',
    solutionVisualLanguage: 'High-contrast palette with vivid blue (#2563EB) interactive elements and bold status indicators.',
    
    // Highlights
    highlights: [
      {
        icon: 'brand',
        title: 'Visual Identity',
        description: 'Clean industrial branding designed for trust, speed, and precision.'
      },
      {
        icon: 'ui',
        title: 'UX Experience',
        description: 'Ergonomic bottom navigation optimized for single-handed operation.'
      },
      {
        icon: 'responsive',
        title: 'Responsive Design',
        description: 'Adapts smoothly across iOS smartphones, rugged tablets, and Android devices.'
      },
      {
        icon: 'system',
        title: 'Design System',
        description: 'High-contrast design tokens supporting dark, light, and outdoor high-glare modes.'
      }
    ],
    
    // Gallery
    gallery: [
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/Mobileapp.png',
        caption: 'FlowMobile Primary Dashboard & Work Order Overview',
        category: 'Mobile Screen'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-03_18_17-PM.png',
        caption: 'Asset Inspector & Live Diagnostics View',
        category: 'UI Interface'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
        caption: 'Enterprise Admin Web Console',
        category: 'Web Dashboard'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png',
        caption: 'Offline Sync Queue & Status Indicators',
        category: 'UX System'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_08_37-PM.png',
        caption: 'Enterprise Onboarding Communication Collateral',
        category: 'Marketing'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_54_00-PM.png',
        caption: 'Hardware Asset Tags & Packaging Guidelines',
        category: 'Packaging'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-02_55_03-PM.png',
        caption: 'Mobile Dark Mode & High Contrast Themes',
        category: 'Design System'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/Mobileapp.png',
        caption: 'Interactive Prototype & Micro-interactions',
        category: 'Prototype'
      }
    ],
    
    // Outcome
    outcomeImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
    outcomeHeading: '50% Faster Reporting & 96% Adoption Rate',
    businessValue: 'Technicians saved an average of 50% logging time per ticket, boosting daily job completions.',
    designImpact: 'Achieved 96% adoption among 1,200 active engineers within two weeks of launch.',
    metrics: [
      { value: '50%', label: 'Time Saved Logging Tasks' },
      { value: '96%', label: 'Active User Adoption' },
      { value: '100%', label: 'Offline Data Accuracy' },
      { value: '4.9/5', label: 'User Satisfaction Rating' }
    ]
  },
  {
    id: 'saas-dashboard',
    category: 'Website Design & SaaS',
    title: 'OmniFlow — AI Intelligence Dashboard & SaaS',
    tagline: 'Empowering data-driven decisions with real-time AI insights, automated reporting, and elegant design.',
    heroImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
    client: 'OmniFlow Analytics',
    industry: 'Artificial Intelligence & SaaS',
    services: ['UI/UX', 'Development', 'Branding', 'Design System'],
    timeline: '8 Weeks',
    role: 'Product Design Lead',
    liveUrl: 'https://example.com/omniflow',
    
    // Overview
    overviewImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_08_37-PM.png',
    overviewHeading: 'Turning Multi-Channel Analytics into Actionable Insights',
    overviewParagraph1: 'OmniFlow aggregates revenue, marketing, and user activity data into unified real-time dashboards for executives.',
    overviewParagraph2: 'We built a clean, customizable widget workspace that highlights key trends and predictive AI summaries without visual clutter.',
    
    // Challenge
    challengeImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png',
    businessChallenge: 'Overwhelming data density led to low daily active usage and missed revenue opportunities.',
    userChallenge: 'Executives found creating custom reporting views cumbersome and slow.',
    designChallenge: 'Designing flexible data visualizers that perform smoothly with thousands of live data points.',
    
    // Approach
    approachImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-02_55_03-PM.png',
    approachHeading: 'Modular Grid System & AI Assistant Integration',
    approachStrategy: 'Structured a drag-and-drop dashboard canvas that adapts to executive and analyst roles.',
    approachUserThinking: 'Embedded AI synthesis prompts directly inside chart cards to provide instant executive summaries.',
    approachBusinessGoals: 'Paved the path for enterprise subscription upgrades and increased platform stickiness.',
    
    // Solution
    solutionImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
    solutionHeading: 'Clean Typographic Hierarchy & Precision Analytics',
    solutionBrandUXUI: 'Deep neutral slate canvases paired with crisp blue (#2563EB) accents and custom interactive charts.',
    solutionVisualLanguage: 'Mathematical layout spacing, micro-animations, and responsive widget containers.',
    
    // Highlights
    highlights: [
      {
        icon: 'brand',
        title: 'Visual Identity',
        description: 'Refined brand language communicating speed, intelligence, and clarity.'
      },
      {
        icon: 'ui',
        title: 'UX Experience',
        description: 'Intuitive drag-and-drop widget grid with role-based dashboard presets.'
      },
      {
        icon: 'responsive',
        title: 'Responsive Design',
        description: 'Flawless viewing on desktop monitors, laptops, and executive tablets.'
      },
      {
        icon: 'system',
        title: 'Design System',
        description: 'Comprehensive chart component library with built-in dark/light modes.'
      }
    ],
    
    // Gallery
    gallery: [
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
        caption: 'OmniFlow Executive Analytics Dashboard View',
        category: 'SaaS Platform'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_08_37-PM.png',
        caption: 'AI Automated Reporting & Insights Generator',
        category: 'UI/UX Screen'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png',
        caption: 'Real-time Conversion Funnel & Heatmaps',
        category: 'Analytics UI'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/Mobileapp.png',
        caption: 'OmniFlow Mobile Companion Application',
        category: 'Mobile Interface'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_54_00-PM.png',
        caption: 'Brand Identity & Corporate Presentation System',
        category: 'Branding'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-02_55_03-PM.png',
        caption: 'Chart Component Library & Design System Tokens',
        category: 'Design System'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-03_18_17-PM.png',
        caption: 'Customizable Grid Builder & Widget Configuration',
        category: 'Interaction UX'
      },
      {
        url: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png',
        caption: 'Light/Dark Theme Adaptability in SaaS Portal',
        category: 'Product Experience'
      }
    ],
    
    // Outcome
    outcomeImage: 'https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_08_37-PM.png',
    outcomeHeading: '3x Active Engagement & 38% ARR Expansion',
    businessValue: 'Weekly active executive sessions tripled within 60 days of rolling out the new dashboard.',
    designImpact: 'Enabled the sales team to convert 38% more enterprise leads using live interactive product demos.',
    metrics: [
      { value: '3x', label: 'Executive Engagement' },
      { value: '+38%', label: 'ARR Expansion' },
      { value: '< 200ms', label: 'Render Latency' },
      { value: '94%', label: 'Customer CSAT' }
    ]
  }
];

export default function CaseStudyPage({ 
  onBackToHome, 
  onContactClick, 
  onBookClick,
  initialProjectId = 'healthcare-wellness'
}: CaseStudyPageProps) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(() => {
    const foundIdx = CASE_STUDIES.findIndex(p => p.id === initialProjectId);
    return foundIdx !== -1 ? foundIdx : 0;
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const project = CASE_STUDIES[currentProjectIndex];
  const nextProjectIndex = (currentProjectIndex + 1) % CASE_STUDIES.length;
  const prevProjectIndex = (currentProjectIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
  const nextProject = CASE_STUDIES[nextProjectIndex];

  // Scroll to top when switching case studies
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentProjectIndex]);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightboxImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % project.gallery.length);
    }
  };

  const prevLightboxImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  return (
    <div className="bg-white text-[#111827] font-poppins selection:bg-[#2563EB] selection:text-white min-h-screen">
      
      {/* Sticky Editorial Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2.5 text-sm font-medium text-[#111827] hover:text-[#2563EB] transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              <ArrowLeft size={16} className="text-slate-600 group-hover:text-[#2563EB] transition-colors" />
            </div>
            <span>Back to Studio</span>
          </button>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-medium font-mono">Case Study:</span>
            <span className="text-sm font-semibold text-[#111827]">{project.title.split('—')[0]}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBookClick}
              className="px-5 py-2.5 rounded-[20px] bg-[#2563EB] text-white text-xs font-medium tracking-wide hover:bg-blue-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">

        {/* ============================================================ */}
        {/* 1. HERO SECTION */}
        {/* ============================================================ */}
        <section className="relative px-6 pt-8 pb-16 max-w-[1280px] mx-auto">
          {/* Hero Banner with 25% Black Overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[65vh] min-h-[520px] rounded-[20px] overflow-hidden shadow-xl group aspect-[16/10]"
          >
            <img 
              src={project.heroImage} 
              alt={project.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            
            {/* 25% Black Overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Hero Text Overlay */}
            <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white z-10">
              {/* Top Left Category */}
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs uppercase tracking-widest text-white font-medium border border-white/20">
                  {project.category}
                </span>
              </div>

              {/* Main Heading & Short Summary */}
              <div className="max-w-3xl space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-poppins">
                  {project.title}
                </h1>

                <p className="text-base sm:text-xl font-normal text-slate-100 leading-relaxed max-w-2xl font-poppins pt-1">
                  {project.tagline}
                </p>

                {/* Hero Action Buttons: View Live & Next Project */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[20px] bg-[#2563EB] text-white text-xs uppercase font-medium tracking-wider hover:bg-blue-700 transition-all shadow-md cursor-pointer"
                    >
                      <span>View Live</span>
                      <ExternalLink size={14} />
                    </a>
                  )}

                  <button 
                    onClick={() => setCurrentProjectIndex(nextProjectIndex)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[20px] bg-white/20 backdrop-blur-md text-white text-xs uppercase font-medium tracking-wider hover:bg-white/30 border border-white/30 transition-all cursor-pointer"
                  >
                    <span>Next Project</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Overview Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 p-8 rounded-[20px] bg-[#F8FAFC] border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-sm"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium block mb-2">Client</span>
              <p className="text-sm font-semibold text-[#111827]">{project.client}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium block mb-2">Services</span>
              <div className="flex flex-wrap gap-1.5">
                {project.services.map((srv, idx) => (
                  <span key={idx} className="text-xs font-normal text-slate-700 bg-white border border-slate-200/80 px-2.5 py-1 rounded-full">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium block mb-2">Timeline</span>
              <p className="text-sm font-semibold text-[#111827]">{project.timeline}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium block mb-2">Role</span>
              <p className="text-sm font-semibold text-[#111827]">{project.role}</p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <div className="mt-12 flex justify-center">
            <a 
              href="#overview" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-[#2563EB] transition-colors py-2 px-4 rounded-full bg-slate-50 border border-slate-100"
            >
              <span>Scroll to explore</span>
              <ArrowDown size={14} className="animate-bounce text-[#2563EB]" />
            </a>
          </div>
        </section>


        {/* ============================================================ */}
        {/* 2. PROJECT OVERVIEW */}
        {/* Layout: Image Left -> Content Right */}
        {/* ============================================================ */}
        <section id="overview" className="bg-white py-28 sm:py-32 border-t border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Image Left */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7"
              >
                <div className="relative rounded-[20px] overflow-hidden border border-slate-100 bg-slate-50 shadow-md group aspect-[16/10]">
                  <img 
                    src={project.overviewImage} 
                    alt="Desktop Mockup Overview" 
                    className="w-full h-full object-cover rounded-[20px] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold text-[#111827] border border-slate-200">
                    Desktop Mockup
                  </div>
                </div>
              </motion.div>

              {/* Content Right */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 space-y-6"
              >
                <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-medium tracking-wider uppercase">
                  Overview
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight font-poppins">
                  {project.overviewHeading}
                </h2>

                <div className="space-y-4 text-base font-normal text-slate-600 leading-relaxed font-poppins">
                  <p>{project.overviewParagraph1}</p>
                  <p>{project.overviewParagraph2}</p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ============================================================ */}
        {/* 3. THE CHALLENGE */}
        {/* Layout: Text Left -> Image Right */}
        {/* Background: Light Gray (#F8FAFC) */}
        {/* ============================================================ */}
        <section className="bg-[#F8FAFC] py-28 sm:py-32 border-y border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Text Left */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 space-y-6"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-medium tracking-wider uppercase mb-3">
                    The Challenge
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight font-poppins">
                    Addressing Core Hurdles
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-[20px] bg-white border border-slate-200/80 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Business Challenge</span>
                    <p className="text-sm text-slate-700 font-normal leading-relaxed">{project.businessChallenge}</p>
                  </div>

                  <div className="p-6 rounded-[20px] bg-white border border-slate-200/80 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">User Challenge</span>
                    <p className="text-sm text-slate-700 font-normal leading-relaxed">{project.userChallenge}</p>
                  </div>

                  <div className="p-6 rounded-[20px] bg-white border border-slate-200/80 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Design Challenge</span>
                    <p className="text-sm text-slate-700 font-normal leading-relaxed">{project.designChallenge}</p>
                  </div>
                </div>
              </motion.div>

              {/* Image Right */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7"
              >
                <div className="relative rounded-[20px] overflow-hidden border border-slate-200/80 bg-white shadow-lg group aspect-[16/10]">
                  <img 
                    src={project.challengeImage} 
                    alt="Problem Illustration" 
                    className="w-full h-full object-cover rounded-[20px] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-medium">
                    Problem Diagnostics
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ============================================================ */}
        {/* 4. OUR APPROACH */}
        {/* Layout: Image Left -> Text Right */}
        {/* Background: White */}
        {/* ============================================================ */}
        <section className="bg-white py-28 sm:py-32 border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Image Left (Sticky Notes / Wireframes) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7"
              >
                <div className="relative rounded-[20px] overflow-hidden border border-slate-100 bg-slate-50 shadow-md group aspect-[16/10]">
                  <img 
                    src={project.approachImage} 
                    alt="Wireframes and Journey Maps" 
                    className="w-full h-full object-cover rounded-[20px] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 text-[#111827] backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold border border-slate-200">
                    Strategy & Wireframes
                  </div>
                </div>
              </motion.div>

              {/* Text Right */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 space-y-6"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-medium tracking-wider uppercase mb-3">
                    Design Approach
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight font-poppins">
                    {project.approachHeading}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="border-l-2 border-[#2563EB] pl-4 py-1">
                    <h3 className="text-sm font-semibold text-[#111827]">Strategic Alignment</h3>
                    <p className="text-sm font-normal text-slate-600 mt-1 leading-relaxed">{project.approachStrategy}</p>
                  </div>

                  <div className="border-l-2 border-slate-200 pl-4 py-1 hover:border-[#2563EB] transition-colors">
                    <h3 className="text-sm font-semibold text-[#111827]">User Thinking</h3>
                    <p className="text-sm font-normal text-slate-600 mt-1 leading-relaxed">{project.approachUserThinking}</p>
                  </div>

                  <div className="border-l-2 border-slate-200 pl-4 py-1 hover:border-[#2563EB] transition-colors">
                    <h3 className="text-sm font-semibold text-[#111827]">Business Goals</h3>
                    <p className="text-sm font-normal text-slate-600 mt-1 leading-relaxed">{project.approachBusinessGoals}</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ============================================================ */}
        {/* 5. THE SOLUTION */}
        {/* Layout: Text Left -> Image Right */}
        {/* Background: Light Gray (#F8FAFC) */}
        {/* ============================================================ */}
        <section className="bg-[#F8FAFC] py-28 sm:py-32 border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Text Left */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5 space-y-6"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-medium tracking-wider uppercase mb-3">
                    The Solution
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight font-poppins">
                    {project.solutionHeading}
                  </h2>
                </div>

                <div className="space-y-4 text-sm font-normal text-slate-600 leading-relaxed font-poppins">
                  <div className="p-5 rounded-[20px] bg-white border border-slate-200/80 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Brand Identity & UX/UI</span>
                    <p className="text-slate-700">{project.solutionBrandUXUI}</p>
                  </div>

                  <div className="p-5 rounded-[20px] bg-white border border-slate-200/80 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Visual Language & System</span>
                    <p className="text-slate-700">{project.solutionVisualLanguage}</p>
                  </div>
                </div>
              </motion.div>

              {/* Image Right (Final Product) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7"
              >
                <div className="relative rounded-[20px] overflow-hidden border border-slate-200/80 bg-white shadow-lg group aspect-[16/10]">
                  <img 
                    src={project.solutionImage} 
                    alt="Final Product Solution" 
                    className="w-full h-full object-cover rounded-[20px] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 text-[#111827] backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold border border-slate-200">
                    Final Product
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ============================================================ */}
        {/* 6. DESIGN HIGHLIGHTS */}
        {/* Centered Section, 4 Cards */}
        {/* Background: White */}
        {/* ============================================================ */}
        <section className="bg-white py-28 sm:py-32 border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-medium tracking-wider uppercase">
                Core Value
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#111827] leading-tight font-poppins">
                Design Highlights
              </h2>
              <p className="text-base text-slate-600 font-normal leading-relaxed font-poppins">
                Key craftsmanship pillars that made this project intuitive, beautiful, and scalable.
              </p>
            </div>

            {/* 4 Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.highlights.map((item, idx) => {
                let IconComponent = Palette;
                if (item.icon === 'ui') IconComponent = Layers;
                if (item.icon === 'responsive') IconComponent = Smartphone;
                if (item.icon === 'system') IconComponent = Grid;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-8 rounded-[20px] bg-[#F8FAFC] border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-[16px] bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                        <IconComponent size={22} />
                      </div>

                      <h3 className="text-lg font-bold text-[#111827] mb-2 font-poppins group-hover:text-[#2563EB] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm font-normal text-slate-600 leading-relaxed font-poppins">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-medium uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Crafted Feature</span>
                      <ArrowRight size={12} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>


        {/* ============================================================ */}
        {/* 7. PROJECT GALLERY */}
        {/* Large Masonry/Grid (8 images) with Lightbox & Hover Zoom */}
        {/* Background: Light Gray (#F8FAFC) */}
        {/* ============================================================ */}
        <section className="bg-[#F8FAFC] py-28 sm:py-32 border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-medium tracking-wider uppercase mb-3">
                  Visual Showcase
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold text-[#111827] leading-tight font-poppins">
                  Gallery
                </h2>
              </div>
              <p className="text-sm text-slate-500 max-w-md font-normal font-poppins">
                Click any image to view in fullscreen with full design details.
              </p>
            </div>

            {/* 8 Image Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.gallery.map((imgItem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onClick={() => openLightbox(idx)}
                  className={`group relative rounded-[20px] overflow-hidden border border-slate-200/80 bg-white cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${
                    idx === 0 || idx === 3 ? 'lg:col-span-2 lg:row-span-2 min-h-[380px]' : 'min-h-[260px]'
                  }`}
                >
                  <img 
                    src={imgItem.url} 
                    alt={imgItem.caption} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                        {imgItem.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Maximize2 size={14} />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium font-poppins text-white leading-snug">
                        {imgItem.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>


        {/* ============================================================ */}
        {/* LIGHTBOX MODAL */}
        {/* ============================================================ */}
        <AnimatePresence>
          {activeLightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            >
              <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 text-white/80 hover:text-white bg-white/10 p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Left Arrow */}
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur-md transition-colors cursor-pointer z-10"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur-md transition-colors cursor-pointer z-10"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image */}
                <div className="rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-black">
                  <img 
                    src={project.gallery[activeLightboxIndex].url} 
                    alt={project.gallery[activeLightboxIndex].caption}
                    className="max-h-[75vh] w-auto object-contain"
                  />
                </div>

                {/* Caption Bar */}
                <div className="mt-4 text-center text-white space-y-1">
                  <p className="text-sm font-medium font-poppins">
                    {project.gallery[activeLightboxIndex].caption}
                  </p>
                  <p className="text-xs text-slate-400 font-normal">
                    Image {activeLightboxIndex + 1} of {project.gallery.length} — {project.gallery[activeLightboxIndex].category}
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* ============================================================ */}
        {/* 8. PROJECT OUTCOME */}
        {/* Layout: Image Left -> Text Right */}
        {/* Background: White */}
        {/* ============================================================ */}
        <section className="bg-white py-28 sm:py-32 border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Image Left */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-6"
              >
                <div className="relative rounded-[20px] overflow-hidden border border-slate-100 bg-slate-50 shadow-md group aspect-[16/10]">
                  <img 
                    src={project.outcomeImage} 
                    alt="Result Mockup" 
                    className="w-full h-full object-cover rounded-[20px] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#2563EB] text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md">
                    Verified Result
                  </div>
                </div>
              </motion.div>

              {/* Text Right */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-6 space-y-6"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-medium tracking-wider uppercase mb-3">
                    Outcome
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight font-poppins">
                    {project.outcomeHeading}
                  </h2>
                </div>

                <div className="space-y-4 text-base font-normal text-slate-600 leading-relaxed font-poppins">
                  <p>{project.businessValue}</p>
                  <p>{project.designImpact}</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-5 rounded-[20px] bg-[#F8FAFC] border border-slate-200/80 shadow-sm">
                      <div className="text-2xl sm:text-3xl font-bold text-[#2563EB] font-poppins">{m.value}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ============================================================ */}
        {/* 9. NEXT PROJECT CARD */}
        {/* Background: Light Gray (#F8FAFC) */}
        {/* ============================================================ */}
        <section className="bg-[#F8FAFC] py-20 border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6">
            
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 font-mono">
                Explore More Case Studies
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentProjectIndex(prevProjectIndex)}
                  className="p-2.5 rounded-full bg-white border border-slate-200/80 hover:bg-blue-50 hover:text-[#2563EB] text-slate-700 transition-colors cursor-pointer"
                  title="Previous Project"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentProjectIndex(nextProjectIndex)}
                  className="p-2.5 rounded-full bg-white border border-slate-200/80 hover:bg-blue-50 hover:text-[#2563EB] text-slate-700 transition-colors cursor-pointer"
                  title="Next Project"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Next Project Card */}
            <div 
              onClick={() => setCurrentProjectIndex(nextProjectIndex)}
              className="group p-8 sm:p-12 rounded-[20px] bg-white border border-slate-200/80 hover:border-[#2563EB]/40 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl grid lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#2563EB]">
                    Up Next
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {nextProject.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors font-poppins">
                  {nextProject.title}
                </h3>

                <p className="text-sm text-slate-600 font-normal max-w-xl leading-relaxed font-poppins">
                  {nextProject.tagline}
                </p>

                <div className="inline-flex items-center gap-2 text-xs uppercase font-medium tracking-wider text-[#2563EB] pt-2">
                  <span>View Next Case Study</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[20px] overflow-hidden border border-slate-200/80 shadow-md aspect-[16/10]">
                  <img 
                    src={nextProject.heroImage} 
                    alt={nextProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================ */}
        {/* 10. CONTACT CTA */}
        {/* Abstract Background Shapes, Heading, Content, Buttons */}
        {/* ============================================================ */}
        <section className="relative py-28 sm:py-36 px-6 bg-white overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative rounded-[20px] overflow-hidden shadow-2xl bg-slate-950 text-white p-10 sm:p-20 text-center">
            
            {/* Abstract Background Shapes */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 via-slate-900/0 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* CTA Content */}
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs uppercase tracking-widest text-blue-300 font-semibold border border-white/10 font-mono">
                Let's Build Together
              </span>

              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight font-poppins">
                Have a Project in Mind?
              </h2>

              <p className="text-base text-slate-300 font-normal leading-relaxed font-poppins">
                Let's create something meaningful together. Reach out to discuss your goals, vision, or digital challenges.
              </p>

              <div className="pt-6 flex flex-wrap justify-center gap-4">
                <button
                  onClick={onBookClick}
                  className="px-8 py-4 rounded-[20px] bg-[#2563EB] text-white font-medium text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 cursor-pointer"
                >
                  Book Consultation
                </button>

                <button
                  onClick={onContactClick}
                  className="px-8 py-4 rounded-[20px] bg-white/10 text-white font-medium text-sm hover:bg-white/20 backdrop-blur-md transition-all border border-white/20 cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}
