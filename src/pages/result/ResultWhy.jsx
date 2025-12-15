import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuiz } from "../../pages/quiz/components/useQuiz";
import profiles from "../../data/profiles.json";
import { generateExplanation } from "../../utils/generateExplanation";

//grafiske elementer
import arrow from "./frames/arrow.svg";
import pote from "./frames/pote.svg";

//resultat, hvorfor
// forklarer hvorfor brugeren har fået netop denne profil
export default function ResultWhy() {
  //routing
  // bruges til at hoppe videre i flowet
  const navigate = useNavigate();

  //quiz state
  // både valgt profil og samlet brugerprofil
  const { selectedProfileId, userProfile } = useQuiz();

  //guard
  // hvis man lander her uden resultat
  // sendes man tilbage til quiz start
  useEffect(() => {
    if (!selectedProfileId) navigate("/quiz/start");
  }, [selectedProfileId, navigate]);

  //stop render
  // mens redirect håndteres
  if (!selectedProfileId) return null;

  //profil data
  // slår den fulde adfærdsprofil op
  const profile = profiles[selectedProfileId];

  //forklaring
  // laver konkrete begrundelser ud fra svarene
  const explanationLines = generateExplanation(
    userProfile,
    selectedProfileId
  );

  //data til næste side
  // samler det der skal sendes med videre
  const profileData = {
    label: profile.label,
    description: profile.description,
    why: explanationLines,
  };

  return (
    <div className="min-h-screen bg-[#F6F0E8]">
      <div className="px-6 pt-5 md:pt-20 pb-16 md:px-16 lg:px-32">
        <h1 className="text-3xl md:text-5xl font-knewave text-[#8B1D14] mb-3 md:mb-12">
          HVORFOR NETOP DENNE PROFIL?
        </h1>

        <h2 className="text-xl md:text-2xl font-knewave text-[#FF4F3C] mb-6 md:mb-12">
          DU HAR FÅET PROFILEN: {profile.label.toUpperCase()}
        </h2>

        <ul className="space-y-2 max-w-2xl">
          {explanationLines.map((line, index) => (
            <li
              key={index}
              className="text-[#FF4F3C] font-hel-light text-sm md:text-xl flex gap-6"
            >
              <span>•</span>
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </li>
          ))}
        </ul>
      </div>

      <img
        src={pote}
        alt="dogpaw"
        className="absolute top-20 right-20 invisible lg:visible md:visible lg:w-90 md:w-30"
      />

      <div
        className="
          flex flex-col items-center text-center 
          mx-10 md:mx-0 lg:mx-0
          my-10 md:my-20 lg:my-20
          md:flex-row md:justify-center md:text-left w-full
        "
      >
        <h3
          className="
            text-xl md:text-3xl font-knewave text-[#FF4F3C]
            mb-6 md:mb-0 md:max-w-[600px]
          "
        >
          TRYK NU VIDERE OG SE VORES BUD PÅ HUNDE DER KUNNE VÆRE ET MATCH
        </h3>

        <img
          src={arrow}
          alt="arrow"
          className="
            w-20 md:w-28 
            rotate-90 md:rotate-0 
            mb-8 md:mb-0 mr-9
          "
        />

        <button
          onClick={() =>
            navigate("/dog-matches", {
              state: { behaviorProfile: profileData },
            })
          }
          className="
            bg-[#FF4F3C] text-white font-knewave
            w-28 h-28 md:w-32 md:h-32 rounded-full
            flex items-center justify-center
            text-lg md:text-xl shadow-lg
            hover:scale-105 transition-transform
            mb:50
          "
        >
          SE MATCH
        </button>
      </div>
    </div>
  );
}
