// src/pages/onboard/RotateGate.jsx
import { useEffect, useState } from "react";

export default function RotateGate({ children }) {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth <= 768; // kun mobil
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      // Vis gate KUN hvis mobil + stående
      setShowGate(isMobile && isPortrait);
    };

    check();

    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  return (
    <>
      {children}

      {showGate && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex flex-col items-center justify-center
            px-8
          "
          style={{ backgroundColor: "var(--soft-linen-hex)" }}
        >
          {/* Nyt: større SVG + langsommere nudge */}
          <img
            src="/src/pages/onboard/frames/flip_ikon.svg"
            alt="Vend telefonen"
            className="flip-icon-anim w-32 h-auto mb-10"
            style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.15))" }}
          />

          {/* Overskrift */}
          <p
            className="text-center text-3xl sm:text-4xl"
            style={{
              fontFamily: "var(--font-knewave)",
              textTransform: "uppercase",
              color: "var(--molten-lava-hex)",
            }}
          >
            VEND DIN SKÆRM
          </p>

          {/* Brødtekst fjernet */}
        </div>
      )}
    </>
  );
}
