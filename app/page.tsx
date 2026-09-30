"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Terminal as TerminalIcon,
  ShieldCheck,
  Cpu,
  Code2,
  Lock,
  Layers,
  Sparkles,
  ChevronUp,
} from "lucide-react";
import projectsData from "@/data/projects.generated.json";
import ThreeBackground from "@/components/ThreeBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import TiltCard from "@/components/TiltCard";
import CyberTerminal from "@/components/CyberTerminal";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import { sfx } from "@/lib/audio";

const skills = [
  ["PYTHON", "Automation • Scripting • Backend APIs", "01"],
  ["JAVA", "OOP • Enterprise Application Dev", "02"],
  ["JAVASCRIPT / TS", "Modern Web • Interactive 3D & UI", "03"],
  ["NEXT.JS", "React 19 • Full-Stack Architecture", "04"],
  ["DJANGO", "Robust Backend • REST APIs • DBs", "05"],
  ["LINUX", "CLI Systems • Scripting & Workflows", "06"],
  ["KALI LINUX", "Security Labs • Penetration Tooling", "07"],
  ["CYBERSECURITY", "Web Security • Network Defense • CTF", "08"],
];

export default function Home() {
  const scrollToTop = () => {
    sfx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="portfolio-app">
      {/* 3D WebGL Background Canvas */}
      <ThreeBackground />

      {/* Smooth Trailing Custom Cursor */}
      <CustomCursor />

      {/* Film Grain Ambient Noise Overlay */}
      <div className="noise" />

      {/* Futuristic Glassmorphic Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section id="top" className="hero">
        <div className="hero-grid" />
        <div className="hero-glow-accent" />

        <div className="hero-copy">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow-container"
          >
            <span className="eyebrow-badge">CYBER-ARCHITECT / 2026</span>
            <span className="eyebrow-sub">// CREATIVE CODE & SECURITY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="hero-heading"
          >
            MR.<br />
            <em className="gradient-stroke">STRANGER</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="hero-sub"
          >
            Developer <span className="dot-divider">•</span> CSE Student <span className="dot-divider">•</span> Cybersecurity Enthusiast
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hero-cta-group"
          >
            <a
              href="#work"
              className="primary-btn"
              onClick={() => sfx.playClick()}
            >
              <span>VIEW PROJECTS</span>
              <ArrowDownRight size={16} />
            </a>
            <a
              href="#contact"
              className="secondary-btn"
              onClick={() => sfx.playClick()}
            >
              <span>INITIATE CONTACT</span>
            </a>
          </motion.div>
        </div>

        {/* 3D HUD PORTRAIT CARD */}
        <motion.div
          className="portrait-wrapper"
          initial={{ opacity: 0, scale: 0.94, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <TiltCard intensity={18} className="portrait-tilt">
            <div className="portrait">
              <Image
                src="/images/profile.png"
                alt="MR. STRANGER Portrait"
                fill
                priority
                sizes="(max-width: 800px) 85vw, 50vw"
              />
              <div className="portrait-scanline" />
              <div className="portrait-shade" />

              {/* Cyber HUD Overlay Badges */}
              <div className="hud-badge hud-top-left">
                <span className="hud-dot" /> SYSTEM ONLINE
              </div>
              <div className="hud-badge hud-top-right">
                <ShieldCheck size={12} /> SECURED
              </div>
              <div className="portrait-label">
                <span>01 / IDENTITY</span>
                <span className="mono-muted">KHULNA, BD</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <a
          className="scroll"
          href="#about"
          onClick={() => sfx.playClick()}
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight size={16} className="bounce-y" />
        </a>
      </section>

      {/* MANIFESTO / PROFILE SECTION */}
      <section id="about" className="manifesto section">
        <div className="section-kicker">01 — PROFILE MANIFESTO</div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="manifesto-text"
        >
          I build <span>digital experiences</span> that feel as fast & precise as they look.
        </motion.div>

        <div className="manifesto-bottom">
          <p>
            Bridging front-end aesthetic perfection with rock-solid backends, Linux system mechanics, and cybersecurity labs. I build web architectures and tools meant to scale and stand out.
          </p>
          <div className="manifesto-location">
            <span className="loc-label">LOCATION & TIMEZONE</span>
            <span className="loc-val">KHULNA, BD // UTC +06:00</span>
          </div>
        </div>
      </section>

      {/* STACK / INTERACTIVE TERMINAL SECTION */}
      <section id="skills" className="section stack-section">
        <div className="section-kicker">02 — TECHNICAL CAPABILITIES</div>

        {/* Live Cyber Shell Terminal */}
        <CyberTerminal />

        {/* Skills 3D Grid */}
        <div className="skills-grid">
          {skills.map(([name, desc, no], i) => (
            <TiltCard key={name} intensity={10} className="skill-card-wrap">
              <motion.div
                className="skill"
                whileHover={{ backgroundColor: "rgba(215, 255, 63, 0.04)" }}
              >
                <span className="skill-num">{no}</span>
                <div className="skill-info">
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </div>
                <ArrowUpRight size={18} className="skill-arrow" />
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Core Pillars Banner */}
        <div className="skill-icons">
          <TiltCard intensity={8}>
            <div className="pillar-box">
              <TerminalIcon />
              <div>
                <h4>LINUX CLI</h4>
                <span>OS Kernel & Workflows</span>
              </div>
            </div>
          </TiltCard>
          <TiltCard intensity={8}>
            <div className="pillar-box">
              <ShieldCheck />
              <div>
                <h4>SECURITY LABS</h4>
                <span>Web Defense & CTF</span>
              </div>
            </div>
          </TiltCard>
          <TiltCard intensity={8}>
            <div className="pillar-box">
              <Cpu />
              <div>
                <h4>SYSTEMS</h4>
                <span>Python & Java Core</span>
              </div>
            </div>
          </TiltCard>
          <TiltCard intensity={8}>
            <div className="pillar-box">
              <Code2 />
              <div>
                <h4>FULL STACK</h4>
                <span>Next.js & Modern UI</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* PROJECTS SECTION WITH CATEGORIES & MODAL */}
      <ProjectsSection initialProjects={projectsData} />

      {/* CINEMATIC BREAK BANNER */}
      <section className="section cinematic-break">
        <div className="cinematic-bg-glow" />
        <motion.div
          className="break-word"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          CODE<br />
          <span className="break-stroke">CREATE</span><br />
          EXPLORE
        </motion.div>
        <div className="break-caption">
          <span>NO FIXED BOUNDARIES.</span><br />
          <span>CONSTANTLY EVOLVING THE STACK.</span>
        </div>
      </section>

      {/* THE PERSON / ABOUT DETAILED SECTION */}
      <section className="section about-grid">
        <div className="section-kicker">04 — THE PERSON</div>
        <div className="about-copy">
          <h2>
            CURIOUS<br />
            <em>BY DEFAULT.</em>
          </h2>
          <p>
            I’m a Computer Science & Engineering student driven by standard-setting UI design and deep system exploration. Whether scripting automation in Python, engineering backend structures in Django/Java, or analyzing security vectors in Linux labs, I build with purpose.
          </p>
          <p>
            The vision is simple: craft ultra-refined interfaces, engineer resilient backends, and continuously raise the benchmark for what high-performing web applications feel like.
          </p>

          <div className="about-stats-grid">
            <div className="stat-card glass-panel">
              <span className="stat-num">100%</span>
              <span className="stat-label">Clean Code Commitment</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-num">8+</span>
              <span className="stat-label">Core Technologies Mastered</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Continuous Learning Mindset</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactSection />

      {/* FOOTER */}
      <footer>
        <div className="footer-left">
          <span>© 2026 MR. STRANGER</span>
          <span className="sep">•</span>
          <span>BUILT WITH NEXT.JS 15, THREE.JS & FRAMER MOTION</span>
        </div>

        <button className="back-to-top" onClick={scrollToTop}>
          <span>BACK TO TOP</span>
          <ChevronUp size={14} />
        </button>
      </footer>
    </main>
  );
}
