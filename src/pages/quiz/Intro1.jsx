import { useNavigate } from "react-router";
import matchText from "./frames/MATCH-QUIZEN.svg";
import DB from "./frames/db.svg";

export default function Intro1() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F6F0E8] flex flex-col items-center justify-center px-6 text-center gap-8.5">
    {/* DYRENES BESKYTTELSE logo/tekst */}
    <img 
      src={DB}  
      alt=""
      className="w-40 md:w-56 lg:w-74 object-contain"
    />

    {/* MATCH QUIZEN tekst */}
    <img 
      src={matchText}
      alt=""
      className="w-4/5 md:w-[70%] lg:w-[55%] object-contain"
    />
      {/* Button */}
      <button
        onClick={() => navigate("/quiz/info")}
        className="fixed bottom-10 right-10 bg-[#ff4f39ff] text-white font-knewave  font-bold w-28 h-28 rounded-full md:w-32 md:h-32 flex items-center justify-center text-lg md:text-xl shadow-lg hover:scale-105 transition-transform"
      >
        FIND DIT MATCH
      </button>
    </div>
  );
}
