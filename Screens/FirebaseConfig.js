import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVoIP81JWXonhwnvVrSdIEkaprBuLxvjQ",
    authDomain: "podsforsquads.firebaseapp.com",
    databaseURL: "https://podsforsquads-default-rtdb.firebaseio.com",
    projectId: "podsforsquads",
    storageBucket: "podsforsquads.appspot.com",
    messagingSenderId: "369944495856",
    appId: "1:369944495856:web:d2027932e60be6f17da435"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function savePodcastToFirestore(podcast) {
    try {
        const docRef = await addDoc(collection(db, "BBL Nick Podcasts"), podcast);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deletePodcastFromFirestore(podcastId) {
    try {
        const q = query(collection(db, "BBL Nick Podcasts"), where("id", "==", podcastId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(doc(db, "BBL Nick Podcasts", docSnapshot.id));
        });
        console.log("Podcast deleted from Firestore successfully.");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}
