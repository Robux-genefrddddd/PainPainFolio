"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        backgroundColor: isScrolled ? "hsla(var(--background), 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
        padding: isScrolled ? "0.75rem 0" : "1.5rem 0",
      }}
    >
      <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <span className="font-display" style={{ fontSize: "1.25rem", letterSpacing: "-0.025em", color: "hsl(var(--foreground))" }}>
            MRPINPIN
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
          <NavLink href="#about">A propos</NavLink>
          <NavLink href="#skills">Competences</NavLink>
          <NavLink href="#projects">Projets</NavLink>
          <NavLink href="#awards">Recompenses</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: "none",
            width: "40px", height: "40px",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: "6px", background: "none", border: "none", cursor: "pointer",
          }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              width: "24px", height: "2px",
              backgroundColor: "hsl(var(--foreground))",
              display: "block",
              transition: "all 0.3s ease",
              transform: isMobileMenuOpen
                ? i === 0 ? "rotate(45deg) translate(5px, 6px)"
                  : i === 1 ? "scaleX(0)"
                    : "rotate(-45deg) translate(5px, -6px)"
                : "none",
              opacity: isMobileMenuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: "fixed", inset: 0, top: "72px",
        backgroundColor: "hsl(var(--background))",
        zIndex: 40,
        transition: "all 0.3s ease",
        opacity: isMobileMenuOpen ? 1 : 0,
        pointerEvents: isMobileMenuOpen ? "auto" : "none",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "2rem",
      }} className="mobile-menu">
        {["#about", "#skills", "#projects", "#awards"].map((href, i) => (
          <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)}
            className="font-display"
            style={{
              fontSize: "2rem", textDecoration: "none",
              color: "hsl(var(--foreground))", transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
          >
            {["A propos", "Competences", "Projets", "Recompenses"][i]}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        position: "relative", fontSize: "0.875rem", fontWeight: 500,
        color: "hsl(var(--foreground))", opacity: 0.8, textDecoration: "none",
        transition: "opacity 0.3s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
    >
      {children}
    </a>
  );
}
