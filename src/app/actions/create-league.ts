'use server'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

export async function createLeague(formData: FormData) {
  const leagueData = {
    leagueName: formData.get('leagueName') as string,
    paidFor: parseInt(formData.get('paidFor') as string),
    money: formData.get('money') === 'on',
    free: formData.get('free') === 'on',
    active: formData.get('active') === 'on',
    password: formData.get('password') as string,
    speads: formData.get('speads') === 'on',
    doubleEnabled: formData.get('doubleEnabled') === 'on',
    entryFee: parseFloat(formData.get('entryFee') as string),
    weeklyFee: parseFloat(formData.get('weeklyFee') as string),
    firstPlacePercent: parseFloat(formData.get('firstPlacePercent') as string),
    secondPlacePercent: parseFloat(formData.get('secondPlacePercent') as string),
    thirdPlacePercent: parseFloat(formData.get('thirdPlacePercent') as string),
    fourthPlacePercent: parseFloat(formData.get('fourthPlacePercent') as string),
    fifthPlacePercent: parseFloat(formData.get('fifthPlacePercent') as string),
    doubleType: parseInt(formData.get('doubleType') as string),
    banker: formData.get('banker') === 'on',
    season: formData.get('season') as string,
    adminId: formData.get('adminId') as string,
  };

  try {
    const docRef = await addDoc(collection(db, "leagues"), leagueData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: 'Failed to create league' };
  }
}