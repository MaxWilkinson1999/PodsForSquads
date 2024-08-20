import { uploadVideo } from './FirebaseConfig.js';

async function submitForm(event) {
    event.preventDefault();

    const videoFile = document.getElementById('videoUpload').files[0];
    const publisher = document.getElementById('publisher').value;
    const description = document.getElementById('description').value;

    if (!videoFile || !publisher || !description) {
        alert('Please fill out all fields.');
        return;
    }

    try {
        const videoURL = await uploadVideo(videoFile);
        const videoDisplay = document.getElementById('videoDisplay');
        videoDisplay.innerHTML = `
            <h2>Submitted Video Details:</h2>
            <p><strong>Publisher:</strong> ${publisher}</p>
            <p><strong>Description:</strong> ${description}</p>
            <video width="400" controls>
                <source src="${videoURL}" type="video/mp4">
                Your browser does not support HTML video.
            </video>
        `;

        document.getElementById('videoForm').reset();
        alert('Video uploaded successfully!');
    } catch (error) {
        console.error('Error during upload:', error);
        alert('Error during upload. Please try again.');
    }
}

document.getElementById('videoForm').addEventListener('submit', submitForm);
