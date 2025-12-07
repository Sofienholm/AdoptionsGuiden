import Step1 from "./storytelling/Step1/Step1.jsx";
import Step2 from "./storytelling/Step2/step2";
import Step3 from "./storytelling/Step3/step3";
import Step4 from "./storytelling/Step4/Step4";
import Step5 from "./storytelling/Step5/step5";

export default function Onboard() {
  return (
    <div className="w-full m-0 p-0">
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
      <Step5 />
    </div>
  );
}
