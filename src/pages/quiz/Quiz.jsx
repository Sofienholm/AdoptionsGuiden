import { useState } from "react";
import { useQuiz } from "./components/useQuiz";
import { useNavigate } from "react-router";

export default function Quiz() {
  const { currentQuestion, answerQuestion, currentQuestionIndex } = useQuiz();
  const total = 8;

  // Hvilken option er valgt?
  const [selectedOption, setSelectedOption] = useState(null);

  if (!currentQuestion) return null;

  const handleNext = () => {
    if (selectedOption === null) return;
    answerQuestion(currentQuestion.options[selectedOption].effects);
    setSelectedOption(null); // reset for næste spørgsmål
  };
  const { resetQuiz } = useQuiz();
  const navigate = useNavigate();

  function handleRestart() {
    resetQuiz();
    navigate("/quiz");
  }

  return (
    <div className="min-h-screen bg-[#F6F0E8] px-6 py-10 md:px-16 lg:px-32 relative left-1/2 -translate-x-1/2 ">
      {/* PROGRESS BAR */}
      <div className="flex gap-4 mb-10 justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`
              w-6 h-6 rounded-full border-2 border-[#8B1D14]
              ${i === currentQuestionIndex ? "bg-[#8B1D14]" : "bg-transparent"}
            `}
          />
        ))}
      </div>

      {/* SPØRGSMÅL */}
      <h1 className="text-3xl md:text-4xl  text-[#8B1D14] uppercase font-knewave mb-3">
        SPØRGSMÅL {currentQuestionIndex + 1} –{" "}
        {currentQuestion.question.toUpperCase()}
      </h1>

      {/* HJÆLPETEKST */}
      <p className="text-[#FF4F3C] text-lg md:text-xl uppercase font-knewave mb-8 max-w-3xl">
        {currentQuestion.helpText}
      </p>

      {/* SVARMULIGHEDER */}
      <div className="flex flex-col font-hel-light gap-6 mt-6 max-w-3xl">
        {currentQuestion.options.map((opt, i) => {
          const isSelected = selectedOption === i;

          return (
            <button
              key={i}
              onClick={() => setSelectedOption(i)}
              className="flex items-center gap-4 py-3 px-2 text-left hover:scale-105 transition"
            >
              {/* RADIO-KNAP */}
              <div
                className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full border-4 
                  flex items-center justify-center
                  ${
                    isSelected
                      ? "border-[#8B1D14]"
                      : "border-[#8B1D14]"
                  }
                `}
              >
                <div
                  className={`
                    w-4 h-4 md:w-5 md:h-5 rounded-full
                    ${isSelected ? "bg-[#8B1D14]" : "bg-transparent"}
                  `}
                ></div>
              </div>

              {/* LABEL */}
              <span className="text-[#FF4F3C] text-lg md:text-xl">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* NEXT KNAP */}
      <button
        onClick={handleNext}
        className="
      fixed bottom-10 right-10 rounded-full
          w-28 h-28 md:w-32 md:h-32
          flex items-center justify-center
          text-lg md:text-xl shadow-lg transition-transform
    bg-[#FF4F3C] text-linen font-knewave
    hover:scale-105 
  "
      >
        NÆSTE
      </button>

      <button
        onClick={handleRestart}
        className="
    fixed bottom-40 left-35
   text-molten font-bold underline
    hover:scale-105 transition-transform

  "
      >
        Usikker på dit svar? - START FORFRA
      </button>
    </div>
  );
}
