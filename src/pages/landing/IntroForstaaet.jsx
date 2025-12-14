// -- INTRO · FORSTÅET --
// Anden side i intro-flowet
// Bekræfter brugerens forståelse før de går videre

import { Link } from "react-router";

// -- GRAFISKE ELEMENTER --
import tekst3Intro from "./frames/tekst3_intro.svg";
import forstaaetKnap from "./frames/forstået_knap.svg";

export default function IntroForstaaet() {
  return (
    <div
      className="
        w-full min-h-screen
        flex items-center justify-center
        px-5 py-10
      "
      style={{ backgroundColor: "var(--soft-linen)" }}
    >
      {/* -- INTRO TEKST -- */}
      <img
        src={tekst3Intro}
        alt="Intro tekst 3"
        className="
          w-11/12 
          sm:w-11/12 
          md:w-4/5 
          lg:w-3/5 
          h-auto
        "
      />

      {/* -- NAVIGATION -- */}
      <Link
        to="/intro-4"
        className="
          fixed 
          bottom-6 right-6
          sm:bottom-10 sm:right-10
          transition-transform duration-200 hover:scale-110
          z-50
        "
      >
        <img
          src={forstaaetKnap}
          alt="Forstået?"
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
