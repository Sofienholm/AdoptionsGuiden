import { useNavigate } from "react-router";
import arrow from "../../assets/arrow.svg";

export default function MatchDogs() {
  const navigate = useNavigate();

  // Midlertidig dummy data, indtil vi kobler Firestore på
  const dogs = [
    { id: "buster", name: "Buster", race: "Gravhund", imageUrl: "/placeholder1.jpg" },
    { id: "nala", name: "Nala", race: "Ulvehund", imageUrl: "/placeholder2.jpg" },
    { id: "holly", name: "Holly", race: "Schæfer/labrador", imageUrl: "/placeholder3.jpg" }
  ];

  return (
    <div className="min-h-screen bg-[var(--soft-linen-hex)] px-6 py-10 md:px-16 lg:px-32 relative">

      {/* BACK ARROW */}
      <button
        onClick={() => navigate("/result/why")}
        className="absolute left-6 top-6 hover:scale-105 transition-transform"
      >
        <img src={arrow} alt="Tilbage" className="w-10 md:w-12" />
      </button>

      {/* TITLE */}
      <h1 className="font-knewave text-[var(--molten-lava-hex)] text-4xl md:text-6xl text-center mb-14">
        DINE MATCHES
      </h1>

      {/* DOG CARDS WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 place-items-center">

        {dogs.map((dog) => (
          <div
            key={dog.id}
            className="
              w-[260px] h-[430px]
              bg-white rounded-[30px] border-4 border-[var(--molten-lava-hex)]
              flex flex-col overflow-hidden shadow-md
            "
          >
            {/* IMAGE */}
            <div className="h-[60%] w-full">
              <img
                src={dog.imageUrl}
                alt={dog.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TEXT SECTION */}
            <div className="h-[40%] flex flex-col justify-between p-4 text-center">

              {/* NAME */}
              <div>
                <p className="font-knewave text-[var(--charcoal-brown-hex)] text-2xl leading-tight">
                  {dog.name} <span className="text-[var(--tomato-hex)]">GÅR</span>
                </p>
                <p className="font-hel-light text-[var(--taupe-hex)] text-sm mt-1">
                  {dog.race}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between text-sm font-knewave">
                <button
                  className="bg-[var(--tomato-hex)] text-white py-2 px-4 rounded-full hover:scale-105 transition"
                >
                  KONTAKT
                </button>

                <button
                  className="bg-[var(--tomato-hex)] text-white py-2 px-4 rounded-full hover:scale-105 transition"
                >
                  LÆS MERE
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* "ALLE HUNDE" BUTTON */}
      <div className="mt-16 flex justify-end">
        <button
          className="
            font-knewave text-[var(--tomato-hex)] text-xl
            hover:scale-110 transition-transform
          "
        >
          ALLE HUNDE →
        </button>
      </div>
    </div>
  );
}
