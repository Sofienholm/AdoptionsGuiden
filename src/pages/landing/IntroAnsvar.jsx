// IntroAnsvar.jsx
import { Link } from "react-router";

import tekst2Intro from "./frames/tekst2_intro.svg";
import trykPåMigIcon from "./frames/trykpaamig_knap.svg";

export default function IntroAnsvar() {
  return (
    <div
      className="
        w-full min-h-screen
        flex items-center justify-center
        px-5 py-10
      "
      style={{ backgroundColor: "var(--soft-linen)" }}
    >
      {/* Stor grafik – rykket op */}
      <img
        src={tekst2Intro}
        alt="Klar til ansvar"
        className="
          w-11/12 
          md:w-4/5 
          h-auto
          mt-[-8rem]
        "
      />

      {/* Tryk-på-mig knap – nu korrekt link */}
      <Link
        to="/intro-3" 
        className="
          fixed 
          bottom-6 right-6
          sm:bottom-10 sm:right-10
          transition-transform duration-200 hover:scale-110
          z-50
        "
      >
        <img
          src={trykPåMigIcon}
          alt="Tryk på mig"
          className="
            w-16 
            sm:w-20 
            md:w-24 
            lg:w-28 
            h-auto
          "
        />
      </Link>
    </div>
  );
}
