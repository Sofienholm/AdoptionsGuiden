import { useContext } from "react";
import { QuizContext } from "./QuizContext";

// useQuiz -lille wrapper rundt om QuizContext
// så mann ikke skal bruge useContext alle steder
export function useQuiz() {
  // henter state og funktioner direkte fra context
  return useContext(QuizContext);
}
