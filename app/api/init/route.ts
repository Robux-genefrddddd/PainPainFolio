import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { ref, set } from "firebase/database";

const projects = [
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

const skills = [
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

const awardsText = {
  mainAwardTitle: "DevRel Virtual Prize Series 2",
  mainAwardDesc: "Gagnant de la categorie francophone lors de la competition officielle organisee par <strong>Roblox DevRel</strong>."
};

export async function GET() {
  try {
    await set(ref(db, "projects"), projects);
    await set(ref(db, "skills"), skills);
    await set(ref(db, "awardsText"), awardsText);
    return NextResponse.json({ success: true, message: "Data initialized in Firebase" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
