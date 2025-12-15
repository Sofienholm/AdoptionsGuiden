//Quiz
// selve quiz-flowet
// brugeren svarer på spørgsmål som bruges til at lave en match-profil

import { useState } from "react";
import { useQuiz } from "./components/useQuiz";
import { useNavigate } from "react-router";

export default function Quiz() {
  //Quiz state
  // quiz logik og state ligger i useQuiz
  // her bruger vi bare det vi skal bruge til UI
  const {
    currentQuestion,
    answerQuestion,
    currentQuestionIndex,
    resetQuiz,
  } = useQuiz();

  //Routing
  // bruges når quizzen skal starte forfra
  const navigate = useNavigate();

  //Lokalt state
  // hvilket svar brugeren har valgt
  const [selectedOption, setSelectedOption] = useState(null);

  //Konstanter
  // antal spørgsmål i alt (bruges kun til progress)
  const total = 8;

  //Guard
  // hvis quiz data ikke er klar endnu, viser vi ingenting
  if (!currentQuestion) return null;

  //Næste spørgsmål
  const handleNext = () => {
    if (selectedOption === null) return;
    // sender effekten af svaret videre til quiz hooken
    answerQuestion(currentQuestion.options[selectedOption].effects);
    setSelectedOption(null);
  };

  //Reset quiz
  const handleRestart = () => {
    resetQuiz();
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-[#F6F0E8] flex justify-center px-4 md:px-8 lg:px-12 overflow-hidden relative">
      {/* progress */}
      {/* viser hvor langt man er i quizzen */}
      <div
        className="
          fixed top-4 left-1/2 -translate-x-1/2 
          flex gap-3 z-50 pb-4
        "
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`
              w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-[#8B1D14]
              ${i === currentQuestionIndex ? "bg-[#8B1D14]" : "bg-transparent"}
            `}
          />
        ))}
      </div>

      {/* quiz indhold */}
      <div className="w-full max-w-3xl md:max-w-4xl transform scale-90 md:scale-95 lg:scale-100 origin-top mt-28">
        {/* spørgsmål */}
        <h1 className="text-2xl md:text-3xl text-[#8B1D14] uppercase font-knewave mb-3">
          SPØRGSMÅL {currentQuestionIndex + 1} –{" "}
          {currentQuestion.question.toUpperCase()}
        </h1>

        {/* hjælpetekst */}
        {/* lille ekstra forklaring til spørgsmålet */}
        <p className="text-[#FF4F3C] text-base md:text-lg uppercase font-knewave mb-8 max-w-3xl">
          {currentQuestion.helpText}
        </p>

        {/* svarmuligheder */}
        <div className="flex flex-col font-hel-light gap-4 mt-4 max-w-3xl">
          {currentQuestion.options.map((opt, i) => {
            const isSelected = selectedOption === i;

            return (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                className="flex items-center gap-3 py-2 px-2 text-left hover:scale-105 transition"
              >
                {/* radio */}
                {/* bliver fyldt hvis den er valgt */}
                <div
                  className={`
                    w-7 h-7 md:w-8 md:h-8 rounded-full border-[1.5px]
                    flex-shrink-0 flex items-center justify-center border-[#8B1D14]
                  `}
                >
                  <div
                    className={`
                      w-3.5 h-3.5 md:w-4 md:h-4 rounded-full
                      ${isSelected ? "bg-[#8B1D14]" : "bg-transparent"}
                    `}
                  />
                </div>

                {/* svar */}
                <span className="text-[#FF4F3C] text-sm md:text-lg leading-snug">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* start forfra */}
        {/* hvis man bliver i tvivl midt i quizzen */}
        <button
          onClick={handleRestart}
          className="
            mt-6
            text-molten font-extralight underline
            text-sm md:text-base
            hover:scale-105 transition-transform
          "
        >
          Usikker på dit svar? - Start forfra
        </button>
      </div>

      {/* næste */}
      {/* fast knap der går videre når der er valgt et svar */}
      <button
        onClick={handleNext}
        className="
          fixed bottom-10 right-10 rounded-full
          w-24 h-24 md:w-28 md:h-28
          flex items-center justify-center
          text-lg md:text-xl shadow-lg transition-transform
          bg-[#FF4F3C] text-linen font-knewave
          hover:scale-105
        "
      >
        NÆSTE
      </button>
    </div>
  );
}
