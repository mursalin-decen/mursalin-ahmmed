"use client";

import React, { useRef, useState } from "react";
import { sfx } from "@/lib/audio";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 15,
  glowColor = "rgba(215, 255, 63, 0.15)",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setGlarePos({ x: glareX, y: glareY, opacity: 0.25 });
  };

  const handleMouseEnter = () => {
    sfx.playHover();
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {/* Dynamic Sheen / Glare Overlay */}
      <div
        className="tilt-card-glare"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 70%)`,
          opacity: glarePos.opacity,
          transition: "opacity 0.2s ease",
        }}
      />
    </div>
  );
}
