// src/pages/application/AdoptionApplicationForm.jsx
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { getDogs } from "../../services/getDogs";
import arrow from "../../pages/match/frames/arrow.svg";

const QUESTIONS = [
  {
    id: "everyday",
    title: "Beskriv din hverdag",
    helper:
      "Fortæl om dit aktivitetsniveau, arbejdstider, fritid, rutiner osv.",
  },
  {
    id: "offer",
    title: "Hvad kan du tilbyde?",
    helper:
      "Hvordan ville du aktivere hunden mentalt? Har du erfaring med træning eller særlige racer? Hvordan vil du skabe tryghed i den første tid?",
  },
  {
    id: "expectations",
    title: "Hvilke forventninger har du til hunden?",
    helper: "",
  },
  {
    id: "environment",
    title: "Er der noget særligt, vi skal vide om dine omgivelser?",
    helper: "",
  },
  {
    id: "whyThisDog",
    title: "Hvorfor lige denne hund?",
    helper:
      "Hvad ved du om hundens behov, og hvorfor tror du, I passer sammen?",
  },
];

export default function AdoptionApplicationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  // Firestore data
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modtag data fra /application navigation
  const preselectedDogId = location.state?.dogId || "";
  const behaviorProfile = location.state?.behaviorProfile || null;

  // Form state
  const [selectedDogId, setSelectedDogId] = useState(preselectedDogId);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [answers, setAnswers] = useState(
    QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {})
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const MIN_CHARS = 300;

  // 🔥 Hent hunde fra Firestore
  useEffect(() => {
    async function load() {
      const result = await getDogs();
      setDogs(result);
      setLoading(false);
    }
    load();
  }, []);

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // Den valgte hund (rigtige data)
  const selectedDog = useMemo(
    () => dogs.find((d) => String(d.id) === String(selectedDogId)),
    [dogs, selectedDogId]
  );

  const allLongAnswersValid = useMemo(
    () => QUESTIONS.every((q) => answers[q.id].trim().length >= MIN_CHARS),
    [answers]
  );

  const basicFieldsValid =
    fullName.trim() &&
    phone.trim() &&
    email.trim() &&
    address.trim() &&
    selectedDogId;

  const isFormValid = basicFieldsValid && allLongAnswersValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Ansøgning sendt:", {
      selectedDog,
      fullName,
      phone,
      email,
      address,
      answers,
      behaviorProfile,
    });

    alert("Tak for din ansøgning! Vi kontakter dig hurtigst muligt.");
  };

  // 🔄 Loader visning
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-molten text-2xl font-knewave">
        Henter hunde…
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex justify-center px-4 py-10 sm:py-14"
      style={{ backgroundColor: "var(--soft-linen)" }}
    >
            {/* BACK ARROW */}
            <button
        onClick={() => navigate("/dog-matches")}
        className="absolute left-6 top-6 hover:scale-105 transition-transform"
      >
        <img
          src={arrow}
          alt="Tilbage"
          className="lg:w-26 md:w-20 w-20 ml-6 mt-6 rotate-180"
        />
      </button>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl space-y-12 font-hel-light"
      >
        {/* Titel */}
        <header className="text-center space-y-6 mb-12 sm:mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight font-knewave text-molten">
            ANSØGNINGSFORMULAR
          </h1>

          {/* Hunden du ansøger på */}
          <div className="space-y-4">
            <p className="text-lg sm:text-xl font-semibold font-knewave text-molten">
              HUNDEN DU ANSØGER PÅ:
            </p>

            <div className="flex justify-center">
              <select
                value={selectedDogId}
                onChange={(e) => setSelectedDogId(e.target.value)}
                className="
                  w-60 sm:w-72 px-4 py-3
                  rounded-full shadow-md
                  bg-[#ffd0c9] text-molten
                  text-sm sm:text-base
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-[#ff6b5a]
                  appearance-none
                "
              >
                <option value="">Vælg hund</option>

                {dogs.map((dog) => (
                  <option key={dog.id} value={dog.id}>
                    {dog.name},{" "}
                    {dog.ageYears
                      ? `${dog.ageYears} år`
                      : dog.ageWeeks
                      ? `${dog.ageWeeks} uger`
                      : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Dine oplysninger */}
        <section className="space-y-6 mb-10 sm:mb-14">
          <h2 className="text-center text-2xl sm:text-3xl font-knewave text-molten">
            DINE OPLYSNINGER
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fulde navn */}
            <div className="space-y-2">
              <label className="block text-sm text-[#c3362b] text-center md:text-left">
                Fulde navn
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#ffd0c9] text-molten shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b5a]"
              />
            </div>

            {/* Tlf nr */}
            <div className="space-y-2">
              <label className="block text-sm text-[#c3362b] text-center md:text-left">
                tlf. nr.
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#ffd0c9] text-molten shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b5a]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm text-[#c3362b] text-center md:text-left">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#ffd0c9] text-molten shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b5a]"
              />
            </div>

            {/* Adresse */}
            <div className="space-y-2">
              <label className="block text-sm text-[#c3362b] text-center md:text-left">
                Adresse
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#ffd0c9] text-molten shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b5a]"
              />
            </div>
          </div>
        </section>

        {/* Din hverdag & rammer */}
        <section className="space-y-10">
          <h2 className="text-center text-2xl sm:text-3xl font-knewave text-molten">
            DIN HVERDAG & RAMMER
          </h2>

          {QUESTIONS.map((q) => {
            const length = answers[q.id].trim().length;
            const tooShort = length < MIN_CHARS;

            return (
              <div key={q.id} className="space-y-3">
                <div className="text-center space-y-1">
                  <h3 className="text-lg sm:text-xl text-molten">{q.title}</h3>
                  {q.helper && (
                    <p className="text-xs sm:text-sm text-[#ff6b5a]">
                      {q.helper}
                    </p>
                  )}
                </div>

                <div className="max-w-4xl mx-auto">
                  <textarea
                    value={answers[q.id]}
                    onChange={(e) =>
                      handleAnswerChange(q.id, e.target.value)
                    }
                    minLength={MIN_CHARS}
                    className="
                      w-full min-h-[160px] sm:min-h-[200px]
                      px-5 py-4
                      rounded-3xl bg-[#ffd0c9] text-molten
                      shadow-sm resize-vertical
                      focus:outline-none focus:ring-2 focus:ring-[#ff6b5a]
                    "
                  />
                  <div className="mt-2 text-right text-xs sm:text-sm">
                    <span
                      className={tooShort ? "text-[#ff6b5a]" : "text-molten"}
                    >
                      {length} / {MIN_CHARS} tegn
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Adfærdsprofil */}
        <section className="space-y-8">
          <p className="text-center text-sm sm:text-base text-[#ff6b5a] max-w-3xl mx-auto">
            Denne profil bliver sendt med din ansøgning. Det hjælper internatet
            med at forstå dine rammer.
          </p>

          {/* Fold-ud — LUKKET */}
          <button
            type="button"
            onClick={() => setIsProfileOpen((v) => !v)}
            className="
              w-full max-w-4xl mx-auto
              flex items-center justify-between
              px-8 py-6 sm:px-10 sm:py-7
              rounded-[2.5rem] bg-[#ffd0c9] shadow-sm
              mb-0
            "
          >
            <div>
              <p className="text-xl sm:text-2xl font-knewave text-molten">
                DIT RESULTAT – ADFÆRDSPROFIL
              </p>
              <p className="mt-1 text-sm sm:text-base font-knewave text-[#ff6b5a]">
                DU PASSER BEDST TIL EN {behaviorProfile?.label?.toUpperCase() || ""}
                , DER:
              </p>
            </div>

            <span className="text-2xl sm:text-3xl text-[#ff6b5a]">
              {isProfileOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* ÅBEN SEKTION */}
          {isProfileOpen && (
            <div
              className="
                w-full max-w-4xl mx-auto
                bg-[#ffd0c9]
                rounded-b-2xl
                -mt-8 p-8 pb-10
                text-molten text-sm sm:text-base
              "
            >
              {/* --- BESKRIVELSE --- */}
              {behaviorProfile?.description && (
                <ul className="space-y-4 mb-8">
                  {behaviorProfile.description.map((line, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-[#ff6b5a] leading-relaxed"
                    >
                      <span>•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Separator */}
              <hr className="border-[#8B1D14] opacity-40 my-6" />

              {/* --- HVORFOR NETOP DENNE PROFIL --- */}
              {behaviorProfile?.why && (
                <ul className="space-y-4">
                  {behaviorProfile.why.map((line, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-[#ff6b5a] leading-relaxed"
                    >
                      <span>•</span>
                      <span dangerouslySetInnerHTML={{ __html: line }} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`
                px-10 sm:px-16 py-4 sm:py-5
                rounded-[2.5rem]
                text-lg sm:text-xl font-knewave
                bg-[#ffd0c9] text-molten
                shadow-md transition
                ${
                  isFormValid
                    ? "hover:scale-105 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }
              `}
            >
              SEND ANSØGNING
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
