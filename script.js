let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());  // Corrected here
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    
    if (message.includes("hello") || message.includes("Hi")) {
        speak("Hello Sir, how can I assist today?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Ravi Kumar.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open chatgpt")) {
        speak("Opening ChatGPT...");
        window.open("https://chatgpt.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        // Open an online calculator since desktop access is not possible from web
        window.open("https://www.online-calculator.com/full-screen-calculator/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The current time is ${time}`);
    } else if (message.includes("date")) {
        let Dt = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`The current date is ${Dt}`);
    } 
    // New Fallback: Response to any generic question
    else {
        let finalText = "This is what I found on the internet regarding " + message.replace("shifra", "").replace("shipra", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shipra", "").replace("shifra", "")}`, "_blank");
    }
}
