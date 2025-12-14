// -- LANDINGPAGE --
// Første møde med løsningen
// Giver brugeren et valg af dyretype og starter flowet

import { Link } from "react-router";

// -- GRAFISKE ELEMENTER --
// SVG’er bruges for skarp grafik på tværs af skærmstørrelser
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
      style={{ backgroundColor: "var(--soft-linen)" }}
    >
      {/* -- OVERSKRIFT -- */}
      <img
        src={tekstIntro}
        alt="Adoption"
        className="
          w-[80%]
          sm:w-[60%]
          max-w-[700px]
          h-auto 
          mb-[3rem]
        "
      />

      {/* -- DYREVALG -- */}
      <div
        className="
          grid grid-cols-2 gap-10 mt-[3rem]
          sm:flex sm:flex-row sm:gap-10 sm:justify-center sm:items-center
        "
      >
        {/* -- HUND -- */}
        <Link
          to="/intro-ansvar"
          className="transition-transform duration-200 hover:scale-110 flex justify-center"
        >
          <img src={hundIcon} alt="Hund" className="w-[110px] h-auto" />
        </Link>

        {/* -- KAT (IKKE IMPLEMENTERET) -- */}
        <div className="opacity-40 pointer-events-none flex justify-center">
          <img src={katIcon} alt="Kat" className="w-[110px] h-auto" />
        </div>

        {/* -- KANIN (IKKE IMPLEMENTERET) -- */}
        <div className="opacity-40 pointer-events-none flex justify-center">
          <img src={kaninIcon} alt="Kanin" className="w-[110px] h-auto" />
        </div>

        {/* -- MARSVIN (IKKE IMPLEMENTERET) -- */}
        <div className="opacity-40 pointer-events-none flex justify-center">
          <img src={marsvinIcon} alt="Marsvin" className="w-[110px] h-auto" />
        </div>
      </div>
    </div>
  );
}
