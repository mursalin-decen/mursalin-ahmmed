"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code, ExternalLink, Sparkles, FolderGit2 } from "lucide-react";
import TiltCard from "./TiltCard";
import { sfx } from "@/lib/audio";

interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack?: string[];
  link?: string;
  order?: number;
}

export default function ProjectsSection({ initialProjects }: { initialProjects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["ALL", "FULL STACK", "ANDROID / MOBILITY", "WEB APPS"];

  const filteredProjects = initialProjects.filter((p) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "FULL STACK") return p.category.toLowerCase().includes("full stack") || p.category.toLowerCase().includes("commerce");
    if (activeCategory === "ANDROID / MOBILITY") return p.category.toLowerCase().includes("android") || p.category.toLowerCase().includes("safety");
    if (activeCategory === "WEB APPS") return p.category.toLowerCase().includes("web") || p.category.toLowerCase().includes("community");
    return true;
  });

  return (
    <section id="work" className="section work-section">
      <div className="section-kicker">03 — SELECTED WORK</div>

      <div className="work-heading">
        <div>
          <h2>
            THINGS<br />
            <em>I BUILT.</em>
          </h2>
        </div>
        <div className="work-sub-container">
          <p>
            Architected with precision. Drop any new project folder into <code>public/projects</code> with a tiny <code>project.json</code> to register automatically.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="project-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => {
              sfx.playClick();
              setActiveCategory(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List with 3D Motion */}
      <div className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <TiltCard intensity={12} className="project-card-3d">
                <div className="project-card-header">
                  <span className="project-no">0{i + 1}</span>
                  <div className="project-meta">
                    <span className="cat-badge">{p.category}</span>
                    <span className="year-badge">{p.year}</span>
                  </div>
                </div>

                <div className="project-card-content">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="chips">
                    {p.stack?.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className="project-card-footer">
                  <button
                    className="project-details-btn"
                    onClick={() => {
                      sfx.playClick();
                      setSelectedProject(p);
                    }}
                  >
                    <span>EXPLORE PROJECT</span>
                    <Sparkles size={14} />
                  </button>
                  <a
                    href={p.link || "#"}
                    className="project-arrow-btn"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.title}`}
                    onClick={() => sfx.playClick()}
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Modal Preview */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content glass-panel"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-tag">
                  <FolderGit2 size={16} /> PROJECT SPECIFICATION
                </div>
                <button
                  className="modal-close"
                  onClick={() => {
                    sfx.playClick();
                    setSelectedProject(null);
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <span className="modal-cat">{selectedProject.category} // {selectedProject.year}</span>
                <h2>{selectedProject.title}</h2>
                <p className="modal-desc">{selectedProject.description}</p>
                <div className="modal-tech-stack">
                  <h4>TECHNOLOGY ARCHITECTURE</h4>
                  <div className="chips">
                    {selectedProject.stack?.map((s) => (
                      <span key={s} className="highlight-chip">
                        <Code size={12} /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <a
                  href={selectedProject.link || "#"}
                  className="modal-action-btn"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playClick()}
                >
                  LAUNCH REPOSITORY / DEMO <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
