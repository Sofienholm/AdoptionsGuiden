//Import
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";

//Hooks
import { useQuiz } from "../quiz/components/useQuiz";

//Utils / services
import { matchDogs } from "../../utils/matchDogs";
import { getDogs } from "../../services/getDogs.js";

//Grafiske elementer
import arrow from "./frames/arrow.svg";

//Resultat/match hunde
//viser de tre hunde der matcher bedst med brugerens profil
export default function MatchDogs() {
  //Routing
  //bruges til at hoppe frem og tilbage i flowet
  const navigate = useNavigate();
  const location = useLocation();

  //Quiz state
  //samlet brugerprofil fra quizzen
  const { userProfile } = useQuiz();

  //View state
  //styrer hundedata, loading og popup
  const [dogs, setDogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  //Navigation state
  //adfærdsprofil sendt med fra forrige side
  const behaviorProfile = location.state?.behaviorProfile || null;

  //Hent hunde + match
  //henter alle hunde og finder top 3 matches
  useEffect(() => {
    async function loadDogs() {
      const allDogs = await getDogs();
      const matched = await matchDogs(userProfile, allDogs);
      const top3 = matched.slice(0, 3);
      setDogs(top3);
      setLoading(false);
    }

    loadDogs();
  }, []);

  //Loading
  //mens data bliver hentet og regnet igennem
  if (loading) {
    return <div className="min-h-screen bg-[var(--soft-linen-hex)] flex items-center justify-center text-2xl font-knewave text-[var(--molten-lava-hex)]">Henter hunde…</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--soft-linen-hex)] px-6 py-10 md:px-16 lg:px-32 relative">
      <button onClick={() => navigate("/result/why")} className="absolute left-6 top-6 hover:scale-105 transition-transform">
        <img src={arrow} alt="Tilbage" className="lg:w-26 md:w-20 w-20 ml-6 mt-6 rotate-180" />
      </button>

      <h1 className="font-knewave text-[var(--molten-lava-hex)] text-4xl md:text-8xl text-center mb-14 mt-14">DINE MATCHES</h1>

      <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3 place-items-center">
        {dogs.map((dog) => (
          <div
            key={dog.id}
            className="
              w-[85%] max-w-[300px] h-[420px] sm:w-[260px]
              bg-[var(--lys-beige-hex)] rounded-[30px]
              border-1 border-[var(--molten-lava-hex)]
              flex flex-col overflow-hidden shadow-md
            "
          >
            <div className="h-[70%] w-full">
              <img src={dog.imageUrl} alt={dog.name} className="w-full h-full object-cover" />
            </div>

            <div className="h-[30%] flex flex-col justify-between p-4 text-center">
              <div className="h-13">
                <p className="font-knewave text-[var(--charcoal-brown-hex)] text-3xl uppercase">
                  {dog.name}
                  <span className="text-[var(--tomato-hex)] text-sm opacity-70"> {dog.ageYears ? `${dog.ageYears} år` : dog.ageWeeks ? `${dog.ageWeeks} uger` : ""}</span>
                </p>
                <p className="font-hel-light text-[var(--molten-lava-hex)] text-sm mt-1">{dog.race}</p>
              </div>
            </div>

            <div className="flex justify-center gap-5 text-sm font-knewave bg-[var(--molten-lava-hex)] h-50">
              <button
                onClick={() =>
                  navigate("/application", {
                    state: {
                      dogId: dog.id,
                      behaviorProfile: behaviorProfile,
                    },
                  })
                }
                className="text-white py-2 px-4 rounded-full hover:scale-105 transition"
              >
                KONTAKT
              </button>

              <button onClick={() => window.open(dog.profileUrl, "_blank")} className="text-white py-2 px-4 rounded-full hover:scale-105 transition">
                LÆS MERE
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-end gap-5">
        <button
          onClick={() => setShowPopup(true)}
          className="
            font-knewave text-[var(--tomato-hex)] text-3xl
            hover:scale-110 transition-transform
          "
        >
          ALLE HUNDE
        </button>
        <img src={arrow} alt="pil" className="lg:w-20 md:w-20 w-20 mr-3" />
      </div>

      {showPopup && (
        <div
          className="
            fixed inset-0
            bg-[#F6F0E8]/40
            backdrop-blur-sm
            flex items-center justify-center
            z-50
          "
        >
          <div
            className="
              bg-[var(--soft-linen-hex)]
              rounded-3xl
              shadow-xl
              p-8
              w-[90%] max-w-md
              text-center
            "
          >
            <p className="font-hel-light text-lg text-[var(--molten-lava-hex)] mb-8">
              Er du sikker på, at du vil forlade siden?
              <br />
              Din adfærdsprofil forsvinder.
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowPopup(false)}
                className="
                  px-6 py-2 rounded-full
                  bg-[#ffd0c9] text-[var(--molten-lava-hex)]
                  font-knewave hover:scale-105 transition
                "
              >
                FORTRYD
              </button>

              <button
                onClick={() => window.open("https://www.dyrenesbeskyttelse.dk/adopter-et-dyr?species[1140]=1140", "_blank")}
                className="
                  px-6 py-2 rounded-full
                  bg-[var(--tomato-hex)] text-white
                  font-knewave hover:scale-105 transition
                "
              >
                FORTSÆT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
