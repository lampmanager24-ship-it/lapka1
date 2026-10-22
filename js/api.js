export async function fetchTours() {
  // Повертаємо масив напряму, обійшовши обмеження локального fetch()
  return [
    { id: 1, title: "Вікенд у Парижі", category: "міста", description: "романтична подорож до столиці Франції з екскурсіями.", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" },
    { id: 2, title: "Похід у Карпати", category: "гори", description: "активний відпочинок, підйом на Говерлу та колиби.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" },
    { id: 3, title: "Релакс у Туреччині", category: "море", description: "пляжний відпочинок все включено на узбережжі Середземного моря.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400" },
    { id: 4, title: "Античний Рим", category: "міста", description: "занурення в історію Стародавнього Риму та Ватикану.", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400" },
    { id: 5, title: "Альпійський лижний курорт", category: "гори", description: "снігові схили Швейцарії для шанувальників лиж та борду.", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400" },
    { id: 6, title: "Грецькі острови", category: "море", description: "білосніжні будиночки Санторіні та блакитні лагуни Егейського моря.", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400" },
    { id: 7, title: "Прага готична", category: "міста", description: "архітектурні шедеври, вузькі вулички та чеське пиво.", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=400" },
    { id: 8, title: "Тропічний відпочинок", category: "море", description: "пальми, океан та повне усамітнення на екзотичних пляжах.", image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400" }
  ];
}