import { Routes, Route } from "react-router";

import Onboard from "../pages/onboard/Onboard";
import Landing from "../pages/landing/landing";

// Intro-sider
import IntroAnsvar from "../pages/landing/IntroAnsvar";
import IntroForstaaet from "../pages/landing/IntroForstaaet";
import IntroStart from "../pages/landing/IntroStart";

// Storytelling steps
import Step2 from "../pages/onboard/storytelling/Step2/step2.jsx";
import Step3 from "../pages/onboard/storytelling/Step3/step3.jsx";
import Step4 from "../pages/onboard/storytelling/Step4/step4.jsx";
import Step5 from "../pages/onboard/storytelling/Step5/step5.jsx";

import Intro1 from "../pages/quiz/Intro1";
import Intro2 from "../pages/quiz/Intro2";
import Quiz from "../pages/quiz/Quiz";
// Quiz Context
import { QuizProvider } from "../pages/quiz/components/QuizContext.jsx";

// Resultatsider
import ResultProfile from "../pages/result/ResultProfile.jsx";
import ResultWhy from "../pages/result/ResultWhy.jsx";

import MatchDogs from "../pages/match/MatchDogs";

// Ansøgningsformular
import AdoptionApplicationForm from "../pages/application/AdoptionApplicationForm";

function App() {
  return (
    <QuizProvider>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Intro flow */}
        <Route path="/intro-ansvar" element={<IntroAnsvar />} />
        <Route path="/intro-3" element={<IntroForstaaet />} />
        <Route path="/intro-4" element={<IntroStart />} />

        {/* Storytelling */}
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/onboard/step2" element={<Step2 />} />
        <Route path="/onboard/step3" element={<Step3 />} />
        <Route path="/onboard/step4" element={<Step4 />} />
        <Route path="/onboard/step5" element={<Step5 />} />

        {/* QUIZ */}
        <Route path="/quiz" element={<Intro1 />} />
<Route path="/quiz/info" element={<Intro2 />} />
<Route path="/quiz/start" element={<Quiz />} />

        {/* RESULTATSIDER */}
        <Route path="/result" element={<ResultProfile />} />
        <Route path="/result/why" element={<ResultWhy />} />
        {/* Hundematch */}
        <Route path="/dog-matches" element={<MatchDogs />} />


         {/* Ansøgningsformular */}
      <Route path="/ansoegning" element={<AdoptionApplicationForm />} />
      </Routes>
    </QuizProvider>
  );
}

export default App;
