"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export function AwardsSection() {
  const [awardsText, setAwardsText] = useState({
    mainAwardTitle: "DevRel Virtual Prize Series 2",
    mainAwardDesc: "Gagnant de la categorie francophone lors de la competition officielle organisee par <strong>Roblox DevRel</strong>."
  });

  useEffect(() => {
    const textRef = ref(db, 'awardsText');
    const unsubscribe = onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAwardsText(data);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="awards" style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px", height: "800px",
          background: "radial-gradient(circle, hsla(var(--primary), 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", lineHeight: 1.2 }}>
            RECOMPENSES
            <br />
            <span style={{ color: "hsl(var(--primary))", fontStyle: "italic" }}>&amp;</span> ACHIEVEMENTS
          </h2>
          <p className="font-handwritten" style={{ fontSize: "1.75rem", color: "hsl(var(--muted-foreground))", marginTop: "0.5rem" }}>
            La reconnaissance de mon travail
          </p>
        </div>

        {/* Main Award */}
        <div style={{ maxWidth: "800px", margin: "0 auto 4rem" }}>
          <div style={{
            position: "relative",
            background: "linear-gradient(135deg, hsla(var(--primary), 0.1), hsla(var(--secondary), 0.1))",
            borderRadius: "1.5rem",
            padding: "3rem",
            border: "1px solid hsla(var(--primary), 0.2)",
          }}>


            <div style={{ textAlign: "center", paddingTop: "2rem" }}>
              <span style={{
                display: "inline-block",
                padding: "0.25rem 1rem",
                backgroundColor: "hsla(var(--primary), 0.2)",
                color: "hsl(var(--primary))",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}>🏆 Gagnant - Competition Francophone</span>


              <p style={{ fontSize: "1.25rem", color: "hsl(var(--foreground))", fontWeight: "bold", marginBottom: "1.5rem" }}>
                {awardsText.mainAwardTitle}
              </p>
              <p 
                style={{ color: "hsl(var(--muted-foreground))", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: awardsText.mainAwardDesc }}
              />
              <a
                href="https://devforum.roblox.com/t/devrel-virtual-prize-series-2-chronicles-of-developer-magic/3860037"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ gap: "0.5rem" }}
              >
                VOIR LE CHALLENGE
                <svg viewBox="0 0 24 24" fill="none" style={{ width: "1rem", height: "1rem" }}>
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Other Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "700px", margin: "0 auto 3rem" }}>
          {[
            {
              title: "Badge Bricksmith",
              year: "Roblox",
              description: "1000+ visites. Signe d'un constructeur accompli.",
              icon: (
                <img src="https://static.wikia.nocookie.net/roblox/images/2/23/Bricksmith_Badge.png/revision/latest?cb=20240627040314" alt="Bricksmith Badge" style={{ width: "2rem", height: "2rem", objectFit: "contain" }} />
              ),
            },
            {
              title: "Badge Homestead",
              year: "Roblox",
              description: "100+ visites personnelles.",
              icon: (
                <img src="https://static.wikia.nocookie.net/roblox/images/8/86/Badge7.png/revision/latest?cb=20240627020232" alt="Homestead Badge" style={{ width: "2rem", height: "2rem", objectFit: "contain" }} />
              ),
            },
          ].map((award) => (
            <a
              key={award.title}
              href="https://www.roblox.com/fr/users/8783755456/profile"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block", height: "100%" }}
            >
              <div style={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "1.5rem",
                padding: "1.5rem",
                transition: "all 0.3s ease",
                cursor: "pointer",
                height: "100%",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsla(var(--primary), 0.5)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(var(--border))";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ width: "3rem", height: "3rem", backgroundColor: "hsl(var(--muted))", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {award.icon}
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>{award.year}</span>
                </div>
                <h4 className="font-display" style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{award.title}</h4>
                <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>{award.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Profile Links */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "1rem" }}>
            Retrouvez tous mes badges et achievements sur mon profil
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://www.roblox.com/fr/users/8783755456/profile" target="_blank" rel="noopener noreferrer"
              className="btn-outline" style={{ gap: "0.5rem", fontSize: "0.875rem" }}>
              <img src="https://i.ibb.co/bRgSjqzY/image.png" alt="Roblox" style={{ width: "1rem", height: "1rem", objectFit: "contain" }} />
              PROFIL PRINCIPAL
            </a>
            <a href="https://www.roblox.com/fr/users/1267277805/profile" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
              onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
            >
              Voir mon autre compte
              <svg viewBox="0 0 24 24" fill="none" style={{ width: "1rem", height: "1rem" }}>
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
