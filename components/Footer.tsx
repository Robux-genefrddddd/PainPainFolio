"use client";

const socialLinks = [
  {
    name: "Roblox",
    href: "https://www.roblox.com/fr/users/8783755456/profile",
    icon: (
      <img src="https://i.ibb.co/bRgSjqzY/image.png" alt="Roblox" style={{ width: "1.25rem", height: "1.25rem", objectFit: "contain" }} />
    ),
  },
  {
    name: "DevForum",
    href: "https://devforum.roblox.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.25rem", height: "1.25rem" }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.25rem", height: "1.25rem" }}>
        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/>
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: "hsl(var(--background))",
      borderTop: "1px solid hsl(var(--border))",
      padding: "3rem 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Marquee removed for cleaner design */}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", alignItems: "center" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div>
              <span className="font-display" style={{ fontSize: "1.25rem" }}>MRPINPIN</span>
              <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>Developpeur Roblox</p>
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            {socialLinks.map(link => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                aria-label={link.name}
                style={{
                  width: "2.5rem", height: "2.5rem",
                  borderRadius: "50%",
                  backgroundColor: "hsl(var(--muted))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "hsl(var(--muted-foreground))",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "hsl(var(--primary))";
                  el.style.color = "hsl(var(--primary-foreground))";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "hsl(var(--muted))";
                  el.style.color = "hsl(var(--muted-foreground))";
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>MrPinPin</p>
            <p style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>
              Fait avec passion en {currentYear}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid hsl(var(--border))",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}>
          <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
            6+ ans d'experience
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["#about", "#projects"].map((href, i) => (
              <a key={href} href={href}
                style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
              >
                {["A propos", "Projets"][i]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
