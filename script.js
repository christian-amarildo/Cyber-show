// --- Estado do Jogo ---
let currentQuestionIndex = 0; // Índice atual da pergunta (não usado diretamente, usamos currentLevel)
let score = 0; // Pontuação atual (prêmio garantido)
let currentLevel = 0; // Nível atual (0 a 15)
let gameQuestions = []; // Array de perguntas embaralhadas para o jogo atual
let lifelines = {
    skips: 3, // 3 Pulos disponíveis
    cards: true // 1 uso de Cartas disponível
};
let selectedCard = null; // Carta selecionada no modal
let selectedSkip = null; // Slot de pulo selecionado no modal

// --- Escada de Prêmios ---
// Valores dos prêmios para cada nível (1 a 1 milhão)
const prizes = [
    1000, 2000, 3000, 4000, 5000,
    10000, 20000, 30000, 40000, 50000,
    100000, 200000, 300000, 400000, 500000,
    1000000
];

// --- Sistema de Áudio (Sintetizador) ---
// Classe para gerar efeitos sonoros em tempo real usando Web Audio API
class AudioSynth {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3; // Volume mestre
        this.masterGain.connect(this.ctx.destination);
    }

    // Função auxiliar para tocar um tom
    playTone(freq, type, duration) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type; // 'sine', 'square', 'sawtooth', 'triangle'
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Envelope de volume (fade out rápido)
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    // Efeito de Início de Jogo
    playStart() {
        this.playTone(440, 'sine', 0.5);
        setTimeout(() => this.playTone(880, 'square', 0.5), 200);
        setTimeout(() => this.playTone(1760, 'sawtooth', 1.0), 400);
    }

    // Efeito de Resposta Correta
    playCorrect() {
        this.playTone(880, 'sine', 0.1);
        setTimeout(() => this.playTone(1760, 'sine', 0.4), 100);
    }

    // Efeito de Resposta Errada
    playWrong() {
        this.playTone(150, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(100, 'sawtooth', 0.5), 200);
    }

    // Efeito de Vitória (Milhão)
    playWin() {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 'square', 0.4), i * 150);
        });
    }

    // Efeito de Virar Carta
    playFlip() {
        this.playTone(600, 'sine', 0.1);
    }
}

const audio = new AudioSynth();

// --- Elementos do DOM ---
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

// Modais
const modalOverlay = document.getElementById('modal-overlay');
const cardsModal = document.getElementById('cards-modal');
const skipModal = document.getElementById('skip-modal');

// --- Lógica do Jogo ---

// Inicia o jogo, reseta variáveis e carrega perguntas
function startGame() {
    score = 0;
    currentLevel = 0;
    lifelines = { skips: 3, cards: true };

    // Embaralha as perguntas do arquivo questions.js
    gameQuestions = [...questions].sort(() => Math.random() - 0.5);

    updateScoreUI();
    updateLifelinesUI();

    showScreen('game-screen');
    audio.playStart();
    loadQuestion();
}

// Alterna entre as telas (Início, Jogo, Resultado)
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Carrega a pergunta atual na tela
function loadQuestion() {
    // Verifica se ganhou (passou do último nível)
    if (currentLevel >= prizes.length) {
        winGame();
        return;
    }

    // Verifica se acabaram as perguntas disponíveis
    if (currentLevel >= gameQuestions.length) {
        endGame(score, "Você respondeu todas as perguntas disponíveis!");
        return;
    }

    const q = gameQuestions[currentLevel];
    questionText.textContent = q.question;
    // Atualiza o indicador de prêmio
    scoreDisplay.innerText = prizes[currentLevel].toLocaleString('pt-BR');

    answersGrid.innerHTML = '';

    // Cria os botões de resposta
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

// Verifica a resposta selecionada
function checkAnswer(selectedIndex) {
    const q = gameQuestions[currentLevel];
    const buttons = answersGrid.getElementsByClassName('answer-btn');

    // Desabilita botões para evitar múltiplos cliques
    for (let btn of buttons) {
        btn.disabled = true;
    }

    if (selectedIndex === q.correct) {
        // Resposta Correta
        buttons[selectedIndex].classList.add('correct');
        audio.playCorrect();
        score = prizes[currentLevel]; // Garante o prêmio atual
        setTimeout(() => {
            currentLevel++;
            loadQuestion();
        }, 1500);
    } else {
        // Resposta Errada
        buttons[selectedIndex].classList.add('wrong');
        buttons[q.correct].classList.add('correct'); // Mostra a correta
        audio.playWrong();

        // Penalidade: Perde metade do prêmio (Regra do Show do Milhão)
        const finalPrize = score / 2;
        setTimeout(() => {
            endGame(finalPrize, "Que pena! Você errou.");
        }, 2000);
    }
}

// Atualiza a UI de pontuação
function updateScoreUI() {
    scoreDisplay.innerText = (prizes[currentLevel] || 0).toLocaleString('pt-BR');
}

// Atualiza a UI das ajudas (botões e modais)
function updateLifelinesUI() {
    btnSkip.disabled = lifelines.skips <= 0;
    btnCards.disabled = !lifelines.cards;

    // Atualiza visual dos slots de pulo no modal
    for (let i = 1; i <= 3; i++) {
        const slot = document.getElementById(`skip-${i}`);
        if (slot) {
            if (i <= (3 - lifelines.skips)) {
                slot.classList.add('used'); // Marca como usado
            } else {
                slot.classList.remove('used');
            }
        }
    }
}

// --- Lógica dos Modais e Ajudas ---

// Abre o modal de Pular
function openSkipModal() {
    if (lifelines.skips <= 0) return;
    modalOverlay.style.display = 'block';
    skipModal.style.display = 'block';

    // Configura seleção dos slots
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

// Confirma o uso do Pulo
function confirmSkip() {
    if (!selectedSkip) return;

    lifelines.skips--;
    closeModals();
    updateLifelinesUI();

    // Lógica de Pular: Troca a pergunta atual por uma aleatória futura
    if (currentLevel < gameQuestions.length - 1) {
        const nextQIndex = currentLevel + 1 + Math.floor(Math.random() * (gameQuestions.length - (currentLevel + 1)));
        // Troca a pergunta atual com a sorteada
        [gameQuestions[currentLevel], gameQuestions[nextQIndex]] = [gameQuestions[nextQIndex], gameQuestions[currentLevel]];
        loadQuestion();
    } else {
        alert("Não há mais perguntas para pular!");
    }
}

// Abre o modal de Cartas
function openCardsModal() {
    if (!lifelines.cards) return;
    modalOverlay.style.display = 'block';
    cardsModal.style.display = 'block';

    // Reseta as cartas
    document.querySelectorAll('.card').forEach(c => {
        c.classList.remove('flipped');
        c.onclick = () => {
            if (!c.classList.contains('flipped')) {
                c.classList.add('flipped');
                audio.playFlip();
                selectedCard = c.querySelector('.card-back').innerText;
                // Desabilita outras cartas após escolher uma
                document.querySelectorAll('.card').forEach(other => other.onclick = null);
            }
        };
    });
}

// Confirma o uso da Carta
function confirmCard() {
    if (selectedCard === null) return;

    lifelines.cards = false;
    closeModals();
    updateLifelinesUI();

    const toEliminate = parseInt(selectedCard);
    eliminateAnswers(toEliminate);
}

// Elimina N respostas erradas
function eliminateAnswers(count) {
    if (count === 0) return;

    const q = gameQuestions[currentLevel];
    const buttons = Array.from(answersGrid.getElementsByClassName('answer-btn'));
    const wrongIndices = buttons.map((_, i) => i).filter(i => i !== q.correct);

    // Embaralha índices errados e pega 'count' para esconder
    const indicesToHide = wrongIndices.sort(() => Math.random() - 0.5).slice(0, count);

    indicesToHide.forEach(index => {
        buttons[index].style.visibility = 'hidden';
    });
}

// Fecha todos os modais
function closeModals() {
    modalOverlay.style.display = 'none';
    cardsModal.style.display = 'none';
    skipModal.style.display = 'none';
    selectedCard = null;
    selectedSkip = null;
}

// Para o jogo e leva o prêmio atual
function stopGame() {
    endGame(score, "Você decidiu parar.");
}

// Tela de Fim de Jogo
function endGame(finalPrize, message) {
    showScreen('result-screen');
    resultTitle.textContent = "FIM DE JOGO";
    resultTitle.style.color = "var(--wrong-color)";
    resultMessage.textContent = message;
    finalScoreDisplay.textContent = finalPrize.toLocaleString('pt-BR');
}

// Tela de Vitória
function winGame() {
    showScreen('result-screen');
    audio.playWin();
    resultTitle.textContent = "PARABÉNS!";
    resultTitle.style.color = "var(--accent-color)";
    resultMessage.textContent = "Você é um Mestre em Cibersegurança!";
    finalScoreDisplay.textContent = "1.000.000";
}

// Reinicia o jogo
function resetGame() {
    showScreen('start-screen');
}
