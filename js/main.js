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