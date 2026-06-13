import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MrPinPin | Developpeur Roblox",
  description: "Portfolio de MrPinPin, developpeur Roblox passionne avec plus de 6 ans d'experience en Scripting Lua, Building et Game Design.",
  keywords: ["Roblox", "Developpeur", "Lua", "Scripting", "Game Dev", "MrPinPin", "MrPinPinYT"],
  authors: [{ name: "MrPinPin" }],
  openGraph: {
    title: "MrPinPin | Developpeur Roblox",
    description: "Portfolio de MrPinPin, developpeur Roblox passionne avec plus de 6 ans d'experience.",
    type: "website",
  },
};

import { GlobalShortcut } from "@/components/GlobalShortcut";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <GlobalShortcut />
        {children}
      </body>
    </html>
  );
}
