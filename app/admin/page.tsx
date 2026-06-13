"use client";

import { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [awardsText, setAwardsText] = useState<any>({});
  
  const [activeTab, setActiveTab] = useState("projects");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("adminLoggedIn");
      if (loggedIn === "true") setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    
    const unsubProjects = onValue(ref(db, "projects"), (snap) => setProjects(snap.val()?.filter(Boolean) || []));
    const unsubSkills = onValue(ref(db, "skills"), (snap) => setSkills(snap.val()?.filter(Boolean) || []));
    const unsubAwards = onValue(ref(db, "awardsText"), (snap) => setAwardsText(snap.val() || {}));

    return () => {
      unsubProjects();
      unsubSkills();
      unsubAwards();
    };
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Admin" && password === "Antoine80@A") {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
    } else {
      alert("Identifiants incorrects");
    }
  };

  const showStatus = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 3000);
  };

  const saveToFirebase = async (path: string, data: any) => {
    setStatus("Sauvegarde en cours...");
    try {
      await set(ref(db, path), data);
      showStatus("Sauvegarde terminee avec succes !");
    } catch(err) {
      showStatus("Erreur lors de la sauvegarde.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px", height: "800px",
            background: "radial-gradient(circle, hsla(var(--primary), 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
        </div>

        <form onSubmit={handleLogin} style={{ 
          backgroundColor: "hsl(var(--card))", 
          padding: "3rem", 
          borderRadius: "1.5rem", 
          border: "1px solid hsl(var(--border))", 
          display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", maxWidth: "400px", 
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          position: "relative", zIndex: 10
        }}>
          <div style={{ textAlign: "center" }}>
            <h1 className="font-display" style={{ fontSize: "2rem", color: "hsl(var(--foreground))", lineHeight: 1.2 }}>
              MrPinPin
            </h1>
            <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", marginTop: "0.5rem" }}>
              Espace d'administration
            </p>
          </div>
          <input 
            type="text" placeholder="Utilisateur" value={username} onChange={e => setUsername(e.target.value)} 
            style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))", backgroundColor: "transparent", color: "hsl(var(--foreground))", outline: "none", fontSize: "1rem", transition: "border-color 0.3s" }} 
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary))"}
            onBlur={e => e.currentTarget.style.borderColor = "hsl(var(--border))"}
            autoFocus
          />
          <input 
            type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} 
            style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))", backgroundColor: "transparent", color: "hsl(var(--foreground))", outline: "none", fontSize: "1rem", transition: "border-color 0.3s" }} 
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary))"}
            onBlur={e => e.currentTarget.style.borderColor = "hsl(var(--border))"}
          />
          <button type="submit" style={{ padding: "1rem", borderRadius: "0.5rem", backgroundColor: "hsl(var(--primary))", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "1rem", transition: "transform 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  // Helpers for Projects
  const addProject = () => {
    setProjects([...projects, { id: Date.now(), title: "Nouveau Projet", category: "Scripting", description: "", tags: [], color: "hsl(var(--primary))", visits: "0", year: new Date().getFullYear().toString(), link: "" }]);
  };
  const removeProject = (idx: number) => {
    if (confirm("Supprimer ce projet ?")) {
      const np = [...projects];
      np.splice(idx, 1);
      setProjects(np);
    }
  };

  // Helpers for Skills
  const addSkillCategory = () => {
    setSkills([...skills, { category: "NOUVELLE CATEGORIE", color: "hsl(var(--primary))", items: [] }]);
  };
  const removeSkillCategory = (idx: number) => {
    if (confirm("Supprimer cette categorie entiere ?")) {
      const ns = [...skills];
      ns.splice(idx, 1);
      setSkills(ns);
    }
  };
  const addSkillItem = (catIdx: number) => {
    const ns = [...skills];
    ns[catIdx].items = ns[catIdx].items || [];
    ns[catIdx].items.push({ name: "Nouvelle comp.", level: 50 });
    setSkills(ns);
  };
  const removeSkillItem = (catIdx: number, itemIdx: number) => {
    const ns = [...skills];
    ns[catIdx].items.splice(itemIdx, 1);
    setSkills(ns);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "0%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1000px", height: "1000px",
          background: "radial-gradient(circle, hsla(var(--primary), 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* Header Admin */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid hsl(var(--border))" }}>
          <div>
            <h1 className="font-display" style={{ fontSize: "2.5rem", lineHeight: 1.2 }}>CMS <span style={{color: "hsl(var(--primary))"}}>Dashboard</span></h1>
            <p style={{ color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>Connecte en tant que Admin</p>
          </div>
          <button onClick={() => { localStorage.removeItem("adminLoggedIn"); setIsLoggedIn(false); }} style={{ padding: "0.75rem 1.5rem", backgroundColor: "transparent", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))", borderRadius: "9999px", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "hsl(var(--card))"; e.currentTarget.style.borderColor = "hsl(var(--primary))"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "hsl(var(--border))"; }}
          >
            Deconnexion
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {["projects", "skills", "awards"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ 
              padding: "0.75rem 1.5rem", 
              backgroundColor: activeTab === tab ? "hsl(var(--primary))" : "hsl(var(--card))", 
              color: activeTab === tab ? "white" : "hsl(var(--foreground))", border: "1px solid", borderColor: activeTab === tab ? "hsl(var(--primary))" : "hsl(var(--border))", 
              borderRadius: "9999px", cursor: "pointer", fontWeight: "bold", textTransform: "capitalize", transition: "all 0.2s" 
            }}>
              {tab === "projects" ? "Projets" : tab === "skills" ? "Competences" : "Recompenses"}
            </button>
          ))}
        </div>

        {/* Status Toast */}
        {status && (
          <div style={{ position: "fixed", bottom: "2rem", right: "2rem", padding: "1rem 2rem", backgroundColor: "hsl(var(--primary))", color: "white", borderRadius: "0.5rem", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", zIndex: 50, fontWeight: "bold", animation: "slideIn 0.3s ease" }}>
            {status}
          </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === "projects" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 className="font-display" style={{ fontSize: "1.5rem", color: "hsl(var(--foreground))" }}>Gestion des Projets</h2>
              <button onClick={addProject} style={{ padding: "0.5rem 1rem", backgroundColor: "hsl(var(--card))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", cursor: "pointer" }}>+ Ajouter un projet</button>
            </div>

            {projects.length === 0 && (
              <button onClick={async () => {
                setStatus("Initialisation...");
                await fetch("/api/init");
                setStatus("Initialisation terminee ! Rechargez la page.");
              }} style={{ padding: "1rem 2rem", backgroundColor: "#5a9a6b", color: "white", borderRadius: "0.5rem", border: "none", cursor: "pointer", display: "block", margin: "0 auto" }}>
                Generer les donnees par defaut
              </button>
            )}

            <div style={{ display: "grid", gap: "1.5rem" }}>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ backgroundColor: "hsl(var(--card))", padding: "1.5rem", borderRadius: "1rem", border: "1px solid hsl(var(--border))", position: "relative" }}>
                  <button onClick={() => removeProject(idx)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "hsl(var(--primary))", cursor: "pointer", fontSize: "1.2rem", fontWeight: "bold" }}>&times;</button>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1rem", paddingRight: "2rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>Titre</label>
                      <input value={proj.title || ""} onChange={e => { const np = [...projects]; np[idx].title = e.target.value; setProjects(np); }} style={{ width: "100%", padding: "0.75rem", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.5rem", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>Categorie</label>
                      <input value={proj.category || ""} onChange={e => { const np = [...projects]; np[idx].category = e.target.value; setProjects(np); }} style={{ width: "100%", padding: "0.75rem", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.5rem", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>Annee</label>
                      <input value={proj.year || ""} onChange={e => { const np = [...projects]; np[idx].year = e.target.value; setProjects(np); }} style={{ width: "100%", padding: "0.75rem", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.5rem", outline: "none" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>Description</label>
                    <textarea value={proj.description || ""} onChange={e => { const np = [...projects]; np[idx].description = e.target.value; setProjects(np); }} style={{ width: "100%", padding: "0.75rem", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.5rem", minHeight: "80px", resize: "vertical", outline: "none" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>Lien (Redirection)</label>
                      <input value={proj.link || ""} onChange={e => { const np = [...projects]; np[idx].link = e.target.value; setProjects(np); }} style={{ width: "100%", padding: "0.75rem", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.5rem", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>Visites</label>
                      <input value={proj.visits || ""} onChange={e => { const np = [...projects]; np[idx].visits = e.target.value; setProjects(np); }} style={{ width: "100%", padding: "0.75rem", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.5rem", outline: "none" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <input type="checkbox" id={`feat-${idx}`} checked={proj.featured || false} onChange={e => { const np = [...projects]; np[idx].featured = e.target.checked; setProjects(np); }} style={{ width: "1.25rem", height: "1.25rem", accentColor: "hsl(var(--primary))" }} />
                    <label htmlFor={`feat-${idx}`} style={{ color: "hsl(var(--muted-foreground))", cursor: "pointer" }}>Mettre en avant (Badge OFFICIEL)</label>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={() => saveToFirebase("projects", projects)} style={{ width: "100%", padding: "1rem", backgroundColor: "hsl(var(--primary))", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", marginTop: "2rem", fontSize: "1.1rem", fontWeight: "bold" }}>
              Publier les Projets
            </button>
          </div>
        )}

        {/* --- SKILLS TAB --- */}
        {activeTab === "skills" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 className="font-display" style={{ fontSize: "1.5rem", color: "hsl(var(--foreground))" }}>Gestion des Competences</h2>
              <button onClick={addSkillCategory} style={{ padding: "0.5rem 1rem", backgroundColor: "hsl(var(--card))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", cursor: "pointer" }}>+ Nouvelle Categorie</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {skills.map((cat, catIdx) => (
                <div key={catIdx} style={{ backgroundColor: "hsl(var(--card))", padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${cat.color || "hsl(var(--border))"}`, position: "relative" }}>
                  <button onClick={() => removeSkillCategory(catIdx)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "hsl(var(--muted-foreground))", cursor: "pointer", fontSize: "1.2rem" }}>&times;</button>
                  
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", paddingRight: "1.5rem" }}>
                    <div style={{ flex: 2 }}>
                      <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>Categorie</label>
                      <input value={cat.category || ""} onChange={e => { const ns = [...skills]; ns[catIdx].category = e.target.value; setSkills(ns); }} style={{ width: "100%", padding: "0.5rem", backgroundColor: "transparent", border: "none", borderBottom: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", outline: "none", fontWeight: "bold", fontSize: "1.1rem" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>Couleur</label>
                      <input type="color" value={cat.color || "#ffffff"} onChange={e => { const ns = [...skills]; ns[catIdx].color = e.target.value; setSkills(ns); }} style={{ width: "100%", height: "2.5rem", border: "none", backgroundColor: "transparent", cursor: "pointer" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {cat.items?.map((item: any, itemIdx: number) => (
                      <div key={itemIdx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(0,0,0,0.2)", padding: "0.5rem", borderRadius: "0.5rem" }}>
                        <input value={item.name || ""} onChange={e => { const ns = [...skills]; ns[catIdx].items[itemIdx].name = e.target.value; setSkills(ns); }} style={{ flex: 1, padding: "0.25rem 0.5rem", backgroundColor: "transparent", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.25rem", outline: "none" }} placeholder="Nom" />
                        <input type="number" min="0" max="100" value={item.level || 0} onChange={e => { const ns = [...skills]; ns[catIdx].items[itemIdx].level = Number(e.target.value); setSkills(ns); }} style={{ width: "60px", padding: "0.25rem", backgroundColor: "transparent", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.25rem", textAlign: "center", outline: "none" }} />
                        <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem" }}>%</span>
                        <button onClick={() => removeSkillItem(catIdx, itemIdx)} style={{ background: "none", border: "none", color: "hsl(var(--primary))", cursor: "pointer", fontSize: "1.2rem", padding: "0 0.25rem" }}>&times;</button>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => addSkillItem(catIdx)} style={{ width: "100%", padding: "0.5rem", marginTop: "1rem", backgroundColor: "transparent", color: "hsl(var(--muted-foreground))", border: "1px dashed hsl(var(--border))", borderRadius: "0.5rem", cursor: "pointer" }}>+ Ajouter competence</button>
                </div>
              ))}
            </div>

            <button onClick={() => saveToFirebase("skills", skills)} style={{ width: "100%", padding: "1rem", backgroundColor: "hsl(var(--primary))", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", marginTop: "2rem", fontSize: "1.1rem", fontWeight: "bold" }}>
              Publier les Competences
            </button>
          </div>
        )}

        {/* --- AWARDS TAB --- */}
        {activeTab === "awards" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 className="font-display" style={{ fontSize: "1.5rem", color: "hsl(var(--foreground))", marginBottom: "1.5rem" }}>Gestion des Recompenses</h2>
            <div style={{ backgroundColor: "hsl(var(--card))", padding: "2rem", borderRadius: "1rem", border: "1px solid hsl(var(--border))" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "1rem", color: "hsl(var(--muted-foreground))" }}>Titre de la Recompense Principale</label>
                <input value={awardsText?.mainAwardTitle || ""} onChange={e => setAwardsText({ ...awardsText, mainAwardTitle: e.target.value })} style={{ width: "100%", padding: "1rem", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.5rem", fontSize: "1.1rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "1rem", color: "hsl(var(--muted-foreground))" }}>Description (HTML autorise)</label>
                <textarea value={awardsText?.mainAwardDesc || ""} onChange={e => setAwardsText({ ...awardsText, mainAwardDesc: e.target.value })} style={{ width: "100%", padding: "1rem", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: "0.5rem", minHeight: "150px", fontSize: "1rem", resize: "vertical", fontFamily: "monospace", outline: "none" }} />
                <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", marginTop: "0.5rem" }}>Astuce: Utilisez &lt;strong&gt;texte&lt;/strong&gt; pour mettre en gras.</p>
              </div>
            </div>
            <button onClick={() => saveToFirebase("awardsText", awardsText)} style={{ width: "100%", padding: "1rem", backgroundColor: "hsl(var(--primary))", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", marginTop: "2rem", fontSize: "1.1rem", fontWeight: "bold" }}>
              Publier les Recompenses
            </button>
          </div>
        )}

      </div>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
