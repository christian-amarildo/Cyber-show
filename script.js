// Game State
let currentQuestionIndex = 0;
let score = 0;
let currentLevel = 0;
let gameQuestions = [];
let lifelines = {
    skips: 3, // 3 Skips available
    cards: true // 1 Cards usage
};
let selectedCard = null;
let selectedSkip = null;

// Prize Ladder
const prizes = [
    1000, 2000, 3000, 4000, 5000,
    10000, 20000, 30000, 40000, 50000,
    100000, 200000, 300000, 400000, 500000,
    1000000
];

// Audio System (Synthesizer)
class AudioSynth {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3; // Volume
        this.masterGain.connect(this.ctx.destination);
    }

    playTone(freq, type, duration) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playStart() {
        this.playTone(440, 'sine', 0.5);
        setTimeout(() => this.playTone(880, 'square', 0.5), 200);
        setTimeout(() => this.playTone(1760, 'sawtooth', 1.0), 400);
    }

    playCorrect() {
        this.playTone(880, 'sine', 0.1);
        setTimeout(() => this.playTone(1760, 'sine', 0.4), 100);
    }

    playWrong() {
        this.playTone(150, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(100, 'sawtooth', 0.5), 200);
    }

    playWin() {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 'square', 0.4), i * 150);
        });
    }

    playFlip() {
        this.playTone(600, 'sine', 0.1);
    }
}

const audio = new AudioSynth();

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answersGrid = document.getElementById('answers-grid');
const scoreDisplay = document.getElementById('score-display');
const finalScoreDisplay = document.getElementById('final-score');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const btnSkip = document.getElementById('btn-skip');
const btnCards = document.getElementById('btn-cards');

// Modals
const modalOverlay = document.getElementById('modal-overlay');
const cardsModal = document.getElementById('cards-modal');
const skipModal = document.getElementById('skip-modal');

// Initialize Game
function startGame() {
    score = 0;
    currentLevel = 0;
    lifelines = { skips: 3, cards: true };

    // Prepare questions
    gameQuestions = [...questions].sort(() => Math.random() - 0.5);

    updateScoreUI();
    updateLifelinesUI();

    showScreen('game-screen');
    audio.playStart();
    loadQuestion();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function loadQuestion() {
    if (currentLevel >= prizes.length) {
        winGame();
        return;
    }

    if (currentLevel >= gameQuestions.length) {
        endGame(score, "Você respondeu todas as perguntas disponíveis!");
        return;
    }

    const q = gameQuestions[currentLevel];
    questionText.textContent = q.question;
    // Update Prize Indicator
    scoreDisplay.innerText = prizes[currentLevel].toLocaleString('pt-BR');

    answersGrid.innerHTML = '';

    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.onclick = () => checkAnswer(index);
        btn.innerHTML = `
            <span class="answer-index">${index + 1}</span>
            <span class="answer-text">${answer}</span>
        `;
        answersGrid.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const q = gameQuestions[currentLevel];
    const buttons = answersGrid.getElementsByClassName('answer-btn');

    for (let btn of buttons) {
        btn.disabled = true;
    }

    if (selectedIndex === q.correct) {
        buttons[selectedIndex].classList.add('correct');
        audio.playCorrect();
        score = prizes[currentLevel]; // Secure current prize
        setTimeout(() => {
            currentLevel++;
            loadQuestion();
        }, 1500);
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
        audio.playWrong();

        const finalPrize = score / 2;
        setTimeout(() => {
            endGame(finalPrize, "Que pena! Você errou.");
        }, 2000);
    }
}

function updateScoreUI() {
    scoreDisplay.innerText = (prizes[currentLevel] || 0).toLocaleString('pt-BR');
}

function updateLifelinesUI() {
    btnSkip.disabled = lifelines.skips <= 0;
    btnCards.disabled = !lifelines.cards;

    // Update skip slots visuals in modal
    for (let i = 1; i <= 3; i++) {
        const slot = document.getElementById(`skip-${i}`);
        if (slot) {
            if (i <= (3 - lifelines.skips)) {
                slot.classList.add('used');
            } else {
                slot.classList.remove('used');
            }
        }
    }
}

// --- Modals Logic ---

function openSkipModal() {
    if (lifelines.skips <= 0) return;
    modalOverlay.style.display = 'block';
    skipModal.style.display = 'block';

    // Reset selection
    document.querySelectorAll('.skip-slot').forEach(s => {
        s.classList.remove('selected');
        s.onclick = () => {
            if (!s.classList.contains('used')) {
                document.querySelectorAll('.skip-slot').forEach(el => el.classList.remove('selected'));
                s.classList.add('selected');
                selectedSkip = s.id;
            }
        };
    });
}

function confirmSkip() {
    if (!selectedSkip) return;

    lifelines.skips--;
    closeModals();
    updateLifelinesUI();

    // Skip Logic
    if (currentLevel < gameQuestions.length - 1) {
        const nextQIndex = currentLevel + 1 + Math.floor(Math.random() * (gameQuestions.length - (currentLevel + 1)));
        [gameQuestions[currentLevel], gameQuestions[nextQIndex]] = [gameQuestions[nextQIndex], gameQuestions[currentLevel]];
        loadQuestion();
    } else {
        alert("Não há mais perguntas para pular!");
    }
}

function openCardsModal() {
    if (!lifelines.cards) return;
    modalOverlay.style.display = 'block';
    cardsModal.style.display = 'block';

    // Reset cards
    document.querySelectorAll('.card').forEach(c => {
        c.classList.remove('flipped');
        c.onclick = () => {
            if (!c.classList.contains('flipped')) {
                c.classList.add('flipped');
                audio.playFlip();
                selectedCard = c.querySelector('.card-back').innerText;
                // Disable other cards
                document.querySelectorAll('.card').forEach(other => other.onclick = null);
            }
        };
    });
}

function confirmCard() {
    if (selectedCard === null) return;

    lifelines.cards = false;
    closeModals();
    updateLifelinesUI();

    const toEliminate = parseInt(selectedCard);
    eliminateAnswers(toEliminate);
}

function eliminateAnswers(count) {
    if (count === 0) return;

    const q = gameQuestions[currentLevel];
    const buttons = Array.from(answersGrid.getElementsByClassName('answer-btn'));
    const wrongIndices = buttons.map((_, i) => i).filter(i => i !== q.correct);

    const indicesToHide = wrongIndices.sort(() => Math.random() - 0.5).slice(0, count);

    indicesToHide.forEach(index => {
        buttons[index].style.visibility = 'hidden';
    });
}

function closeModals() {
    modalOverlay.style.display = 'none';
    cardsModal.style.display = 'none';
    skipModal.style.display = 'none';
    selectedCard = null;
    selectedSkip = null;
}

function stopGame() {
    endGame(score, "Você decidiu parar.");
}

function endGame(finalPrize, message) {
    showScreen('result-screen');
    resultTitle.textContent = "FIM DE JOGO";
    resultTitle.style.color = "var(--wrong-color)";
    resultMessage.textContent = message;
    finalScoreDisplay.textContent = finalPrize.toLocaleString('pt-BR');
}

function winGame() {
    showScreen('result-screen');
    audio.playWin();
    resultTitle.textContent = "PARABÉNS!";
    resultTitle.style.color = "var(--accent-color)";
    resultMessage.textContent = "Você é um Mestre em Cibersegurança!";
    finalScoreDisplay.textContent = "1.000.000";
}

function resetGame() {
    showScreen('start-screen');
}
