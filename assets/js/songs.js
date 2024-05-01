/*MUSIC PLAYER*/

// media controllers
const playPause = document.querySelector("#play-stop");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");

// record player animation
const circleBig = document.querySelector("#circle-bg");
const circleSm = document.querySelector("#circle-sm");

// playing song
const songName = document.querySelector("#song-name");
const audio = document.querySelector("#audio");
const coverArt = document.querySelector("#cover");
const musicbox = document.querySelector("#musicbox");

// control button images
let playImg = "./assets/image/play.svg";
let pauseImg = "./assets/image/pause.svg";

// default controls
playPause.src = playImg;
let isPlaying = true;

const songList = [
    {
        name: "3.33 - Nkari Mej resample",
        source: "./assets/music/3.33 - Nkari Mej resample.mp3",
        cover: "./assets/image/maxresdefault.jpg"
    },
    {
        name: "3.33 - 3000",
        source: "./assets/music/3.33 - 3000.mp3",
        cover: "./assets/image/artworks.jpg"
    },
    {
        name: "21 Savage, d4vd - Call Me Revenge",
        source: "./assets/music/21 Savage, d4vd - Call Me Revenge.mp3",
        cover: "./assets/image/21.jpg"
    },
    {
        name: "Can You Hear The Music",
        source: "./assets/music/Can You Hear The Music.mp3",
        cover: "./assets/image/IMG_0439.png"
    },
    {
        name: "gangsta paradise",
        source: "./assets/music/gangsta paradise.mp3",
        cover: "./assets/image/Gangsta's_paradise.jpg"
    },
    {
        name: "Destroyer Of Worlds",
        source: "./assets/music/Destroyer Of Worlds.mp3",
        cover: "./assets/image/maxresdefault (1).jpg"
    },
    {
        name: "Kendrick Lamar - DNA",
        source: "./assets/music/Kendrick Lamar - DNA.mp3",
        cover: "./assets/image/artworks-stCstjPh6NhW-0-t500x500.jpg"
    },
    {
        name: "Mr.Kitty - After Dark",
        source: "./assets/music/Mr.Kitty - After Dark.mp3",
        cover: "./assets/image/MV5BZWVj.jpg"
    },
    {
        name: "Travel Love Beats",
        source: "./assets/music/Travel Love Beats.mp3",
        cover: "./assets/image/chillhop.jpg"
    },
    {
        name: "Night Sky Unreated",
        source: "./assets/music/Night Sky.mp3",
        cover: "./assets/image/chillhop-2.jpg"
    },
    {
        name: "Be a Music",
        source: "./assets/music/Be a Music.mp3",
        cover: "./assets/image/chillhop-3.jpg"
    },
    {
        name: "Slow Day",
        source: "./assets/music/Slow Day.mp3",
        cover: "./assets/image/chillhop-4.jpg"
    },
    {
        name: "Carti Mangolia",
        source: "./assets/music/Carti mangolia.mp3",
        cover: "./assets/image/chillhop-2.jpg"
    }
];
// helper function
function createEle(ele) {
    return document.createElement(ele);
}
function append(parent, child) {
    return parent.append(child);
}
// creating track list
const ul = createEle('ul')
function createPlayList() {
    songList.forEach((song) => {
        let h3 = createEle('h3');
        let li = createEle('li');

        li.classList.add("track-item");
        h3.innerText = song.name;
        append(li,h3);
        append(ul,li)
    })
    append(musicbox, ul);
}

let songIndex = 0;
// preloaded song
loadMusic(songList[songIndex]);


function loadMusic() {
    coverArt.src = songList[songIndex].cover;
    songName.innerText = songList[songIndex].name;
    audio.src = songList[songIndex].source;
}

function playSong() {
    playPause.src = pauseImg;
    circleBig.classList.add("animate");
    circleSm.classList.add("animate");

    audio.play();
}

function pauseSong() {
    playPause.src = playImg;
    circleBig.classList.remove("animate");
    circleSm.classList.remove("animate");

    audio.pause();
}

function nextPlay() {
    songIndex++;
    if(songIndex > songList.length - 1) {
        songIndex = 0;
    }
    loadMusic(songList[songIndex]);
    playSong()
}

function backPlay() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songList.length - 1;
    }
    loadMusic(songList[songIndex]);
    playSong()
}
function playHandler() {
    isPlaying = !isPlaying;
    //console.log("Change: ",isPlaying)
    isPlaying ? pauseSong() : playSong();
}


// player event
playPause.addEventListener("click", playHandler);
backward.addEventListener("click", backPlay);
forward.addEventListener("click", nextPlay);

createPlayList()