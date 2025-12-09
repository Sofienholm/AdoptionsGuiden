import { readFileSync } from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function uploadDogs() {
  const dogs = JSON.parse(readFileSync("./dogs.json", "utf8"));
  for (const dog of dogs) {
    const docId = dog.id || dog.name.toLowerCase().replace(/\s+/g, "-");
    const { id, ...dogData } = dog;
    await db.collection("dogs").doc(docId).set(dogData);
    console.log("Uploaded:", docId);
  }
  console.log("All dogs uploaded.");
}

uploadDogs().catch(error => {
  console.error("Upload error:", error);
});
