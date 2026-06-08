/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import ProjectsPage from './components/ProjectsPage';
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
  Box
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

const Navbar = ({ onBookClick }: { onBookClick: () => void }) => {
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
        <div className="hidden md:flex items-center gap-10">
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
            className="px-6 py-2 border border-brand-ink text-xs uppercase tracking-widest hover:bg-brand-ink hover:text-brand-paper transition-all cursor-pointer bg-transparent rounded-full font-semibold"
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
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-brand-muted">Digital Design Studio</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] -ml-1">
            Elegant <br />
            <span className="italic text-brand-accent">Design</span> That <br />
            Attracts<span className="font-sans text-xl md:text-2xl align-top ml-2 text-brand-muted opacity-50 underline decoration-1 underline-offset-8">Better</span> <br />
            Customers
          </h1>
          <p className="max-w-md text-lg text-brand-muted mb-10 font-light leading-relaxed">
            Branding, UI/UX & Digital Experiences for businesses looking to elevate their brand and digital presence.
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
              src="https://picsum.photos/seed/aakar-hero/800/1100" 
              alt="Aakar Studio Design"
              className="w-full h-full object-cover grayscale brightness-90 contrast-110"
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
              A New Studio Built on Decades of Creative Expertise
            </h3>
            <p className="text-base font-light text-brand-paper/85 leading-relaxed max-w-xl mb-6">
              AAKAR Studio is a creative design studio specializing in branding, UI/UX design, visual communication, and digital experiences.
            </p>
            <p className="text-base font-light text-brand-paper/85 leading-relaxed max-w-xl mb-6">
              Built on over <strong className="font-semibold text-brand-accent">25 years of industry experience</strong>, the studio brings together strategic thinking, creative craftsmanship, and user-centered design to help businesses create meaningful connections with their audiences.
            </p>
            <p className="text-base font-light text-brand-paper/70 leading-relaxed max-w-xl mb-6">
              While the studio itself represents a fresh beginning, its foundation is shaped by decades of experience delivering impactful design solutions across multiple industries.
            </p>
            <p className="text-lg font-serif italic text-brand-accent leading-relaxed max-w-xl mb-8">
              "We believe great design is not only seen—it is experienced."
            </p>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-brand-paper/10 pt-8">
            <div>
              <div className="text-5xl font-serif mb-2 text-brand-accent">25<span className="text-brand-paper text-2xl font-sans">+</span></div>
              <div className="text-[10px] uppercase tracking-widest text-brand-paper/50">YEARS OF DESIGN EXPERIENCE</div>
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
              "We partner with businesses that value thoughtful design, strong branding, and exceptional user experiences. Every project is approached with clarity, creativity, and a commitment to delivering work that creates lasting impact."
            </p>
          </motion.div>
          
          <div className="border-t border-brand-paper/10 pt-12 grid gap-8">
            <div className="flex gap-6 items-start group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Compass size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">✦ CREATIVE EXCELLENCE</h4>
                <p className="text-xs text-brand-paper/50 leading-relaxed">Thoughtfully crafted design that balances aesthetics and purpose.</p>
              </div>
            </div>
 
            <div className="flex gap-6 items-start group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Target size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">✦ STRATEGIC THINKING</h4>
                <p className="text-xs text-brand-paper/50 leading-relaxed">Design decisions guided by business goals and user needs.</p>
              </div>
            </div>
 
            <div className="flex gap-6 items-start group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Laptop size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">✦ DIGITAL EXPERIENCES</h4>
                <p className="text-xs text-brand-paper/50 leading-relaxed">Creating intuitive and engaging experiences across web and mobile.</p>
              </div>
            </div>
 
            <div className="flex gap-6 items-start group cursor-default">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Award size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">✦ PREMIUM EXECUTION</h4>
                <p className="text-xs text-brand-paper/50 leading-relaxed">Attention to detail, consistency, and quality in every deliverable.</p>
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
    { name: "Brand Identity Design", icon: <Palette size={16} /> },
    { name: "Creative Direction", icon: <Compass size={16} /> },
    { name: "UI/UX Design", icon: <Layers size={16} /> },
    { name: "Mobile App Design", icon: <Smartphone size={16} /> },
    { name: "Website Design", icon: <Laptop size={16} /> },
    { name: "Packaging Design", icon: <Package size={16} /> },
    { name: "Restaurant Branding", icon: <Utensils size={16} /> },
    { name: "Social Media Design", icon: <Instagram size={16} /> },
    { name: "Marketing Campaigns", icon: <Megaphone size={16} /> },
    { name: "Corporate Communication", icon: <Briefcase size={16} /> },
    { name: "Print & Production Design", icon: <Printer size={16} /> },
    { name: "Presentation Design", icon: <Presentation size={16} /> },
    { name: "Digital Strategy", icon: <Target size={16} /> },
    { name: "Visual Storytelling", icon: <BookOpen size={16} /> }
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
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Our Journey</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              More Than Design.<br />
              <span className="italic text-brand-accent">Building Brands</span> & Experiences Since 1999.
            </h2>
            <div className="relative pl-8 border-l border-brand-accent/30 space-y-6">
              <div className="text-brand-muted text-sm font-light leading-relaxed">
                Starting at the turn of the millennium, our experience covers over 25 years of professional design across multiple communication channels.
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
              With over 25 years of professional experience, I have worked across branding, packaging, graphic design, UI/UX, digital marketing, and creative strategy.
            </p>
            <p>
              My journey spans traditional print media, corporate branding, retail communication, packaging design, social media marketing, websites, and digital product experiences.
            </p>
            <p>
              This multidisciplinary background allows me to understand both business goals and user needs, creating solutions that are visually compelling and commercially effective.
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
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgCircleY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Unified, aligned column-level scrolling factor
  const colY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const categories = [
    {
      title: "Brand & Identity",
      icon: <Palette className="text-brand-accent animate-pulse" size={24} />,
      items: ["Logo Systems", "Brand Guidelines", "Visual Identity", "Brand Refresh"]
    },
    {
      title: "User Experience",
      icon: <Layers className="text-brand-accent" size={24} />,
      items: ["Website UI/UX", "Mobile Applications", "Dashboards", "Wireframes", "Design Systems"]
    },
    {
      title: "Marketing & Growth",
      icon: <Megaphone className="text-brand-accent" size={24} />,
      items: ["Social Media Campaigns", "Instagram Reels", "WhatsApp Marketing", "Promotional Campaigns"]
    },
    {
      title: "Print & Packaging",
      icon: <Package className="text-brand-accent" size={24} />,
      items: ["Product Packaging", "Restaurant Menus", "Brochures", "Catalogues", "Point of Sale Materials", "Outdoor Branding"]
    },
    {
      title: "Creative Consulting",
      icon: <Briefcase className="text-brand-accent" size={24} />,
      items: ["Brand Audits", "Digital Strategy", "Design Reviews", "Creative Direction"]
    }
  ];

  return (
    <section ref={containerRef} id="capabilities" className="py-24 bg-brand-ink text-brand-paper relative overflow-hidden border-b border-brand-paper/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5 relative">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Our Scope</span>
            <h2 className="text-5xl md:text-7xl font-light text-brand-paper mb-8 leading-tight">
              End-to-End <br />
              <span className="italic text-brand-accent">Creative Solutions</span>
            </h2>
          </div>
          <div className="lg:col-span-7 pt-4">
            <p className="text-base text-brand-paper/60 font-light leading-relaxed max-w-xl">
              We provide comprehensive creative capabilities designed to elevate every face of your brand, establishing strong visual consistency across digital interfaces, physical items, and marketing touchpoints.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              style={{ y: colY }}
              key={category.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 border border-brand-paper/5 bg-brand-paper/[0.02] hover:bg-brand-paper/[0.05] hover:border-brand-accent/40 transition-all duration-500 flex flex-col h-full group"
            >
              <div className="mb-6 p-3 bg-brand-paper/[0.03] w-fit rounded-lg group-hover:bg-brand-accent/10 transition-colors duration-500">
                {category.icon}
              </div>
              <h3 className="text-lg font-serif text-brand-paper mb-6 group-hover:text-brand-accent transition-colors duration-300">
                {category.title}
              </h3>
              <ul className="space-y-3.5 mt-auto border-t border-brand-paper/10 pt-6">
                {category.items.map((item) => (
                  <li key={item} className="text-xs text-brand-paper/50 flex items-center gap-2 font-light hover:text-brand-paper/85 transition-colors duration-300">
                    <span className="w-1 h-1 rounded-full bg-brand-accent/60 group-hover:bg-brand-accent transition-colors"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative details */}
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
    { title: "25+ Years Creative Experience", desc: "A quarter-century of designing for luxury and leading brands globally." },
    { title: "Print + Digital Expertise", desc: "Seamless synergy across tangible offline assets and digital ecosystems." },
    { title: "UI/UX + Branding Knowledge", desc: "Combining customer psychology, sleek interface design, and deep brand history." },
    { title: "Strategic Business Thinking", desc: "We don't just build designs. We design to drive real commercial results and outcomes." },
    { title: "Production & Execution Experience", desc: "Heavy expertise in final delivery, modern layouts, and premium production values." },
    { title: "Agency & Client-Side Understanding", desc: "Understanding corporate needs, dynamic challenges, and customer aspirations." }
  ];

  return (
    <section ref={containerRef} id="why-us" className="py-24 bg-brand-paper relative overflow-hidden border-b border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-12">
          <motion.div style={{ y: colY }} className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Distinction</span>
            <span className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 font-medium block">WHY CLIENTS WORK WITH ME</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              A Rare <span className="italic text-brand-accent">Combination</span>
            </h2>
            
            <div className="bg-brand-ink text-brand-paper p-8 rounded-2xl border border-brand-paper/5 shadow-xl space-y-6 mt-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl"></div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-brand-accent">WHAT MAKES AAKAR DIFFERENT</h3>
              <p className="text-xl font-serif italic text-brand-paper/90 leading-relaxed">
                "Most designers focus on visuals. I focus on the complete experience."
              </p>
              <p className="text-sm font-light text-brand-paper/60 leading-relaxed">
                From brand identity and packaging to websites, mobile apps, social media, and marketing communication, every solution is designed to create meaningful connections between brands and people.
              </p>
              <div className="text-xs uppercase tracking-widest text-brand-accent font-medium pt-4 border-t border-brand-paper/15">
                "Because great design is not just seen. It is experienced."
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
                  <h3 className="text-md font-sans font-medium mb-2 group-hover:text-brand-accent transition-colors">
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
                "I don't just create designs. I help businesses communicate better, look better, and grow through thoughtful design and digital experiences."
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
    { value: "50+", label: "Brands Supported" },
    { value: "10+", label: "Industries Served" },
    { value: "1000+", label: "Creative Assets Designed" }
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
    { name: "Hospitality & Restaurants", icon: <Utensils size={20} /> },
    { name: "Healthcare & Wellness", icon: <Heart size={20} /> },
    { name: "Retail & FMCG", icon: <ShoppingBag size={20} /> },
    { name: "Real Estate", icon: <Home size={20} /> },
    { name: "Education", icon: <GraduationCap size={20} /> },
    { name: "Corporate & Enterprise", icon: <Building2 size={20} /> },
    { name: "Startups", icon: <Rocket size={20} /> },
    { name: "Technology & SaaS", icon: <Cpu size={20} /> },
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
            <h2 className="text-5xl md:text-7xl font-light leading-tight">
              Sectors We <br />
              <span className="italic text-brand-accent">Elevate</span>
            </h2>
          </motion.div>
          <div className="lg:col-span-7">
            <p className="text-base text-brand-muted font-light leading-relaxed max-w-xl">
              Our multidisciplinary background allows us to build powerful brand experiences, beautiful products, and high-conversion web layouts across various industries, creating tailored and scalable digital assets.
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
      title: "Brand Identity",
      desc: "Build a premium, memorable identity that attracts the right audience through refined visual language.",
      icon: <Layers size={24} />,
      list: ["Logotype Design", "Color Strategy", "Brand Guidelines", "Visual Language"],
      y: cardY
    },
    {
      title: "UI/UX Design",
      desc: "Create websites that don’t just look good—but convert visitors into loyal customers with seamless experience.",
      icon: <Compass size={24} />,
      list: ["Responsive Web Design", "User Journeys", "Prototype Development", "Conversion Optimization"],
      y: cardY
    },
    {
      title: "Social Media Design",
      desc: "Consistent, high-end visuals that elevate your brand presence across all digital touchpoints.",
      icon: <Sparkles size={24} />,
      list: ["Content Systems", "Motion Graphics", "Template Design", "Art Direction"],
      y: cardY
    }
  ];

  return (
    <section ref={containerRef} id="services" className="py-24 relative overflow-hidden bg-brand-paper">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Expertise</span>
          <h2 className="text-5xl md:text-7xl font-light">Services</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              style={{ y: service.y }}
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-12 group hover:bg-brand-ink hover:text-brand-paper transition-all duration-500 border border-brand-ink/5"
            >
              <div className="text-brand-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl mb-4 group-hover:text-brand-accent transition-colors">{service.title}</h3>
              <p className="text-sm text-brand-muted mb-8 leading-relaxed group-hover:text-brand-paper/60 transition-colors">
                {service.desc}
              </p>
              <ul className="space-y-3 pt-6 border-t border-brand-ink/5 group-hover:border-brand-paper/10">
                {service.list.map(item => (
                  <li key={item} className="text-[11px] uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-paper/80">
                    <div className="w-1 h-1 rounded-full bg-brand-accent"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioItem = ({ title, problem, solution, result, img, delay }: any) => {
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
          <a href="#" className="w-12 h-12 flex items-center justify-center border border-brand-ink/10 rounded-full hover:bg-brand-ink hover:text-brand-paper transition-all">
            <ArrowUpRight size={20} />
          </a>
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
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = ({ onViewAllClick }: { onViewAllClick: () => void }) => {
  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6 mb-16 grid md:grid-cols-2 gap-8 items-end">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Our Work</span>
          <h2 className="text-5xl md:text-7xl font-light mb-4">Featured Work</h2>
          <p className="text-sm font-light text-brand-muted max-w-xl">
            A curated selection of branding, UI/UX, digital product, and creative communication projects that reflect our passion for purposeful design and meaningful user experiences.
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
          problem="Complex healthcare and wellness services needed a more engaging digital presence and a seamless customer journey."
          solution="Designed user-centric digital experiences, campaign landing pages, emailers, social media creatives, and visual communication systems."
          result="Stronger audience engagement, improved brand consistency, and a more connected digital ecosystem."
          img="https://picsum.photos/seed/healthcarewellness/1200/800"
          delay={0.1}
        />
        <PortfolioItem 
          title="Enterprise Mobile Application Design"
          problem="Users faced challenges navigating complex workflows and completing tasks efficiently."
          solution="Created intuitive user journeys, wireframes, design systems, and modern mobile interfaces focused on usability."
          result="Improved user experience, streamlined interactions, and enhanced product adoption."
          img="https://picsum.photos/seed/enterprisesystem/1200/800"
          delay={0.2}
        />
        <PortfolioItem 
          title="Restaurant Brand Transformation"
          problem="Limited digital visibility and inconsistent brand communication across customer touchpoints."
          solution="Developed branding assets, menu communication, social media campaigns, promotional creatives, and customer engagement strategies."
          result="Enhanced brand perception, stronger customer engagement, and increased local visibility."
          img="https://picsum.photos/seed/restaurantbrand/1200/800"
          delay={0.3}
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
    { num: "01", title: "Discovery", desc: "Understanding your brand, audience, and deep business goals." },
    { num: "02", title: "Strategy", desc: "Defining the design direction, structure, and market positioning." },
    { num: "03", title: "Design", desc: "Crafting elegant, high-performing visuals that command attention." },
    { num: "04", title: "Delivery", desc: "Final assets ready for seamless implementation and rollout." }
  ];

  return (
    <section ref={containerRef} id="process" className="py-24 bg-[#101010] text-brand-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16">
          <motion.div style={{ y: colY }} className="col-span-1">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">The Process</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">How We Work</h2>
            <p className="text-brand-paper/40 font-light leading-relaxed mb-8">
              Every project follows a refined methodology to ensure consistency, quality, and results that exceed expectations.
            </p>
            <div className="w-16 h-16 border border-brand-paper/10 rounded-full flex items-center justify-center text-brand-accent">
              <Sparkles size={24} />
            </div>
          </motion.div>
          <motion.div style={{ y: colY }} className="col-span-2 grid md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="p-10 border border-brand-paper/5 hover:border-brand-accent/30 transition-colors group bg-neutral-900/10">
                <div className="text-5xl font-serif text-brand-accent/20 group-hover:text-brand-accent transition-colors mb-6">{step.num}</div>
                <h3 className="text-xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                <p className="text-sm font-light text-brand-paper/40 group-hover:text-brand-paper/60 transition-colors">{step.desc}</p>
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
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="p-3 border border-brand-ink/10 rounded-full group-hover:bg-brand-ink group-hover:text-brand-paper transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-xs uppercase tracking-widest font-medium">hello@aakar.studio</span>
              </div>
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
          <a href="#" className="text-[10px] uppercase tracking-[0.3em] font-medium text-brand-muted hover:text-brand-accent transition-colors">Instagram</a>
          <a href="#" className="text-[10px] uppercase tracking-[0.3em] font-medium text-brand-muted hover:text-brand-accent transition-colors">LinkedIn</a>
          <a href="#" className="text-[10px] uppercase tracking-[0.3em] font-medium text-brand-muted hover:text-brand-accent transition-colors">Pinterest</a>
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
  const [view, setView] = useState<'home' | 'projects'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Automatically scroll to the top of the page on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [view]);

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
          <Navbar onBookClick={() => setIsBookingOpen(true)} />
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
          <Portfolio onViewAllClick={() => setView('projects')} />
          <Process />
          <Contact onBookClick={() => setIsBookingOpen(true)} />
          <Footer />
        </>
      ) : (
        <div className="animate-fadeIn">
          <ProjectsPage 
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
