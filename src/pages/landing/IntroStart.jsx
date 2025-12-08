// IntroStart.jsx
import { Link } from "react-router";

import tekst4Intro from "./frames/tekst4_intro.svg";
import illuBarIntro from "./frames/illu_bar_intro.svg";
import startKnap from "./frames/start_knap.svg";

export default function IntroStart() {
  return (
    <div
      className="
        w-full min-h-screen
        flex flex-col items-center justify-center
        px-5 py-10
      "
      style={{ backgroundColor: "var(--soft-linen)" }}
    >
      {/* Top grafik */}
      <img
        src={tekst4Intro}
        alt="Intro tekst 4"
        className="
          w-11/12 
          sm:w-10/12 
          md:w-4/5 
          lg:w-3/5 
          h-auto
          mb-0      /* ← INGEN AFSTAND */
        "
      />

      {/* Illustration bar – ligger direkte under */}
      <img
        src={illuBarIntro}
        alt="Illustration bar"
        className="
          w-10/12 
          sm:w-8/12 
          md:w-3/5 
          lg:w-2/5 
          h-auto
        "
      />

      {/* START – fixed i hjørnet */}
      <Link
        to="/onboard"
        className="
          fixed 
          bottom-6 right-6
          sm:bottom-10 sm:right-10
          transition-transform duration-200 hover:scale-110
          z-50
        "
      >
        <img
          src={startKnap}
          alt="Start"
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
