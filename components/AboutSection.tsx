"use client";

import { useState, useRef } from "react";

export function AboutSection() {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section id="about" style={{ padding: "6rem 0", backgroundColor: "hsla(var(--muted), 0.3)", position: "relative", overflow: "hidden" }}>


      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
        {/* Section Title */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1.2 }}>
            MES PROJETS SONT <span style={{ color: "hsl(var(--primary))", fontStyle: "italic" }}>UNIQUES</span>, COMME CHAQUE EXPERIENCE.
          </h2>
          <p className="font-handwritten" style={{ fontSize: "1.5rem", color: "hsl(var(--muted-foreground))", marginTop: "1rem" }}>
            Pour de vrai.
          </p>
        </div>

        {/* About Content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "stretch" }}>
          {/* Avatar */}
          <div style={{ position: "relative", height: "100%", perspective: "1000px" }}>
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              style={{
                position: "relative", maxWidth: "500px", height: "100%", margin: "0 auto",
                borderRadius: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                transform: transform,
                transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease",
                boxShadow: isHovered ? "0 25px 50px rgba(0,0,0,0.25)" : "0 4px 6px rgba(0,0,0,0.1)",
              }}>
              <img src="https://i.ibb.co/JjPHHwf5/image.png" alt="MrPinPin Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}>
            <h3 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              Salut, je suis <span style={{ color: "hsl(var(--primary))" }}>MrPinPin</span> !
            </h3>
            <p style={{ fontSize: "1.125rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.7 }}>
              Developpeur Roblox complet (Scripting, Building, UI/UX). 
              Je repousse les limites de la plateforme pour creer des experiences memorables.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", paddingTop: "1rem" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                backgroundColor: "hsl(var(--background))",
                padding: "0.5rem 1rem", borderRadius: "9999px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ width: "0.75rem", height: "0.75rem", backgroundColor: "#22c55e", borderRadius: "50%", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Disponible pour projets</span>
              </div>
              <a
                href="https://www.roblox.com/fr/users/8783755456/profile"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  backgroundColor: "hsl(var(--foreground))", color: "hsl(var(--background))",
                  padding: "0.5rem 1rem", borderRadius: "9999px",
                  fontSize: "0.875rem", fontWeight: 500, textDecoration: "none",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img src="https://i.ibb.co/bRgSjqzY/image.png" alt="Roblox" style={{ width: "1rem", height: "1rem", objectFit: "contain" }} />
                @MrPinPinYT
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
