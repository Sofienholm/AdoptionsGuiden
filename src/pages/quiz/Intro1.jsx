import { useEffect } from "react";
import { useNavigate } from "react-router";
import matchText from "./frames/MATCH-QUIZEN.svg";
import DB from "./frames/db.svg";
import RotateGateToPortrait from "./RotateGateToPortrait";

export default function Intro1() {
  const navigate = useNavigate();

  // 🔒 Deaktivér scroll KUN på mobil når intro1 er vist
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <RotateGateToPortrait>
      <div
        className="
          min-h-screen bg-[#F6F0E8] 
          flex flex-col items-center justify-center 
          px-6 text-center gap-8.5

          -mt-14 md:mt-0    /* ⭐ LØFTER INDHOLDET OP PÅ MOBIL */
        "
      >
        {/* DYRENES BESKYTTELSE logo/tekst */}
        <img
          src={DB}
          alt=""
          className="
            w-40 md:w-56 lg:w-74 object-contain
            -mt-6 md:mt-0       /* ⭐ LØFTER LOGOET EN SMULE */
          "
        />

        {/* MATCH QUIZEN tekst */}
        <img
          src={matchText}
          alt=""
          className="
            w-4/5 md:w-[70%] lg:w-[55%] object-contain
            -mt-4 md:mt-2       /* ⭐ LØFTER SVG EN SMULE MERE PÅ MOBIL */
          "
        />

        {/* Button */}
        <button
          onClick={() => navigate("/quiz/info")}
          className="
            fixed bottom-10 right-10 bg-[#ff4f39ff] 
            text-white font-knewave font-bold 
            w-28 h-28 rounded-full md:w-32 md:h-32 
            flex items-center justify-center 
            text-lg md:text-xl shadow-lg 
            hover:scale-105 transition-transform
          "
        >
          FIND DIT MATCH
        </button>
      </div>
    </RotateGateToPortrait>
  );
}
