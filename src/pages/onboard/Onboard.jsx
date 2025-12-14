// -- ONBOARDING CONTAINER --
// Samler hele onboarding og storytelling-flowet
// Steps vises i rækkefølge og wrappes i RotateGate

import Step1 from "./storytelling/Step1/Step1.jsx";
import Step2 from "./storytelling/Step2/step2.jsx";
import Step3 from "./storytelling/Step3/step3.jsx";
import Step4 from "./storytelling/Step4/Step4.jsx";
import Step5 from "./storytelling/Step5/step5.jsx";

// -- ROTATION GATE --
// Sørger for at brugeren vender skærmen på mobil
import RotateGate from "./RotateGate";

export default function Onboard() {
  return (
    <RotateGate>
      <div className="w-full m-0 p-0">
        {/* STORYTELLING STEPS */}
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
      </div>
    </RotateGate>
  );
}
