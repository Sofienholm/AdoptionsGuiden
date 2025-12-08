import { Routes, Route } from "react-router";

import Onboard from "../pages/onboard/Onboard";
import Landing from "../pages/landing/landing";

// Intro-sider
import IntroAnsvar from "../pages/landing/IntroAnsvar";
import IntroForstaaet from "../pages/landing/IntroForstaaet";
import IntroStart from "../pages/landing/IntroStart";        // ← NY

// Storytelling steps
import Step2 from "../pages/onboard/storytelling/Step2/step2.jsx";
import Step3 from "../pages/onboard/storytelling/Step3/step3.jsx";
import Step4 from "../pages/onboard/storytelling/Step4/step4.jsx";
import Step5 from "../pages/onboard/storytelling/Step5/step5.jsx";

function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Intro flow */}
      <Route path="/intro-ansvar" element={<IntroAnsvar />} />
      <Route path="/intro-3" element={<IntroForstaaet />} />
      <Route path="/intro-4" element={<IntroStart />} />      {/* ← NY */}

      {/* Storytelling */}
      <Route path="/onboard" element={<Onboard />} />
      <Route path="/onboard/step2" element={<Step2 />} />
      <Route path="/onboard/step3" element={<Step3 />} />
      <Route path="/onboard/step4" element={<Step4 />} />
      <Route path="/onboard/step5" element={<Step5 />} />
    </Routes>
  );
}

export default App;
