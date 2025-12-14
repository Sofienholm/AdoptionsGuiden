// -- ADFÆRDSPROFIL SELECTOR --
// finder hvilken overordnet adfærdsprofil brugeren passer bedst til
// baseret på de samlede quiz-svar

export function selectAdfaerdsprofil(user) {
  // -- PROFIL DATA --
  // trækker de værdier ud vi bruger til vurderingen
  const {
    activity,
    experience,
    challengeComfort,
    introStyle,
    environment,
    kids,
    otherPets
  } = user;

  // -- AFLEDTE VURDERINGER --
  // små helpers så reglerne er nemmere at læse
  const isSensitiveHome = environment <= 4;
  const hasSimpleHousehold = kids === 0 && otherPets === 0;
  const lowEnergy = activity <= 4;
  const highEnergy = activity >= 7;

  // -- PROFIL 1: SENSITIVE & STABLE --
  // rolige rammer, lav energi og nogen erfaring
  if (
    isSensitiveHome &&
    lowEnergy &&
    experience >= 4 &&
    introStyle >= 4 &&
    challengeComfort <= 5
  ) {
    return "sensitive_stable";
  }

  // -- PROFIL 2: SOCIAL & MILD --
  // ret bred profil med middel aktivitet og få krav
  if (
    activity >= 3 &&
    activity <= 7 &&
    experience <= 6 &&
    challengeComfort <= 6 &&
    introStyle >= 4
  ) {
    return "social_mild";
  }

  // -- PROFIL 3: AKTIV & ROBUST --
  // høj energi og ejere der kan håndtere udfordringer
  if (
    highEnergy &&
    challengeComfort >= 5 &&
    experience >= 5
  ) {
    return "active_robust";
  }

  // -- PROFIL 4: UNG & TRÆNINGSKRÆVENDE --
  // meget energi men mindre erfaring eller struktur
  if (
    highEnergy &&
    (experience < 5 || introStyle < 5) &&
    challengeComfort >= 4
  ) {
    return "young_training";
  }

  // -- PROFIL 5: CALM SENIOR --
  // lav energi og stabile rammer
  if (
    lowEnergy &&
    introStyle >= 4 &&
    experience >= 2
  ) {
    return "calm_senior";
  }

  // -- PROFIL 6: SPECIAL NEEDS --
  // kræver simple rammer og ekstra opmærksomhed
  if (
    challengeComfort <= 4 &&
    introStyle <= 4 &&
    hasSimpleHousehold
  ) {
    return "special_needs";
  }

  // -- FALLBACK --
  // hvis ingen regler matcher helt, lander vi her
  return "social_mild";
}
