export function createTourCard(tour, onToggleFav) {
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
  favBtn.addEventListener('click', () => onToggleFav(favBtn));

  return card;
}