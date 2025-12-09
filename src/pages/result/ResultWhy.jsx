import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuiz } from "../../pages/quiz/components/useQuiz";
import profiles from "../../data/profiles.json";
import { generateExplanation } from "../../utils/generateExplanation";

export default function ResultWhy() {
  const navigate = useNavigate();
  const { selectedProfileId, userProfile } = useQuiz();

  // Redirect hvis brugeren ikke har et resultat
  useEffect(() => {
    if (!selectedProfileId) navigate("/quiz");
  }, [selectedProfileId, navigate]);

  if (!selectedProfileId) return null;

  const profile = profiles[selectedProfileId];
  const explanationLines = generateExplanation(userProfile, selectedProfileId);

  return (
    <div className="min-h-screen bg-[#F6F0E8] px-6 py-10 md:px-16 lg:px-32">

      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#8B1D14] mb-8">
        HVORFOR NETOP DENNE PROFIL?
      </h1>

      {/* SUBTITLE */}
      <h2 className="text-xl md:text-2xl font-bold text-[#FF4F3C] mb-6 leading-snug">
        DU HAR FÅET PROFILEN: {profile.label.toUpperCase()}
      </h2>

      {/* EXPLANATION LINES */}
      <ul className="space-y-4 mb-12 max-w-2xl">
        {explanationLines.map((line, index) => (
          <li key={index} className="flex gap-3 text-lg md:text-xl text-[#8B1D14]">
            <span className="text-[#FF4F3C] font-bold">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* BUTTON → Hundematch */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/dog-matches")}
          className="
            bg-[#FF4F3C] text-white font-bold 
            w-28 h-28 md:w-32 md:h-32 rounded-full
            flex items-center justify-center
            text-lg md:text-xl shadow-lg
            hover:scale-105 transition-transform
          "
        >
          SE MATCH
        </button>
      </div>
    </div>
  );
}
