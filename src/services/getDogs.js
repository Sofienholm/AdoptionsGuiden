import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// -- HENT HUNDE --
// lille helper der henter alle hunde fra firestore
// bruges i match og resultatsider
export async function getDogs() {
  // reference til dogs collection
  const dogsRef = collection(db, "dogs");

  // henter alle dokumenter
  const snapshot = await getDocs(dogsRef);

  // mapper firestore docs til js objekter
  const dogs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return dogs;
}
