import { useEffect } from "react";
import { useNavigate } from "react-router";
import profiles from "../../data/profiles.json";
import { useQuiz } from "../../pages/quiz/components/useQuiz";

export default function ResultProfile() {
  const navigate = useNavigate();
  const { selectedProfileId } = useQuiz(); // HENTER FRA CONTEXT

  // Hvis ingen resultat → send tilbage til quiz
  useEffect(() => {
    if (!selectedProfileId) navigate("/quiz/start");
  }, [selectedProfileId, navigate]);

  if (!selectedProfileId) return null;

  const profile = profiles[selectedProfileId];

  return (
    <div className="min-h-screen bg-[#F6F0E8]">
      <div className=" px-6  md:py-20 md:px-16 lg:px-32">
        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-knewave text-[#8B1D14] mb-2 md:mb-12">
          DIT RESULTAT – ADFÆRDSPROFIL
        </h1>

        {/* SUBTITLE */}
        <h2 className="text-xl md:text-2xl font-knewave text-[#FF4F3C] mb-8 md:mb-12">
          DU PASSER BEDST TIL EN {profile.label.toUpperCase()}, DER:
        </h2>

        {/* DESCRIPTION LIST */}
        <ul className=" md:space-y-6 mb-15">
          {profile.description.map((line, i) => (
            <li
              key={i}
              className="text-[#FF4F3C]  font-hel-light text-m md:text-xl flex gap-2 md:gap-6 mb-3 md:mb-7 "
            >
              <span className="text-[#FF4F3C]">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between flex-row items-center gap-2 px-6 md:px-16 lg:px-32 mb-20">
        <div>
          {/* SHORT SUMMARY */}
          <h3 className="text-xl font-knewave text-[#FF4F3C] mb-2">
            KORT SAGT
          </h3>

          <p className="text-[#FF4F3C]  font-hel-light text-lg md:text-xl md:max-w-xl max-w-50 ">
            {profile.shortSummary}
          </p>
        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/result/why")}
            className="
            bg-[#FF4F3C] text-white font-knewave
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
    </div>
  );
}
