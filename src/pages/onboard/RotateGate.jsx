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
          style={{ backgroundColor: "var(--charcoal-brown-hex)" }}
        >
          {/* “Telefon”-animation */}
          <div className="mb-8 animate-bounce">
            <div
              className="
                w-20 h-32
                rounded-3xl
                flex items-center justify-center
              "
              style={{
                border: "3px solid var(--soft-linen-hex)",
              }}
            >
              <div
                className="w-10 h-1 rounded-full"
                style={{ backgroundColor: "var(--soft-linen-hex)" }}
              />
            </div>
          </div>

          {/* Overskrift */}
          <p
            className="text-center text-2xl sm:text-3xl mb-3"
            style={{
              fontFamily: "var(--font-knewave)",
              textTransform: "uppercase",
              color: "var(--soft-linen-hex)",
            }}
          >
            VEND DIN SKÆRM
          </p>

          {/* Brødtekst */}
          <p
            className="text-center text-sm sm:text-base max-w-md"
            style={{
              fontFamily: "var(--font-hel-light)",
              color: "var(--ash-grey-hex)",
            }}
          >
            Drej din mobil vandret for at opleve storytelling-forløbet på den
            måde, det er designet til.
          </p>
        </div>
      )}
    </>
  );
}
