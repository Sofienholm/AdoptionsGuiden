// src/pages/onboard/RotateGate.jsx
import { useEffect, useState } from "react";
import flipIcon from "./frames/flip_ikon.svg"; // din SVG

export default function RotateGate({ children }) {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth <= 768;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      // Vis gate: mobil + portræt-orientering
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
          {/* SVG-animation */}
          <img
            src={flipIcon}
            alt="rotate phone"
            className="rotateHintAnimation mb-10"
            style={{ width: "180px" }} // base-size (overskrives på mobil)
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
        </div>
      )}
    </>
  );
}
