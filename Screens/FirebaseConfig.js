
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);

export async function savePodcastToFirestore(podcast) {
    try {
        const docRef = await addDoc(collection(db, "BBL Patrick Podcasts"), podcast);
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

export async function uploadVideo(file, metadata) {
    try {
        console.log("Starting upload process...");
        const storageRef = ref(storage, `videos/${file.name}`);
        console.log("Reference created, uploading...");
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Upload complete, fetching URL...");
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Download URL obtained:", downloadURL);

        console.log("Preparing video data for Firestore...");
        const videoData = {
            videoURL: downloadURL,
            publisher: metadata.publisher,
            description: metadata.description,
            timestamp: new Date(),
        };

        console.log("Saving to Firestore...");
        const docRef = await addDoc(collection(db, 'videos'), videoData);
        console.log("Video metadata saved successfully with ID:", docRef.id);

        return downloadURL;
    } catch (error) {
        console.error("Caught error during process:", error);
        throw error; // Throw error to be caught by submitForm
    }
}
