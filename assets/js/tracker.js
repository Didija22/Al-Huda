/* ============================================================
   AL-HUDA — Module de suivi d'activité (localStorage)
   Clés : alhuda_streak | alhuda_surahs | alhuda_daily | alhuda_quiz_stats
   ============================================================ */

(function () {
  const KEY_STREAK = 'alhuda_streak';
  const KEY_SURAHS = 'alhuda_surahs';
  const KEY_DAILY  = 'alhuda_daily';
  const KEY_QUIZ   = 'alhuda_quiz_stats';

  /* ---- Utilitaires ---- */
  function today()     { return new Date().toISOString().slice(0, 10); }
  function yesterday() {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }
  function get(k)    { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }
  function set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

  /* ---- Série de jours (streak) ---- */
  function trackVisit() {
    const t = today();
    let s = get(KEY_STREAK) || { lastVisit: null, count: 0, best: 0 };
    if (s.lastVisit === t) return;                  // déjà compté aujourd'hui
    s.count = (s.lastVisit === yesterday()) ? s.count + 1 : 1;
    s.best  = Math.max(s.best, s.count);
    s.lastVisit = t;
    set(KEY_STREAK, s);

    // Journalier
    const d = get(KEY_DAILY) || {};
    d[t] = d[t] || { surahs: [], quizzes: 0 };
    set(KEY_DAILY, d);
  }

  /* ---- Lecture d'une sourate ---- */
  function trackSurah(num) {
    const surahs = get(KEY_SURAHS) || {};
    surahs[num] = Date.now();
    set(KEY_SURAHS, surahs);

    const t = today();
    const d = get(KEY_DAILY) || {};
    d[t] = d[t] || { surahs: [], quizzes: 0 };
    if (!d[t].surahs.includes(num)) d[t].surahs.push(num);
    set(KEY_DAILY, d);
  }

  /* ---- Quiz complété ---- */
  function trackQuiz(score, total) {
    const q = get(KEY_QUIZ) || { done: 0, totalScore: 0, totalQ: 0 };
    q.done++;
    q.totalScore += score;
    q.totalQ     += total;
    set(KEY_QUIZ, q);

    const t = today();
    const d = get(KEY_DAILY) || {};
    d[t] = d[t] || { surahs: [], quizzes: 0 };
    d[t].quizzes++;
    set(KEY_DAILY, d);
  }

  /* ---- Lire les stats ---- */
  function getStats() {
    const streak = get(KEY_STREAK) || { count: 0, best: 0 };
    const surahs = get(KEY_SURAHS) || {};
    const quiz   = get(KEY_QUIZ)   || { done: 0, totalScore: 0, totalQ: 0 };
    const daily  = get(KEY_DAILY)  || {};

    const bm    = Object.keys(localStorage).filter(k => k.startsWith('alhuda_bm_')).length;
    const notes = Object.keys(localStorage).filter(k => k.startsWith('alhuda_note_')).length;

    // Activité 7 derniers jours
    const week = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = d.toISOString().slice(0, 10);
      week.push({ date: k, surahs: (daily[k]?.surahs?.length || 0), quizzes: (daily[k]?.quizzes || 0) });
    }

    return {
      streak:      streak.count,
      bestStreak:  streak.best,
      surahsRead:  Object.keys(surahs).length,
      surahsMap:   surahs,           // { "1": ts, ... }
      bookmarks:   bm,
      notes:       notes,
      quizDone:    quiz.done,
      quizAvg:     quiz.totalQ > 0 ? Math.round((quiz.totalScore / quiz.totalQ) * 100) : 0,
      week,
    };
  }

  /* ---- Exposer globalement ---- */
  window.AlHudaTracker = { trackVisit, trackSurah, trackQuiz, getStats };

  /* Toujours tracker la visite au chargement */
  trackVisit();
})();
