// src/components/UploadSelfie.js

import React, { useState } from 'react';
import axios from 'axios';

const UploadSelfie = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);

    // Access the camera and capture an image
    const captureImage = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            // Wait for the video to start playing
            await new Promise(resolve => video.onloadedmetadata = resolve);

            // Create a canvas to capture the image
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);

            // Stop the video stream
            stream.getTracks().forEach(track => track.stop());

            // Get the image data from the canvas
            const imageData = canvas.toDataURL('image/jpeg');
            setImageSrc(imageData);

            // Convert the image data URL to a Blob
            const blob = await (await fetch(imageData)).blob();
            setImageBlob(blob);
        } catch (error) {
            setError('Failed to access the camera.');
            console.error('Camera access error:', error.message);
        }
    };

    // Access the user's location
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`${latitude}, ${longitude}`);
            },
            (error) => {
                setError('Failed to get location.');
                console.error('Location error:', error.message);
            }
        );
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageBlob || !location) {
            setError('Image and location are required.');
            return;
        }

        const formData = new FormData();
        formData.append('file', imageBlob, 'selfie.jpg');
        formData.append('location', location);

        try {
            await axios.post('http://localhost:8000/api/upload-selfie/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Selfie uploaded successfully!');
        } catch (error) {
            setError('Failed to upload selfie.');
            console.error('Upload error:', error.message);
        }
    };

    return (
        <div>
            <h2>Upload Selfie</h2>
            <button onClick={captureImage}>Capture Selfie</button>
            <button onClick={getLocation}>Get Location</button>
            {imageSrc && <img src={imageSrc} alt="Selfie" style={{ width: '100%', maxWidth: '300px' }} />}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    readOnly
                    placeholder="Location will appear here"
                />
                <button type="submit">Upload</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default UploadSelfie;
