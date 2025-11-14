import { uploadVideo } from './FirebaseConfig.js';



function submitForm(event) {
    event.preventDefault();
    alert("Video Upload Successfully. Please do not press anything this may take a few moments to load. If not loading fast, please press the Submit button again and wait a few more moments.");  // Check if this alert appears
    
    const videoFile = document.getElementById('videoUpload').files[0];
    const publisher = document.getElementById('publisher').value;
    const description = document.getElementById('description').value;

    if (!videoFile || !publisher || !description) {
        alert('Please fill out all fields.');
        return;
    }

    try {
        console.log("Starting video upload...");
        uploadVideo(videoFile, { publisher, description }).then((videoURL) => {
            console.log("Video uploaded successfully:", videoURL);

            // Redirect to HomeScreen.html after successful upload
            window.location.href = "HomeScreen.html";
        }).catch((error) => {
            console.error('Error during upload:', error);
            alert('Error during upload. Please try again.');
        });

    } catch (error) {
        console.error('Unexpected error during upload:', error);
        alert('Unexpected error during upload. Please try again.');
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('videoForm').addEventListener('submit', submitForm);
});
