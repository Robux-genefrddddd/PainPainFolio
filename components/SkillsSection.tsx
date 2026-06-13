"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

const defaultSkills = [
  {
    category: "SCRIPTING",
    color: "#a5534e",
    items: [
      { name: "Lua / Luau", level: 98 },
      { name: "RemoteEvents & RemoteFunctions", level: 95 },
      { name: "DataStore & Persistence", level: 92 },
      { name: "Physics & Constraints", level: 85 },
      { name: "Tweening & Animations", level: 94 },
      { name: "Module Scripts", level: 96 },
    ],
  },
  {
    category: "BUILDING",
    color: "#898a5a",
    items: [
      { name: "Terrain & Environnement", level: 25 },
      { name: "Architecture & Structures", level: 20 },
      { name: "Lighting & Atmosphere", level: 25 },
      { name: "Modelisation 3D", level: 15 },
      { name: "Blender Integration", level: 10 },
      { name: "Material Design", level: 20 },
    ],
  },
  {
    category: "GAME DESIGN",
    color: "#6b6b9a",
    items: [
      { name: "Game Loop & Progression", level: 25 },
      { name: "Economy Balancing", level: 15 },
      { name: "UX / UI Roblox", level: 30 },
      { name: "Monetisation", level: 10 },
      { name: "Player Retention", level: 20 },
      { name: "Analytics & Metrics", level: 10 },
    ],
  },
];

const tags = ["#Lua", "#Roblox", "#GameDev", "#Scripting", "#Building", "#UX", "#Animator", "#DataStore", "#Freelance", "#OpenSource"];

export function SkillsSection() {
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    const skillsRef = ref(db, 'skills');
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSkills(data.filter((s: any) => s !== null));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="skills" style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", lineHeight: 1.2 }}>
            MES <span style={{ color: "hsl(var(--primary))", fontStyle: "italic" }}>COMPETENCES</span>
          </h2>
          <p className="font-handwritten" style={{ fontSize: "1.75rem", color: "hsl(var(--muted-foreground))", marginTop: "0.5rem" }}>
            Affinees au fil des annees
          </p>
        </div>

        {/* Skills Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {skills.map((group) => (
            <div key={group.category} style={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "1.5rem",
              padding: "2rem",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <img src="https://cdn3.emoji.gg/emojis/524689-verified.png" alt="Verified" style={{ width: "1.25rem", height: "1.25rem", objectFit: "contain" }} />
                <h3 className="font-display" style={{ fontSize: "1.25rem" }}>{group.category}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {group.items?.map((skill: any) => (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{skill.name}</span>
                      <span style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "hsl(var(--muted))", borderRadius: "9999px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%", width: `${skill.level}%`,
                        backgroundColor: group.color,
                        borderRadius: "9999px",
                        transition: "width 1s ease",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tags Cloud */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              padding: "0.5rem 1.25rem",
              backgroundColor: "hsl(var(--muted))",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "hsl(var(--foreground))",
              transition: "all 0.3s",
              cursor: "default",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(var(--primary))";
                (e.currentTarget as HTMLElement).style.color = "hsl(var(--primary-foreground))";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(var(--muted))";
                (e.currentTarget as HTMLElement).style.color = "hsl(var(--foreground))";
              }}
            >{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
