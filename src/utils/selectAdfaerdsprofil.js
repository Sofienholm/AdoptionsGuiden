export function selectAdfaerdsprofil(user) {
    const {
      activity,
      experience,
      challengeComfort,
      introStyle,
      environment,
      kids,
      otherPets
    } = user;
  
    // Udled simple kategorier
    const isSensitiveHome = environment <= 4; // lejlighed/rækkehus
    const hasSimpleHousehold = kids === 0 && otherPets === 0;
    const lowEnergy = activity <= 4;
    const highEnergy = activity >= 7;
  
    // 1️⃣ Sensitive & Stable (rolige rammer + moderat aktivitet)
    if (
      isSensitiveHome &&
      lowEnergy &&
      experience >= 4 &&
      introStyle >= 4 &&
      challengeComfort <= 5
    ) {
      return "sensitive_stable";
    }
  
    // 2️⃣ Social & Mild (nemme ejere, moderat aktivitet, fleksibel hund)
    if (
      activity >= 3 &&
      activity <= 7 &&
      experience <= 6 &&
      challengeComfort <= 6 &&
      introStyle >= 4
    ) {
      return "social_mild";
    }
  
    // 3️⃣ Aktiv & Robust (høj energi + ejere der kan håndtere udfordringer)
    if (
      highEnergy &&
      challengeComfort >= 5 &&
      experience >= 5
    ) {
      return "active_robust";
    }
  
    // 4️⃣ Ung & Træningskrævende (høj energi + lav erfaring eller lav introStyle)
    if (
      highEnergy &&
      (experience < 5 || introStyle < 5) &&
      challengeComfort >= 4
    ) {
      return "young_training";
    }
  
    // 5️⃣ Calm Senior (lav energi + rolige rammer)
    if (
      lowEnergy &&
      introStyle >= 4 &&
      experience >= 2
    ) {
      return "calm_senior";
    }
  
    // 6️⃣ Special Needs (høj sensitivitet + høje udfordringer)
    if (
      challengeComfort <= 4 &&
      introStyle <= 4 &&
      hasSimpleHousehold
    ) {
      return "special_needs";
    }
  
    // Fallback hvis der sker noget uforudset:
    return "social_mild";
  }
  