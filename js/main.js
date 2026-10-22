document.addEventListener('DOMContentLoaded', () => {
  // 1. Інтерактивність: показати/сховати додатковий опис
  const toggleBtn = document.querySelector('.js-toggle-btn');
  const detailsBlock = document.querySelector('.js-details-block');

  if (toggleBtn && detailsBlock) {
    toggleBtn.addEventListener('click', () => {
      detailsBlock.classList.toggle('is-hidden');
      toggleBtn.textContent = detailsBlock.classList.contains('is-hidden') ? 'показати більше' : 'сховати';
    });
  }

  // 2. Інтерактивність: кнопка "Обране"
  const favBtns = document.querySelectorAll('.js-fav-btn');
  favBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('is-active');
      btn.textContent = btn.classList.contains('is-active') ? '♥ в обраному' : '♡ в обране';
    });
  });

  // 3. Інтерактивність: лічильник квитків/осіб
  const minusBtn = document.querySelector('.js-counter-minus');
  const plusBtn = document.querySelector('.js-counter-plus');
  const counterValue = document.querySelector('.js-counter-value');

  if (minusBtn && plusBtn && counterValue) {
    let count = 1;
    minusBtn.addEventListener('click', () => {
      if (count > 1) {
        count--;
        counterValue.textContent = count;
      }
    });
    plusBtn.addEventListener('click', () => {
      if (count < 10) {
        count++;
        counterValue.textContent = count;
      }
    });
  }
});

import { fetchTours } from './api.js';
import { createTourCard } from './render.js';
import { debounce } from './debounce.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('tours-container');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const noResultsMsg = document.getElementById('no-results-msg');
  
  let loadingMsg = document.getElementById('loading-msg');
  let errorMsg = document.getElementById('error-msg');

  if (!loadingMsg) {
    loadingMsg = document.createElement('div');
    loadingMsg.id = 'loading-msg';
    loadingMsg.textContent = 'Завантаження даних...';
    container.before(loadingMsg);
  }

  if (!errorMsg) {
    errorMsg = document.createElement('div');
    errorMsg.id = 'error-msg';
    errorMsg.className = 'is-hidden error-box';
    errorMsg.innerHTML = `<span>Помилка завантаження даних.</span> <button id="retry-btn" type="button">Спробувати знову</button>`;
    container.before(errorMsg);
  }

  let toursData = [];
  let currentCategory = 'all';
  let searchQuery = '';

  async function loadData() {
    loadingMsg.classList.remove('is-hidden');
    errorMsg.classList.add('is-hidden');
    container.innerHTML = '';

    try {
      toursData = await fetchTours();
      renderTours();
    } catch (error) {
      console.error(error);
      errorMsg.classList.remove('is-hidden');
    } finally {
      loadingMsg.classList.add('is-hidden');
    }
  }

  function renderTours() {
    container.innerHTML = '';

    const filtered = toursData.filter(tour => {
      const matchCat = currentCategory === 'all' || tour.category === currentCategory;
      const matchSearch = tour.title.toLowerCase().includes(searchQuery) || 
                          tour.description.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      noResultsMsg.classList.remove('is-hidden');
    } else {
      noResultsMsg.classList.add('is-hidden');
      filtered.forEach(tour => {
        const card = createTourCard(tour, (favBtn) => {
          favBtn.classList.toggle('is-active');
          favBtn.textContent = favBtn.classList.contains('is-active') ? '♥ в обраному' : '♡ в обране';
        });
        container.appendChild(card);
      });
    }
  }

  const handleSearch = debounce((e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderTours();
  }, 300);

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentCategory = btn.getAttribute('data-category');
      renderTours();
    });
  });

  document.getElementById('retry-btn').addEventListener('click', loadData);

  loadData();
});