//Rotation gate
// bruges til onboarding, hvor oplevelsen er lavet horisontalt
// viser en overlay hvis man er på mobil og holder telefonen lodret

import { useEffect, useState } from "react";

//Grafik
import flipIcon from "./frames/flip_ikon.svg";

export default function RotateGate({ children }) {
  // styrer om rotate-overlay skal vises eller ej
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    // tjekker om brugeren er på mobil og i portræt
    const check = () => {
      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth <= 768;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      // overlay vises kun ved mobil + portræt
      setShowGate(isMobile && isPortrait);
    };

    check();

    // lytter på ændringer i størrelse og rotation
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  return (
    <>
      {/* indhold */}
      {children}

      {/* rotate overlay */}
      {showGate && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex flex-col items-center justify-center
            px-8
          "
          style={{ backgroundColor: "var(--soft-linen-hex)" }}
        >
          {/* ikon */}
          <img
            src={flipIcon}
            alt="rotate phone"
            className="rotateHintAnimation mb-10"
            style={{ width: "180px" }}
          />

          {/* tekst */}
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
        </div>
      )}
    </>
  );
}
