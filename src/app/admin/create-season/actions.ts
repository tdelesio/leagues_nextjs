'use server'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { Season } from '@/domains/league'

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createSeason(formData: FormData) {
  const seasonData: Omit<Season, 'id'> = {
    superBowlNumber: parseInt(formData.get('superBowlNumber') as string),
    leagueType: parseInt(formData.get('leagueType') as string),
    // Add any other properties required by the Season type
  };

  try {
    const docRef = await addDoc(collection(db, "seasons"), seasonData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: 'Failed to create season' };
  }
}

export async function getSeasons(): Promise<Season[]> {
  try {
    const seasonsCol = collection(db, 'seasons');
    const seasonSnapshot = await getDocs(seasonsCol);
    const seasonList: Season[] = seasonSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        superBowlNumber: data.superBowlNumber,
        leagueType: data.leagueType,
        // Add any other properties required by the Season type
        // If a property is missing in Firestore but required by Season type,
        // you may need to provide a default value or handle it appropriately
      } as Season;
    });
    return seasonList;
  } catch (error) {
    console.error("Error fetching seasons: ", error);
    return [];
  }
}