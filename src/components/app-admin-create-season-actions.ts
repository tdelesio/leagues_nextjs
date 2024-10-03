'use client'

'use server'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, DocumentData } from "firebase/firestore";

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

// Define the Season type
export interface Season {
  id: string;
  superBowlNumber: number;
  leagueType: number;
}

export async function createSeason(formData: FormData) {
  const seasonData = {
    superBowlNumber: parseInt(formData.get('superBowlNumber') as string),
    leagueType: parseInt(formData.get('leagueType') as string),
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
    const seasonList = seasonSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Season));
    return seasonList;
  } catch (error) {
    console.error("Error fetching seasons: ", error);
    return [];
  }
}