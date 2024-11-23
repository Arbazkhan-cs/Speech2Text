// Get references to the DOM elements
const startButton = document.getElementById('startButton');
const output = document.getElementById('output');

// Initialize the SpeechRecognition object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let finalTranscript = '';

// Event listener for the start button
startButton.addEventListener('click', () => {
    if (startButton.textContent === "START") {
        recognition.start();
        startButton.textContent = "STOP";
    } else {
        recognition.stop();
        startButton.textContent = "START";
    }
});

// Event listener for speech recognition results
recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');

    if (e.results[0].isFinal) {
        finalTranscript = transcript;
        output.textContent = finalTranscript;
    }
    console.log('Transcript:', transcript); // Log the transcript for debugging
});

// Event listener for the end of speech recognition
recognition.addEventListener('end', () => {
    if (startButton.textContent === "STOP") {
        recognition.start();
    }
});

// Event listener for the Escape key to stop speech recognition
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        recognition.stop();
        startButton.textContent = "START";
    }
});

// Log errors
recognition.addEventListener('error', (e) => {
    console.error('Speech recognition error:', e.error);
});