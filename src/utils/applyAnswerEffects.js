// Answer effect handler
// lille helper der lægger et svar oven i brugerens nuværende profil

export function applyAnswerEffects(currentProfile, effects) {
  // laver en kopi så vi ikke muterer state direkte
  const updatedProfile = { ...currentProfile };

  // går alle effekter igennem og justerer værdierne
  for (const key in effects) {
    updatedProfile[key] += effects[key];
  }

  return updatedProfile;
}
