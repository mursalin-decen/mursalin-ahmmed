"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Cpu, RefreshCw, CheckCircle2 } from "lucide-react";
import { sfx } from "@/lib/audio";

interface LogItem {
  type: "input" | "output" | "system" | "accent";
  text: string;
}

export default function CyberTerminal() {
  const [logs, setLogs] = useState<LogItem[]>([
    { type: "system", text: "SYSTEM INIT v2.6.0 [KERNEL: CYBER-CORE-64]" },
    { type: "system", text: "AUTHENTICATED USER: STRANGER // ACCESS LEVEL: UNRESTRICTED" },
    { type: "input", text: "$ whoami" },
    { type: "output", text: "> Developer • CSE Student • Cybersecurity Enthusiast • Khulna, BD" },
    { type: "input", text: "$ cat /etc/skills" },
    { type: "output", text: "> Python, Java, JavaScript, Next.js, Django, Linux CLI, Kali Linux & Web Security Labs" },
  ]);

  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const executeCommand = (cmdStr: string) => {
    sfx.playClick();
    const cleanCmd = cmdStr.trim().toLowerCase();
    const newLogs: LogItem[] = [...logs, { type: "input", text: `$ ${cmdStr}` }];

    if (cleanCmd === "clear") {
      setLogs([{ type: "system", text: "TERMINAL CLEARED." }]);
      setInputVal("");
      return;
    }

    if (cleanCmd === "whoami") {
      newLogs.push({
        type: "output",
        text: "> MR. STRANGER | Computer Science & Engineering Student | Full-Stack Builder & Cyber Defense",
      });
    } else if (cleanCmd === "skills" || cleanCmd === "cat /etc/skills") {
      newLogs.push({
        type: "accent",
        text: "⚡ CORE STACK: Python (FastAPI/Django) | Java | JavaScript (Next.js/React) | Linux & Security Labs",
      });
    } else if (cleanCmd === "cyber-scan" || cleanCmd === "security-scan") {
      newLogs.push({ type: "system", text: "[SCANNING HOST ENVIRONMENT...]" });
      newLogs.push({ type: "accent", text: "✔ FIREWALL: ACTIVE | SSL: ENFORCED | THREAT LEVEL: 0 | STATUS: SECURE" });
    } else if (cleanCmd === "contact" || cleanCmd === "email") {
      newLogs.push({
        type: "output",
        text: "✉ DIRECT LINK: stranger@portfolio.dev | Available for high-impact projects & security labs.",
      });
    } else if (cleanCmd === "help") {
      newLogs.push({
        type: "system",
        text: "AVAILABLE COMMANDS: whoami | skills | security-scan | contact | clear | help",
      });
    } else {
      newLogs.push({
        type: "output",
        text: `Command not found: '${cmdStr}'. Type 'help' for available commands.`,
      });
    }

    setLogs(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sfx.playKey();
    if (e.key === "Enter" && inputVal.trim()) {
      executeCommand(inputVal);
    }
  };

  return (
    <div className="terminal-card">
      <div className="terminal-top">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-title">
          <Terminal size={12} className="inline-icon" /> stranger@cyber-host:~
        </div>
        <div className="terminal-badge">
          <span className="ping-dot" /> LIVE SHELL
        </div>
      </div>

      <div className="terminal-body">
        {logs.map((item, idx) => (
          <div key={idx} className={`term-line term-${item.type}`}>
            {item.text}
          </div>
        ))}
        <div className="term-input-line">
          <span className="prompt">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'skills', 'security-scan')..."
            className="term-input"
          />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Shortcut Action Buttons */}
      <div className="terminal-quick-bar">
        <span>QUICK RUN:</span>
        <button onClick={() => executeCommand("whoami")}>whoami</button>
        <button onClick={() => executeCommand("cat /etc/skills")}>skills</button>
        <button onClick={() => executeCommand("security-scan")}>
          <Shield size={11} /> security-scan
        </button>
        <button onClick={() => executeCommand("contact")}>contact</button>
        <button onClick={() => executeCommand("clear")}>
          <RefreshCw size={11} /> clear
        </button>
      </div>
    </div>
  );
}
