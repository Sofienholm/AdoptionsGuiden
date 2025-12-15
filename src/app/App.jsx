//Routing & app-struktur
// Central routing-fil for applikationen
// Samler hele brugerflowet ét sted og gør det nemmere at bevare overblik

import { Routes, Route } from "react-router";

//Landing & overordnet intro
import Landing from "../pages/landing/landing";

//Intro-sider
// Introforløb der klæder brugeren på før onboarding og quiz
import IntroAnsvar from "../pages/landing/IntroAnsvar";
import IntroForstaaet from "../pages/landing/IntroForstaaet";
import IntroStart from "../pages/landing/IntroStart";

//Onboarding
import Onboard from "../pages/onboard/Onboard";

//Storytelling steps
// Opdelt i separate routes pga. scroll-baseret storytelling
// Giver bedre overblik og gør flowet nemmere at arbejde med
import Step1 from "../pages/onboard/storytelling/Step1/Step1.jsx";
import Step2 from "../pages/onboard/storytelling/Step2/step2.jsx";
import Step3 from "../pages/onboard/storytelling/Step3/step3.jsx";
import Step4 from "../pages/onboard/storytelling/Step4/step4.jsx";
import Step5 from "../pages/onboard/storytelling/Step5/step5.jsx";

//Quiz intro & flow
// Quiz-flow opdelt i intro og selve quizzen
// for at styre tempo og forventninger hos brugeren
import Intro1 from "../pages/quiz/Intro1";
import Intro2 from "../pages/quiz/Intro2";
import Quiz from "../pages/quiz/Quiz";

//Quiz context
// Bruges til at dele quiz-state på tværs af flere sider
// Valgt for at samle quiz-data ét sted og undgå prop drilling
import { QuizProvider } from "../pages/quiz/components/QuizContext.jsx";

//Resultatsider
// Resultatet opdelt i profil og forklaring
// så indholdet er lettere at overskue
import ResultProfile from "../pages/result/ResultProfile.jsx";
import ResultWhy from "../pages/result/ResultWhy.jsx";

//Hundematch
// Viser hunde der matcher brugerens resultatprofil
import MatchDogs from "../pages/match/MatchDogs";

//Ansøgningsformular
// Afsluttende formular i sit eget flow
import AdoptionApplicationForm from "../pages/application/AdoptionApplicationForm";

function App() {
  return (
    // QuizProvider placeres højt,
    // da quiz-flowet bruges på tværs af flere routes
    <QuizProvider>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Intro flow */}
        <Route path="/intro-ansvar" element={<IntroAnsvar />} />
        <Route path="/intro-3" element={<IntroForstaaet />} />
        <Route path="/intro-4" element={<IntroStart />} />

        {/* Onboarding & storytelling */}
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/onboard/step1" element={<Step1 />} />
        <Route path="/onboard/step2" element={<Step2 />} />
        <Route path="/onboard/step3" element={<Step3 />} />
        <Route path="/onboard/step4" element={<Step4 />} />
        <Route path="/onboard/step5" element={<Step5 />} />

        {/* Quiz flow */}
        <Route path="/quiz" element={<Intro1 />} />
        <Route path="/quiz/info" element={<Intro2 />} />
        <Route path="/quiz/start" element={<Quiz />} />

        {/* Resultater */}
        <Route path="/result" element={<ResultProfile />} />
        <Route path="/result/why" element={<ResultWhy />} />

        {/* Hundematch */}
        <Route path="/dog-matches" element={<MatchDogs />} />

        {/* Ansøgningsformular */}
        <Route path="/application" element={<AdoptionApplicationForm />} />
      </Routes>
    </QuizProvider>
  );
}

export default App;
