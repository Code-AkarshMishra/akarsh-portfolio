'use client';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin, ExternalLink, Code2, BrainCircuit, Layout, Menu, X, Trophy, Award, FileText, Microscope, Radio, Server } from 'lucide-react';
import React, { useState } from 'react';
import TiltCard from '@/components/TiltCard';
import ContactForm from '@/components/ContactForm';

// Reusable Animation Wrapper
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [selectedCert, setSelectedCert] = useState<{ title: string, image: string } | null>(null);

  // Navigation Links
  const navLinks = [
    { name: 'About Me', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact Me', href: '#contact' },
    { name: 'Socials', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-navy-900 overflow-hidden font-sans selection:bg-electric-purple selection:text-white pb-10">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue to-electric-purple origin-left z-[110]"
        style={{ scaleX }}
      />

      {/* --- NAVIGATION BAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-navy-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-white tracking-widest">
            <span className="text-electric-blue">Akarsh Mishra</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white hover:underline decoration-electric-blue decoration-2 underline-offset-8 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-navy-900 border-b border-white/10 py-4 px-6 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-electric-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-electric-purple/20 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full bg-electric-blue/10 blur-[150px]" />
        </div>

        {/* Modified Hero Layout: Text on Left, Image on Right */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full">

          {

            /* Left Text Column */
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-3/5 text-center md:text-left"
            >
              {/* 1. Top Tag */}
              <h2 className="text-electric-blue font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">
                Aspiring AI Engineer & Web Developer
              </h2>

              {/* 2. Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Hi, I'm Akarsh Mishra 👋
              </h1>

              {/* 3. Sub-heading / Description */}
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed">
                I develop <span className="text-white">modern web applications</span> and intelligent systems using programming and emerging technologies.
                <br className="hidden md:block mb-2" />
                Focused on AI, Machine Learning, and real-world software products.
                q  1`` Building <strong>ENROLE</strong>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <a href="#projects" className="group relative px-8 py-3 bg-white text-navy-900 font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <span className="relative z-10 flex items-center gap-2">View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                </a>

                <a href="/resume.pdf" download="Akarsh_Mishra_Resume.pdf" className="px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all flex items-center gap-2 hover:border-electric-blue/50">
                  <Download size={18} /> Download Resume
                </a>
              </div>
            </motion.div>}

          {/* Right Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:w-2/5 flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-tr from-electric-blue to-electric-purple group shadow-[0_0_40px_rgba(138,43,226,0.3)] hover:shadow-[0_0_60px_rgba(0,240,255,0.5)] transition-shadow duration-500">
              <div className="w-full h-full rounded-full bg-navy-900 border-4 border-navy-900 overflow-hidden relative">
                {/* TO DO: Place your image in the public folder and update this src path */}
                <img
                  src="/profile.jpeg"
                  alt="Akarsh Mishra"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h3 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
              <BrainCircuit className="text-electric-purple" /> More About Me
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-glass-gradient border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-lg shadow-black/50">
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-electric-blue shrink-0 shadow-[0_0_8px_#00f0ff]" />
                    <span><strong>B.Tech CSE (2023–2027)</strong> based in Lucknow, Uttar Pradesh,India.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-electric-purple shrink-0 shadow-[0_0_8px_#8a2be2]" />
                    <span>I am interested in <strong>Artificial Intelligence, Machine Learning</strong> and <strong> Web Development.</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-electric-blue shrink-0 shadow-[0_0_8px_#00f0ff]" />
                    <span>I like learning new technologies and building projects to improve my development skills.</span>
                  </li>

                </ul>
              </div>
              <div className="bg-glass-gradient border border-white/10 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-center shadow-lg shadow-black/50">
                <h4 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-electric-purple">Current Objective</h4>
                <p className="text-gray-400 leading-relaxed">Building ENROLE, exploring facial emotion analysis, and technologies like 6G communication</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- PROJECTS & RESEARCH --- */}
      <section id="projects" className="py-24 px-6 relative bg-black/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h3 className="text-3xl md:text-4xl font-bold mb-16 text-center">Featured Deployments & Builds</h3>
          </FadeIn>

          <div className="space-y-16 mb-16">

            {/* 1. ENROLE (Currently Building) */}
            <FadeIn>
              <TiltCard>
                <div className="group flex flex-col md:flex-row gap-8 bg-glass-gradient border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm hover:border-electric-blue/50 transition-all duration-500 shadow-xl shadow-black/50">
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="text-xs font-bold tracking-widest text-electric-blue uppercase mb-2">Currently Building</div>
                    <h4 className="text-3xl font-bold mb-3 text-white">ENROLE – Smart Interview Platform</h4>
                    <p className="text-gray-400 mb-6 text-lg">AI-based platform for managing interviews, candidate evaluation, and automated recruitment workflows.</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['AI Models', 'Web Stack', 'Workflows'].map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue">{tech}</span>
                      ))}
                    </div>
                  </div>
                  {/* Image Container */}
                  <div className="md:w-1/2 h-64 bg-navy-800 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-shadow">
                    <img
                      src="/projects/enrole.png"
                      alt="ENROLE Dashboard"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Fallback Icon if image is missing */}
                    <span className="absolute -z-10 text-gray-600 font-mono flex flex-col items-center gap-2"><Layout size={32} /> ENROLE_UI</span>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

            {/* 2. PrepBot.AI (Hackathon Finale) */}
            <FadeIn delay={0.2}>
              <TiltCard>
                <div className="group flex flex-col md:flex-row-reverse gap-8 bg-glass-gradient border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm hover:border-electric-purple/50 transition-all duration-500 shadow-xl shadow-black/50">
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="text-xs font-bold tracking-widest text-electric-purple uppercase mb-2">Hack With UP Grand Finale</div>
                    <h4 className="text-3xl font-bold mb-3 text-white">PrepBot.AI – Smart EdTech</h4>
                    <p className="text-gray-400 mb-6 text-lg">An AI-driven educational platform developed with "Script Squad". Designed to deliver intelligent tutoring and scalable learning solutions.</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['MERN Stack', 'AI Integration', 'EdTech'].map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs bg-electric-purple/10 border border-electric-purple/20 rounded-full text-electric-purple">{tech}</span>
                      ))}
                    </div>
                  </div>
                  {/* Image Container */}
                  <div className="md:w-1/2 h-64 bg-navy-800 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(138,43,226,0.2)] transition-shadow">
                    <img
                      src="/projects/prepbot.png"
                      alt="PrepBot.AI Interface"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <span className="absolute -z-10 text-gray-600 font-mono flex flex-col items-center gap-2"><BrainCircuit size={32} /> PrepBot_UI</span>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

            {/* 3. MedRX (College Project) */}
            <FadeIn delay={0.4}>
              <TiltCard>
                <div className="group flex flex-col md:flex-row gap-8 bg-glass-gradient border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm hover:border-white/30 transition-all duration-500 shadow-xl shadow-black/50">
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">College Project</div>
                    <h4 className="text-3xl font-bold mb-3 text-white">MedRX – Prescription System</h4>
                    <p className="text-gray-400 mb-6 text-lg">A system designed to simplify and explain doctor's prescriptions in an easy-to-understand way for patients.</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['Data Processing', 'UI/UX', 'Healthcare'].map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-full text-gray-300">{tech}</span>
                      ))}
                    </div>
                  </div>
                  {/* Image Container */}
                  <div className="md:w-1/2 h-64 bg-navy-800 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow">
                    <img
                      src="/projects/medrx.png"
                      alt="MedRX Interface"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <span className="absolute -z-10 text-gray-600 font-mono flex flex-col items-center gap-2"><FileText size={32} /> MedRX_Interface</span>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>

          </div>

          {/* Grid for Smaller Projects */}
          <FadeIn delay={0.5}>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
              {[
                { title: "Simon Says Game", desc: "Interactive memory game with sound and animations.", tech: "HTML, CSS, JS", icon: <Code2 className="text-electric-blue mb-4" size={32} /> },
                { title: "Python To-Do List", desc: "A sleek, functional task management tool.", tech: "Python", icon: <Server className="text-electric-purple mb-4" size={32} /> },
                { title: "Inventory Management", desc: "System to track and manage product inventory efficiently.", tech: "Backend & DB", icon: <Layout className="text-white mb-4" size={32} /> },
                { title: "Frontend Clones", desc: "Practice projects building static web pages and pixel-perfect UIs.", tech: "HTML, CSS", icon: <Trophy className="text-electric-blue mb-4" size={32} /> }
              ].map((proj, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                  {proj.icon}
                  <h4 className="text-xl font-bold mb-2 text-white">{proj.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">{proj.desc}</p>
                  <span className="text-xs font-mono text-gray-500 bg-black/50 px-3 py-1 rounded-md">{proj.tech}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Research & Learning */}
          <FadeIn delay={0.6}>
            <h4 className="text-2xl font-bold mb-6 flex items-center gap-3 border-t border-white/10 pt-12"><Microscope className="text-electric-purple" /> Currently Exploring & Researching</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-navy-800 to-transparent border border-white/5 p-6 rounded-xl flex items-center gap-4">
                <BrainCircuit className="text-electric-blue shrink-0" size={28} />
                <div>
                  <h5 className="font-bold text-white">Facial Emotion Analysis</h5>
                  <p className="text-sm text-gray-400">Deep learning and research into real-time emotion detection.</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-navy-800 to-transparent border border-white/5 p-6 rounded-xl flex items-center gap-4">
                <Radio className="text-electric-purple shrink-0" size={28} />
                <div>
                  <h5 className="font-bold text-white">6G Technology</h5>
                  <p className="text-sm text-gray-400">Research seminar on the future of ultra-fast telecommunications.</p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* --- SKILLS & EXPERIENCE GRID --- */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Skills (Left Column) */}
          <div>
            <FadeIn>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Code2 className="text-electric-blue" /> Technical Arsenal</h3>
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">AI & MACHINE LEARNING</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Machine Learning', 'Computer Vision', 'Data Processing'].map(s => (
                      <span key={s} className="px-3 py-1.5 bg-black/40 text-electric-blue text-sm rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">FRONTEND TECHNOLOGIES</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'JavaScript', 'HTML5/CSS3'].map(s => (
                      <span key={s} className="px-3 py-1.5 bg-black/40 text-electric-purple text-sm rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">BACKEND & INFRASTRUCTURE</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'REST APIs', 'Database Systems', 'Git & GitHub'].map(s => (
                      <span key={s} className="px-3 py-1.5 bg-black/40 text-gray-300 text-sm rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Experience Timeline (Right Column) */}
          <div className="space-y-12">
            <FadeIn delay={0.2}>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Layout className="text-electric-purple" /> Experience & Leadership</h3>
              <div className="relative pl-6 border-l-2 border-white/10 space-y-10">

                {/* Vault of Codes */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-navy-900 border-2 border-electric-blue rounded-full shadow-[0_0_10px_#00f0ff]" />
                  <h4 className="text-xl font-bold text-white">Dual Software Intern</h4>
                  <p className="text-electric-blue text-sm mb-3 font-mono">Vault of Codes</p>
                  <ul className="text-gray-400 space-y-2 text-sm leading-relaxed">
                    <li>• Completed two separate intensive internships: <strong>Web Development</strong> and <strong>Python Programming</strong>.</li>
                    <li>• Secured a formal Offer Letter following an exceptionally high score in the Python internship track.</li>
                  </ul>
                </div>

                {/* Hack With UP */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-navy-900 border-2 border-electric-purple rounded-full shadow-[0_0_10px_#8a2be2]" />
                  <h4 className="text-xl font-bold text-white">Grand Finale Competitor</h4>
                  <p className="text-electric-purple text-sm mb-3 font-mono">Hack With Uttar Pradesh (2025)</p>
                  <ul className="text-gray-400 space-y-2 text-sm leading-relaxed">
                    <li>• Qualified and traveled to compete in the offline Grand Finale at a distinct university venue.</li>
                  </ul>
                </div>

                {/* College Tech Club / Hackathon */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-navy-900 border-2 border-white rounded-full" />
                  <h4 className="text-xl font-bold text-white">Event Coordinator & Tech Lead</h4>
                  <p className="text-gray-300 text-sm mb-3 font-mono">College Technical Club</p>
                  <ul className="text-gray-400 space-y-2 text-sm leading-relaxed">
                    <li>• Successfully hosted and managed a large-scale collegiate hackathon as the primary Event Coordinator.</li>
                    <li>• Worked as Documentation member for the Technical Club; responsible for drafting official technical reports distributed directly to higher university authorities.</li>
                  </ul>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* --- CERTIFICATIONS SECTION --- */}
      <section id="certifications" className="py-24 px-6 relative bg-gradient-to-b from-navy-900 to-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-4">
              <Award className="text-electric-blue" size={36} /> Certifications
            </h3>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              Official recognitions, hackathon qualifications, and internship completion records.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Deloitte Technology Simulation", type: "Coding & Development", date: "July 2025", image: "/certificates/deloitte-tech.png" },
                { title: "Deloitte Cyber Simulation", type: "Cyber Security", date: "July 2025", image: "/certificates/deloitte-cyber.png" },
                { title: "Vault of Codes LOR", type: "Professional Recognition", date: "Python Excellence", image: "/certificates/OFFERLETTER.JPG" },
                { title: "Hack with UP Grand Finale", type: "Hackathon Finalist", date: "State Level", image: "/certificates/HWUP.JPG" },
                { title: "Python Developer Internship", type: "Vault of Codes", date: "Completion Certificate", image: "/certificates/python-intern.jpeg" },
                { title: "Web Developer Internship", type: "Vault of Codes", date: "Completion Certificate", image: "/certificates/webd-intern.jpeg" },
                { title: "Smart India Hackathon", type: "Internal Round", date: "Participation", image: "/certificates/sih25.png" },
                { title: "Google Ads Certification", type: "Digital Marketing", date: "Google", image: "/certificates/google-ads.jpeg" }
              ].map((cert, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCert(cert)}
                  className="group relative bg-glass-gradient border border-white/10 p-6 rounded-2xl overflow-hidden hover:border-electric-purple/50 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(138,43,226,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 mb-6">
                    <Award className="text-gray-500 group-hover:text-electric-blue transition-colors mb-4" size={28} />
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-electric-purple transition-colors">{cert.title}</h4>
                    <p className="text-sm text-gray-400 font-medium mb-3">{cert.type}</p>
                    <div className="inline-block px-3 py-1 bg-black/40 border border-white/10 rounded-md text-xs text-gray-500 font-mono">
                      {cert.date}
                    </div>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-sm font-medium text-gray-500 group-hover:text-electric-blue transition-colors">
                    <span>View Certificate</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- IMAGE POPUP MODAL (LIGHTBOX) --- */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Card ke andar click karne par band nahi hoga
              className="relative w-full max-w-4xl bg-navy-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-black/50">
                <h3 className="text-xl md:text-2xl font-bold text-white">{selectedCert.title}</h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-electric-purple transition-colors rounded-full text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Image Display */}
              <div className="relative p-4 md:p-8 bg-black/30 flex justify-center items-center min-h-[50vh]">
                {/* Agar image link galat ho toh alt text dikhega, warna actual image */}
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[60vh] w-auto object-contain rounded-lg border border-white/5 shadow-2xl"
                  onError={(e) => {
                    // Agar image load nahi hui (kyunki abhi files nahi hain)
                    e.currentTarget.src = "https://via.placeholder.com/800x600/0a0f1c/00f0ff?text=Certificate+Image+Pending";
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- FOOTER / CONTACT --- */}
      <footer id="contact" className="pt-24 pb-12 px-6 bg-black/50 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Let's Connect & Build Something Scalable.</h2>
              <p className="text-gray-400 text-lg">Currently open for new opportunities, collaborations, and Internship.</p>
            </div>

            <ContactForm />

            <div className="flex justify-center gap-6 mt-16 mb-8">
              <a href="akarshmishra.cs@gmail.com" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-electric-blue hover:text-black hover:scale-110 transition-all shadow-lg hover:shadow-[0_0_20px_#00f0ff]">
                <Mail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/akarshmishra1/" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-electric-purple hover:text-white hover:scale-110 transition-all shadow-lg hover:shadow-[0_0_20px_#8a2be2]">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/Code-AkarshMishra" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black hover:scale-110 transition-all shadow-lg hover:shadow-[0_0_20px_#ffffff]">
                <Github size={24} />
              </a>
            </div>
            <p className="text-center text-gray-600 text-sm font-medium tracking-wide">© {new Date().getFullYear()} Made With ❤️ By Akarsh Mishra</p>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}