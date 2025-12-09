import { useContext } from "react";
import { QuizContext } from "./QuizContext";

export function useQuiz() {
  return useContext(QuizContext);
}
