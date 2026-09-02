/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import ProjectsPage from './components/ProjectsPage';
import CaseStudyPage from './components/CaseStudyPage';
import BookingModal from './components/BookingModal';
import { 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Instagram, 
  Linkedin, 
  ArrowUpRight,
  Menu,
  X,
  Compass,
  Layers,
  Sparkles,
  Award,
  Palette,
  Smartphone,
  Laptop,
  Package,
  Utensils,
  Megaphone,
  Briefcase,
  Printer,
  Presentation,
  Target,
  BookOpen,
  Heart,
  ShoppingBag,
  Home,
  GraduationCap,
  Building2,
  Rocket,
  Cpu,
  Factory,
  Box,
  CheckCircle2,
  Clock,
  Workflow,
  FileText,
  Sliders,
  ShieldCheck,
  Check
} from 'lucide-react';

export const whatsappLink = "https://wa.me/917977765228?text=" + encodeURIComponent(
`Hello AAKAR Studio,

I came across your website and would like to know more about your services.

My requirement is:
□ Branding
□ UI/UX Design
□ Website Design
□ Mobile App Design
□ Social Media Marketing
□ Other

Looking forward to connecting.`
);

// --- Components ---

const Navbar = ({ onBookClick, onCaseStudyClick }: { onBookClick: () => void; onCaseStudyClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    
    const handleScroll = () => {
      const currentY = window.scrollY;
      
      // Control scrolled state (threshold for background)
      if (currentY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide or show navbar based on scroll direction
      if (currentY <= 60) {
        // Always display at the top of the page
        setVisible(true);
      } else if (currentY > lastY) {
        // Scrolling down -> hide
        setVisible(false);
        setIsOpen(false); // Close mobile menu if open during scroll
      } else {
        // Scrolling up -> show
        setVisible(true);
      }
      
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Experience', href: '#experience' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
  ];

  return (
    <nav 
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out rounded-full ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-28 scale-95 pointer-events-none'
      } top-6 w-[95%] max-w-7xl py-4 px-8 border ${
        scrolled 
          ? 'bg-brand-paper/95 backdrop-blur-md border-brand-ink/10 shadow-xl shadow-brand-ink/5' 
          : 'bg-brand-paper/50 backdrop-blur-sm border-brand-ink/5 shadow-sm shadow-brand-ink/2'
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <a href="#" className="font-serif text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
          AAKAR <span className="text-brand-accent italic">Studio</span><span className="text-brand-accent">.</span>
        </a>
 
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-widest font-medium hover:text-brand-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            id="nav-book-a-call"
            onClick={onBookClick}
            className="px-5 py-1.5 border border-brand-ink text-xs uppercase tracking-widest hover:bg-brand-ink hover:text-brand-paper transition-all cursor-pointer bg-transparent rounded-full font-semibold"
          >
            Book a Call
          </button>
        </div>
 
        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-ink bg-transparent border-none cursor-pointer p-1">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
 
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="absolute top-full left-0 w-full bg-brand-paper/95 backdrop-blur-md border border-brand-ink/10 p-8 flex flex-col items-center gap-6 md:hidden shadow-2xl rounded-2xl mt-3"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase tracking-widest font-medium text-brand-ink hover:text-brand-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              id="mob-nav-book-a-call"
              onClick={() => { setIsOpen(false); onBookClick(); }}
              className="w-full text-center py-3 bg-brand-ink text-brand-paper text-xs uppercase tracking-widest cursor-pointer border-none rounded-full font-semibold"
            >
              Book a Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBookClick }: { onBookClick: () => void }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const giantTextY = useTransform(scrollYProgress, [0, 1], ["10%", "-60%"]);
  const circleY = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-brand-paper">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-brand-accent"></span>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-brand-muted">DIGITAL PRODUCT DESIGN STUDIO</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.05] -ml-1 font-serif tracking-tight font-light text-brand-ink">
            Designing <br />
            <span className="italic text-brand-accent font-normal">Digital Products</span> <br />
            That People Love <br />
            to Use<span className="text-brand-accent">.</span>
          </h1>
          <p className="max-w-xl text-base text-brand-muted mb-10 font-light leading-relaxed">
            AAKAR Studio helps startups, SaaS companies, enterprises, and ambitious businesses transform ideas into intuitive digital products through product strategy, UX research, UI/UX design, design systems, branding, and growth-focused digital experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#work" className="group px-8 py-4 bg-brand-ink text-brand-paper flex items-center gap-3 hover:translate-y-[-2px] transition-transform">
              <span className="text-sm uppercase tracking-widest">View Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={onBookClick} 
              className="px-8 py-4 border border-brand-ink/20 text-brand-ink hover:bg-brand-ink/5 transition-colors cursor-pointer bg-transparent"
            >
              <span className="text-sm uppercase tracking-widest font-bold">Book Consultation</span>
            </button>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="aspect-[3/4] relative rounded-t-[200px] overflow-hidden border border-brand-ink/5">
            <img 
              src="https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/homebanner.png" 
              alt="Aakar Studio Design Banner"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-paper/40 to-transparent"></div>
          </div>
          {/* Decorative Elements */}
          <motion.div 
            style={{ y: circleY }}
            className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl -z-10"
          ></motion.div>
          <div className="absolute top-20 -left-10 text-xs uppercase tracking-widest flex items-center gap-4 [writing-mode:vertical-rl] opacity-40">
            <span>Since 1999</span>
            <span className="w-[1px] h-24 bg-brand-ink"></span>
          </div>
        </motion.div>
      </div>

      {/* Floating Background Text */}
      <motion.div 
        style={{ y: giantTextY }}
        className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none translate-y-1/4"
      >
        <span className="text-[30rem] font-serif leading-none italic font-bold">Aakar</span>
      </motion.div>
    </section>
  );
};

const About = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], ["-10%", "35%"]);
  const colY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section ref={containerRef} id="about" className="py-24 bg-brand-ink text-brand-paper overflow-hidden relative">
      {/* Background Parallax Typography */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute left-6 top-10 text-[30rem] font-serif font-bold italic text-brand-paper/[0.015] select-none pointer-events-none leading-none z-0"
      >
        Aakar
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start relative z-10">
        <motion.div style={{ y: colY }} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">WHO WE ARE</span>
            <h2 className="text-5xl md:text-7xl font-light text-brand-paper mb-4 leading-tight">
              About <span className="italic text-brand-accent">Aakar</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-light leading-relaxed text-brand-accent max-w-xl font-serif italic mb-8">
              Built on 25+ Years of Design Excellence. Focused on the Future of Digital Products.
            </h3>
            <p className="text-base font-light text-brand-paper/85 leading-relaxed max-w-xl mb-6">
              AAKAR Studio is a Digital Product Design Studio built on more than 25 years of professional design experience.
            </p>
            <p className="text-base font-light text-brand-paper/85 leading-relaxed max-w-xl mb-6">
              While the studio represents a new beginning, the expertise behind it has been shaped by decades of designing enterprise software, SaaS platforms, healthcare applications, mobile products, websites, branding systems, packaging, and digital marketing experiences.
            </p>
            <p className="text-base font-light text-brand-paper/85 leading-relaxed max-w-xl mb-6">
              We believe successful products are created where business strategy, user experience, and beautiful design come together. Every project is approached with curiosity, precision, and a commitment to solving real business challenges while delivering exceptional user experiences.
            </p>
            <p className="text-base font-light text-brand-paper/85 leading-relaxed max-w-xl mb-6">
              From startups building their first MVP to established enterprises modernizing their products, we help organizations create digital experiences that are intuitive, scalable, and designed for growth.
            </p>
            <p className="text-lg font-serif italic text-brand-accent leading-relaxed max-w-xl mb-8">
              "Great products aren't just beautifully designed—they solve meaningful problems and create lasting value."
            </p>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-brand-paper/10 pt-8">
            <div>
              <div className="text-5xl font-serif mb-2 text-brand-accent">25<span className="text-brand-paper text-2xl font-sans">+</span></div>
              <div className="text-[10px] uppercase tracking-widest text-brand-paper/50">YEARS OF PROFESSIONAL DESIGN EXPERIENCE</div>
            </div>
            <div>
              <div className="text-5xl font-serif mb-2 text-brand-accent">150<span className="text-brand-paper text-2xl font-sans">+</span></div>
              <div className="text-[10px] uppercase tracking-widest text-brand-paper/50">PROJECTS DELIVERED</div>
            </div>
          </div>
        </motion.div>
 
        <motion.div style={{ y: colY }} className="space-y-12 pt-12 md:pt-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border-l-2 border-brand-accent/50 pl-6 py-2"
          >
            <p className="text-lg text-brand-paper/90 font-light leading-relaxed font-serif italic">
              "We partner with businesses that believe great design is a competitive advantage. Every project is built around understanding users, simplifying complexity, and creating digital products that help businesses grow with confidence."
            </p>
          </motion.div>
          
          <div className="border-t border-brand-paper/10 pt-12 grid gap-8">
            <div className="flex gap-6 items-start group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Compass size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">✦ PRODUCT THINKING</h4>
                <p className="text-xs text-brand-paper/50 leading-relaxed">Every design decision begins with understanding user problems and business objectives.</p>
              </div>
            </div>
 
            <div className="flex gap-6 items-start group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Target size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">✦ BUSINESS-DRIVEN DESIGN</h4>
                <p className="text-xs text-brand-paper/50 leading-relaxed">Combining user experience, strategy, and commercial thinking to create measurable outcomes.</p>
              </div>
            </div>
 
            <div className="flex gap-6 items-start group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Laptop size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">✦ SCALABLE DIGITAL PRODUCTS</h4>
                <p className="text-xs text-brand-paper/50 leading-relaxed">Designing SaaS platforms, enterprise software, websites, and mobile applications that grow with your business.</p>
              </div>
            </div>
 
            <div className="flex gap-6 items-start group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Award size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">✦ DESIGN SYSTEMS</h4>
                <p className="text-xs text-brand-paper/50 leading-relaxed">Creating scalable design foundations that improve consistency and accelerate development.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const colY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const bgBadgeY = useTransform(scrollYProgress, [0, 1], ["-12%", "30%"]);

  const coreExpertise = [
    { name: "Product Strategy", icon: <Target size={16} /> },
    { name: "UX Research", icon: <Compass size={16} /> },
    { name: "UI Design", icon: <Palette size={16} /> },
    { name: "SaaS Product Design", icon: <Layers size={16} /> },
    { name: "Enterprise Applications", icon: <Laptop size={16} /> },
    { name: "Mobile Applications", icon: <Smartphone size={16} /> },
    { name: "Web Applications", icon: <Laptop size={16} /> },
    { name: "Dashboard Design", icon: <Layers size={16} /> },
    { name: "Design Systems", icon: <Award size={16} /> },
    { name: "Healthcare UX", icon: <Heart size={16} /> },
    { name: "Branding", icon: <Palette size={16} /> },
    { name: "Packaging Design", icon: <Package size={16} /> },
    { name: "Growth Marketing Design", icon: <Megaphone size={16} /> },
    { name: "Creative Direction", icon: <Compass size={16} /> },
    { name: "Visual Communication", icon: <Sparkles size={16} /> }
  ];

  return (
    <section ref={containerRef} id="experience" className="py-24 bg-brand-paper overflow-hidden border-b border-brand-ink/5 relative">
      {/* Absolute background element */}
      <motion.div 
        style={{ y: bgBadgeY }} 
        className="absolute right-0 bottom-10 text-[18rem] font-serif italic text-brand-ink/[0.015] select-none pointer-events-none"
      >
        Expertise
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-start relative z-10">
        <motion.div
          style={{ y: colY }}
          className="lg:col-span-5 relative"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">OUR JOURNEY</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight text-brand-ink">
              More Than Design.<br />
              <span className="italic text-brand-accent">Designing Products</span>, Brands & Digital Experiences Since 1999.
            </h2>
            <div className="relative pl-8 border-l border-brand-accent/30 space-y-6">
              <div className="text-brand-muted text-sm font-light leading-relaxed">
                Technology has evolved dramatically over the last two decades—and so has our journey.
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-5xl font-serif font-semibold text-brand-ink">25+</span>
                <span className="text-xs uppercase tracking-wider text-brand-muted leading-tight">Years of<br />Craftsmanship</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: colY }} className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-base text-brand-muted/90 font-light leading-relaxed"
          >
            <p>
              From branding, packaging, and print communication to enterprise applications, SaaS products, AI-powered interfaces, healthcare platforms, and modern digital ecosystems, our experience spans every stage of digital transformation.
            </p>
            <p>
              This multidisciplinary background enables us to understand business strategy, user behavior, technology, and visual communication, creating products that are both elegant and commercially successful.
            </p>
          </motion.div>

          <div className="border-t border-brand-ink/10 pt-12">
            <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-brand-accent mb-8">Core Expertise</h3>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              {coreExpertise.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex items-center gap-3 py-1 group cursor-default"
                >
                  <span className="text-brand-accent bg-brand-accent/5 p-1.5 rounded-md transform group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </span>
                  <span className="text-sm font-light text-brand-ink group-hover:text-brand-accent transition-colors duration-300">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Capabilities = () => {
  const [activeTab, setActiveTab] = useState<'phases' | 'models'>('phases');
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgCircleY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const scopePhases = [
    {
      number: "01",
      title: "Strategic Discovery & Product Architecture",
      subtitle: "Laying a rock-solid foundation before moving a single pixel.",
      icon: <Compass className="text-brand-accent" size={24} />,
      duration: "Weeks 1 — 3",
      tag: "Discovery & Strategy",
      focusAreas: [
        "Product vision mapping & stakeholder interviews",
        "Competitor benchmarking & UX heuristic teardowns",
        "User persona development & journey mapping",
        "Information architecture & global sitemap structuring"
      ],
      deliverables: [
        "Interactive IA Map",
        "User Journey Maps",
        "UX Heuristic Audit",
        "Feature Prioritization Matrix"
      ]
    },
    {
      number: "02",
      title: "Interactive UX Wireframing & Prototyping",
      subtitle: "Validating workflows, navigation ergonomics, and edge cases.",
      icon: <Workflow className="text-brand-accent" size={24} />,
      duration: "Weeks 3 — 6",
      tag: "UX & Ergonomics",
      focusAreas: [
        "Low & high-fidelity structural wireframing",
        "Multi-role user flows & permission matrixes",
        "Rapid clickable prototyping for user testing",
        "Ergonomic mobile & desktop interaction design"
      ],
      deliverables: [
        "Clickable Figma Prototype",
        "Edge-case Inventory",
        "User Flow Diagrams",
        "Usability Validation Report"
      ]
    },
    {
      number: "03",
      title: "High-Fidelity UI, Brand & Design Systems",
      subtitle: "Pixel-perfect visual craftsmanship backed by tokenized systems.",
      icon: <Palette className="text-brand-accent" size={24} />,
      duration: "Weeks 6 — 10",
      tag: "UI & Design System",
      focusAreas: [
        "Modern visual identity & interface styling",
        "Atomic component libraries with auto-layout",
        "WCAG AA accessible color contrast & type scales",
        "Light & Dark theme adaptability across all screens"
      ],
      deliverables: [
        "Tokenized Figma UI Kit",
        "Responsive Breakpoints (Mobile to 4K)",
        "Micro-interaction Specs",
        "Brand Style Guidelines"
      ]
    },
    {
      number: "04",
      title: "Production Handoff, Governance & Scale",
      subtitle: "Bridging design and engineering with zero ambiguity.",
      icon: <CheckCircle2 className="text-brand-accent" size={24} />,
      duration: "Weeks 10 — 12+",
      tag: "Engineering Handoff",
      focusAreas: [
        "Production-ready Figma redlines & design tokens",
        "Zeroheight / Storybook design-to-code alignment",
        "Active design QA during front-end implementation",
        "Post-launch user testing & conversion optimization"
      ],
      deliverables: [
        "Dev Handoff Specifications",
        "Production Asset Bundle (SVG/WebP)",
        "Design QA Checklist",
        "Go-To-Market Design Toolkit"
      ]
    }
  ];

  const engagementModels = [
    {
      type: "Model 01",
      name: "Fixed-Scope Product Sprint",
      ideal: "Best for MVPs, 0-to-1 products, or focused feature overhauls.",
      timeline: "4 — 8 Weeks",
      features: [
        "Dedicated scope with agreed milestones",
        "Full UX architecture & high-fidelity UI",
        "Interactive prototype & dev handoff",
        "2 rounds of milestone reviews per phase"
      ],
      highlight: "Guaranteed Turnaround"
    },
    {
      type: "Model 02",
      name: "Embedded Design Partner",
      ideal: "Best for scaling SaaS & high-growth enterprise teams.",
      timeline: "Monthly Retainer (3+ Months)",
      features: [
        "Continuous product feature design & iterations",
        "Active design system scaling & maintenance",
        "Direct Slack & asynchronous Figma collaboration",
        "Bi-weekly sprint planning & team alignment"
      ],
      highlight: "High Flexibility"
    },
    {
      type: "Model 03",
      name: "Design System & UX Teardown",
      ideal: "Best for existing products needing modern UI & consistency.",
      timeline: "2 — 4 Weeks",
      features: [
        "Comprehensive UI/UX heuristic audit",
        "Component refactoring into tokenized auto-layout",
        "Accessibility & contrast ratio overhaul",
        "Developer token integration guidelines"
      ],
      highlight: "Fast Impact"
    }
  ];

  return (
    <section ref={containerRef} id="capabilities" className="py-24 bg-brand-ink text-brand-paper relative overflow-hidden border-b border-brand-paper/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-mono font-medium uppercase tracking-widest mb-6">
              <Workflow size={14} />
              <span>Full-Cycle Delivery Framework</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-brand-paper leading-[1.1]">
              Our Scope & <br />
              <span className="italic text-brand-accent font-serif">Delivery Architecture</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-brand-paper/70 font-light leading-relaxed mb-6">
              Unlike generic agency retainers, our scope is engineered around tangible deliverables, measurable milestones, and production-ready design tokens that developers love.
            </p>

            {/* View Switcher Tabs */}
            <div className="inline-flex p-1.5 rounded-xl bg-brand-paper/[0.06] border border-brand-paper/10">
              <button
                onClick={() => setActiveTab('phases')}
                className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'phases'
                    ? 'bg-brand-accent text-brand-ink shadow-md font-semibold'
                    : 'text-brand-paper/60 hover:text-brand-paper hover:bg-brand-paper/[0.04]'
                }`}
              >
                01. Delivery Phases
              </button>
              <button
                onClick={() => setActiveTab('models')}
                className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'models'
                    ? 'bg-brand-accent text-brand-ink shadow-md font-semibold'
                    : 'text-brand-paper/60 hover:text-brand-paper hover:bg-brand-paper/[0.04]'
                }`}
              >
                02. Engagement Models
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Delivery Phases (Interactive Editorial Scope Matrix) */}
        {activeTab === 'phases' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Phase Selector Chips */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {scopePhases.map((phase, idx) => (
                <button
                  key={phase.number}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    activePhaseIndex === idx
                      ? 'bg-brand-paper/10 border-brand-accent shadow-lg text-brand-paper'
                      : 'bg-brand-paper/[0.02] border-brand-paper/5 text-brand-paper/50 hover:bg-brand-paper/[0.05] hover:text-brand-paper/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      activePhaseIndex === idx ? 'bg-brand-accent text-brand-ink' : 'bg-brand-paper/10 text-brand-paper/60'
                    }`}>
                      {phase.number}
                    </span>
                    <span className="text-xs font-medium truncate">{phase.tag}</span>
                  </div>
                  <ChevronRight size={14} className={activePhaseIndex === idx ? 'text-brand-accent' : 'opacity-30'} />
                </button>
              ))}
            </div>

            {/* Active Phase Detailed Bento Display */}
            {(() => {
              const currentPhase = scopePhases[activePhaseIndex];
              return (
                <div className="bg-brand-paper/[0.03] border border-brand-paper/10 rounded-2xl p-8 sm:p-12 lg:p-14 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="grid lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Left Details */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl sm:text-5xl font-serif text-brand-accent font-light">
                          {currentPhase.number}
                        </span>
                        <div className="h-8 w-px bg-brand-paper/15"></div>
                        <div>
                          <span className="text-[11px] uppercase tracking-widest text-brand-accent font-mono block font-medium">
                            {currentPhase.tag}
                          </span>
                          <span className="text-xs text-brand-paper/50 font-mono flex items-center gap-1.5 mt-0.5">
                            <Clock size={12} />
                            {currentPhase.duration}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif text-brand-paper leading-tight font-medium">
                        {currentPhase.title}
                      </h3>

                      <p className="text-sm sm:text-base text-brand-paper/70 font-light leading-relaxed">
                        {currentPhase.subtitle}
                      </p>

                      <div className="pt-4 border-t border-brand-paper/10">
                        <span className="text-xs uppercase tracking-widest text-brand-paper/40 font-mono block mb-4">
                          Core Scope & Focus Areas
                        </span>
                        <ul className="space-y-3">
                          {currentPhase.focusAreas.map((focus, fIdx) => (
                            <li key={fIdx} className="text-xs sm:text-sm text-brand-paper/80 flex items-start gap-3 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0"></span>
                              <span>{focus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Deliverables Sandbox */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="bg-brand-paper/[0.04] border border-brand-paper/10 rounded-xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-brand-paper/10">
                          <span className="text-xs uppercase tracking-widest text-brand-accent font-mono font-medium flex items-center gap-2">
                            <FileText size={14} />
                            <span>Tangible Deliverables Handed Over</span>
                          </span>
                          <span className="text-[10px] text-brand-paper/40 font-mono">100% Production Ready</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {currentPhase.deliverables.map((item, dIdx) => (
                            <div 
                              key={dIdx} 
                              className="p-4 rounded-lg bg-brand-paper/[0.03] border border-brand-paper/5 hover:border-brand-accent/40 transition-all group"
                            >
                              <div className="w-6 h-6 rounded-md bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-2 group-hover:bg-brand-accent group-hover:text-brand-ink transition-colors">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <span className="text-xs text-brand-paper font-medium block leading-snug">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Direct Scope Consultation CTA */}
                        <div className="pt-4 border-t border-brand-paper/10 flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <span className="text-xs text-brand-paper/60 block font-light">Need a custom scope proposal?</span>
                            <span className="text-xs text-brand-accent font-medium">We tailor deliverable matrixes to your exact stack.</span>
                          </div>

                          <a
                            href={`https://wa.me/917977765228?text=${encodeURIComponent(
                              `Hello AAKAR Studio,\n\nI would like to discuss the scope of work for Phase ${currentPhase.number} (${currentPhase.title}).\n\nPlease let me know your availability for a scope review.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#20bd5a] transition-all shadow-sm hover:shadow-md cursor-pointer"
                          >
                            <MessageSquare size={14} />
                            <span>Discuss Phase {currentPhase.number}</span>
                            <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

            {/* Bottom 4-Phase Grid Summary */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {scopePhases.map((phase, pIdx) => (
                <div
                  key={phase.number}
                  onClick={() => setActivePhaseIndex(pIdx)}
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activePhaseIndex === pIdx 
                      ? 'bg-brand-paper/10 border-brand-accent' 
                      : 'bg-brand-paper/[0.02] border-brand-paper/5 hover:bg-brand-paper/[0.05]'
                  }`}
                >
                  <span className="text-xs font-mono text-brand-accent font-semibold block mb-2">{phase.number} / {phase.tag}</span>
                  <h4 className="text-sm font-medium text-brand-paper mb-2">{phase.title}</h4>
                  <span className="text-[11px] text-brand-paper/40 font-mono block">{phase.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Engagement Models */}
        {activeTab === 'models' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {engagementModels.map((model, idx) => (
              <div
                key={model.name}
                className={`p-8 sm:p-10 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                  idx === 1 
                    ? 'bg-brand-paper/[0.06] border-brand-accent/60 shadow-2xl relative' 
                    : 'bg-brand-paper/[0.02] border-brand-paper/10 hover:border-brand-paper/20'
                }`}
              >
                {idx === 1 && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-brand-accent text-brand-ink text-[10px] uppercase font-mono font-bold tracking-widest">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-brand-accent uppercase tracking-widest block mb-2 font-semibold">
                      {model.type}
                    </span>
                    <h3 className="text-2xl font-serif text-brand-paper font-medium mb-2">
                      {model.name}
                    </h3>
                    <p className="text-xs text-brand-paper/60 font-light leading-relaxed">
                      {model.ideal}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-paper/[0.04] border border-brand-paper/5 flex items-center justify-between">
                    <span className="text-xs text-brand-paper/50 font-mono">Turnaround</span>
                    <span className="text-xs font-mono font-bold text-brand-paper">{model.timeline}</span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-brand-paper/10">
                    <span className="text-[11px] uppercase tracking-widest text-brand-paper/40 font-mono block mb-2">
                      What is Included
                    </span>
                    {model.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-xs text-brand-paper/75 flex items-start gap-2.5 font-light">
                        <CheckCircle2 size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-brand-paper/10">
                  <a
                    href={`https://wa.me/917977765228?text=${encodeURIComponent(
                      `Hello AAKAR Studio,\n\nI am interested in your "${model.name}" engagement model.\n\nCould we schedule a call to review requirements and timelines?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#20bd5a] transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <MessageSquare size={14} />
                    <span>Inquire About {model.name.split(' ')[0]}</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>

      {/* Decorative background glow */}
      <motion.div 
        style={{ y: bgCircleY }}
        className="absolute right-0 top-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"
      ></motion.div>
    </section>
  );
};

const WhyChooseMe = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const colY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const points = [
    { title: "25+ Years of Professional Design Experience", desc: "A multidisciplinary design background spanning digital products, branding, marketing, and enterprise communication." },
    { title: "Deep Expertise in SaaS & Enterprise Products", desc: "Designing intuitive dashboards, business applications, customer portals, and digital ecosystems." },
    { title: "Product Strategy Meets Beautiful UI", desc: "Balancing usability, functionality, and premium visual design." },
    { title: "Branding That Supports Product Growth", desc: "Building memorable brands that strengthen products and customer trust." },
    { title: "Scalable Design Systems", desc: "Creating reusable design systems that improve development speed and consistency." },
    { title: "One Studio. Multiple Capabilities.", desc: "From product strategy and UX to branding, packaging, marketing, and launch support." }
  ];

  return (
    <section ref={containerRef} id="why-us" className="py-24 bg-brand-paper relative overflow-hidden border-b border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-12">
          <motion.div style={{ y: colY }} className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Distinction</span>
            <span className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 font-medium block">WHY CLIENTS WORK WITH US</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              A Rare <span className="italic text-brand-accent font-serif font-normal">Combination</span>
            </h2>
            
            <div className="bg-brand-ink text-brand-paper p-8 rounded-2xl border border-brand-paper/5 shadow-xl space-y-6 mt-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl"></div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-brand-accent font-mono font-bold">WHAT MAKES AAKAR STUDIO DIFFERENT</h3>
              <p className="text-xl font-serif italic text-brand-paper/90 leading-relaxed">
                "Most design studios focus on visuals. We focus on creating digital products that solve business problems, improve customer experiences, and support long-term growth."
              </p>
              <p className="text-sm font-light text-brand-paper/60 leading-relaxed">
                Every engagement combines strategic thinking, product experience, branding expertise, and thoughtful execution to help businesses launch better products and stronger brands.
              </p>
              <div className="text-xs uppercase tracking-widest text-brand-accent font-medium pt-4 border-t border-brand-paper/15 font-mono">
                "Because exceptional design isn't decoration—it's a business advantage."
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: colY }} className="lg:col-span-7 space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {points.map((point, idx) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 border border-brand-ink/5 bg-white hover:border-brand-accent/30 transition-all duration-300 relative group"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-brand-accent group-hover:h-full transition-all duration-300"></div>
                  <span className="text-xs font-serif text-brand-accent/50 block mb-3 font-semibold">0{idx + 1}</span>
                  <h3 className="text-md font-sans font-medium mb-2 group-hover:text-brand-accent transition-colors text-brand-ink">
                    {point.title}
                  </h3>
                  <p className="text-xs font-light text-brand-muted leading-relaxed">
                    {point.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 md:p-12 border border-brand-accent/15 bg-brand-accent/[0.03] space-y-4 rounded-xl mt-12"
            >
              <p className="text-lg md:text-xl font-light text-brand-ink leading-relaxed font-serif italic">
                "We don't simply design interfaces. We help businesses build products people enjoy using and brands people remember."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const stats = [
    { value: "25+", label: "Years Experience" },
    { value: "200+", label: "Projects Delivered" },
    { value: "50+", label: "Businesses Supported" },
    { value: "10+", label: "Industries Served" },
    { value: "1000+", label: "Design Assets Delivered" }
  ];

  return (
    <section ref={containerRef} className="py-20 bg-brand-ink text-brand-paper relative overflow-hidden">
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#C5A059_2px,transparent_2px)] [background-size:20px_20px] scale-125"
      ></motion.div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-accent mb-2 block">Track Record</span>
          <h2 className="text-sm uppercase tracking-[0.5em] text-brand-paper/40 font-medium">BY THE NUMBERS</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-baseline">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-2 border-l border-brand-paper/5 pl-6 relative group"
            >
              <div className="absolute top-0 left-0 w-[1px] h-0 bg-brand-accent group-hover:h-full transition-all duration-300"></div>
              <div className="text-5xl md:text-6xl font-serif font-light text-brand-accent">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#B5B5B5] leading-relaxed font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Industries = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const industries = [
    { name: "Technology & SaaS", icon: <Cpu size={20} /> },
    { name: "Healthcare & Wellness", icon: <Heart size={20} /> },
    { name: "Enterprise Software", icon: <Building2 size={20} /> },
    { name: "AI Products", icon: <Sparkles size={20} /> },
    { name: "Retail & FMCG", icon: <ShoppingBag size={20} /> },
    { name: "Hospitality & Restaurants", icon: <Utensils size={20} /> },
    { name: "Education", icon: <GraduationCap size={20} /> },
    { name: "Real Estate", icon: <Home size={20} /> },
    { name: "Manufacturing", icon: <Factory size={20} /> },
    { name: "Consumer Products", icon: <Box size={20} /> }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-brand-paper overflow-hidden border-b border-brand-ink/5 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <motion.div style={{ y: leftY }} className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Specialization</span>
            <span className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 font-medium block">INDUSTRIES</span>
            <h2 className="text-5xl md:text-7xl font-light leading-tight text-brand-ink">
              Industries We <br />
              <span className="italic text-brand-accent">Serve</span>
            </h2>
          </motion.div>
          <div className="lg:col-span-7">
            <p className="text-base text-brand-muted font-light leading-relaxed max-w-xl">
              Every industry has unique challenges. Our multidisciplinary experience allows us to create tailored digital products, scalable systems, and premium brand experiences across multiple sectors.
            </p>
          </div>
        </div>

        <motion.div style={{ y: cardsY }} className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((industry, idx) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 border border-brand-ink/5 bg-white hover:border-brand-accent/40 rounded-xl transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="text-[10px] uppercase tracking-widest text-brand-accent/40 font-mono font-semibold group-hover:text-brand-accent transition-colors">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
                <div className="text-brand-accent/50 group-hover:text-brand-accent group-hover:scale-110 transition-all duration-300">
                  {industry.icon}
                </div>
              </div>
              <h3 className="text-sm font-sans font-medium text-brand-ink leading-snug group-hover:text-brand-accent transition-colors">
                {industry.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const services = [
    {
      title: "Digital Product Design",
      desc: "Transform complex ideas into intuitive SaaS products, enterprise platforms, customer portals, and digital experiences focused on usability and business growth.",
      icon: <Cpu size={24} />,
      list: ["Product Strategy", "UX Architecture", "User Flows", "Wireframes", "Product Interfaces"],
      y: cardY
    },
    {
      title: "UX Research & Experience Design",
      desc: "Understanding user behavior through research, information architecture, journey mapping, usability, and interaction design.",
      icon: <Compass size={24} />,
      list: ["User Research", "Journey Mapping", "Information Architecture", "Prototyping", "Usability Testing"],
      y: cardY
    },
    {
      title: "Web & Mobile Applications",
      desc: "Modern responsive experiences designed for scalability, accessibility, and exceptional usability.",
      icon: <Smartphone size={24} />,
      list: ["Website Design", "SaaS Platforms", "Mobile Applications", "Dashboards", "Responsive Design"],
      y: cardY
    },
    {
      title: "Brand Identity",
      desc: "Build memorable brands that create trust, improve recognition, and support long-term growth.",
      icon: <Palette size={24} />,
      list: ["Logo Design", "Brand Systems", "Visual Identity", "Brand Guidelines"],
      y: cardY
    },
    {
      title: "Growth Design",
      desc: "Design marketing assets that help businesses launch, communicate, and scale.",
      icon: <Megaphone size={24} />,
      list: ["Landing Pages", "Email Campaigns", "Social Media", "Product Launch Assets", "Marketing Communication"],
      y: cardY
    },
    {
      title: "Packaging & Visual Communication",
      desc: "Premium packaging and communication design that elevate products across digital and physical experiences.",
      icon: <Package size={24} />,
      list: ["Packaging Design", "Print Design", "Restaurant Menus", "Corporate Collateral"],
      y: cardY
    }
  ];

  return (
    <section ref={containerRef} id="services" className="py-24 relative overflow-hidden bg-brand-paper">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Expertise</span>
          <h2 className="text-5xl md:text-7xl font-light text-brand-ink">Services</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const serviceWhatsappText = encodeURIComponent(
              `Hello AAKAR Studio,\n\nI would like to inquire about your "${service.title}" services.\n\nLooking forward to discussing our project.`
            );
            const serviceWhatsappLink = `https://wa.me/917977765228?text=${serviceWhatsappText}`;

            return (
              <motion.div
                style={{ y: service.y }}
                key={service.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-10 lg:p-12 group hover:bg-brand-ink hover:text-brand-paper transition-all duration-500 border border-brand-ink/5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-brand-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl mb-4 group-hover:text-brand-accent transition-colors font-serif font-medium">{service.title}</h3>
                  <p className="text-sm text-brand-muted mb-8 leading-relaxed group-hover:text-brand-paper/60 transition-colors font-light">
                    {service.desc}
                  </p>
                  <ul className="space-y-3 pt-6 border-t border-brand-ink/5 group-hover:border-brand-paper/10">
                    {service.list.map(item => (
                      <li key={item} className="text-[11px] uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-paper/80 font-mono font-medium">
                        <div className="w-1 h-1 rounded-full bg-brand-accent"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-8 border-t border-brand-ink/5 group-hover:border-brand-paper/10">
                  <a
                    href={serviceWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#20bd5a] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    <span>Inquire on WhatsApp</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PortfolioItem = ({ title, problem, solution, result, img, delay, caseStudyId, onCaseStudyClick }: any) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group grid md:grid-cols-2 gap-0 border-b border-brand-ink/10 relative overflow-hidden min-h-[400px] md:min-h-[480px]"
    >
      <div className="relative overflow-hidden min-h-[300px] md:min-h-full">
        <motion.img 
          style={{ y: imgY, height: "134%", top: "-17%" }}
          src={img} 
          alt={title} 
          className="absolute inset-x-0 w-full object-cover grayscale brightness-90 filter transition-all duration-700 group-hover:brightness-100 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-ink/20 opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
      </div>
      <div className="p-8 md:p-16 flex flex-col justify-center bg-brand-paper">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-3xl md:text-4xl">{title}</h3>
          <button 
            onClick={() => onCaseStudyClick && onCaseStudyClick(caseStudyId)}
            title="View Case Study"
            className="w-12 h-12 flex items-center justify-center border border-brand-ink/10 rounded-full hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all cursor-pointer"
          >
            <ArrowUpRight size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-accent block mb-1">Problem</span>
            <p className="text-sm font-light text-brand-muted">{problem}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-accent block mb-1">Solution</span>
            <p className="text-sm font-light text-brand-muted">{solution}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-accent block mb-1">Result</span>
            <p className="text-sm font-medium">{result}</p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onCaseStudyClick && onCaseStudyClick(caseStudyId)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-blue-700 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Explore Case Study</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = ({ onViewAllClick, onCaseStudyClick }: { onViewAllClick: () => void; onCaseStudyClick: (caseStudyId?: string) => void }) => {
  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6 mb-16 grid md:grid-cols-2 gap-8 items-end">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Featured Work</span>
          <h2 className="text-5xl md:text-7xl font-light mb-4">Featured Work</h2>
          <p className="text-sm font-light text-brand-muted max-w-xl">
            A curated selection of digital products, enterprise applications, branding systems, healthcare experiences, and creative solutions built to solve business challenges and deliver meaningful customer experiences.
          </p>
        </div>
        <div className="flex md:justify-end">
          <button 
            id="btn-portfolio-view-all"
            onClick={onViewAllClick}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold group cursor-pointer bg-transparent border-none text-brand-accent hover:text-brand-ink transition-colors"
          >
            View All Projects <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform animate-pulse" />
          </button>
        </div>
      </div>

      <div className="border-t border-brand-ink/10">
        <PortfolioItem 
          title="Healthcare & Wellness Digital Experience"
          problem="Healthcare and wellness services required a seamless digital experience that simplified customer journeys while strengthening engagement."
          solution="Designed user-centric websites, campaign landing pages, email marketing systems, social media experiences, and digital communication assets that connected users across multiple touchpoints."
          result="Improved customer engagement, stronger brand consistency, and a more unified digital ecosystem that supported long-term business growth."
          img="https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/wellnessdigital.png"
          delay={0.1}
          caseStudyId="healthcare-wellness"
          onCaseStudyClick={onCaseStudyClick}
        />
        <PortfolioItem 
          title="Enterprise Mobile Application Design"
          problem="Complex business workflows created friction, reducing efficiency and slowing task completion."
          solution="Designed intuitive user journeys, scalable design systems, wireframes, interactive prototypes, and modern mobile interfaces focused on usability and productivity."
          result="Simplified workflows, improved user adoption, and a significantly better product experience."
          img="https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/Mobileapp.png"
          delay={0.2}
          caseStudyId="enterprise-mobile"
          onCaseStudyClick={onCaseStudyClick}
        />
        <PortfolioItem 
          title="SaaS Dashboard & Product Experience"
          problem="Growing businesses required modern digital platforms capable of managing complex data while remaining intuitive for users."
          solution="Designed dashboard experiences, admin interfaces, analytics views, component libraries, and scalable design systems optimized for enterprise products."
          result="Cleaner workflows, improved usability, and digital products built for long-term scalability."
          img="https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_01_27-PM.png"
          delay={0.25}
          caseStudyId="saas-dashboard"
          onCaseStudyClick={onCaseStudyClick}
        />
        <PortfolioItem 
          title="Social Media Experience & Growth Design"
          problem="Brands struggled to maintain consistency and meaningful engagement across rapidly evolving digital channels."
          solution="Created cohesive content systems, campaign creatives, motion graphics, launch assets, and audience-focused communication strategies."
          result="Improved brand recognition, stronger engagement, and more consistent digital communication."
          img="https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_08_37-PM.png"
          delay={0.3}
          caseStudyId="saas-dashboard"
          onCaseStudyClick={onCaseStudyClick}
        />
        <PortfolioItem 
          title="Brand Identity & Packaging Experience"
          problem="Businesses needed stronger visual identities and premium product presentation to compete in crowded markets."
          solution="Designed complete branding systems, packaging, retail communication, product presentation, and marketing collateral."
          result="Elevated brand perception, improved product visibility, and stronger customer recall."
          img="https://cskb8bjylqfsorzu.public.blob.vercel-storage.com/aakarimages/ChatGPT-Image-Jun-11%2C-2026%2C-04_54_00-PM.png"
          delay={0.35}
          caseStudyId="healthcare-wellness"
          onCaseStudyClick={onCaseStudyClick}
        />
      </div>

      {/* Button to load more/view all projects at the bottom of featured work home list */}
      <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
        <button 
          id="btn-works-load-more"
          onClick={onViewAllClick}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-ink text-brand-paper hover:bg-brand-accent hover:text-brand-paper transition-all cursor-pointer rounded-lg font-medium"
        >
          <span className="text-xs uppercase tracking-widest font-bold">View All Projects</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

const Process = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const colY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const steps = [
    { num: "01", title: "Discovery & Strategy", desc: "We understand your business goals, target audience, and product requirements to define a clear design direction." },
    { num: "02", title: "UX Architecture & Wireframes", desc: "We create intuitive user journeys, interactive wireframes, and information architectures to map the experience." },
    { num: "03", title: "UI & Experience Design", desc: "We design polished, modern, and accessible user interfaces paired with premium visual aesthetics." },
    { num: "04", title: "Brand Integration & Systems", desc: "We build cohesive visual systems and scalable design systems for fast, consistent product development." },
    { num: "05", title: "Production & Support", desc: "We provide developer-ready assets, specifications, and support through launch to ensure pixel-perfect execution." }
  ];

  return (
    <section ref={containerRef} id="process" className="py-24 bg-[#101010] text-brand-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div style={{ y: colY }} className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">The Process</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight text-brand-paper">How We Work</h2>
            <p className="text-brand-paper/40 font-light leading-relaxed mb-8">
              Every project follows a refined product design methodology to ensure consistency, quality, and results that support your business goals.
            </p>
            <div className="w-16 h-16 border border-brand-paper/10 rounded-full flex items-center justify-center text-brand-accent">
              <Sparkles size={24} />
            </div>
          </motion.div>
          <motion.div style={{ y: colY }} className="lg:col-span-8 grid sm:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="p-10 border border-brand-paper/5 hover:border-brand-accent/30 transition-colors group bg-neutral-900/10">
                <div className="text-5xl font-serif text-brand-accent/20 group-hover:text-brand-accent transition-colors mb-6">{step.num}</div>
                <h3 className="text-xl mb-4 group-hover:translate-x-2 transition-transform duration-300 font-serif font-medium text-brand-paper">{step.title}</h3>
                <p className="text-sm font-light text-brand-paper/40 group-hover:text-brand-paper/60 transition-colors leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ onBookClick }: { onBookClick: () => void }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const highlightY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-paper border border-brand-ink/5 p-12 md:p-24 shadow-2xl relative overflow-hidden">
          {/* Background Highlight with scroll Parallax */}
          <motion.div 
            style={{ y: highlightY }}
            className="absolute top-0 right-0 w-1/2 h-[130%] bg-brand-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"
          ></motion.div>

          <div className="max-w-3xl relative z-10">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Get in Touch</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              Let’s Build Something <br />
              <span className="italic text-brand-accent">Exceptional</span>
            </h2>
            <p className="text-lg text-brand-muted mb-12 font-light">
              If you’re looking to elevate your brand and attract better customers, let’s talk about your project goals.
            </p>

            <div className="flex flex-col md:flex-row gap-8">
              <button 
                id="contact-book-call"
                onClick={onBookClick} 
                className="flex-1 flex items-center text-left gap-6 p-6 border border-brand-ink/10 hover:bg-brand-ink group transition-colors cursor-pointer bg-transparent"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-brand-accent text-white rounded-full">
                  <Calendar size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-muted group-hover:text-brand-paper/40 font-mono">Schedule</span>
                  <div className="text-sm font-medium group-hover:text-brand-paper text-brand-ink">Book a Call</div>
                </div>
              </button>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 flex items-center gap-6 p-6 border border-brand-ink/10 hover:bg-brand-ink group transition-colors"
                id="contact-whatsapp"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#25D366] text-white rounded-full">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-muted group-hover:text-brand-paper/40 font-mono">Chat</span>
                  <div className="text-sm font-medium group-hover:text-brand-paper">WhatsApp Us</div>
                </div>
              </a>
            </div>

            <div className="mt-16 flex items-center gap-8">
              <a href="mailto:aakarstudio.digital@gmail.com" className="flex items-center gap-2 group cursor-pointer text-brand-ink transition-colors">
                <div className="p-3 border border-brand-ink/10 rounded-full group-hover:bg-brand-ink group-hover:text-brand-paper transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-xs uppercase tracking-widest font-medium">aakarstudio.digital@gmail.com</span>
              </a>
              <div className="h-[1px] flex-1 bg-brand-ink/10"></div>
              <span className="text-[10px] uppercase tracking-widest text-[#B5B5B5] italic">Limited Clients per Month</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-brand-ink/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <a href="#" className="font-serif text-2xl font-bold tracking-tighter">
            AAKAR <span className="text-brand-accent italic">Studio</span><span className="text-brand-accent">.</span>
          </a>
        </div>
        
        <div className="flex items-center gap-8">
          <a 
            href="https://www.linkedin.com/company/aakar-studio-product-brand-experience-design/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-medium text-brand-muted hover:text-brand-accent transition-colors"
          >
            <Linkedin size={14} className="text-brand-accent" />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="text-[10px] uppercase tracking-widest text-brand-muted">
          &copy; {new Date().getFullYear()} Aakar Studio. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'projects' | 'case-study'>('home');
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string>('healthcare-wellness');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Automatically scroll to the top of the page on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [view, selectedCaseStudyId]);

  const handleOpenCaseStudy = (projectId?: string) => {
    if (projectId) {
      setSelectedCaseStudyId(projectId);
    }
    setView('case-study');
  };

  const handleContactNavigate = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white overflow-x-hidden bg-brand-paper">
      {view === 'home' ? (
        <>
          <Navbar 
            onBookClick={() => setIsBookingOpen(true)} 
            onCaseStudyClick={() => handleOpenCaseStudy('healthcare-wellness')}
          />
          <Hero onBookClick={() => setIsBookingOpen(true)} />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <About />
          </motion.div>
          <Experience />
          <WhyChooseMe />
          <Stats />
          <Services />
          <Capabilities />
          <Industries />
          <Portfolio 
            onViewAllClick={() => setView('projects')} 
            onCaseStudyClick={(id) => handleOpenCaseStudy(id || 'healthcare-wellness')}
          />
          <Process />
          <Contact onBookClick={() => setIsBookingOpen(true)} />
          <Footer />
        </>
      ) : view === 'projects' ? (
        <div className="animate-fadeIn">
          <ProjectsPage 
            onBackToHome={() => setView('home')} 
            onContactClick={handleContactNavigate} 
            onBookClick={() => setIsBookingOpen(true)}
            onCaseStudyClick={(id) => handleOpenCaseStudy(id || 'healthcare-wellness')}
          />
          <Footer />
        </div>
      ) : (
        <div className="animate-fadeIn">
          <CaseStudyPage 
            initialProjectId={selectedCaseStudyId}
            onBackToHome={() => setView('home')}
            onContactClick={handleContactNavigate}
            onBookClick={() => setIsBookingOpen(true)}
          />
          <Footer />
        </div>
      )}

      {/* Interactive Call Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Smooth scroll anchor styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
