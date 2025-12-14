// QUIZ CONTEXT
// samler hele quiz flowet ét sted
// svar, progression og resultat

import { createContext, useState } from "react";
import { applyAnswerEffects } from "../../../utils/applyAnswerEffects";
import { selectAdfaerdsprofil } from "../../../utils/selectAdfaerdsprofil";
import { userProfileTemplate } from "../../../data/userProfileTemplate";
import quizQuestions from "../../../data/quizQuestions.json";
import { useNavigate } from "react-router";

export const QuizContext = createContext();

export function QuizProvider({ children }) {
  // ROUTING 
  // bruges når quizzen er færdig og vi skal videre
  const navigate = useNavigate();

  // STATE BRUGERPROFIL
  // profil der bliver bygget op løbende gennem quizzen
  const [userProfile, setUserProfile] = useState({ ...userProfileTemplate });

  // STATE RESULTAT
  // id på den adfærdsprofil brugeren ender med
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  // STATE PROGRESSION
  // hvilket spørgsmål vi er nået til
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // AKTUELT SPØRGSMÅL
  // slås op ud fra index
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // RESET QUIZ
  // starter quizzen helt forfra
  function resetQuiz() {
    setUserProfile({ ...userProfileTemplate });
    setSelectedProfileId(null);
    setCurrentQuestionIndex(0);
  }

  // BESVAR SPØRGSMÅL
  // kaldes når brugeren går videre til næste
  function answerQuestion(effects) {
    // lægger svarets effekter oven i den nuværende profil
    setUserProfile(prev => applyAnswerEffects(prev, effects));

    const nextIndex = currentQuestionIndex + 1;

    // hvis der stadig er spørgsmål tilbage
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      return;
    }

    // ellers er quizzen færdig
    finishQuiz();
  }

  // AFSLUT QUIZ
  // finder den adfærdsprofil der matcher bedst
  // og sender brugeren videre til resultat
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
