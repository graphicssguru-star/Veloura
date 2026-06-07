/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
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

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brand-paper/80 backdrop-blur-md border-b border-brand-ink/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-serif text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
          AAKAR<span className="text-brand-accent">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-widest font-medium hover:text-brand-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2 border border-brand-ink text-xs uppercase tracking-widest hover:bg-brand-ink hover:text-brand-paper transition-all"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-ink">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-paper border-b border-brand-ink/10 p-8 flex flex-col items-center gap-6 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase tracking-widest font-medium"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 bg-brand-ink text-brand-paper text-xs uppercase tracking-widest"
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
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
            Branding, UI/UX & Social Media for Restaurants and Lifestyle Brands looking to elevate their digital presence.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#work" className="group px-8 py-4 bg-brand-ink text-brand-paper flex items-center gap-3 hover:translate-y-[-2px] transition-transform">
              <span className="text-sm uppercase tracking-widest">View Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 border border-brand-ink/20 text-brand-ink hover:bg-brand-ink/5 transition-colors">
              <span className="text-sm uppercase tracking-widest">Book Consultation</span>
            </a>
          </div>
        </motion.div>

        <motion.div 
          style={{ y }}
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
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-20 -left-10 text-xs uppercase tracking-widest flex items-center gap-4 [writing-mode:vertical-rl] opacity-40">
            <span>Since 1999</span>
            <span className="w-[1px] h-24 bg-brand-ink"></span>
          </div>
        </motion.div>
      </div>

      {/* Floating Background Text */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none translate-y-1/4">
        <span className="text-[30rem] font-serif leading-none italic font-bold">Aakar</span>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-ink text-brand-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Who We Are</span>
            <h2 className="text-5xl md:text-7xl font-light text-brand-paper mb-8 leading-tight">
              About <span className="italic text-brand-accent">Aakar</span>
            </h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-brand-paper/85 max-w-xl font-serif italic mb-8">
              With 25+ years of design experience, we blend <span className="italic">branding</span>, UI/UX, and <span className="italic">visual storytelling</span> to create premium digital experiences.
            </p>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-2 gap-8">
            <div>
              <div className="text-4xl font-serif mb-2">25<span className="text-brand-accent text-2xl font-sans">+</span></div>
              <div className="text-[10px] uppercase tracking-widest text-brand-paper/50">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-serif mb-2">150<span className="text-brand-accent text-2xl font-sans">+</span></div>
              <div className="text-[10px] uppercase tracking-widest text-brand-paper/50">Projects Delivered</div>
            </div>
          </div>
        </div>

        <div className="space-y-12 pt-12 md:pt-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-brand-paper/60 font-light leading-relaxed"
          >
            We focus on design that not only looks elegant but also drives real business results. Our approach is strategic, detail-oriented, and tailored to lifestyle brands that value aesthetics as much as efficiency.
          </motion.p>
          
          <div className="border-t border-brand-paper/10 pt-12 grid gap-8">
            <div className="flex gap-6 items-center group cursor-default">
              <div className="w-12 h-12 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Award size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">Premium Execution</h4>
                <p className="text-xs text-brand-paper/40">Hand-crafted details for high-end results.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center group cursor-default">
              <div className="w-12 h-12 flex items-center justify-center border border-brand-paper/20 rounded-full group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors">
                <Sparkles size={20} className="text-brand-accent group-hover:text-brand-paper" />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-medium mb-1">Strategic Storytelling</h4>
                <p className="text-xs text-brand-paper/40">Design that speaks your brand's unique voice.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
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
    <section id="experience" className="py-24 bg-brand-paper overflow-hidden border-b border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 relative">
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
        </div>

        <div className="lg:col-span-7 space-y-12">
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
        </div>
      </div>
    </section>
  );
};

const Capabilities = () => {
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
    <section id="capabilities" className="py-24 bg-brand-ink text-brand-paper relative overflow-hidden border-b border-brand-paper/5">
      <div className="max-w-7xl mx-auto px-6">
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
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
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
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </section>
  );
};

const WhyChooseMe = () => {
  const points = [
    { title: "25+ Years Creative Experience", desc: "A quarter-century of designing for luxury and leading brands globally." },
    { title: "Print + Digital Expertise", desc: "Seamless synergy across tangible offline assets and digital ecosystems." },
    { title: "UI/UX + Branding Knowledge", desc: "Combining customer psychology, sleek interface design, and deep brand history." },
    { title: "Strategic Business Thinking", desc: "We don't just build designs. We design to drive real commercial results and outcomes." },
    { title: "Production & Execution Experience", desc: "Heavy expertise in final delivery, modern layouts, and premium production values." },
    { title: "Agency & Client-Side Understanding", desc: "Understanding corporate needs, dynamic challenges, and customer aspirations." }
  ];

  return (
    <section id="why-us" className="py-24 bg-brand-paper relative overflow-hidden border-b border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-12">
          <div className="lg:col-span-5">
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
          </div>

          <div className="lg:col-span-7 space-y-8">
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
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { value: "25+", label: "Years Experience" },
    { value: "200+", label: "Projects Delivered" },
    { value: "50+", label: "Brands Supported" },
    { value: "10+", label: "Industries Served" },
    { value: "1000+", label: "Creative Assets Designed" }
  ];

  return (
    <section className="py-20 bg-brand-ink text-brand-paper relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="max-w-7xl mx-auto px-6">
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
    <section className="py-24 bg-brand-paper overflow-hidden border-b border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Specialization</span>
            <span className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 font-medium block">INDUSTRIES</span>
            <h2 className="text-5xl md:text-7xl font-light leading-tight">
              Sectors We <br />
              <span className="italic text-brand-accent">Elevate</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base text-brand-muted font-light leading-relaxed max-w-xl">
              Our multidisciplinary background allows us to build powerful brand experiences, beautiful products, and high-conversion web layouts across various industries, creating tailored and scalable digital assets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Brand Identity",
      desc: "Build a premium, memorable identity that attracts the right audience through refined visual language.",
      icon: <Layers size={24} />,
      list: ["Logotype Design", "Color Strategy", "Brand Guidelines", "Visual Language"]
    },
    {
      title: "UI/UX Design",
      desc: "Create websites that don’t just look good—but convert visitors into loyal customers with seamless experience.",
      icon: <Compass size={24} />,
      list: ["Responsive Web Design", "User Journeys", "Prototype Development", "Conversion Optimization"]
    },
    {
      title: "Social Media Design",
      desc: "Consistent, high-end visuals that elevate your brand presence across all digital touchpoints.",
      icon: <Sparkles size={24} />,
      list: ["Content Systems", "Motion Graphics", "Template Design", "Art Direction"]
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Expertise</span>
          <h2 className="text-5xl md:text-7xl font-light">Services</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
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

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group grid md:grid-cols-2 gap-0 border-b border-brand-ink/10 relative overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-video md:aspect-auto">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-ink/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-8 md:p-16 flex flex-col justify-center">
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

const Portfolio = () => {
  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">Our Work</span>
          <h2 className="text-5xl md:text-7xl font-light">Featured Work</h2>
        </div>
        <div className="hidden md:block">
          <a href="#" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold group">
            View All Projects <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="border-t border-brand-ink/10">
        <PortfolioItem 
          title="Luxury Restaurant Branding"
          problem="Outdated branding and low digital engagement among premium audience."
          solution="Elegant visual identity with a high-conversion modern UI system."
          result="40% increase in online reservations."
          img="https://picsum.photos/seed/resto/1200/800"
          delay={0.1}
        />
        <PortfolioItem 
          title="Cafe Social Media System"
          problem="Inconsistent visual presence across diverse social channels."
          solution="Cohesive social media design system with high-end photography."
          result="Better engagement and stronger brand recall."
          img="https://picsum.photos/seed/cafe/1200/800"
          delay={0.2}
        />
        <PortfolioItem 
          title="Wellness Brand Growth"
          problem="Low conversion rate on digital landing pages."
          solution="Clean, conversion-focused UI design focused on user empathy."
          result="2.5x increase in lead generation potential."
          img="https://picsum.photos/seed/wellness/1200/800"
          delay={0.3}
        />
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Discovery", desc: "Understanding your brand, audience, and deep business goals." },
    { num: "02", title: "Strategy", desc: "Defining the design direction, structure, and market positioning." },
    { num: "03", title: "Design", desc: "Crafting elegant, high-performing visuals that command attention." },
    { num: "04", title: "Delivery", desc: "Final assets ready for seamless implementation and rollout." }
  ];

  return (
    <section id="process" className="py-24 bg-[#101010] text-brand-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="col-span-1">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">The Process</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">How We Work</h2>
            <p className="text-brand-paper/40 font-light leading-relaxed mb-8">
              Every project follows a refined methodology to ensure consistency, quality, and results that exceed expectations.
            </p>
            <div className="w-16 h-16 border border-brand-paper/10 rounded-full flex items-center justify-center text-brand-accent">
              <Sparkles size={24} />
            </div>
          </div>
          <div className="col-span-2 grid md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="p-10 border border-brand-paper/5 hover:border-brand-accent/30 transition-colors group">
                <div className="text-5xl font-serif text-brand-accent/20 group-hover:text-brand-accent transition-colors mb-6">{step.num}</div>
                <h3 className="text-xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                <p className="text-sm font-light text-brand-paper/40 group-hover:text-brand-paper/60 transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-paper border border-brand-ink/5 p-12 md:p-24 shadow-2xl relative overflow-hidden">
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>

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
              <a href="#" className="flex-1 flex items-center gap-6 p-6 border border-brand-ink/10 hover:bg-brand-ink group transition-colors">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-accent text-white rounded-full">
                  <Calendar size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-muted group-hover:text-brand-paper/40">Schedule</span>
                  <div className="text-sm font-medium group-hover:text-brand-paper">Book a Call</div>
                </div>
              </a>
              <a href="#" className="flex-1 flex items-center gap-6 p-6 border border-brand-ink/10 hover:bg-brand-ink group transition-colors">
                <div className="w-12 h-12 flex items-center justify-center bg-[#25D366] text-white rounded-full">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-muted group-hover:text-brand-paper/40">Chat</span>
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
              <span className="text-[10px] uppercase tracking-widest text-brand-muted italic">Limited Clients per Month</span>
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
            AAKAR<span className="text-brand-accent">.</span>
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
  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
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
      <Portfolio />
      <Process />
      <Contact />
      <Footer />

      {/* Smooth scroll anchor styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
