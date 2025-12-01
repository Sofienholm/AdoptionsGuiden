import { Routes, Route } from "react-router";
import Onboard from "../pages/onboard/Onboard";
import Landing from "../pages/landing/landing";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboard" element={<Onboard />} />
      </Routes>
  );
}
export default App;
