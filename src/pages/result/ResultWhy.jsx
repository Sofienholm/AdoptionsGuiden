import { useEffect } from "react";
import { useNavigate } from "react-router";
import profiles from "../../data/profiles.json";
import { generateExplanation } from "../../utils/generateExplanation";

export default function ResultWhy({ selectedProfileId, userProfile }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProfileId || !userProfile) navigate("/quiz");
  }, [selectedProfileId, userProfile, navigate]);

  if (!selectedProfileId || !userProfile) return null;

  const profile = profiles[selectedProfileId];
  const explanationList = generateExplanation(userProfile, selectedProfileId);

  return (
    <div className="min-h-screen bg-[#F6F0E8] px-6 py-10 md:px-16 lg:px-32 relative">

      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#8B1D14] mb-10">
        HVORFOR NETOP DENNE PROFIL
      </h1>

      {/* SUBTITLE */}
      <h2 className="text-xl md:text-2xl font-extrabold text-[#FF4F3C] mb-6">
        FORKLARING
      </h2>

      {/* EXPLANATION BULLETS */}
      <ul className="space-y-4 mb-20">
        {explanationList.map((line, i) => (
          <li key={i} className="text-[#8B1D14] text-lg md:text-xl flex gap-3">
            <span className="text-[#FF4F3C]">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* MATCHES BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/result/matches")}
          className="
            bg-[#FF4F3C] text-white font-bold
            w-28 h-28 md:w-32 md:h-32 rounded-full
            flex items-center justify-center
            text-lg md:text-xl shadow-lg
            hover:scale-105 transition-transform
          "
        >
          MATCHES
        </button>
      </div>

    </div>
  );
}
