// -- MATCHSCORE BEREGNING --
// regner en samlet score mellem bruger og hund
// jo tættere de ligger på hinanden, jo bedre match

function calculateMatchScore(user, dog) {
  let score = 0;

  // sammenligner alle værdier én for én
  // små forskelle giver flere point
  score += 10 - Math.abs(user.environment - dog.environmentNeed);
  score += 10 - Math.abs(user.kids - dog.goodWithKids);
  score += 10 - Math.abs(user.otherPets - dog.goodWithOtherPets);
  score += 10 - Math.abs(user.aloneTolerance - dog.aloneTolerance);
  score += 10 - Math.abs(user.activity - dog.energy);
  score += 10 - Math.abs(user.experience - dog.experienceNeeded);
  score += 10 - Math.abs(user.challengeComfort - dog.challengeLevel);
  score += 10 - Math.abs(user.introStyle - dog.introNeed);

  return score;
}

// -- MATCH HUNDE --
// tager brugerprofil og liste af hunde
// returnerer dem sorteret efter bedste match
export function matchDogs(userProfile, dogs) {
  // beregner score for hver hund
  const matches = dogs.map((dog) => {
    const score = calculateMatchScore(userProfile, dog);

    return {
      ...dog,
      matchScore: score,
    };
  });

  // sorterer så bedste match ligger først
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
