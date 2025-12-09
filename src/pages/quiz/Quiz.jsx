import { useQuiz } from "./components/useQuiz";

export default function Quiz() {
  const { currentQuestion, answerQuestion, currentQuestionIndex } = useQuiz();

  if (!currentQuestion) {
    return <div className="p-6 text-center">Loader spørgsmål...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Spørgsmålsnummer */}
      <p className="text-gray-600 mb-2">
        Spørgsmål {currentQuestionIndex + 1} / 8
      </p>

      {/* Selve spørgsmålet */}
      <h1 className="text-2xl font-bold mb-6 text-center max-w-xl">
        {currentQuestion.question}
      </h1>

      {/* Svarmuligheder */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => answerQuestion(opt.effects)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
