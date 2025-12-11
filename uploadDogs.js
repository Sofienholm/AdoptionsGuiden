import { readFileSync } from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account
const serviceAccount = JSON.parse(
  readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf8")
);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function uploadDogs() {
  const dogs = JSON.parse(
    readFileSync(path.join(__dirname, "dogs.json"), "utf8")
  );

  for (const dog of dogs) {
    const docId = dog.id || dog.name.toLowerCase().replace(/\s+/g, "-");
    const { id, ...dogData } = dog;

    await db.collection("dogs").doc(docId).set(dogData);
    console.log("Uploaded:", docId);
  }

  console.log("All dogs uploaded.");
}

uploadDogs().catch((error) => {
  console.error("Upload error:", error);
});
