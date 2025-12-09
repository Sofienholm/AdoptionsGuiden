import { useEffect } from "react";
import { useNavigate } from "react-router";
import profiles from "../../data/profiles.json";

export default function ResultProfile({ selectedProfileId }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProfileId) navigate("/quiz");
  }, [selectedProfileId, navigate]);

  if (!selectedProfileId) return null;

  const profile = profiles[selectedProfileId];

  return (
    <div className="min-h-screen bg-[#F6F0E8] px-6 py-10 md:px-16 lg:px-32">

      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#8B1D14] mb-8">
        DIT RESULTAT – ADFÆRDSPROFIL
      </h1>

      {/* SUBTITLE */}
      <h2 className="text-xl md:text-2xl font-bold text-[#FF4F3C] mb-6 leading-snug">
        DU PASSER BEDST TIL EN {profile.label.toUpperCase()}, DER:
      </h2>

      {/* DESCRIPTION LIST */}
      <ul className="space-y-3 mb-10">
        {profile.description.map((line, i) => (
          <li key={i} className="text-[#FF4F3C] text-lg md:text-xl flex gap-3">
            <span className="text-[#FF4F3C]">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* SHORT SUMMARY */}
      <h3 className="text-xl font-extrabold text-[#FF4F3C] mb-2">
        KORT SAGT
      </h3>

      <p className="text-[#8B1D14] text-lg md:text-xl max-w-2xl mb-14">
        {profile.shortSummary}
      </p>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/result/why")}
          className="
            bg-[#FF4F3C] text-white font-bold 
            w-28 h-28 md:w-32 md:h-32 rounded-full
            flex items-center justify-center
            text-lg md:text-xl shadow-lg
            hover:scale-105 transition-transform
          "
        >
          HVORFOR?
        </button>
      </div>
    </div>
  );
}
