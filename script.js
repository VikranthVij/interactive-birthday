const DEV_MODE = false;
const ADMIN_MODE =
new URLSearchParams(
    window.location.search
).get("admin") === "vikranth123";
function unlockExperience(){

    if(
        DEV_MODE ||
        ADMIN_MODE
    ){

        transitionTo(
            showBirthdayScreen
        );

        return;
    }

    const now =
    new Date();

    if(now < unlockDate){

        alert(
        "This surprise unlocks on 20 June 2026 ❤️"
        );

        return;
    }

    const lock =
    document.getElementById("mainLock");

    if(!lock) return;

    lock.classList.add(
        "unlock-glow"
    );

    createSparkles();

    setTimeout(()=>{

        lock.classList.add(
            "unlock-open"
        );

    },800);

    setTimeout(()=>{

        transitionTo(
            showBirthdayScreen
        );

    },2200);
}
const music = {

    perfect:
    "assets/music/perfect.mp3",

    love:
    "assets/music/whenyousoinlove.mp3",

    quiet:
    "assets/music/quietplace.mp3"
};

let musicStarted = false;
const unlockDate =
new Date("2026-06-20T00:00:00+05:30");

const backgrounds = {
    lock: "DSCF3119.JPG",
    birthday: "DSCF2841.JPG",
    q1: "DSCF2477.JPG",
    q2: "DSCF2511.JPG",
    q3: "DSCF3591.JPG",
    q4: "PHOTO-2025-07-18-18-31-04.jpg",
    letter: "DSCF3341.JPG",
    final: "PHOTO-2025-09-07-18-41-21.jpg"
};
function typeWriter(
    elementId,
    text,
    speed = 50
){

    const element =
    document.getElementById(elementId);

    if(!element) return;

    element.textContent = "";

    let i = 0;

    const timer =
    setInterval(()=>{

        element.textContent +=
        text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(timer);
        }

    },speed);
}
function transitionTo(nextScene){

    const app =
    document.getElementById("app");

    app.classList.add("fade-out");

    setTimeout(()=>{

        nextScene();

        app.classList.remove("fade-out");

        app.classList.add("fade-in");

        setTimeout(()=>{

            app.classList.remove("fade-in");

        },500);

    },500);
}

function setBackground(fileName){

    const bg =
    document.getElementById("background");

    bg.style.opacity = "0";

    setTimeout(()=>{

        bg.style.backgroundImage =
        `url("assets/backgrounds/${fileName}")`;

        bg.style.opacity = "1";

    },300);
}
function playMusic(track){

    const audio =
    document.getElementById("bgMusic");

    if(
    audio.src.includes(track)
    ){
        return;
    }

    audio.volume = 0;

    audio.src = track;

    audio.play();

    let fadeIn =
    setInterval(()=>{

        if(audio.volume < 0.95){

            audio.volume += 0.05;

        }else{

            clearInterval(fadeIn);
        }

    },100);
}

function updateCountdown(){

    const now = new Date();

    const difference =
    unlockDate - now;

    if(difference <= 0){

        document.querySelector(".lock")
        .textContent = "🔓";

        document.querySelector(".mission")
        .textContent =
        "Birthday unlocked ❤️";

        return;
    }

    const days =
    Math.floor(
    difference /
    (1000*60*60*24)
    );

    const hours =
    Math.floor(
    (difference %
    (1000*60*60*24))
    /
    (1000*60*60)
    );

    const minutes =
    Math.floor(
    (difference %
    (1000*60*60))
    /
    (1000*60)
    );

    const seconds =
    Math.floor(
    (difference %
    (1000*60))
    /
    1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();

setInterval(updateCountdown,1000);

function showBirthdayScreen(){

    if(!musicStarted){

        playMusic(
        music.perfect
        );

        musicStarted = true;
    }

    setBackground(backgrounds.birthday);

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="birthday-screen">

            <h1
            id="birthdayTitle"
            class="birthday-title">
            </h1>

            <h2 class="birthday-name">
                Varshu
            </h2>

            <p class="birthday-subtitle">
                I made something special for you...
            </p>

            <button
            id="birthdayContinue"
            class="continue-btn"
            onclick="transitionTo(showQuestion1)"
            style="opacity:0;">

                Continue ❤️

            </button>

        </div>

    `;

    typeWriter(
        "birthdayTitle",
        "Happy Birthday ❤️",
        80
    );

    createConfetti();

    setTimeout(()=>{

        document
        .getElementById(
            "birthdayContinue"
        )
        .style.opacity = "1";

    },2500);
}

function showQuestion1(){

    setBackground(backgrounds.q1);

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="question-screen">

            <h1
            id="q1Title"
            class="question-title">
            </h1>
            <p id="questionMessage" class="question-message">
                Choose wisely 😌
            </p>

            <div class="question-buttons">

                <button
                class="yes-btn"
                onclick="transitionTo(showQuestion2)">

                    YES ❤️

                </button>

                <button
                id="noBtn"
                class="no-btn">

                    NO 😔

                </button>

            </div>

        </div>

    `;
    typeWriter(
        "q1Title",
        "Do you love me? ❤️",
        50
    );

    activateNoButton();
}

function showQuestion2(){

    setBackground(backgrounds.q2);

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="question-screen">

            <h1
            id="q2Title"
            class="question-title">
            </h1>
            <p
            id="question2Message"
            class="question-message">

                I hope my actions prove it ❤️

            </p>

            <div class="question-buttons">

                <button
                class="yes-btn"
                onclick="transitionTo(showQuestion3)">

                    YES ❤️

                </button>

                <button
                id="q2NoBtn"
                class="no-btn">

                    NO 😔

                </button>

            </div>

        </div>

    `;
    typeWriter(
        "q2Title",
        "Do you believe I love you? ❤️",
        50
    );

    activateQuestion2Button();
}

function showQuestion3(){

    setBackground(backgrounds.q3);

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="question-screen">

            <h1
            id="q3Title"
            class="question-title">
            </h1>

            <p
            class="question-message">

                Me won't promise perfection daa 

                <br><br>

                but me can always assure you my efforttt ❤️

            </p>

            <div class="question-buttons">

                <button
                class="yes-btn"
                onclick="showQuestion3Moment()">

                    YES ❤️

                </button>

            </div>

        </div>

    `;
    typeWriter(
        "q3Title",
        "Do you trust me to always try my best to keep you happy? ❤️",
        40
    );
}
function showQuestion3Moment(){

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="question-screen">

            <h1 class="birthday-title">

                One day at a time ❤️

            </h1>

        </div>

    `;

    setTimeout(()=>{

        transitionTo(showQuestion4);

    },1500);
}

function showQuestion4(){

    setBackground(backgrounds.q4);

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="question-screen">

            <h1
            id="q4Title"
            class="question-title">
            </h1>

            <p class="question-message">

                Because some things

                <br><br>

                don't need a question.

                <br><br>

                They only need to be said ❤️

            </p>

            <button
            class="continue-btn"
            onclick="transitionTo(showLetter)">

                Continue ❤️

            </button>

        </div>

    `;
    typeWriter(
        "q4Title",
        "No question this time 😊",
        60
    );
}

function showLetter(){
    playMusic(
    music.love
    );
    setBackground(backgrounds.letter);

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="birthday-screen">

            <h1
            id="letterTitle"
            class="birthday-title">
            </h1>

            <p class="birthday-subtitle">

                Dear Varshu,

                <br><br>

                [Letter Placeholder]

                <br><br>

                Happy Birthday ❤️

            </p>

            <button
            class="continue-btn"
            onclick="transitionTo(showAlbum)">

                Open Memories ❤️

            </button>

        </div>

    `;
    typeWriter(
        "letterTitle",
        "A Letter For You ❤️",
        70
    );
}
const galleryImages = [
"3d6d8211-867f-4de0-9d45-0c425dce04ff.JPG",
"85917c4b-2717-4c43-b4c8-96fb42cb65dd.JPG",
"DSCF0959.JPG",
"DSCF0990.JPG",
"DSCF1036.JPG",
"DSCF1037.JPG",
"DSCF1075.JPG",
"DSCF1157.JPG",
"DSCF1160.JPG",
"DSCF1969.JPG",
"DSCF2477.JPG",
"DSCF2511.JPG",
"DSCF2560.JPG",
"DSCF2841.JPG",
"DSCF3119.JPG",
"DSCF3341.JPG",
"DSCF3556.JPG",
"DSCF3561.JPG",
"DSCF3563.JPG",
"DSCF3577.JPG",
"DSCF3585.JPG",
"DSCF3613.JPG",
"DSCF3620.JPG",
"DSCF3624.JPG",
"DSCF4923.JPG",
"DSCF4926.JPG",
"DSCF5189.JPG",
"DSCF5298.JPG",
"IMG_0318.JPG",
"PHOTO-2025-02-21-06-51-39 2.jpg",
"PHOTO-2025-02-21-06-51-39.jpg",
"PHOTO-2025-02-22-14-50-46.jpg",
"PHOTO-2025-02-27-20-03-11.jpg",
"PHOTO-2025-03-15-11-19-07.jpg",
"PHOTO-2025-03-24-20-48-07 2.jpg",
"PHOTO-2025-03-24-20-48-07.jpg",
"PHOTO-2025-06-17-08-48-41.jpg",
"PHOTO-2025-07-18-18-31-04.jpg",
"PHOTO-2025-07-18-18-33-25.jpg",
"PHOTO-2025-07-29-17-28-44.jpg",
"PHOTO-2025-09-06-18-11-38.jpg",
"PHOTO-2025-09-07-18-41-21.jpg",
"PHOTO-2026-04-07-17-36-53.jpg"
];

function showAlbum(){
    playMusic(
    music.quiet
    );
    const app =
    document.getElementById("app");

    let galleryHTML = "";

    galleryImages.forEach((image,index)=>{

        galleryHTML += `

            <div class="gallery-card">

                <img
                src="assets/gallery/${image}"
                onclick="openImage(${index})">

                <p>
                    Memory #${index+1} ❤️
                </p>

            </div>

        `;
    });

    app.innerHTML = `

        <div class="gallery-screen">

            <h1 class="birthday-title">
                Memories ❤️
            </h1>

            <div class="gallery-grid">

                ${galleryHTML}

            </div>

            <button
            class="continue-btn"
            onclick="transitionTo(showFinalScreen)">

                One Last Thing ❤️

            </button>

        </div>

        <div
        id="imageModal"
        class="image-modal"
        onclick="closeImage()">

            <span
            class="close-modal"
            onclick="closeImage()">

                ✕

            </span>

            <button
            class="nav-btn left-btn"
            onclick="previousImage()">

                ←

            </button>

            <img
            id="modalImage"
            onclick="event.stopPropagation()">

            <button
            class="nav-btn right-btn"
            onclick="nextImage()">

                →

            </button>

        </div>

    `;
}

function showFinalScreen(){

    setBackground(backgrounds.final);

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="birthday-screen">

            <h1 class="birthday-title">

                Thank You For Existing ❤️

            </h1>

            <p class="birthday-subtitle">

                Thank you for being part
                of my life.

                <br><br>

                I love you ❤️

            </p>

            <button
            class="continue-btn"
            onclick="transitionTo(showBirthdayScreen)">

                Replay Our Story ❤️

            </button>

        </div>

    `;
}
function activateNoButton(){

    const noBtn =
    document.getElementById("noBtn");

    const yesBtn =
    document.querySelector(".yes-btn");

    const message =
    document.getElementById("questionMessage");

    const messages = [

        "Are you sure? 🥺",

        "Think carefully 😌",

        "Really? 🤨",

        "Nice try 😏",

        "The YES button looks better anyway ❤️"

    ];

    let hoverCount = 0;

    let yesScale = 1;

    let noScale = 1;

    noBtn.addEventListener(
        "mouseenter",
        () => {

            if(hoverCount < messages.length){

                message.textContent =
                messages[hoverCount];
            }

            hoverCount++;

            yesScale += 0.08;
            noScale -= 0.08;

            if(noScale < 0.4){

                noScale = 0.4;
            }

            yesBtn.style.transform =
            `scale(${yesScale})`;

            noBtn.style.transform =
            `scale(${noScale})`;

            if(hoverCount >= 4){

                const x =
                Math.random()*350-175;

                const y =
                Math.random()*250-125;

                noBtn.style.transform =
                `translate(${x}px, ${y}px) scale(${noScale})`;
            }
        }
    );
}
function activateQuestion2Button(){

    const noBtn =
    document.getElementById("q2NoBtn");

    const message =
    document.getElementById("question2Message");

    const buttonTexts = [

        "NO 😔",

        "Maybe 😶",

        "Hmm 🤔",

        "Possibly 👀",

        "Probably ❤️",

        "Okay Fine 😌",

        "YES ❤️"
    ];

    const messages = [

        "I hope my actions prove it ❤️",

        "Maybe not always perfectly...",

        "But I'm trying ❤️",

        "Every single day ❤️",

        "One day at a time ❤️",

        "Still trying ❤️",

        "Thank you ❤️"
    ];

    let current = 0;

    noBtn.addEventListener(
        "mouseenter",
        () => {

            if(current < buttonTexts.length - 1){

                current++;

                noBtn.textContent =
                buttonTexts[current];

                message.textContent =
                messages[current];
            }

            if(current === buttonTexts.length - 1){

                noBtn.onclick = () => {

                    transitionTo(showQuestion3);

                };
            }
        }
    );
}

let currentImageIndex = 0;

function openImage(index){

    currentImageIndex = index;

    const modal =
    document.getElementById("imageModal");

    const image =
    document.getElementById("modalImage");

    image.src =
    `assets/gallery/${galleryImages[index]}`;

    modal.style.display = "flex";
}

function closeImage(){

    document
    .getElementById("imageModal")
    .style.display = "none";
}

function nextImage(){

    currentImageIndex++;

    if(
    currentImageIndex >=
    galleryImages.length
    ){
        currentImageIndex = 0;
    }

    document
    .getElementById("modalImage")
    .src =
    `assets/gallery/${galleryImages[currentImageIndex]}`;
}

function previousImage(){

    currentImageIndex--;

    if(
    currentImageIndex < 0
    ){
        currentImageIndex =
        galleryImages.length - 1;
    }

    document
    .getElementById("modalImage")
    .src =
    `assets/gallery/${galleryImages[currentImageIndex]}`;
}
function toggleMusic(){

    const audio =
    document.getElementById("bgMusic");

    const btn =
    document.getElementById("musicToggle");

    if(audio.paused){

        audio.play();

        btn.textContent =
        "🔊";
    }
    else{

        audio.pause();

        btn.textContent =
        "🔇";
    }
}
document.addEventListener(
    "keydown",
    (event)=>{

        if(event.key === "Escape"){

            closeImage();
        }

    }
);

function createSparkles(){

    const container =
    document.getElementById(
        "sparkleContainer"
    );

    for(let i=0;i<25;i++){

        const sparkle =
        document.createElement(
            "div"
        );

        sparkle.className =
        "sparkle";

        sparkle.style.left =
        "50%";

        sparkle.style.top =
        "40%";

        sparkle.style.setProperty(
            "--x",
            `${Math.random()*400-200}px`
        );

        sparkle.style.setProperty(
            "--y",
            `${Math.random()*400-200}px`
        );

        container.appendChild(
            sparkle
        );

        setTimeout(()=>{

            sparkle.remove();

        },1500);
    }
}
document.addEventListener(
    "keydown",
    (event)=>{

        const modal =
        document.getElementById("imageModal");

        if(
        modal &&
        modal.style.display === "flex"
        ){

            if(event.key==="ArrowRight"){

                nextImage();
            }

            if(event.key==="ArrowLeft"){

                previousImage();
            }

        }

    }
);
function createConfetti(){

    const container =
    document.getElementById(
        "confettiContainer"
    );

    for(let i=0;i<60;i++){

        const confetti =
        document.createElement(
            "div"
        );

        confetti.className =
        "confetti";

        confetti.style.left =
        `${Math.random()*100}%`;

        confetti.style.animationDelay =
        `${Math.random()*2}s`;

        confetti.style.animationDuration =
        `${4+Math.random()*4}s`;

        container.appendChild(
            confetti
        );

        setTimeout(()=>{

            confetti.remove();

        },8000);
    }
}