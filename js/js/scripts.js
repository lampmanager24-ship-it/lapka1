// Масив даних (8 об'єктів, 3 категорії)
const toursData = [
  { id: 1, title: "Вікенд у Парижі", category: "міста", description: "романтична подорож до столиці Франції з екскурсіями.", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" },
  { id: 2, title: "Похід у Карпати", category: "гори", description: "активний відпочинок, підйом на Говерлу та колиби.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" },
  { id: 3, title: "Релакс у Туреччині", category: "море", description: "пляжний відпочинок все включено на узбережжі Середземного моря.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400" },
  { id: 4, title: "Античний Рим", category: "міста", description: "занурення в історію Стародавнього Риму та Ватикану.", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400" },
  { id: 5, title: "Альпійський лижний курорт", category: "гори", description: "снігові схили Швейцарії для шанувальників лиж та борду.", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400" },
  { id: 6, title: "Грецькі острови", category: "море", description: "білосніжні будиночки Санторіні та блакитні лагуни Егейського моря.", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400" },
  { id: 7, title: "Прага готична", category: "міста", description: "архітектурні шедеври, вузькі вулички та чеське пиво.", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=400" },
  { id: 8, title: "Тропічний відпочинок", category: "море", description: "пальми, океан та повне усамітнення на екзотичних пляжах.", image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400" }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tours-container');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const noResultsMsg = document.getElementById('no-results-msg');

  let currentCategory = 'all';
  let searchQuery = '';

  // Окрема функція створення картки
  function createTourCard(tour) {
    const card = document.createElement('div');
    card.className = 'tour-card';
    card.innerHTML = `
      <img src="${tour.image}" alt="${tour.title}" width="300">
      <h3>${tour.title}</h3>
      <p class="category-tag">Категорія: ${tour.category}</p>
      <p>${tour.description}</p>
      <button type="button" class="js-fav-btn">♡ в обране</button>
    `;

    const favBtn = card.querySelector('.js-fav-btn');
    favBtn.addEventListener('click', () => {
      favBtn.classList.toggle('is-active');
      favBtn.textContent = favBtn.classList.contains('is-active') ? '♥ в обраному' : '♡ в обране';
    });

    return card;
  }

  // Окрема функція рендерингу списку
  function renderTours() {
    container.innerHTML = '';

    const filteredTours = toursData.filter(tour => {
      const matchesCategory = currentCategory === 'all' || tour.category === currentCategory;
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery) || 
                            tour.description.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filteredTours.length === 0) {
      noResultsMsg.classList.remove('is-hidden');
    } else {
      noResultsMsg.classList.add('is-hidden');
      filteredTours.forEach(tour => {
        container.appendChild(createTourCard(tour));
      });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderTours();
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentCategory = btn.getAttribute('data-category');
      renderTours();
    });
  });

  renderTours();
});