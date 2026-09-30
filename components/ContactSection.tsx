"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, ArrowUpRight, Copy, Check, Send, ShieldCheck } from "lucide-react";
import { sfx } from "@/lib/audio";

export default function ContactSection() {
  const email = "stranger@portfolio.dev";
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    sfx.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    sfx.playClick();
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSentSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="contact section">
      <div className="section-kicker">05 — LET’S TALK</div>

      <div className="contact-main">
        <h2>
          HAVE AN IDEA?<br />
          <em>LET’S BUILD IT.</em>
        </h2>

        {/* Email Bar with One-Click Copy */}
        <div className="big-mail-container">
          <a
            className="big-mail"
            href={`mailto:${email}`}
            onClick={() => sfx.playClick()}
          >
            <span>{email}</span>
            <ArrowUpRight size={38} className="mail-arrow" />
          </a>
          <button
            className={`copy-btn ${copied ? "copied" : ""}`}
            onClick={handleCopyEmail}
            title="Copy email to clipboard"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY EMAIL"}</span>
          </button>
        </div>

        {/* Interactive Cyber Quick Message Dispatch */}
        <div className="contact-grid">
          <div className="socials-container">
            <span className="socials-label">DIRECT NETWORKS</span>
            <div className="socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" onClick={() => sfx.playClick()}>
                <Github /> GITHUB
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" onClick={() => sfx.playClick()}>
                <Linkedin /> LINKEDIN
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" onClick={() => sfx.playClick()}>
                <Instagram /> INSTAGRAM
              </a>
              <a href={`mailto:${email}`} onClick={() => sfx.playClick()}>
                <Mail /> EMAIL
              </a>
            </div>
          </div>

          <div className="quick-form-card glass-panel">
            <div className="form-header">
              <ShieldCheck size={14} className="accent-icon" />
              <span>ENCRYPTED MESSAGE DISPATCH</span>
            </div>

            <form onSubmit={handleSubmit} className="quick-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                />
              </div>
              <textarea
                placeholder="Brief project outline or message..."
                rows={3}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
              />
              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? (
                  <span>DISPATCHING...</span>
                ) : sentSuccess ? (
                  <span>✔ MESSAGE SENT SUCCESSFULLY</span>
                ) : (
                  <>
                    <span>DISPATCH MESSAGE</span> <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
