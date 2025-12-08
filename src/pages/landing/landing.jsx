// landingpage.jsx
import { Link } from "react-router"; // brugt som i dit eksempel

// Import billeder
import tekstIntro from "./frames/tekst1_intro.svg";
import hundIcon from "./frames/hundikon_intro.svg";
import katIcon from "./frames/katikon_intro.svg";
import kaninIcon from "./frames/kaninikon_intro.svg";
import marsvinIcon from "./frames/marsvinikon_intro.svg";

export default function LandingPage() {
  return (
    <div
      className="
        w-full min-h-screen 
        flex flex-col items-center justify-center 
        px-5 py-10
      "
      style={{ backgroundColor: 'var(--soft-linen)' }}
    >
      {/* Overskrift */}
      <img
        src={tekstIntro}
        alt="Adoption"
        className="w-[60%] max-w-[500px] h-auto mb-[3rem]"  // ← mere luft her
      />

      {/* Ikon-række */}
      <div className="flex gap-10 justify-center items-center mt-[1´0.rem]">       {/* ← og her */}
        {/* HUND — eneste der kan klikkes */}
        <Link
          to="/onboarding"
          className="transition-transform duration-200 hover:scale-110"
        >
          <img
            src={hundIcon}
            alt="Hund"
            className="w-[110px] h-auto"
          />
        </Link>

        {/* De andre er ikke klikbare */}
        <div className="opacity-40 pointer-events-none">
          <img
            src={katIcon}
            alt="Kat"
            className="w-[110px] h-auto"
          />
        </div>

        <div className="opacity-40 pointer-events-none">
          <img
            src={kaninIcon}
            alt="Kanin"
            className="w-[110px] h-auto"
          />
        </div>

        <div className="opacity-40 pointer-events-none">
          <img
            src={marsvinIcon}
            alt="Marsvin"
            className="w-[110px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
