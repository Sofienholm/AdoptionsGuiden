import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuiz } from "../../pages/quiz/components/useQuiz";
import profiles from "../../data/profiles.json";
import { generateExplanation } from "../../utils/generateExplanation";
import arrow from "./frames/arrow.svg";
import pote from "./frames/pote.svg";

export default function ResultWhy() {
  const navigate = useNavigate();
  const { selectedProfileId, userProfile } = useQuiz();

  // Redirect hvis brugeren ikke har et resultat
  useEffect(() => {
    if (!selectedProfileId) navigate("/quiz/start");
  }, [selectedProfileId, navigate]);

  if (!selectedProfileId) return null;

  const profile = profiles[selectedProfileId];
  const explanationLines = generateExplanation(userProfile, selectedProfileId);

  return (
    <div className="min-h-screen bg-[#F6F0E8] ">
<div className="px-6 pt-20 pb-16 md:px-16 lg:px-32">

      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-knewave text-[#8B1D14] mb-12">
        HVORFOR NETOP DENNE PROFIL?
      </h1>

      {/* SUBTITLE */}
      <h2 className="text-xl md:text-2xl font-knewave text-[#FF4F3C] mb-12 ">
        DU HAR FÅET PROFILEN: {profile.label.toUpperCase()}
      </h2>

      {/* EXPLANATION LINES */}
      <ul className="space-y-2  max-w-2xl">
        {explanationLines.map((line, index) => (
          <li key={index} className="text-[#FF4F3C]  font-hel-light text-lg md:text-xl flex gap-6">
            <span className="text-[#FF4F3C]">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
</div>
{/*pote img */}
<img src={pote} alt="dogpaw" className="absolute top-20 right-20 invisible lg:visible md:visible lg:w-90 md:w-30" />
      {/* BUTTON → Hundematch */}
      <div className="flex justify-end lg:justify-between flex-col md:flex-row lg:flex-row items-center px-6 md:px-16 lg:px-32 gap-15 md:gap-0">
        <h3 className="text-xl md:text-3xl font-knewave text-[#FF4F3C] mb-12> mr-3">
        TRYK NU VIDERE OG SE VORES BUD PÅ HUNDE DER KUNNE VÆRE ET MATCH
        </h3>
        <img src={arrow} alt="arrow" className="rotate-90 sm:rotate-0 lg:w-28 md:w-25 w-20 mr-3" />
        <div className="">
          <button
          onClick={() => navigate("/dog-matches")}
          className="
            bg-[#FF4F3C] text-white font-knewave
            lg:w-32 lg:h-32 md:w-32 md:h-32 w-35 h-35 rounded-full
            flex items-center justify-center p-3
            text-lg md:text-xl shadow-lg
            hover:scale-105 transition-transform
          "
        >
          SE MATCH
        </button> 
        </div>
       
      </div>
      </div>
  );
}
