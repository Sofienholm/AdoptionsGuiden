import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import arrow from "./frames/arrow.svg";
import { matchDogs } from "../../utils/matchDogs";
import { useQuiz } from "../quiz/components/useQuiz";

import { getDogs } from "../../services/getDogs.js";

export default function MatchDogs() {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useQuiz();

  useEffect(() => {
        async function loadDogs() {
          const allDogs = await getDogs();            // hent ALLE hunde
          const matched = await matchDogs(userProfile, allDogs); // beregn matchscore
          const top3 = matched.slice(0, 3);            // tag kun top 3
          setDogs(top3);
          setLoading(false);
        }
        loadDogs();
      }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--soft-linen-hex)] flex items-center justify-center text-2xl font-knewave text-[var(--molten-lava-hex)]">
        Henter hunde…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--soft-linen-hex)] px-6 py-10 md:px-16 lg:px-32 relative">

      {/* BACK ARROW */}
      <button
        onClick={() => navigate("/result/why")}
        className="absolute left-6 top-6 hover:scale-105 transition-transform"
      >
        <img src={arrow} alt="Tilbage"  className="lg:w-26 md:w-20 w-20 ml-6 mt-6 rotate-180"  />
      </button>

      {/* TITLE */}
      <h1 className="font-knewave text-[var(--molten-lava-hex)] text-4xl md:text-8xl text-center mb-14 mt-14">
        DINE MATCHES
      </h1>

      {/* DOG CARDS WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-3  place-items-center">

        {dogs.map((dog) => (
          <div
            key={dog.id}
            className="
              w-[260px] h-[430px]
              bg-[var(--lys-beige-hex)] rounded-[30px] border-1 border-[var(--molten-lava-hex)]
              flex flex-col overflow-hidden shadow-md
            "
          >
            {/* IMAGE */}
            <div className="h-[70%] w-full">
              <img
                src={dog.imageUrl}
                alt={dog.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TEXT SECTION */}
            <div className="h-[30%] flex flex-col justify-between p-4 text-center">

              {/* NAME */}
              <div className="h-13">
                <p className="font-knewave text-[var(--charcoal-brown-hex)] text-3xl uppercase">
                  {dog.name} <span className="text-[var(--tomato-hex)] text-sm opacity-70">GÅR</span>
                </p>
                <p className="font-hel-light text-[var(--molten-lava-hex)] text-sm mt-1">
                  {dog.race}
                </p>
              </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-5 text-sm font-knewave bg-[var(--molten-lava-hex)] h-50">
                <button
                  className=" text-white py-2 px-4 rounded-full hover:scale-105 transition"
                >
                  KONTAKT
                </button>

                <button
                  className=" text-white py-2 px-4 rounded-full hover:scale-105 transition"
                >
                  LÆS MERE
                </button>
              </div>
            </div>
          
        ))}

      </div>

      {/* "ALLE HUNDE" BUTTON */}
      <div className="mt-16 flex justify-end gap-5">
        <button
          className="
            font-knewave text-[var(--tomato-hex)] text-3xl
            hover:scale-110 transition-transform
          "
        >
          ALLE HUNDE 
        </button>
        <img src={arrow} alt="pil" className="lg:w-20 md:w-20 w-20 mr-3" />
      </div>
    </div>
  );
}
