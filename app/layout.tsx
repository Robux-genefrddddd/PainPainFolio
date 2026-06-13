import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MrPinPin | Developpeur Roblox - 6+ ans d'experience",
  description: "Developpeur Roblox passionne avec plus de 6 ans d'experience. Scripting Lua, Building, Game Design. 3eme place au Defi Devel.",
  keywords: ["Roblox", "Developpeur", "Lua", "Scripting", "Game Dev", "MrPinPin", "MrPinPinYT"],
  authors: [{ name: "MrPinPin" }],
  openGraph: {
    title: "MrPinPin | Developpeur Roblox",
    description: "Developpeur Roblox passionne avec plus de 6 ans d'experience.",
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
