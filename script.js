/* ===================================
   CROP DATABASE
=================================== */

const crops = [
    {
        name: "Lettuce",
        space: ["windowsill", "balcony"],
        light: ["medium", "lots"],
        level: ["beginner", "pro"],
        image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&w=1200&q=80",
        reason: "Fast-growing and perfect for hydroponic beginners."
    },
    {
        name: "Spinach",
        space: ["windowsill", "balcony"],
        light: ["low", "medium"],
        level: ["beginner", "pro"],
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1200&q=80",
        reason: "Thrives even with moderate lighting."
    },
    {
        name: "Basil",
        space: ["windowsill", "balcony"],
        light: ["lots"],
        level: ["beginner", "pro"],
        image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=1200&q=80",
        reason: "Aromatic herb that loves sunlight."
    },
    {
        name: "Mint",
        space: ["windowsill", "balcony"],
        light: ["low", "medium"],
        level: ["beginner", "pro"],
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=1200&q=80",
        reason: "Extremely easy and productive hydroponic crop."
    },
    {
        name: "Strawberries",
        space: ["balcony", "room"],
        light: ["lots"],
        level: ["pro"],
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
        reason: "High-value fruit crop for experienced growers."
    },
    {
        name: "Cherry Tomatoes",
        space: ["room"],
        light: ["lots"],
        level: ["pro"],
        image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
        reason: "Produces abundant harvests indoors."
    },
    {
        name: "Kale",
        space: ["balcony", "room"],
        light: ["medium", "lots"],
        level: ["beginner", "pro"],
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Kale-Bundle.jpg",
        reason: "Nutrient-rich and hydroponic-friendly."
    },
    {
        name: "Cilantro",
        space: ["windowsill", "balcony"],
        light: ["medium"],
        level: ["beginner"],
        image: "https://images.unsplash.com/photo-1625944525533-473f1b3d54e7?auto=format&fit=crop&w=1200&q=80",
        reason: "Compact herb ideal for small setups."
    }
];

/* ===================================
   QUESTIONS
=================================== */

const questions = [
    {
        question: "🏠 How much space do you have?",
        key: "space",
        options: ["windowsill", "balcony", "room"]
    },
    {
        question: "☀️ How much light do you get?",
        key: "light",
        options: ["low", "medium", "lots"]
    },
    {
        question: "🌱 What's your experience level?",
        key: "level",
        options: ["beginner", "pro"]
    },
    {
        question: "💧 How often can you care for plants?",
        key: "care",
        options: ["rarely", "sometimes", "daily"]
    }
];

/* ===================================
   VARIABLES
=================================== */

let currentQuestion = 0;
let answers = {};
let ecoScore = 0;

/* ===================================
   START QUIZ
=================================== */

function startQuiz() {

    document.querySelector(".hero").style.display = "none";

    document.getElementById("quiz").style.display = "block";

    showQuestion();
}

/* ===================================
   SHOW QUESTION
=================================== */

function showQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("question").textContent =
        q.question;

    const optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";

    q.options.forEach(option => {

        const btn =
            document.createElement("div");

        btn.className = "option";

        btn.textContent = option;

        btn.onclick = () => selectOption(option);

        optionsContainer.appendChild(btn);

    });

    updateProgress();
}

/* ===================================
   SELECT ANSWER
=================================== */

function selectOption(option) {

    answers[questions[currentQuestion].key] =
        option;

    ecoScore += 25;

    document.getElementById("ecoScore").textContent =
        ecoScore;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResults();

    }
}

/* ===================================
   PROGRESS BAR
=================================== */

function updateProgress() {

    const percent =
        (currentQuestion / questions.length) * 100;

    document.getElementById("progress").style.width =
        percent + "%";

    document.getElementById("meterFill").style.width =
        Math.min(percent + 20, 100) + "%";
}

/* ===================================
   GET RECOMMENDATIONS
=================================== */

function getRecommendations() {

    let matches = crops.filter(crop =>

        crop.space.includes(answers.space) &&
        crop.light.includes(answers.light) &&
        crop.level.includes(answers.level)

    );

    if (matches.length === 0) {

        matches = [...crops]
            .sort(() => Math.random() - 0.5);

    }

    return matches.slice(0, 3);
}

/* ===================================
   SHOW RESULTS
=================================== */

function showResults() {

    document.getElementById("quiz").style.display =
        "none";

    document.getElementById("resultsSection").style.display =
        "block";

    const grid =
        document.getElementById("resultsGrid");

    grid.innerHTML = "";

    const recommendations =
        getRecommendations();

    recommendations.forEach((crop, index) => {

        const card =
            document.createElement("div");

        card.className = "crop-card";

        card.style.animation =
            `fadeUp .8s ease ${index * 0.2}s forwards`;

        card.innerHTML = `
        <img
        src="${crop.image}"
        alt="${crop.name}"
        onerror="this.src='https://picsum.photos/800/600?random=' + Math.floor(Math.random()*1000)"
        >

        <div class="card-content">

        <div class="crop-name">
        ${crop.name}
        </div>

        <div class="crop-reason">
        ${crop.reason}
        </div>

        <button class="grow-btn">
        🌱 Grow This Crop
        </button>

        </div>
        `;

        grid.appendChild(card);

    });

    growPlant();

    launchConfetti();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* ===================================
   PLANT GROWTH
=================================== */

function growPlant() {

    const plant =
        document.getElementById("plant");

    setTimeout(() => {

        plant.style.transform =
            "translateX(-50%) scale(1)";

    }, 300);
}

/* ===================================
   CONFETTI
=================================== */

function launchConfetti() {

    const colors = [
        "#8cff9f",
        "#06d6a0",
        "#ffd166",
        "#ffffff"
    ];

    for (let i = 0; i < 180; i++) {

        const confetti =
            document.createElement("div");

        confetti.className =
            "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.background =
            colors[Math.floor(
                Math.random() * colors.length)];

        confetti.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.remove();

        }, 6000);
    }
}

/* ===================================
   THEME TOGGLE
=================================== */

function toggleTheme() {

    document.body.classList.toggle("light");

    const toggle =
        document.querySelector(".toggle");

    toggle.textContent =
        document.body.classList.contains("light")
            ? "☀️"
            : "🌙";
}

/* ===================================
   FLOATING LEAVES
=================================== */

function createLeaves() {

    const container =
        document.getElementById("leaves");

    const icons =
        ["🍃", "🌿", "🍀"];

    for (let i = 0; i < 30; i++) {

        const leaf =
            document.createElement("div");

        leaf.className =
            "leaf";

        leaf.innerHTML =
            icons[Math.floor(
                Math.random() * icons.length)];

        leaf.style.left =
            Math.random() * 100 + "vw";

        leaf.style.fontSize =
            (Math.random() * 25 + 15) + "px";

        leaf.style.opacity =
            Math.random();

        leaf.style.animationDuration =
            (Math.random() * 15 + 10) + "s";

        container.appendChild(leaf);
    }
}

/* ===================================
   PARALLAX
=================================== */

window.addEventListener("mousemove", (e) => {

    const bg =
        document.querySelector(".parallax-bg");

    const x = e.clientX / 40;
    const y = e.clientY / 40;

    bg.style.transform =
        `translate(${-x}px,${-y}px)`;
});

/* ===================================
   INIT
=================================== */

window.addEventListener("DOMContentLoaded", () => {

    createLeaves();

    console.log(
        "🌱 Crop Finder Loaded Successfully"
    );

});