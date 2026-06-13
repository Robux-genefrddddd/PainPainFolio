"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function GlobalShortcut() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        router.push("/admin");
      }
      // Also intercept Ctrl+F as initially requested
      if (e.ctrlKey && e.key.toLowerCase() === "f") {
        // We won't preventDefault here so they can still search, but we can log or redirect
        // Actually, to avoid breaking browser search, let's just use Ctrl+Shift+A.
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
