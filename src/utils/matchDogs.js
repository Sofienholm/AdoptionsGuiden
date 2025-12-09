// userProfile = objekt med 8 felter
// dog = et hunde-dokument fra Firestore

function calculateMatchScore(user, dog) {
    let score = 0;
  
    // environmentNeed → hvor meget ro/plads hunden har brug for
    score += 10 - Math.abs(user.environment - dog.environmentNeed);
  
    // goodWithKids
    score += 10 - Math.abs(user.kids - dog.goodWithKids);
  
    // otherPets
    score += 10 - Math.abs(user.otherPets - dog.goodWithOtherPets);
  
    // aloneTolerance
    score += 10 - Math.abs(user.aloneTolerance - dog.aloneTolerance);
  
    // energy
    score += 10 - Math.abs(user.activity - dog.energy);
  
    // experience
    score += 10 - Math.abs(user.experience - dog.experienceNeeded);
  
    // challenge comfort
    score += 10 - Math.abs(user.challengeComfort - dog.challengeLevel);
  
    // intro style
    score += 10 - Math.abs(user.introStyle - dog.introNeed);
  
    return score;
  }
  
  export async function matchDogs(userProfile, firestore) {
    const dogsRef = firestore.collection("dogs");
    const snapshot = await dogsRef.get();
  
    const matches = [];
  
    snapshot.forEach(doc => {
      const dog = doc.data();
      const score = calculateMatchScore(userProfile, dog);
  
      matches.push({
        id: doc.id,
        ...dog,
        matchScore: score
      });
    });
  
    // Sortér så bedste match står først
    matches.sort((a, b) => b.matchScore - a.matchScore);
  
    return matches;
  }
  