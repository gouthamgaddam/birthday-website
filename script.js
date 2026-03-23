function goToPage(num) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("page" + num).classList.add("active");
}

function startMusic() {
    const music = document.getElementById("bgMusic");
    
    // Reset the song to the start just in case
    music.currentTime = 0; 
    
    // Play the music and handle the "Promise"
    let playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            console.log("Music started successfully!");
        }).catch(error => {
            console.log("Playback prevented. Click the button again.");
        });
    }
}

setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}, 400);

document.addEventListener("DOMContentLoaded", () => {
    const sheets = document.querySelectorAll(".sheet");
    const book = document.getElementById("book");
    const finishBtn = document.getElementById("finishBtn");
    let currentSheetIdx = 0;

    sheets.forEach((sheet, idx) => {
        sheet.style.zIndex = sheets.length - idx;
    });

    book.addEventListener("click", (e) => {
        const rect = book.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX > rect.width / 2) {
            if (currentSheetIdx < sheets.length) {
                sheets[currentSheetIdx].classList.add("flipped");
                sheets[currentSheetIdx].style.zIndex = currentSheetIdx + 1;
                currentSheetIdx++;
            }
        } else {
            if (currentSheetIdx > 0) {
                currentSheetIdx--;
                sheets[currentSheetIdx].classList.remove("flipped");
                sheets[currentSheetIdx].style.zIndex = sheets.length - currentSheetIdx;
            }
        }

        finishBtn.style.display = (currentSheetIdx === sheets.length) ? "block" : "none";
    });
});

function toggleMute() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("musicToggle");
    
    if (music.muted) {
        music.muted = false;
        btn.innerHTML = "🔊";
    } else {
        music.muted = true;
        btn.innerHTML = "🔇";
    }
}

// Make sure to update your startMusic function to ensure it plays 
// when they click the first button
function startMusic() {
    const music = document.getElementById("bgMusic");
    music.play().catch(() => {
        console.log("Autoplay prevented by browser. Music will start on interaction.");
    });
}