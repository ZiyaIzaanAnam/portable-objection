var audio = new Audio();
audio.preload = true;
var charvol = {
    cbt: [
        "igiari",
        "objection",
        "yiyi",
        "fandui",
        "matta",
        "kurae",
        "dengdeng",
        "kanzhege",
        "kanzhao",
        "holdit",
        "takethat",
    ],
    yuj: [
        "igiari",
        "objection",
        "yiyi",
        "fandui",
        "matta",
        "kurae",
        "holdit",
        "takethat",
    ],
    qian: [
        "igiari",
        "objection",
        "yiyi",
        "matta",
        "kurae",
        "holdit",
        "takethat",
    ],
    wang: [
        "igiari",
        "objection",
        "fandui",
        "matta",
        "kurae",
        "dengdeng",
        "kanzhege",
        "holdit",
        "takethat",
    ],
    xin: [
        "igiari",
        "objection",
        "fandui",
        "matta",
        "kurae",
        "dengdeng",
        "kanzhege",
        "holdit",
        "takethat",
    ],
    dhurke: [
    "igiari",
    "objection",
    "fandui",
    ],   
    ming: [
        "igiari",
        "objection",
        "yiyi"
    ],
    hao: [
        "igiari",
        "objection",
        "yiyi"],
    godo: [
        "igiari",
        "objection",
        "yiyi"
    ],
    xiang: [
        "igiari",
        "objection",
        "fandui"
    ],
    yanei: [
        "igiari",
        "objection",
        "yiyi",
        "fandui"
    ],
    xun: [
        "igiari",
        "damarinaa",
        "objection",
        "silence",
        "fandui",
        "bizui"
    ],
    nayuta: [
        "igiari",
        "satora-ja",
        "objection",
        "satorha",
        "fandui",
        "satora-cn"
    ],
    garan: [
        "igiari",
        "hirehuse",
        "objection",
        "insolence",
        "fandui",
        "guixia"
    ],
};
let amx = 0;
let amy = 0;
let amz = 0;

const accuracy = document.getElementById("lmd");
const testButton = document.getElementById("btn1");
const resetButton = document.getElementById("btn2");
const clearCacheButton = document.getElementById("btn3");
const character = document.getElementById("character");
const voiceType = document.getElementById("voicetype");
const autoMusic = document.getElementById("automusic");
const bilibiliLink = document.getElementById("bilibili");
const githubLink = document.getElementById("github");
const image = document.getElementById("img1");
const titleDiv = document.getElementById("title-div");
const audioPlayer = document.getElementById("9487616885");
const dashboard = document.getElementById("panel1");
const cacheOk = document.getElementById("cacheok");
const sensOk = document.getElementById("sensok");

var igiari_accuracy = localStorage.getItem("igiari_lmd") || 5;
accuracy.value = igiari_accuracy;
let msg = accuracy >= 20 ? "Hold the device firmly!" : "Place it flat on the table";
document.getElementById("lmdv").innerHTML = `[${Number(igiari_accuracy).toFixed(1)}]&nbsp;&nbsp;${msg}`;
var inob = false;
var selchar = localStorage.getItem("igiari_char") || "cbt";
if (selchar === "igiari") {
    selchar = "cbt";
    localStorage.setItem("igiari_char", "cbt");
}
var selvol = localStorage.getItem("igiari_vol") || "igiari";
document.getElementById("img1").src = "img/" + selvol + ".png";

character.value = selchar;
voiceType.value = selvol;
var automusic = false;
var touchtime = new Date().getTime();
var mousemode = false;
if (sessionStorage.getItem("igiari_hide") === "1" && !device.ios()) {
    titleDiv.classList.add("hide2");
    dashboard.classList.add("hide2");
    audioPlayer.classList.add("hide2");
} else {
    titleDiv.classList.remove("hide2");
    dashboard.classList.remove("hide2");
    audioPlayer.classList.remove("hide2");
}

try {
    for (ele of voiceType.options) {
        if (charvol[selchar].includes(ele.value)) {
            ele.disabled = false;
            ele.style.display = "block";
        } else {
            ele.disabled = true;
            ele.style.display = "none";
            if (voiceType.value === ele.value) {
                selvol = charvol[selchar][0];
            }
        }
    }
    localStorage.setItem("igiari_vol", selvol);
    voiceType.value = selvol;
    image.src = "img/" + selvol + ".png";
    cacheOk.innerHTML = "💬";
    let _filename = "sound/" + selchar + "/" + selvol + ".mp3";
    let _mp3Key = `cachedMP3_${_filename}`;
    let _cachedMP3 = localStorage.getItem(_mp3Key);
    if (_cachedMP3) {
        cacheOk.innerHTML = "✅";
    } else {
        downloadAndCacheMP3(filename);
    }
} catch (error) { console.warn(error); }
onload = function () {
    if (!device.mobile()) {
        document.getElementById(
            "title1"
        ).innerHTML += `<p>Desktop: click here <button id="btn4">Start</button> or press Ctrl+Shift+Z<p>`;
        document.getElementById("btn4").addEventListener("click", function () {
            if (checkIfVisible()) {
                if (!mousemode) {
                    this.innerHTML = "Stop";
                    window.mousemode = true;
                    document.body.addEventListener("mousemove", objection);
                } else {
                    this.innerHTML = "Start";
                    window.mousemode = false;
                    document.body.classList.remove("hidecur");
                    document.body.removeEventListener("mousemove", objection);
                }
            }
        });
    }
};

function downloadAndCacheMP3(filename, pl = false) {
    testButton.disabled = true;
    cacheOk.innerHTML = "🔄";
    fetch(filename)
        .then(response => {
            const contentType = response.headers.get('Content-Type');
            if (contentType && (contentType.startsWith('audio/mpeg') || contentType.startsWith('audio/mp3'))) {
                return response.blob();
            } else {
                cacheOk.innerHTML = "❌";
                testButton.disabled = false;
                setTimeout(function () {
                    alert("Audio failed to load, please refresh the page");
                }, 300);
            }
        })
        .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                const mp3Key = `cachedMP3_${filename}`;
                localStorage.setItem(mp3Key, base64data);
                console.log(`${filename} cached successfully.`);
                cacheOk.innerHTML = "✅";
                if (pl) {
                    audio.src = base64data;
                    audio.play();
                    cacheOk.innerHTML = "✅";
                }
                testButton.disabled = false;
            };
        })
        .catch((error) => {
            console.error(`Error caching ${filename}:`, error);
            testButton.disabled = false;
            setTimeout(function () {
                alert("Audio failed to load, please refresh the page");
            }, 300);
        });
}

function playMP3(filename) {
    let mp3Key = `cachedMP3_${filename}`;
    let cachedMP3 = localStorage.getItem(mp3Key);
    if (cachedMP3) {
        audio.src = cachedMP3;
        audio.play();
        cacheOk.innerHTML = "✅";
    } else {
        downloadAndCacheMP3(filename, true);
    }
}

function clearAudioCache() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('cachedMP3_')) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
    console.log('Audio cache cleared');
}
