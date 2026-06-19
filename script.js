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

    setBackground(
    backgrounds.letter
    );

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="birthday-screen">

            <h1
            id="letterTitle"
            class="birthday-title">
            </h1>

            <div class="letter-content">

                My love ❤️,

                <br><br>

                Do you know why you mean a lot to me?

                Honestly, I don't know either.

                <br><br>

                I never knew the reason for falling in love with you. Why did I fall in love with a girl with whom I spent my entire 11th and 12th, only to realise it after all these years?

                <br><br>

                It was never your beauty (Though I will argue how amazingly breathtaking you look 😌), nor any major common interest (we love opposite things).

                <br><br>

                After these 2.5 years of love with you, I realised that most of my happiness in college was directly or indirectly affiliated with you.

                <br><br>

                Should I go to college today?

                <br>

                "Oh, Varshu will come. Paravala polaam va, avalukaaga."

                <br><br>

                Almost every major event where I was truly happy had you in it.

                <br><br>

                Then I realised something.

                <br><br>

                It wasn't that you were present in my happy memories.

                <br>

                Those memories became happy because you were present in them.

                <br><br>

                Whenever I take a decision, I think about you.

                <br>

                Will I be able to share this with her?

                <br><br>

                Whenever I go somewhere and spot a jhumka stall or an earring shop, I stop and look.

                <br><br>

                If I find something beautiful, I buy it.

                <br><br>

                Just to safeguard it until I can give it to you and see that beautiful smile on your face.

                <br><br><br>

                Sureee, we had our ups and downs.

                <br><br>

                I have made mistakes, some of them grave ones.

                <br>

                And you have made mistakes too.

                <br><br>

                But despite everything, I still choose you.

                <br><br>

                I still choose to share my life and my moments with you.

                <br><br>

                I get sad.

                I get low.

                And most importantly, I cry.

                <br><br>

                I cry a lot.

                <br><br>

                And all the times I cry, it is usually for the people who mean the most to me.

                <br><br>

                Crying isn't weakness.

                It is simply how deeply I care.

                <br><br>

                Believe me, I acknowledge my mistakes and I genuinely regret hurting you whenever I do.

                <br><br>

                I found someone with whom I can share absolutely anything.

                <br><br>

                And I truly hope that I am that person for you too.

                <br><br>

                I am not perfect.

                <br>

                I make mistakes.

                <br>

                But I genuinely try to fix them.

                <br><br>

                Not only because it makes you feel better, but because it makes our future selves happier and more secure.

                <br><br><br>

                My love,

                <br><br>

                I have never pretended to love you.

                <br>

                I have never pretended to listen to you.

                <br>

                I have never pretended to be uninterested in what you talk about.

                <br><br>

                There may be moments where it feels otherwise.

                <br><br>

                Honestly, I can never fully prove it.

                <br><br>

                But I promise it is never intentional.

                <br><br>

                No matter how many highs and lows we go through, I always find my way back to loving you with everything I have.

                <br><br>

                Varshu da,

                <br><br>

                You are a major part of who I am.

                <br><br>

                And I hope I am the same for you.

                <br><br>

                Times may change.

                <br>

                How I express myself may change.

                <br>

                My actions may change.

                <br>

                Situations may change.

                <br>

                Replies may change.

                <br><br>

                But my love for you remains constant.

                <br><br>

                I may go from gifting you earrings to gifting you things that genuinely help you.

                <br>

                But gifting you never changes.

                <br><br>

                I may go from buying you chocolates and food to making food for you one day.

                <br>

                But feeding you never changes.

                <br><br>

                I may go from talking about travelling places with you to actually travelling with you.

                <br>

                But travelling with you never changes.

                <br><br>

                You will always remain one of my biggest priorities.

                <br><br>

                Over time, you may feel that I changed.

                <br><br>

                And honestly, I probably will.

                <br><br>

                Change with correction is always better, isn't it?

                <br><br>

                Let's welcome change.

                <br><br>

                And whenever something doesn't feel right, let's talk about it.

                <br><br>

                Let's fix it.

                Let's grow together.

                <br><br>

                And I promise you that I will do my best to give life to every word written here.

                <br><br><br>

                Happy Birthday, my loveeeee ❤️

                <br><br>

                Happy 21!!!!!!!

                <br><br>

                I love you smmmm ❤️

                <br><br>

                I was, am, and always will be proud of who you were, who you are, and who you will become ❤️

                <br><br>

                No matter what happens, I will always be one of your biggest supporters through both your personal and professional life.

                <br><br>

                You will always remain my Roman Empire 😌

                <br><br>

                I wish for you to be blessed with all the happiness that exists in this world.

                <br><br>

                And I hope that beautiful smile of yours never leaves your face ❤️

                <br><br><br>

                <div class="letter-ending">

                    <i>
                    <b>
                    I love youuuuu and I miss youuu smmmm daaaa ❤️
                    </b>
                    </i>

                </div>

                <br><br>

                Forever yours,

                <br><br>

                Vikranth ❤️

            </div>

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

const captions = {

    "PHOTO-2025-02-21-06-51-39.jpg":
    "A pic that I will cherish forever ❤️",

    "DSCF4926.JPG":
    "My fav pic from Mumbai ❤️",

    "PHOTO-2025-07-18-18-31-04.jpg":
    "No matter what, you will always be their child ❤️",

    "PHOTO-2025-02-27-20-03-11.jpg":
    "Most personal pic of us. I love you ❤️",

    "DSCF3341.JPG":
    "Can't you be this close to me forever? 🥺❤️",

    "85917c4b-2717-4c43-b4c8-96fb42cb65dd.JPG":
    "Picture of the girl I fell for, that our kids will see ❤️",

    "DSCF0990.JPG":
    "Please, let's always be like this 🥺❤️",

    "DSCF3577.JPG":
    "A pic to always remind myself, she is worth everything ❤️",

    "DSCF3119.JPG":
    "Maybe, it's your hands that hold all the magic ✨❤️",

    "PHOTO-2025-07-18-18-33-25.jpg":
    "I am still obsessed with your nose rings 😘❤️",

    "PHOTO-2026-04-07-17-36-53.jpg":
    "That smile is all the reason I exist for ❤️"

};

function showAlbum(){
    playMusic(
    music.quiet
    );
    const app =
    document.getElementById("app");

    let galleryHTML = "";
    galleryImages.forEach((image,index)=>{

        const caption =
        captions[image];

        galleryHTML += `

            <div class="gallery-card">

                <img
                src="assets/gallery/${image}"
                onclick="openImage(${index})">

                ${
                    caption
                    ?
                    `<p>${caption}</p>`
                    :
                    ""
                }

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
            onclick="transitionTo(showLastQuestion)">

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
function showLastQuestion(){

    setBackground(
    backgrounds.final
    );

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="question-screen">

            <h1
            id="lastQuestionTitle"
            class="question-title">
            </h1>

            <p
            class="question-message">

                One last thing before we finish ❤️

            </p>

            <div class="question-buttons">

                <button
                class="yes-btn"
                onclick="transitionTo(showFinalScreen)">

                    YES ❤️

                </button>

            </div>

        </div>

    `;

    typeWriter(
        "lastQuestionTitle",
        "Will you continue making memories with me? ❤️",
        70
    );
}
function showFinalScreen(){

    setBackground(
    backgrounds.final
    );

    playMusic(
    music.love
    );

    const app =
    document.getElementById("app");

    app.innerHTML = `

        <div class="birthday-screen">

            <h1
            id="finalTitle"
            class="birthday-title">
            </h1>

            <p
            class="birthday-subtitle">

                Thank you for being part
                of my life.

                <br><br>

                Thank you for every smile.

                <br><br>

                Thank you for every memory.

                <br><br>

                Thank you for choosing me.

                <br><br>

                No matter what happens,

                <br>

                I will always be cheering
                for you ❤️

                <br><br><br>

                <span class="final-love">

                    I love you ❤️

                </span>

            </p>

        </div>

    `;

    typeWriter(
        "finalTitle",
        "Thank You For Existing ❤️",
        70
    );

    createConfetti();
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