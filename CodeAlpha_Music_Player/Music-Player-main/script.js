
const songs = [
    {
        title: "Song One",
        artist: "Artist One",
        src: "song1.mp3"
    },
    {
        title: "Song Two",
        artist: "Artist Two",
        src: "song2.mp3"
    },
    {
        title: "Song Three",
        artist: "Artist Three",
        src: "song3.mp3"
    }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let currentSong = 0;


// Load song
function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;

    displayPlaylist();
}


// Play song
function playSong() {

    audio.play()
        .then(() => {
            playBtn.textContent = "⏸";
        })
        .catch((error) => {
            console.log("Audio could not play:", error);
            alert("Music file could not be played. Check the songs folder and file name.");
        });
}


// Pause song
function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";
}


// Play/Pause
playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


// Next song
nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});


// Previous song
prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();

});


// Update progress bar
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progressPercent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

        currentTime.textContent =
            formatTime(audio.currentTime);
    }

});


// Show duration
audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// Change song position
progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }

});


// Volume
volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// Autoplay next song
audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

});


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return minutes + ":" +
        (seconds < 10 ? "0" : "") +
        seconds;
}


// Display playlist
function displayPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.textContent =
            song.title + " - " + song.artist;

        if (index === currentSong) {
            li.classList.add("active");
        }

        li.addEventListener("click", () => {

            loadSong(index);
            playSong();

        });

        playlist.appendChild(li);

    });

}


// Load first song
loadSong(0);
