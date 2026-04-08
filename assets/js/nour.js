/* ============================================================
   AL-HUDA — Nour AI Islamic Assistant
   Utilise l'API Groq (gratuite, CORS-friendly)
   ============================================================ */

const NOUR_KEY_STORAGE  = 'al-huda-groq-key';
const NOUR_HIST_STORAGE = 'al-huda-nour-history';
const GROQ_ENDPOINT     = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL        = 'meta-llama/llama-4-scout-17b-16e-instruct';

const SYSTEM_PROMPT = `Tu es Nour (نور — « La Lumière »), une assistante islamique savante et bienveillante créée pour le site Al-Huda (الهُدى — Le Guide). Ton rôle est d'aider les musulmans et toute personne curieuse de l'Islam à mieux comprendre leur religion.

Tes sources de référence :
1. Le Saint Coran — cite toujours la sourate et le verset entre parenthèses, ex : (Al-Baqara 2:255)
2. Les hadiths authentiques des Kutub as-Sitta (Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah) — cite le recueil
3. Le consensus (Ijma') des savants de l'Islam
4. Les enseignements des pieux prédécesseurs (As-Salaf as-Salih)
5. Les grands Ulema : Ibn Taymiyya, Ibn al-Qayyim, Ibn Kathir, An-Nawawi, Al-Ghazali, Ibn Hajar al-Asqalani, Al-Qurtubi, et les savants contemporains fiables

Règles impératives :
- N'invente JAMAIS un verset coranique ou un hadith — si tu n'es pas certain, dis-le clairement
- Dis "Allahu A'lam" (Allah sait mieux) face aux questions complexes ou litigieuses
- Pour les sujets juridiques (halal/haram, fiqh), présente les positions des 4 madhabs (Hanafi, Maliki, Shafi'i, Hanbali) quand elles divergent
- Rappelle à l'utilisateur de consulter un érudit local pour les décisions importantes
- Ne te prononce pas sur des questions purement politiques
- Utilise le français en priorité, mais intègre les termes arabes importants avec leur traduction
- Sois concis, précis, humble et bienveillant
- Pour les questions sensibles (mariage, divorce, héritage...), donne les principes généraux et renvoie vers un imam ou érudit

Style de réponse :
- Structure tes réponses avec des **titres en gras** si la réponse est longue
- Commence les réponses importantes par "Bismillah" ou une invocation
- Termine souvent par un rappel ou une invocation douce`;

/* ---- État ---- */
let chatHistory = [];
let isLoading   = false;

/* ---- DOM refs ---- */
let messagesEl, inputEl, sendBtn, apikeyBanner, apikeyInput;

/* ---- Init ---- */
function initNour() {
  messagesEl   = document.getElementById('nour-messages');
  inputEl      = document.getElementById('nour-input');
  sendBtn      = document.getElementById('nour-send');
  apikeyBanner = document.getElementById('nour-apikey-banner');
  apikeyInput  = document.getElementById('nour-apikey-input');

  if (!messagesEl) return;

  // Vérifier clé API
  const key = getApiKey();
  if (!key) {
    showApikeyBanner();
  } else {
    hideApikeyBanner();
  }

  // Restaurer l'historique
  loadHistory();

  // Events
  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  inputEl?.addEventListener('input', autoResizeInput);

  sendBtn?.addEventListener('click', sendMessage);

  // Bouton sauvegarder clé (dans la bannière)
  document.getElementById('nour-apikey-save')?.addEventListener('click', saveApiKeyFromBanner);

  // Bouton nouveau chat
  document.getElementById('nour-new-chat')?.addEventListener('click', newChat);

  // Bouton réglages (ouvre modal)
  document.getElementById('nour-settings-btn')?.addEventListener('click', openModal);
  document.getElementById('nour-modal-cancel')?.addEventListener('click', closeModal);
  document.getElementById('nour-modal-save')?.addEventListener('click', saveApiKeyFromModal);
  document.getElementById('nour-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'nour-modal-overlay') closeModal();
  });

  // Suggestions
  document.querySelectorAll('.nour-suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-q');
      if (text && inputEl) {
        inputEl.value = text;
        inputEl.focus();
        autoResizeInput.call(inputEl);
      }
    });
  });
}

/* ---- API Key ---- */
function getApiKey() {
  return localStorage.getItem(NOUR_KEY_STORAGE) || '';
}
function saveApiKey(key) {
  localStorage.setItem(NOUR_KEY_STORAGE, key.trim());
}
function showApikeyBanner() {
  apikeyBanner?.classList.remove('hidden');
}
function hideApikeyBanner() {
  apikeyBanner?.classList.add('hidden');
}
function saveApiKeyFromBanner() {
  const val = apikeyInput?.value?.trim();
  if (!val) { alert('Veuillez entrer votre clé API Groq.'); return; }
  saveApiKey(val);
  hideApikeyBanner();
  appendSystemMsg('✅ Clé API enregistrée ! Je suis prête à répondre à tes questions.');
}
function saveApiKeyFromModal() {
  const input = document.getElementById('nour-modal-key-input');
  const val = input?.value?.trim();
  if (!val) { alert('Veuillez entrer une clé API valide.'); return; }
  saveApiKey(val);
  closeModal();
  hideApikeyBanner();
  appendSystemMsg('✅ Clé API mise à jour !');
}

/* ---- Modal ---- */
function openModal() {
  const overlay = document.getElementById('nour-modal-overlay');
  overlay?.classList.add('open');
  const input = document.getElementById('nour-modal-key-input');
  if (input) input.value = getApiKey();
}
function closeModal() {
  document.getElementById('nour-modal-overlay')?.classList.remove('open');
}

/* ---- Historique ---- */
function loadHistory() {
  try {
    const saved = localStorage.getItem(NOUR_HIST_STORAGE);
    if (saved) {
      chatHistory = JSON.parse(saved);
      // Ré-afficher les messages
      chatHistory.forEach(msg => {
        if (msg.role === 'user') {
          renderMessage('user', msg.content);
        } else if (msg.role === 'assistant') {
          renderMessage('assistant', msg.content);
        }
      });
      scrollToBottom();
    }
  } catch { chatHistory = []; }
}
function saveHistory() {
  // Garder max 20 échanges (40 messages)
  if (chatHistory.length > 40) {
    chatHistory = chatHistory.slice(-40);
  }
  localStorage.setItem(NOUR_HIST_STORAGE, JSON.stringify(chatHistory));
}
function newChat() {
  if (!confirm('Effacer cette conversation et en commencer une nouvelle ?')) return;
  chatHistory = [];
  localStorage.removeItem(NOUR_HIST_STORAGE);
  messagesEl.innerHTML = '';
  showWelcome();
}

/* ---- Envoyer un message ---- */
async function sendMessage() {
  const text = inputEl?.value?.trim();
  if (!text || isLoading) return;

  const key = getApiKey();
  if (!key) {
    showApikeyBanner();
    appendSystemMsg('⚠️ Configure d\'abord ta clé API Groq ci-dessus.');
    return;
  }

  // Afficher message utilisateur
  hideWelcome();
  renderMessage('user', text);
  chatHistory.push({ role: 'user', content: text });

  // Vider l'input
  inputEl.value = '';
  inputEl.style.height = 'auto';

  // Désactiver l'envoi
  isLoading = true;
  sendBtn.disabled = true;

  // Afficher indicateur de frappe
  const typingId = showTyping();

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chatHistory.slice(-20) // garder les 20 derniers messages pour le contexte
    ];

    const res = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: messages,
        temperature: 0.6,
        max_tokens: 1024,
        stream: false
      })
    });

    removeTyping(typingId);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      if (res.status === 401) {
        renderMessage('assistant', '❌ **Clé API invalide.** Va dans les réglages (⚙️) pour corriger ta clé Groq.');
      } else if (res.status === 429) {
        renderMessage('assistant', '⏳ **Limite atteinte.** L\'API Groq est temporairement saturée. Réessaie dans quelques secondes.');
      } else {
        renderMessage('assistant', `❌ **Erreur ${res.status}** : ${err.error?.message || 'Erreur inconnue.'}`);
      }
    } else {
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Désolée, je n\'ai pas pu générer de réponse.';
      renderMessage('assistant', reply);
      chatHistory.push({ role: 'assistant', content: reply });
      saveHistory();
    }

  } catch (e) {
    removeTyping(typingId);
    renderMessage('assistant', '❌ **Erreur réseau.** Vérifie ta connexion internet et réessaie.');
    console.error('[Nour]', e);
  } finally {
    isLoading = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }
}

/* ---- Rendu messages ---- */
function renderMessage(role, content) {
  const wrap = document.createElement('div');
  wrap.className = `nour-msg ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'nour-msg-avatar';
  avatar.textContent = role === 'user' ? '👤' : '🌙';

  const bubble = document.createElement('div');
  bubble.className = 'nour-msg-bubble';
  bubble.innerHTML = formatText(content);

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);
  scrollToBottom();
}

function appendSystemMsg(text) {
  const p = document.createElement('p');
  p.style.cssText = 'text-align:center;font-size:.82rem;color:var(--text-secondary);margin:.5rem 0;';
  p.textContent = text;
  messagesEl.appendChild(p);
  scrollToBottom();
}

function showTyping() {
  const id = 'typing-' + Date.now();
  const wrap = document.createElement('div');
  wrap.className = 'nour-msg assistant nour-typing';
  wrap.id = id;
  wrap.innerHTML = `
    <div class="nour-msg-avatar">🌙</div>
    <div class="nour-msg-bubble">
      <span class="nour-typing-dot"></span>
      <span class="nour-typing-dot"></span>
      <span class="nour-typing-dot"></span>
    </div>`;
  messagesEl.appendChild(wrap);
  scrollToBottom();
  return id;
}
function removeTyping(id) {
  document.getElementById(id)?.remove();
}

function showWelcome() {
  const existing = messagesEl.querySelector('.nour-welcome');
  if (!existing) {
    messagesEl.innerHTML = `
      <div class="nour-welcome">
        <div class="nour-welcome-icon">🌙</div>
        <h3>Assalamu Alaykum !</h3>
        <p>Je suis <strong>Nour</strong>, ton assistante islamique.<br>
        Pose-moi une question sur le Coran, la Sunnah, l'histoire ou les pratiques islamiques.</p>
      </div>`;
  }
}
function hideWelcome() {
  messagesEl.querySelector('.nour-welcome')?.remove();
}

/* ---- Format texte ---- */
function formatText(text) {
  // Escape HTML d'abord
  let safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **texte**
  safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic *texte*
  safe = safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Retours à la ligne
  safe = safe.replace(/\n/g, '<br>');
  // Références coraniques entre parenthèses
  safe = safe.replace(/\(([A-Za-z\u00C0-\u024F\-]+ \d+:\d+(?:-\d+)?)\)/g,
    '<span class="verse-ref">($1)</span>');

  return safe;
}

/* ---- Helpers ---- */
function scrollToBottom() {
  if (messagesEl) {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
}
function autoResizeInput() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
}

/* ---- Boot ---- */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNour);
} else {
  initNour();
}
