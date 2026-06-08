import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Compass, 
  Instagram, 
  Utensils, 
  Heart, 
  ShoppingBag, 
  Home, 
  GraduationCap, 
  Building2, 
  Rocket, 
  Cpu, 
  Factory, 
  Box,
  Palette,
  Smartphone,
  Laptop,
  Package,
  Megaphone,
  Briefcase,
  Printer,
  Presentation,
  Target,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { whatsappLink } from '../App';

interface ProjectsPageProps {
  onBackToHome: () => void;
  onContactClick: () => void;
  onBookClick: () => void;
}

export default function ProjectsPage({ onBackToHome, onContactClick, onBookClick }: ProjectsPageProps) {
  const containerRef = React.useRef(null);
  
  // Outer scroll tracking for parallax elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 0.4], ["0%", "30%"]);
  const giantTextY = useTransform(scrollYProgress, [0, 0.5], ["10%", "-40%"]);

  const allProjects = [
    {
      id: "project-healthcare",
      title: "Healthcare & Wellness Digital Experience",
      subtitle: "Digital Design & Customer Journeys",
      desc: "Designed user-centric digital experiences, campaign landing pages, emailers, social media creatives, and visual communication systems.",
      problem: "Complex healthcare and wellness services needed a more engaging digital presence and a seamless customer journey.",
      solution: "Designed user-centric digital experiences, campaign landing pages, emailers, social media creatives, and visual communication systems.",
      result: "Stronger audience engagement, improved brand consistency, and a more connected digital ecosystem.",
      services: [
        "UI/UX Experience Design",
        "Campaign Landing Pages",
        "Email Marketing Assets",
        "Social Media Design Systems",
        "Visual Communication Systems"
      ],
      img: "https://picsum.photos/seed/healthcarewellness/1200/800",
      category: "Healthcare & Wellness",
      num: "01"
    },
    {
      id: "project-enterprise",
      title: "Enterprise Mobile Application Design",
      subtitle: "UI/UX & Native Mobile Interfaces",
      desc: "Created intuitive user journeys, wireframes, design systems, and modern mobile interfaces focused on usability.",
      problem: "Users faced challenges navigating complex workflows and completing tasks efficiently.",
      solution: "Created intuitive user journeys, wireframes, design systems, and modern mobile interfaces focused on usability.",
      result: "Improved user experience, streamlined interactions, and enhanced product adoption.",
      services: [
        "User Journey Mapping",
        "Wireframing & Prototyping",
        "Cross-platform Design Systems",
        "Mobile App UI/UX",
        "Usability & Interaction Testing"
      ],
      img: "https://picsum.photos/seed/enterprisesystem/1200/800",
      category: "UI/UX & Product",
      num: "02"
    },
    {
      id: "project-restaurant",
      title: "Restaurant Brand Transformation",
      subtitle: "Branding, Menus & Campaigns",
      desc: "Developed branding assets, menu communication, social media campaigns, promotional creatives, and customer engagement strategies.",
      problem: "Limited digital visibility and inconsistent brand communication across customer touchpoints.",
      solution: "Developed branding assets, menu communication, social media campaigns, promotional creatives, and customer engagement strategies.",
      result: "Enhanced brand perception, stronger customer engagement, and increased local visibility.",
      services: [
        "Brand Identity Assets",
        "Menu Communication & Layout",
        "Social Media Campaigns",
        "Promotional Creatives",
        "Customer Experience Direction"
      ],
      img: "https://picsum.photos/seed/restaurantbrand/1200/800",
      category: "Restaurant Experience",
      num: "03"
    },
    {
      id: "project-corporate",
      title: "Corporate Branding & Marketing Communication",
      subtitle: "Integrated Collateral & Brand Systems",
      desc: "Designed integrated branding systems, brochures, presentations, campaign assets, and marketing collateral.",
      problem: "Brand messaging lacked consistency across marketing, sales, and corporate communication materials.",
      solution: "Designed integrated branding systems, brochures, presentations, campaign assets, and marketing collateral.",
      result: "Improved brand consistency, stronger communication, and a more professional brand presence.",
      services: [
        "Integrated Branding Systems",
        "Brochures & Print Layout",
        "Keynote & Sales Presentations",
        "Campaign Marketing Assets",
        "Corporate Brand Collateral"
      ],
      img: "https://picsum.photos/seed/corporatebrand/1200/800",
      category: "Campaigns & Events",
      num: "04"
    },
    {
      id: "project-website",
      title: "Website Experience Redesign",
      subtitle: "Information Architecture & Responsive Web",
      desc: "Redesigned information architecture, user experience flows, responsive interfaces, and content presentation.",
      problem: "An outdated website experience limited user engagement and weakened digital credibility.",
      solution: "Redesigned information architecture, user experience flows, responsive interfaces, and content presentation.",
      result: "A modern digital experience that improved usability, strengthened brand perception, and enhanced customer engagement.",
      services: [
        "Information Architecture",
        "User Experience Flows",
        "Responsive UI/UX Design",
        "Interactive Prototyping",
        "Content Presentation Systems"
      ],
      img: "https://picsum.photos/seed/websiteredesign/1200/800",
      category: "Web Design & Dev",
      num: "05"
    }
  ];

  const deliverables = [
    {
      id: "deliver-branding",
      title: "Branding",
      desc: "Building distinctive identities that create recognition and trust.",
      icon: <Layers size={22} />
    },
    {
      id: "deliver-uiux",
      title: "UI/UX Design",
      desc: "Designing intuitive digital experiences for web and mobile platforms.",
      icon: <Compass size={22} />
    },
    {
      id: "deliver-social",
      title: "Social Media",
      desc: "Creating engaging content that builds awareness and drives engagement.",
      icon: <Instagram size={22} />
    },
    {
      id: "deliver-products",
      title: "Digital Products",
      desc: "Developing user-focused experiences that align with business goals.",
      icon: <Cpu size={22} />
    },
    {
      id: "deliver-marketing",
      title: "Marketing Communication",
      desc: "Transforming ideas into compelling visual stories that connect with audiences.",
      icon: <Sparkles size={22} />
    }
  ];

  const highlights = [
    { value: "25+", label: "Years of Experience" },
    { value: "200+", label: "Projects Delivered" },
    { value: "50+", label: "Brands Served" },
    { value: "10+", label: "Industries Worked Across" }
  ];

  const industries = [
    "Hospitality & Restaurants",
    "Healthcare & Wellness",
    "Technology & SaaS",
    "Education",
    "Retail & FMCG",
    "Real Estate",
    "Lifestyle Brands",
    "Startups",
    "Corporate Enterprises"
  ];

  const servicesList = [
    "Branding & Identity Design",
    "UI/UX Design",
    "Website Design",
    "Mobile App Design",
    "Social Media Marketing Creatives",
    "Packaging Design",
    "Presentation Design",
    "Digital Strategy",
    "Creative Consulting"
  ];

  return (
    <div ref={containerRef} className="pb-24 bg-brand-paper min-h-screen">
      {/* Portfolio Top Bar */}
      <div className="border-b border-brand-ink/5 bg-brand-paper/90 backdrop-blur-md sticky top-0 z-40 py-5 transition-all">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button 
            id="btn-back-home"
            onClick={onBackToHome}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:text-brand-accent transition-all cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          
          <span className="font-serif text-lg font-bold tracking-tighter">
            AAKAR<span className="text-brand-accent">.</span> STUDIO
          </span>

          <button 
            id="btn-projects-contact"
            onClick={onBookClick}
            className="text-[10px] uppercase tracking-widest font-bold text-brand-accent hover:text-brand-ink transition-colors bg-transparent border-none cursor-pointer"
          >
            Book a Call
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section id="projects-hero" className="relative pt-20 pb-24 overflow-hidden border-b border-brand-ink/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">PORTFOLIO</span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-light mb-8 leading-tight">
              Featured <span className="italic text-brand-accent">Work</span>
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-brand-ink max-w-2xl font-serif italic mb-6">
              A curated selection of branding, UI/UX, digital product, and creative communication projects that reflect our passion for purposeful design and meaningful user experiences.
            </p>
            <div className="w-12 h-[2px] bg-brand-accent mb-8"></div>
            <p className="text-base text-brand-muted font-light leading-relaxed max-w-xl">
              We approach every challenge with strategic thinking and creative mastery. Our projects bridge aesthetics with measurable business and user experience outcomes.
            </p>
          </div>
        </div>

        {/* Parallax giant background elements */}
        <motion.div 
          style={{ y: giantTextY }}
          className="absolute right-6 bottom-0 opacity-[0.02] select-none pointer-events-none translate-y-1/3 text-[24rem] font-serif font-bold italic"
        >
          Work
        </motion.div>
      </section>

      {/* Projects List Segment */}
      <section id="all-projects-list" className="py-24 max-w-7xl mx-auto px-6">
        <div className="space-y-32">
          {allProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={project.id}
                id={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Visual Area */}
                <div className={`lg:col-span-7 relative group overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="overflow-hidden aspect-video relative rounded-lg border border-brand-ink/5">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale brightness-90 transition-all duration-700 group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-ink/20 opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
                  </div>
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 bg-brand-ink/80 backdrop-blur-sm text-brand-paper px-4 py-1.5 text-[10px] uppercase tracking-widest font-mono">
                    {project.category}
                  </div>
                  {/* Corner Big Number */}
                  <div className="absolute -bottom-6 right-4 font-serif text-[7rem] text-brand-accent/10 font-bold select-none leading-none group-hover:text-brand-accent/20 transition-colors">
                    {project.num}
                  </div>
                </div>

                {/* Content Area */}
                <div className={`lg:col-span-5 space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-accent font-medium mb-1 block">
                      {project.subtitle}
                    </span>
                    <h3 className="text-3xl md:text-4xl text-brand-ink mb-4 font-medium transition-colors group-hover:text-brand-accent font-serif">
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-accent block mb-1 font-semibold font-mono">Problem</span>
                      <p className="text-sm font-light text-brand-muted leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-accent block mb-1 font-semibold font-mono">Solution</span>
                      <p className="text-sm font-light text-brand-muted leading-relaxed">{project.solution}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-accent block mb-1 font-semibold font-mono">Result</span>
                      <p className="text-sm font-medium text-brand-ink leading-relaxed">{project.result}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-ink/5">
                    <span className="text-[10px] uppercase tracking-widest text-brand-accent font-semibold block mb-3 font-mono">
                      Services Provided
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((srv) => (
                        <span 
                          key={srv}
                          className="px-3 py-1 bg-white border border-brand-ink/5 text-[10px] uppercase tracking-wider text-brand-muted rounded-full"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Deliverable/Capabilities Section */}
      <section id="what-we-deliver" className="py-24 bg-brand-ink text-brand-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">DELIVERABLES</span>
            <h2 className="text-5xl md:text-6xl font-light mb-4">What We Deliver</h2>
            <p className="text-sm font-light text-brand-paper/50 tracking-wide">
              Meticulous craftsmanship across essential digital and strategic creative fields.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {deliverables.map((item) => (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-paper/[0.02] border border-brand-paper/5 p-8 flex flex-col justify-between hover:bg-brand-paper/[0.05] hover:border-brand-accent/40 rounded-lg group transition-all duration-300"
              >
                <div className="text-brand-accent mb-8 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg mb-2 font-serif font-medium group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-light text-brand-paper/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Highlights Statistics */}
      <section id="projects-highlights" className="py-24 bg-brand-paper relative overflow-hidden border-b border-brand-ink/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-2 block">HIGHLIGHTS</span>
            <h2 className="text-sm uppercase tracking-[0.5em] text-brand-ink/40 font-medium">PROJECT HIGHLIGHTS</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-brand-ink/5 bg-white relative group rounded-lg"
              >
                <div className="text-6xl font-serif text-brand-accent mb-4 group-hover:scale-105 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-brand-muted font-mono leading-relaxed">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Grid */}
      <section id="projects-industries" className="py-24 bg-brand-paper relative overflow-hidden border-b border-brand-ink/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">SECTORS & MARKETS</span>
              <h2 className="text-4xl md:text-5xl font-light leading-tight">
                Industries We Have <br />
                <span className="italic text-brand-accent">Worked With</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-sm text-brand-muted font-light leading-relaxed max-w-xl">
                Our collaborative design practice spans diverse commercial fields, ensuring customized, functional visual identities and products with high strategic relevance.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {industries.map((ind, idx) => (
              <motion.div
                key={ind}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="px-6 py-3 bg-white border border-brand-ink/5 hover:border-brand-accent/40 rounded-full text-xs uppercase tracking-widest font-mono text-brand-ink cursor-default hover:text-brand-accent transition-all duration-300"
              >
                {ind}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design with Purpose full width panel */}
      <section id="design-purpose" className="py-24 bg-brand-ink text-brand-paper relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-accent mb-6 block">OUR CORE ETHOS</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light leading-relaxed italic mb-8">
            "Every project begins with understanding the business, audience, and objectives. Our process combines strategy, creativity, and user experience to create solutions that are not only visually appealing but also deliver measurable business value."
          </h2>
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-brand-accent"></span>
            <span className="text-[10px] uppercase tracking-widest text-brand-muted">Design With Purpose</span>
            <span className="w-8 h-[1px] bg-brand-accent"></span>
          </div>
        </div>
      </section>

      {/* Call to Action segment */}
      <section id="projects-cta" className="py-24 bg-brand-paper relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-brand-ink/5 p-12 md:p-24 shadow-xl relative overflow-hidden rounded-lg">
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <span className="text-xs uppercase tracking-[0.4em] font-medium text-brand-muted mb-4 block">LET'S COLLABORATE</span>
                <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
                  Let’s Create Something <span className="italic text-brand-accent font-serif font-normal">Meaningful</span>
                </h2>
                <p className="text-sm text-brand-muted leading-relaxed font-light mb-10 max-w-md">
                  Whether you're building a new brand, redesigning a digital product, launching a marketing campaign, or creating a memorable customer experience, AAKAR Studio is ready to help bring your vision to life.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={onBookClick} 
                    className="group px-8 py-4 bg-brand-accent text-white hover:bg-brand-ink hover:text-brand-paper transition-colors flex items-center gap-3 cursor-pointer rounded"
                  >
                    <span className="text-xs uppercase tracking-widest font-bold">Book a Call</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors rounded text-xs uppercase tracking-widest font-bold decoration-none"
                    id="projects-cta-whatsapp"
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp Us</span>
                  </a>
                  <button 
                    onClick={onBackToHome} 
                    className="px-8 py-4 border border-brand-ink/10 text-xs uppercase tracking-widest font-bold hover:bg-brand-ink/5 transition-colors cursor-pointer rounded"
                  >
                    Back to Overview
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-ink font-semibold block mb-6">
                  Services Provided
                </span>
                <div className="grid sm:grid-cols-2 gap-3">
                  {servicesList.map((srv, idx) => (
                    <div 
                      key={srv}
                      className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-brand-muted py-2 border-b border-brand-ink/5"
                    >
                      <span className="text-brand-accent font-mono text-[10px]">{(idx + 1) < 10 ? `0${idx + 1}` : idx + 1}.</span>
                      {srv}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Backlog brand logo absolute */}
            <div className="absolute right-0 bottom-0 opacity-[0.015] select-none pointer-events-none translate-y-1/3 translate-x-1/4">
              <span className="text-[12rem] font-serif font-bold italic">AAKAR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal signature */}
      <div className="text-center py-10 border-t border-brand-ink/5">
        <span className="text-xs font-serif font-medium uppercase tracking-[0.3em]">
          AAKAR STUDIO <span className="text-brand-accent">.</span> 
          <span className="text-[10px] uppercase tracking-widest text-brand-muted font-sans font-light italic ml-2">Where Creativity Takes Shape</span>
        </span>
      </div>
    </div>
  );
}
