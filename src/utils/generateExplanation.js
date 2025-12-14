// -- RESULTATFORKLARINGSGENERATOR --
// laver forklarende tekst til resultatet
// bruges til at vise hvorfor matchningen giver mening

export function generateExplanation(user, profileId) {
  // samler alle forklaringer i en liste
  const reasons = [];

  // -- BOLIG / OMGIVELSER --
  if (user.environment <= 4) {
    reasons.push(
      "Du bor i omgivelser med begrænset stimuli, hvilket passer godt til hunde, der trives i rolige rammer."
    );
  } else if (user.environment >= 8) {
    reasons.push(
      "Dine rolige og rummelige omgivelser giver gode betingelser for hunde med høj energi eller sensitivitet."
    );
  }

  // -- BØRN --
  if (user.kids === 0) {
    reasons.push(
      "Du har ingen børn i hjemmet, hvilket gør introduktionen lettere for følsomme hunde."
    );
  } else if (user.kids >= 7) {
    reasons.push(
      "Du har mindre børn i hjemmet, så hunden skal være tryg, tålmodig og børnevenlig."
    );
  }

  // -- ANDRE DYR --
  if (user.otherPets === 0) {
    reasons.push(
      "Der er ingen andre dyr i hjemmet, hvilket giver hunden ro til at falde trygt til."
    );
  } else if (user.otherPets >= 6) {
    reasons.push(
      "Du har andre dyr i hjemmet, så hunden skal være social og kunne trives med dem."
    );
  }

  // -- ALENETID --
  if (user.aloneTolerance <= 3) {
    reasons.push(
      "Du har meget begrænset alenetid i hverdagen, hvilket passer godt til hunde med behov for nærhed."
    );
  } else if (user.aloneTolerance >= 7) {
    reasons.push(
      "Hunden vil kunne trives hos dig, fordi du har realistiske rammer for alenetid."
    );
  }

  // -- ERFARING --
  if (user.experience <= 3) {
    reasons.push(
      "Dit erfaringsniveau passer bedst til en hund uden store adfærdsmæssige udfordringer."
    );
  } else if (user.experience >= 7) {
    reasons.push(
      "Din hundeerfaring gør dig i stand til at støtte hunde med større trænings- eller adfærdsbehov."
    );
  }

  // -- AKTIVITET --
  if (user.activity <= 4) {
    reasons.push(
      "Dit aktivitetsniveau passer til hunde med lavt til moderat energi."
    );
  } else if (user.activity >= 8) {
    reasons.push(
      "Du har et højt aktivitetsniveau, som matcher hunde med masser af energi."
    );
  }

  // -- KOMFORT MED UDFORDRINGER --
  if (user.challengeComfort <= 3) {
    reasons.push(
      "Du ønsker en hund uden større udfordringer, hvilket guider matchningen mod stabile og rolige profiler."
    );
  } else if (user.challengeComfort >= 8) {
    reasons.push(
      "Du er komfortabel med hunde, der kræver ekstra træning, tålmodighed eller erfaring."
    );
  }

  // -- OPSTART --
  if (user.introStyle <= 3) {
    reasons.push(
      "Din ønskede rolige opstart passer godt til hunde, der har brug for struktur og tryghed i begyndelsen."
    );
  } else if (user.introStyle >= 8) {
    reasons.push(
      "Du er åben for mange nye oplevelser i starten, hvilket passer til robuste og nysgerrige hunde."
    );
  }

  // returneres direkte til resultatvisningen
  return reasons;
}
