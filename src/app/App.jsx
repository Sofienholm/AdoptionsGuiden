import { Routes, Route } from "react-router";
import Onboard from "../pages/onboard/Onboard";
import Landing from "../pages/landing/landing";
import Step2 from "../pages/onboard/storytelling/Step2/step2.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboard" element={<Onboard />} />
      <Route path="/onboard/step2" element={<Step2 />} />
    </Routes>
  );
}
export default App;
