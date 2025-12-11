// Beregn matchscore for én hund
function calculateMatchScore(user, dog) {
  let score = 0;

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

// userProfile = objekt med 8 felter
// dogs = array af hunde (fra Firestore via getDogs)
export function matchDogs(userProfile, dogs) {
  const matches = dogs.map((dog) => {
    const score = calculateMatchScore(userProfile, dog);

    return {
      ...dog,
      matchScore: score,
    };
  });

  // Sortér bedste match først
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
