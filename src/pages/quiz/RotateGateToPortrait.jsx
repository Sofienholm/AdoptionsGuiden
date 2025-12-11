// src/pages/quiz/RotateGateToPortrait.jsx
import { useEffect, useState } from "react";
import flipIcon from "./frames/flip_ikon.svg"; // din opdaterede SVG (starter liggende)

export default function RotateGateToPortrait({ children }) {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Mindste side bruges til at vurdere mobil/tablet
      const smallestSide = Math.min(width, height);
      const isSmallScreen = smallestSide <= 768;

      // Touch device = mobil/tablet → aldrig desktop
      const isTouchDevice =
        "ontouchstart" in window ||
        (navigator && navigator.maxTouchPoints > 0);

      const isMobileLike = isSmallScreen && isTouchDevice;

      // Landscape = bredere end høj
      const isLandscape = width > height;

      // 👇 Gate må KUN vises på mobil i landscape
      setShowGate(isMobileLike && isLandscape);
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
          {/* SVG-animation – genbruger RotateGate-animationen */}
          <img
            src={flipIcon}
            alt="rotate phone"
            className="rotateHintAnimation mb-10"
            style={{ width: "180px" }}
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
