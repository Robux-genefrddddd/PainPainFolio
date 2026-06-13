"use client";

export function HeroSection() {
  return (
    <section style={{ position: "relative", padding: "8rem 0 4rem", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
      {/* Background blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "25%", right: "-5rem", width: "24rem", height: "24rem", backgroundColor: "hsla(var(--primary), 0.05)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "25%", left: "-5rem", width: "24rem", height: "24rem", backgroundColor: "hsla(var(--secondary), 0.05)", borderRadius: "50%", filter: "blur(60px)" }} />
      </div>

      {/* Marquee Section */}
      <div className="marquee-container" style={{ position: "relative" }}>
        {/* Row 1 - SCRIPTING */}
        <div style={{ overflow: "hidden", padding: "0.25rem 0" }}>
          <div className="animate-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0 1rem" }}>
                <span className="font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", letterSpacing: "-0.025em" }}>SCRIPTING</span>
                <span className="font-display text-stroke" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", opacity: 0.3 }}>SCRIPTING</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - BUILDING */}
        <div style={{ overflow: "hidden", padding: "0.25rem 0" }}>
          <div className="animate-marquee-reverse" style={{ display: "flex", whiteSpace: "nowrap" }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0 1rem" }}>
                <span className="font-display text-stroke" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", opacity: 0.3 }}>BUILDING</span>
                <span className="font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", letterSpacing: "-0.025em" }}>BUILDING</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - DESIGN */}
        <div style={{ overflow: "hidden", padding: "0.25rem 0" }}>
          <div className="animate-marquee-slow" style={{ display: "flex", whiteSpace: "nowrap" }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0 1rem" }}>
                <span className="font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", letterSpacing: "-0.025em" }}>DESIGN</span>
                <span className="font-display text-stroke" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", letterSpacing: "-0.025em", opacity: 0.3 }}>DESIGN</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <svg className="animate-bounce-arrow" viewBox="0 0 64 64" fill="none" style={{ width: "4rem", height: "4rem", flexShrink: 0 }}>
          <path d="M32 8 C20 20, 44 20, 32 32 C20 44, 44 44, 32 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M24 48 L32 56 L40 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <div>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "hsl(var(--muted-foreground))", maxWidth: "32rem", lineHeight: 1.6 }}>
            <span style={{ color: "hsl(var(--foreground))", fontWeight: 600 }}>
              Des projets uniques, sur-mesure.
            </span>
          </p>
        </div>
      </div>

      {/* Intro text */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 4rem", textAlign: "center" }}>
        <p style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.6, maxWidth: "56rem", margin: "0 auto" }}>
          <strong style={{ fontWeight: 800, textDecoration: "underline", textDecorationColor: "hsl(var(--primary))", textDecorationThickness: "4px", textUnderlineOffset: "4px" }}>
            6+ ans
          </strong>
          {" "}d'expertise Roblox.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
          <a href="#projects" className="btn-primary">VOIR MES PROJETS</a>
        </div>
      </div>
    </section>
  );
}
