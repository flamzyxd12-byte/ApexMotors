document.addEventListener('DOMContentLoaded', function () {

  // thin progress line at the top
  var bar = document.createElement('div');
  bar.className = 'progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', function () {
    var doc = document.documentElement;
    var scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    bar.style.width = scrolled + '%';
  });

  // sticky header border
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  // mobile nav
  var btn = document.getElementById('menuBtn');
  var links = document.getElementById('navLinks');
  if (btn && links) {
    btn.addEventListener('click', function () {
      links.classList.toggle('is-open');
    });
  }

  // category filters
  var filterBtns = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.car');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('is-on');
      });
      btn.classList.add('is-on');

      var type = btn.getAttribute('data-filter');

      cards.forEach(function (card, index) {
        var cats = card.getAttribute('data-category') || '';
        var match = (type === 'all' || cats.indexOf(type) !== -1);

        if (match) {
          card.style.display = '';
          setTimeout(function () {
            card.classList.add('is-visible');
          }, index * 60);
        } else {
          card.classList.remove('is-visible');
          setTimeout(function () {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // fade cards in when they enter the viewport
  function showCards() {
    cards.forEach(function (card, index) {
      var box = card.getBoundingClientRect();
      if (box.top < window.innerHeight - 40) {
        setTimeout(function () {
          card.classList.add('is-visible');
        }, index * 80);
      }
    });
  }

  showCards();
  window.addEventListener('scroll', showCards);

  // generic section reveals
  var sections = document.querySelectorAll('.reveal');

  function showSections() {
    sections.forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight - 60) {
        el.classList.add('is-in');
      }
    });
  }

  showSections();
  window.addEventListener('scroll', showSections);

  // simple lightbox
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
  document.body.appendChild(overlay);

  var bigImg = overlay.querySelector('img');
  var closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src) {
    bigImg.src = src;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // open lightbox from gallery
  var galleryImg = document.querySelector('.gallery-main img');
  if (galleryImg) {
    galleryImg.parentElement.addEventListener('click', function () {
      openLightbox(galleryImg.src);
    });
  }

  // open lightbox from hero
  var hero = document.querySelector('.hero-photo img');
  if (hero) {
    hero.style.cursor = 'zoom-in';
    hero.addEventListener('click', function () {
      openLightbox(hero.src);
    });
  }

});
