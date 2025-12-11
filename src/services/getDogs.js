import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getDogs() {
  const dogsRef = collection(db, "dogs");
  const snapshot = await getDocs(dogsRef);

  const dogs = snapshot.docs.map((doc) => ({
    id: doc.id,         // dokument ID
    ...doc.data(),      // alle felter i hunden
  }));

  return dogs;
}
