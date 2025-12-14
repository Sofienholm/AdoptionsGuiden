// -- QUIZ INTRO --
// kort forklaring før quizzen går i gang
// sætter forventninger, ikke et facit

import { useNavigate } from "react-router";

export default function Intro2() {
  // -- NAVIGATION --
  // bruges kun til at hoppe videre til quizzen
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F6F0E8] flex flex-col items-center justify-center px-10 text-center">
      <p className="text-[#FF4F3C] uppercase font-knewave text-sm md:text-3xl max-w-3xl mb-14">
        Denne quiz hjælper dig med at få et overblik over, hvilken type hund der passer bedst til dine rammer, behov og erfaringer.
        <br />
        <br />
        På baggrund af dine svar modtager du en behovsprofil samt tre forslag på hunde, der typisk matcher denne profil.
        <br />
        <br />
        Forslagene er vejledende og ikke en garanti for adoption, men et redskab til at forstå, hvilke hundetyper der sandsynligvis vil trives bedst hos dig.
      </p>

      <button
        onClick={() => navigate("/quiz/start")}
        className="
          fixed bottom-10 right-10 bg-[#FF4F3C] text-white 
          font-knewave w-28 h-28 rounded-full md:w-32 md:h-32 
          flex items-center justify-center text-lg md:text-xl 
          shadow-lg hover:scale-105 transition-transform
        "
      >
        START
      </button>
    </div>
  );
}
