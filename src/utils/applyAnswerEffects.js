export function applyAnswerEffects(currentProfile, effects) {
    const updatedProfile = { ...currentProfile };
  
    for (const key in effects) {
      updatedProfile[key] += effects[key];
    }
  
    return updatedProfile;
  }
  