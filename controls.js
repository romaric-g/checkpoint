var vid = document.getElementById("bgvid");
var source = document.getElementById("videosource");
var pauseButton = document.getElementById("vidpause");
var titrageBox = document.getElementById("titrages")
var titragesImage = document.getElementById("titrages-image");


const ressources = [
    'video-3d-hologram-4k-new-video.mp4',
    'video-3d-hologram-4k-screen-up.mp4'
]

const titrages = [
    'title-ciel.png',
    'title-remi.png',
    'title-yoann.png',
    'title-global.png'
]

let currentSource = 0
let currentTitle = 0;

function vidFade() {
  vid.classList.add("stopfade");
}
vid.addEventListener('ended', function() {
  // only functional if "loop" is removed
  vid.pause();
  // to capture IE10
  vidFade();
});
pauseButton.addEventListener("click", function() {
    pauseButton.remove()
})


document.addEventListener('keydown', (event) => {
    const nomTouche = event.key;

    if (nomTouche === 'Control') {
      // Pas d'alerte si seule la touche Control est pressée.
      return;
    }
  
    if (!event.ctrlKey) {
        const number = event.keyCode;
        console.log(number)
        if(number >= 49 && number <= 57) {
            currentSource = number - 49 ;
            play()
        }

        if(number >= 97 && number <= 105) {
            currentTitle = number - 97;
            showTitle()
        }

        if (number === 96) {
            hideTitle()
        }

        if (number === 32) {
            togglePause()
        }

        if (number === 8) {
            vid.currentTime = 0
        }
        if (number === 37) {
            goBack()
        }
        if (number === 39) {
            goForward()
        }
    }
}, false);

const goBack = () => {
    var newTime = vid.currentTime - 10;
    if (newTime < 0) {
        newTime = 0;
    }
    vid.currentTime = newTime;
}

const goForward = () => {
    var newTime = vid.currentTime + 10;
    if (newTime > vid.duration) {
        newTime = vid.duration;
    }
    vid.currentTime = newTime;
}

const nextSource = () => {
    if (currentSource > ressources.length) {
        currentSource = 0
    }
    play()
}

const prevSource = () => {
    if (currentSource < 0) {
        currentSource = ressources.length - 1
    }
    play()
}

const play = () => {
    console.log("play " + currentSource)
    vid.pause();
    source.setAttribute('src', './ressources/' + ressources[currentSource]);

    vid.load();
    vid.play();
}

const showTitle = () => {
    titragesImage.setAttribute('src', './titrages/' + titrages[currentTitle])
    titrageBox.className = "show";
}

const hideTitle = () => {
    titrageBox.className = "";
}

const togglePause = () => {
    if (vid.paused) {
        vid.play()
    } else {
        vid.pause()
    }
}


// var source = document.createElement('source');

// source.setAttribute('src', 'http://www.tools4movies.com/trailers/1012/Kill%20Bill%20Vol.3.mp4');

// video.appendChild(source);
// video.play();

// setTimeout(function() {  
//     video.pause();

//     source.setAttribute('src', 'http://www.tools4movies.com/trailers/1012/Despicable%20Me%202.mp4'); 

//     video.load();
//     video.play();
// }, 3000);