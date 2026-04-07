/* ============================================================
   AL-HUDA — Logique du Quiz Islamique
   ============================================================ */

/* ---------- État global ---------- */
let questions      = [];
let currentIndex   = 0;
let score          = 0;
let answered       = false;
let timerInterval  = null;
let timeLeft       = 30;
let selectedCategory = 'all';
let totalQuestions = 10;

/* ---------- Initialisation ---------- */
function initQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const data = window.QUIZ_DATA;
  if (!data) { container.innerHTML = '<p style="color:red">Erreur : données du quiz introuvables.</p>'; return; }

  // Statistiques par catégorie
  const stats = {};
  data.categories.forEach(c => {
    stats[c.id] = data.questions.filter(q => q.category === c.id).length;
  });
  const totalAll = data.questions.length;

  // Construire l'écran de démarrage
  container.innerHTML = `
    <div id="screen-home" class="quiz-screen active">
      <div class="quiz-home-inner">
        <div class="quiz-home-icon">🌟</div>
        <h2 class="quiz-home-title">Quiz Islamique</h2>
        <p class="quiz-home-sub">Testez vos connaissances sur l'Islam — Coran, Hadiths, Histoire, Prophètes et Pratiques.</p>
        <div class="quiz-home-meta">
          <span>⏱ 30 secondes par question</span>
          <span>📋 10 questions par partie</span>
          <span>📊 Difficulté variée</span>
        </div>
        <h3 class="quiz-cat-title">Choisir une catégorie</h3>
        <div class="category-grid">
          <div class="cat-card cat-all" data-cat="all" onclick="startQuiz('all')">
            <span class="cat-icon">🌟</span>
            <span class="cat-name">Tout mélangé</span>
            <span class="cat-count">${totalAll} questions</span>
          </div>
          ${data.categories.map(c => `
            <div class="cat-card" data-cat="${c.id}" style="--cat-color:${c.color}" onclick="startQuiz('${c.id}')">
              <span class="cat-icon">${c.icon}</span>
              <span class="cat-name">${c.name}</span>
              <span class="cat-count">${stats[c.id] || 0} questions</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div id="screen-question" class="quiz-screen" style="display:none"></div>
    <div id="screen-results"  class="quiz-screen" style="display:none"></div>
  `;
}

/* ---------- Démarrer le quiz ---------- */
function startQuiz(category) {
  selectedCategory = category;
  const data = window.QUIZ_DATA;
  if (!data) return;

  // Filtrer et mélanger
  let pool = category === 'all'
    ? [...data.questions]
    : data.questions.filter(q => q.category === category);

  if (pool.length === 0) {
    alert('Aucune question disponible pour cette catégorie.');
    return;
  }

  pool = shuffleArray(pool);
  questions = pool.slice(0, Math.min(10, pool.length));
  totalQuestions = questions.length;
  currentIndex = 0;
  score = 0;

  // Cacher home, afficher question
  showScreen('screen-question');
  showQuestion(0);
}

/* ---------- Afficher une question ---------- */
function showQuestion(index) {
  answered = false;
  clearTimer();
  timeLeft = 30;

  const q = questions[index];
  const progress = Math.round(((index) / totalQuestions) * 100);
  const categoryInfo = getCategoryInfo(q.category);
  const difficultyLabel = { facile: 'Facile', moyen: 'Moyen', difficile: 'Difficile' }[q.difficulty] || q.difficulty;
  const diffClass = { facile: 'diff-easy', moyen: 'diff-medium', difficile: 'diff-hard' }[q.difficulty] || '';

  const screen = document.getElementById('screen-question');
  screen.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" id="progress-fill" style="width:${progress}%"></div>
    </div>
    <div class="quiz-meta-row">
      <span class="quiz-counter">Question ${index + 1}/${totalQuestions}</span>
      <span class="quiz-score-live" id="score-live">Score : ${score}</span>
    </div>

    <div class="quiz-timer-wrap">
      <div class="quiz-timer-ring">
        <svg viewBox="0 0 80 80" class="timer-svg">
          <circle class="timer-track" cx="40" cy="40" r="34" />
          <circle class="timer-fill" id="timer-circle" cx="40" cy="40" r="34"
            stroke-dasharray="213.6"
            stroke-dashoffset="0" />
        </svg>
        <span class="timer-num" id="timer-num">30</span>
      </div>
    </div>

    <div class="quiz-question-card">
      <div class="q-badges-row">
        <span class="q-diff-badge ${diffClass}">${difficultyLabel}</span>
        <span class="q-category-tag" style="background:${categoryInfo.color}20; color:${categoryInfo.color};">
          ${categoryInfo.icon} ${categoryInfo.name}
        </span>
      </div>
      <p class="q-text">${escapeHtml(q.question)}</p>
      <div class="q-options" id="q-options">
        ${q.options.map((opt, i) => `
          <button class="q-option" data-index="${i}" onclick="selectAnswer(${i})">
            <span class="q-opt-letter">${['A', 'B', 'C', 'D'][i]}</span>
            <span class="q-opt-text">${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>
      <div class="q-explanation" id="q-explanation" style="display:none">
        <span class="explanation-icon">💡</span>
        <p>${escapeHtml(q.explanation)}</p>
      </div>
      <div class="q-actions" id="q-actions" style="display:none">
        <button class="q-next-btn" onclick="nextQuestion()">
          ${index + 1 < totalQuestions ? 'Question suivante →' : 'Voir les résultats 🏁'}
        </button>
      </div>
    </div>
  `;

  startTimer();
}

/* ---------- Sélectionner une réponse ---------- */
function selectAnswer(optionIndex) {
  if (answered) return;
  answered = true;
  clearTimer();

  const q = questions[currentIndex];
  const isCorrect = optionIndex === q.answer;

  if (isCorrect) score++;

  // Colorier les options
  const opts = document.querySelectorAll('.q-option');
  opts.forEach((btn, i) => {
    btn.disabled = true;
    btn.classList.remove('selected');
    if (i === q.answer) {
      btn.classList.add('correct');
    } else if (i === optionIndex && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  // Mettre à jour le score live
  const scoreLive = document.getElementById('score-live');
  if (scoreLive) scoreLive.textContent = `Score : ${score}`;

  // Afficher l'explication
  const expl = document.getElementById('q-explanation');
  if (expl) expl.style.display = 'flex';

  // Afficher bouton suivant
  const actions = document.getElementById('q-actions');
  if (actions) actions.style.display = 'flex';

  // Feedback visuel sur le timer
  const timerRing = document.querySelector('.quiz-timer-ring');
  if (timerRing) {
    timerRing.classList.add(isCorrect ? 'timer-correct' : 'timer-wrong');
  }
}

/* ---------- Question suivante ---------- */
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion(currentIndex);
  } else {
    showResults();
  }
}

/* ---------- Résultats ---------- */
function showResults() {
  clearTimer();
  const pct = Math.round((score / totalQuestions) * 100);
  const badge = getBadge(pct);
  const categoryLabel = selectedCategory === 'all'
    ? 'Tout mélangé'
    : (getCategoryInfo(selectedCategory).name || selectedCategory);

  // Calculer réponses fausses
  const wrong = totalQuestions - score;

  // Barre de performance
  const bars = [
    { label: '✅ Correctes', count: score,        pct: pct,          cls: 'bar-correct'  },
    { label: '❌ Incorrectes', count: wrong,       pct: 100 - pct,    cls: 'bar-wrong'    }
  ];

  const screen = document.getElementById('screen-results');
  screen.innerHTML = `
    <div class="result-inner animate-fadeInUp">
      <div class="result-badge-wrap">
        <div class="result-badge">${badge.emoji}</div>
      </div>
      <div class="result-score">${score}<span class="result-total">/${totalQuestions}</span></div>
      <div class="result-pct">${pct}%</div>
      <div class="result-label">${badge.label}</div>

      <div class="result-stats-grid">
        <div class="result-stat">
          <span class="rst-icon">🎯</span>
          <span class="rst-val">${score}</span>
          <span class="rst-lbl">Correctes</span>
        </div>
        <div class="result-stat">
          <span class="rst-icon">❌</span>
          <span class="rst-val">${wrong}</span>
          <span class="rst-lbl">Incorrectes</span>
        </div>
        <div class="result-stat">
          <span class="rst-icon">📊</span>
          <span class="rst-val">${pct}%</span>
          <span class="rst-lbl">Précision</span>
        </div>
      </div>

      <div class="result-bars">
        ${bars.map(b => `
          <div class="result-bar-row">
            <span class="rbar-label">${b.label}</span>
            <div class="rbar-track">
              <div class="rbar-fill ${b.cls}" style="width:${b.pct}%"></div>
            </div>
            <span class="rbar-count">${b.count}</span>
          </div>
        `).join('')}
      </div>

      <div class="result-cat-info">
        Catégorie : <strong>${categoryLabel}</strong>
      </div>

      <div class="result-actions">
        <button class="q-next-btn btn-secondary" onclick="restartQuiz()">🔄 Rejouer</button>
        <button class="q-next-btn" onclick="startQuiz('${selectedCategory}')">🎲 Nouvelle partie</button>
      </div>
      <div class="result-actions" style="margin-top:0.5rem">
        <button class="q-next-btn btn-home" onclick="goHome()">🏠 Choisir une catégorie</button>
      </div>
    </div>
  `;

  showScreen('screen-results');
}

/* ---------- Redémarrer ---------- */
function restartQuiz() {
  startQuiz(selectedCategory);
}

/* ---------- Accueil ---------- */
function goHome() {
  clearTimer();
  showScreen('screen-home');
}

/* ---------- Timer ---------- */
function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearTimer();
      // Temps écoulé : forcer une mauvaise réponse
      if (!answered) {
        autoTimeOut();
      }
    }
  }, 1000);
}

function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const numEl = document.getElementById('timer-num');
  const circleEl = document.getElementById('timer-circle');
  if (!numEl || !circleEl) return;

  numEl.textContent = timeLeft;

  const circumference = 2 * Math.PI * 34; // 213.6
  const fraction = timeLeft / 30;
  const offset = circumference * (1 - fraction);
  circleEl.style.strokeDashoffset = offset;

  // Changer couleur selon temps restant
  if (timeLeft <= 10) {
    circleEl.style.stroke = '#E53935';
    numEl.style.color = '#E53935';
  } else if (timeLeft <= 20) {
    circleEl.style.stroke = '#FF9800';
    numEl.style.color = '#FF9800';
  } else {
    circleEl.style.stroke = 'var(--green)';
    numEl.style.color = 'var(--text-dark)';
  }
}

function autoTimeOut() {
  answered = true;
  const q = questions[currentIndex];

  // Marquer toutes les options comme désactivées, montrer la bonne
  const opts = document.querySelectorAll('.q-option');
  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
  });

  // Explication avec message "Temps écoulé"
  const expl = document.getElementById('q-explanation');
  if (expl) {
    expl.style.display = 'flex';
    // Ajouter badge "Temps écoulé" avant l'explication
    const timeoutBadge = document.createElement('div');
    timeoutBadge.className = 'timeout-badge';
    timeoutBadge.textContent = '⏰ Temps écoulé !';
    expl.insertBefore(timeoutBadge, expl.firstChild);
  }

  const actions = document.getElementById('q-actions');
  if (actions) actions.style.display = 'flex';
}

/* ---------- Helpers ---------- */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getCategoryInfo(id) {
  const data = window.QUIZ_DATA;
  if (!data) return { id, name: id, icon: '❓', color: '#1B6B3A' };
  return data.categories.find(c => c.id === id) || { id, name: id, icon: '❓', color: '#1B6B3A' };
}

function getBadge(pct) {
  if (pct >= 95) return { emoji: '👑', label: 'Maître islamique !' };
  if (pct >= 80) return { emoji: '🏆', label: 'Excellent !' };
  if (pct >= 60) return { emoji: '⭐', label: 'Bien joué !' };
  if (pct >= 40) return { emoji: '🌙', label: 'Bon début' };
  return { emoji: '📚', label: "Continue d'apprendre" };
}

function showScreen(id) {
  ['screen-home', 'screen-question', 'screen-results'].forEach(sid => {
    const el = document.getElementById(sid);
    if (!el) return;
    if (sid === id) {
      el.style.display = '';
      el.classList.add('active');
      // Scroll vers le haut du quiz
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      el.style.display = 'none';
      el.classList.remove('active');
    }
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});
