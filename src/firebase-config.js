import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// firestore
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
 apiKey: "AIzaSyCRX4fYbDGtkIYdFKXYAJVvjIdbu9rixXQ",
authDomain: "projekat1-8acde.firebaseapp.com",
projectId: "projekat1-8acde",
storageBucket: "projekat1-8acde.appspot.com",
messagingSenderId: "241776233603",
appId: "1:241776233603:web:2f923d3610d0846d839fb6",
measurementId: "G-T65ETFFKEY"
};



//prva verzija sa drugog mejla
// apiKey: "AIzaSyC3o4axZUzmYYQBpcx5EOw28KgkdZhXRiA",
// authDomain: "projekat1-baa31.firebaseapp.com",
// projectId: "projekat1-baa31",
// storageBucket: "projekat1-baa31.appspot.com",
// messagingSenderId: "971426282347",
// appId: "1:971426282347:web:d07b99c5b689a511d9ea2e",
// measurementId: "G-LGK5LQ378E"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()