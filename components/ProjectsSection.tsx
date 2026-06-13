"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

const defaultProjects = [
  {
    id: 1,
    title: "RPG Adventure",
    category: "Scripting & Design",
    description: "RPG avec quetes et progression.",
    tags: ["Lua", "DataStore", "GUI", "NPC"],
    color: "#a5534e",
    visits: "50K+",
    year: "2024",
    link: "https://www.roblox.com/fr/users/8783755456/profile",
  },
  {
    id: 2,
    title: "Tycoon Simulator",
    category: "Game Design",
    description: "Tycoon optimise, economie equilibree.",
    tags: ["Tycoon", "Economy", "Monetisation"],
    color: "#898a5a",
    visits: "30K+",
    year: "2024",
    link: "https://www.roblox.com/fr/users/8783755456/profile",
  },
  {
    id: 3,
    title: "Obby Challenge",
    category: "Building",
    description: "Obby 100 stages avec mecaniques uniques.",
    tags: ["Building", "Obby", "Checkpoints"],
    color: "#6b6b9a",
    visits: "20K+",
    year: "2023",
    link: "https://www.roblox.com/fr/users/8783755456/profile",
  },
  {
    id: 4,
    title: "Combat System",
    category: "Scripting",
    description: "Combat avance avec hitboxes serveur.",
    tags: ["Combat", "Hitbox", "Animation"],
    color: "#a5534e",
    visits: "15K+",
    year: "2025",
    link: "https://www.roblox.com/fr/users/8783755456/profile",
  },
  {
    id: 5,
    title: "DevRel Virtual Prize Series 2",
    category: "Competition",
    description: "3e place au DevRel Virtual Prize Series 2.",
    tags: ["Competition", "Showcase", "Prime"],
    color: "#c4923c",
    visits: "Prix",
    year: "2026",
    link: "https://devforum.roblox.com/t/devrel-virtual-prize-series-2-chronicles-of-developer-magic/3860037",
    featured: true,
  },
  {
    id: 6,
    title: "Open Source Tools",
    category: "Librairie",
    description: "Modules Lua open source sur le DevForum.",
    tags: ["Open Source", "Module", "DevForum"],
    color: "#5a9a6b",
    visits: "Community",
    year: "2024",
    link: "https://devforum.roblox.com",
  },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [projects, setProjects] = useState(defaultProjects);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const projectsRef = ref(db, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProjects(data.filter((p: any) => p !== null));
      }
    });
    return () => unsubscribe();
  }, []);

  const filters = ["Tous", "Scripting", "Building", "Game Design", "Competition"];

  const filtered = activeFilter === "Tous"
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section id="projects" style={{ padding: "6rem 0", backgroundColor: "hsla(var(--muted), 0.2)", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", lineHeight: 1.2 }}>
            MES <span style={{ color: "hsl(var(--primary))", fontStyle: "italic" }}>PROJETS</span>
          </h2>
          <p className="font-handwritten" style={{ fontSize: "1.75rem", color: "hsl(var(--muted-foreground))", marginTop: "0.5rem" }}>
            Ce que j'ai construit
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "9999px",
              border: "2px solid",
              borderColor: activeFilter === f ? "hsl(var(--primary))" : "hsl(var(--border))",
              backgroundColor: activeFilter === f ? "hsl(var(--primary))" : "transparent",
              color: activeFilter === f ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}>
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "1.5rem",
                padding: "1.75rem",
                height: "100%",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-8px)";
                el.style.boxShadow = "0 25px 50px rgba(0,0,0,0.15)";
                el.style.borderColor = project.color;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "hsl(var(--border))";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <h3 className="font-display" style={{ fontSize: "1.25rem", color: "hsl(var(--foreground))" }}>{project.title}</h3>
                {!project.featured ? (
                  <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", marginLeft: "0.5rem", flexShrink: 0, marginTop: "0.25rem" }}>{project.year}</span>
                ) : (
                  <div style={{
                    color: "hsl(var(--foreground))",
                    fontSize: "0.85rem", fontWeight: 700,
                    display: "flex", alignItems: "center", gap: "0.25rem",
                    marginLeft: "0.5rem", flexShrink: 0, marginTop: "0.15rem"
                  }}>
                    <img src="https://cdn3.emoji.gg/emojis/524689-verified.png" alt="Verified" style={{ width: "1rem", height: "1rem", objectFit: "contain" }} />
                    OFFICIEL
                  </div>
                )}
              </div>

              <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", marginBottom: "0.5rem", fontWeight: 500 }}>
                {project.category}
              </p>

              {/* Text is clamped to 3 lines max */}
              <p style={{ 
                fontSize: "0.9rem", color: "hsl(var(--foreground))", lineHeight: 1.6, marginBottom: "1.25rem", opacity: 0.75,
                display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis",
                flexGrow: 1
              }}>
                {project.description}
              </p>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {project.tags?.map((tag: any) => (
                  <span key={tag} style={{
                    padding: "0.25rem 0.625rem",
                    backgroundColor: project.color + "20",
                    color: project.color,
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}>{tag}</span>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: project.color }}>
                    {project.visits} visites
                  </span>
                  {project.featured && (
                    <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", fontWeight: 600 }}>{project.year}</span>
                  )}
                </div>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.25rem", height: "1.25rem", color: project.color }}>
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href="https://www.roblox.com/fr/users/8783755456/profile"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ gap: "0.5rem" }}
          >
            <img src="https://i.ibb.co/bRgSjqzY/image.png" alt="Roblox" style={{ width: "1rem", height: "1rem", objectFit: "contain" }} />
            VOIR MON PROFIL ROBLOX
          </a>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
          backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s ease"
        }} onClick={() => setSelectedProject(null)}>
          <div style={{
            backgroundColor: "hsl(var(--card))", border: `1px solid ${selectedProject.color || "hsl(var(--border))"}`,
            borderRadius: "1.5rem", padding: "2rem", width: "100%", maxWidth: "600px", position: "relative",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)", animation: "slideUp 0.3s ease",
            maxHeight: "90vh", overflowY: "auto"
          }} onClick={e => e.stopPropagation()}>
            
            <button onClick={() => setSelectedProject(null)} style={{
              position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", 
              color: "hsl(var(--muted-foreground))", fontSize: "1.5rem", cursor: "pointer", transition: "color 0.2s"
            }} onMouseEnter={e => e.currentTarget.style.color="white"} onMouseLeave={e => e.currentTarget.style.color="hsl(var(--muted-foreground))"}>&times;</button>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", paddingRight: "2rem" }}>
              <h3 className="font-display" style={{ fontSize: "1.75rem", color: "hsl(var(--foreground))" }}>{selectedProject.title}</h3>
              {selectedProject.featured && (
                <div style={{ color: "hsl(var(--foreground))", fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0, marginTop: "0.5rem" }}>
                  <img src="https://cdn3.emoji.gg/emojis/524689-verified.png" alt="Verified" style={{ width: "1rem", height: "1rem", objectFit: "contain" }} />
                  OFFICIEL
                </div>
              )}
            </div>

            <p style={{ fontSize: "1rem", color: selectedProject.color, marginBottom: "1.5rem", fontWeight: 600 }}>
              {selectedProject.category} &bull; {selectedProject.year}
            </p>

            <p style={{ fontSize: "1rem", color: "hsl(var(--foreground))", lineHeight: 1.7, marginBottom: "2rem", opacity: 0.9, whiteSpace: "pre-wrap" }}>
              {selectedProject.description}
            </p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {selectedProject.tags?.map((tag: any) => (
                <span key={tag} style={{ padding: "0.35rem 0.75rem", backgroundColor: selectedProject.color + "20", color: selectedProject.color, borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 600 }}>{tag}</span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid hsl(var(--border))", paddingTop: "1.5rem" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: selectedProject.color }}>
                {selectedProject.visits} visites
              </div>
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{
                padding: "0.75rem 1.5rem", backgroundColor: selectedProject.color, color: "white", borderRadius: "9999px", textDecoration: "none", fontWeight: "bold", transition: "transform 0.2s"
              }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                Voir le projet
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
