"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, ShieldCheck, Clock } from "lucide-react";
import { sfx } from "@/lib/audio";

export default function Navbar() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format to BD time (UTC+6)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(now.toLocaleTimeString("en-GB", options) + " BD");
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    sfx.enabled = nextState;
    setSoundEnabled(nextState);
    if (nextState) {
      sfx.playClick();
    }
  };

  return (
    <header className="nav glass-panel">
      <a className="brand" href="#top" onClick={() => sfx.playClick()}>
        M/S<span className="brand-dot">.</span>
      </a>

      <div className="nav-center-widget">
        <span className="clock-widget">
          <Clock size={11} className="spin-slow" /> {timeStr || "00:00:00 BD"}
        </span>
      </div>

      <div className="nav-links">
        <a href="#work" onClick={() => sfx.playClick()}>WORK</a>
        <a href="#skills" onClick={() => sfx.playClick()}>STACK</a>
        <a href="#about" onClick={() => sfx.playClick()}>ABOUT</a>
        <a href="#contact" onClick={() => sfx.playClick()}>CONTACT</a>
      </div>

      <div className="nav-controls">
        <button
          className={`audio-toggle-btn ${soundEnabled ? "active" : ""}`}
          onClick={toggleSound}
          title={soundEnabled ? "Disable UI Sound Effects" : "Enable UI Sound Effects"}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>SFX {soundEnabled ? "ON" : "OFF"}</span>
        </button>

        <span className="status">
          <i /> OPERATIONAL
        </span>
      </div>
    </header>
  );
}
