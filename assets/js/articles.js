/* ============================================================
   AL-HUDA — Script Bibliothèque Islamique
   ============================================================ */

let activeCategory = 'all';
let searchQuery    = '';

function initLibrary() {
  initSearch();
  initFilters();
  countVisible();

  // Observer reveal
  document.querySelectorAll('.reveal').forEach(el => window.revealObserver && window.revealObserver.observe(el));
}

/* ---------- Filtres catégories ---------- */
function initFilters() {
  document.querySelectorAll('.lib-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      document.querySelectorAll('.lib-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });
}

/* ---------- Recherche ---------- */
function initSearch() {
  const input = document.getElementById('lib-search');
  const clear = document.getElementById('lib-search-clear');

  input?.addEventListener('input', () => {
    searchQuery = input.value.toLowerCase().trim();
    clear.style.display = input.value ? 'block' : 'none';
    applyFilters();
  });
  clear?.addEventListener('click', () => {
    input.value = '';
    searchQuery = '';
    clear.style.display = 'none';
    applyFilters();
  });
}

/* ---------- Application des filtres ---------- */
function applyFilters() {
  const sections = document.querySelectorAll('.lib-category-section');

  sections.forEach(section => {
    const sectionCat = section.dataset.cat;
    const cards      = section.querySelectorAll('.lib-card');

    let visibleInSection = 0;

    cards.forEach(card => {
      const cardCat  = card.dataset.cat;
      const cardName = (card.dataset.name || '').toLowerCase();
      const cardText = card.textContent.toLowerCase();

      const matchCat    = activeCategory === 'all' || cardCat === activeCategory;
      const matchSearch = !searchQuery || cardText.includes(searchQuery);

      if (matchCat && matchSearch) {
        card.classList.remove('filtered-out');
        visibleInSection++;
      } else {
        card.classList.add('filtered-out');
      }
    });

    // Cacher la section entière si aucune card visible
    if (visibleInSection === 0) {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
    }
  });

  countVisible();
}

function countVisible() {
  const visible = document.querySelectorAll('.lib-card:not(.filtered-out)').length;
  const el = document.getElementById('lib-count');
  if (el) el.textContent = visible;
}

/* ---------- RevealObserver (utilise l'instance globale de main.js) ---------- */

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', initLibrary);
