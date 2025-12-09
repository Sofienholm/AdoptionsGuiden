import { createContext, useState } from "react";
import { applyAnswerEffects } from "../../../utils/applyAnswerEffects";
import { selectAdfaerdsprofil } from "../../../utils/selectAdfaerdsprofil";
import { userProfileTemplate } from "../../../data/userProfileTemplate";
import quizQuestions from "../../../data/quizQuestions.json";
import { useNavigate } from "react-router";

export const QuizContext = createContext();

export function QuizProvider({ children }) {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({ ...userProfileTemplate });
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  function resetQuiz() {
    setUserProfile({ ...userProfileTemplate });
    setSelectedProfileId(null);
    setCurrentQuestionIndex(0);
  }

  function answerQuestion(effects) {
    setUserProfile(prev => applyAnswerEffects(prev, effects));

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      return;
    }

    finishQuiz();
  }

  function finishQuiz() {
    const profileId = selectAdfaerdsprofil(userProfile);
    setSelectedProfileId(profileId);
    navigate("/result");
  }

  return (
    <QuizContext.Provider
      value={{
        userProfile,
        selectedProfileId,
        currentQuestionIndex,
        currentQuestion,
        answerQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
