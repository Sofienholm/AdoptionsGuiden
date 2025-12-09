// landingpage.jsx
import { Link } from "react-router";

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
      {/* Overskrift */}
      <img
        src={tekstIntro}
        alt="Adoption"
        className="
          w-[80%]         /* ⭐ større på mobil */
          sm:w-[60%]      /* ⭐ original størrelse fra sm og op */
          max-w-[700px]
          h-auto 
          mb-[3rem]
        "
      />

      {/* Ikon-række – GRID på mobil, FLEX på større */}
      <div
        className="
          grid grid-cols-2 gap-10 mt-[3rem]
          sm:flex sm:flex-row sm:gap-10 sm:justify-center sm:items-center
        "
      >
        {/* HUND — eneste der kan klikkes */}
        <Link
          to="/intro-ansvar"
          className="transition-transform duration-200 hover:scale-110 flex justify-center"
        >
          <img src={hundIcon} alt="Hund" className="w-[110px] h-auto" />
        </Link>

        {/* KAT */}
        <div className="opacity-40 pointer-events-none flex justify-center">
          <img src={katIcon} alt="Kat" className="w-[110px] h-auto" />
        </div>

        {/* KANIN */}
        <div className="opacity-40 pointer-events-none flex justify-center">
          <img src={kaninIcon} alt="Kanin" className="w-[110px] h-auto" />
        </div>

        {/* MARSVIN */}
        <div className="opacity-40 pointer-events-none flex justify-center">
          <img src={marsvinIcon} alt="Marsvin" className="w-[110px] h-auto" />
        </div>
      </div>
    </div>
  );
}
