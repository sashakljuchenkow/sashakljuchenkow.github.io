const gallery = document.querySelector('.lightbox');
const galleryImage = document.querySelector('.lightbox-image');
const galleryTitle = document.querySelector('.lightbox-title');
const galleryCounter = document.querySelector('.lightbox-counter');
const menuButton = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');

const galleries = {
  portrait: { title: 'Portrait', folder: 'portrait', count: 16, extension: 'jpg' },
  fashion: { title: 'Fashion', folder: 'fashion', count: 23, extension: 'jpg' },
  art: { title: 'Contemporary Art', folder: 'art', count: 0, extension: 'jpg' },
  documentary: { title: 'Documentary', folder: 'documentary', count: 0, extension: 'jpg' },
  landscape: { title: 'Landscape', folder: 'landscape', count: 17, extension: 'jpg' }
};

let activeGallery = null;
let activeIndex = 1;

function imagePath(info, index) {
  return `assets/${info.folder}/${String(index).padStart(2, '0')}.${info.extension}`;
}

function showGallery(folder, index = 1) {
  const info = galleries[folder];
  if (!info || !gallery) return;

  activeGallery = info;
  activeIndex = index;
  gallery.classList.add('is-open');
  gallery.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');

  if (activeGallery.count === 0) {
    galleryImage.classList.add('is-missing');
    galleryImage.removeAttribute('src');
    galleryTitle.textContent = activeGallery.title;
    galleryCounter.textContent = 'Photos coming soon';
    return;
  }

  loadGalleryImage();
}

function loadGalleryImage() {
  if (!activeGallery) return;

  galleryImage.classList.remove('is-missing');
  galleryImage.src = imagePath(activeGallery, activeIndex);
  galleryImage.alt = `${activeGallery.title} photograph ${activeIndex}`;
  galleryTitle.textContent = activeGallery.title;
  galleryCounter.textContent = `${String(activeIndex).padStart(2, '0')} / ${String(activeGallery.count).padStart(2, '0')}`;

  galleryImage.onerror = () => {
    galleryImage.classList.add('is-missing');
    galleryImage.removeAttribute('src');
    galleryCounter.textContent = 'Add photos to assets/' + activeGallery.folder;
  };
}

function closeGallery() {
  if (!gallery) return;
  gallery.classList.remove('is-open');
  gallery.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  activeGallery = null;
}

function nextImage() {
  if (!activeGallery || activeGallery.count === 0) return;
  activeIndex += 1;
  if (activeIndex > activeGallery.count) activeIndex = 1;
  loadGalleryImage();
}

function prevImage() {
  if (!activeGallery || activeGallery.count === 0) return;
  activeIndex -= 1;
  if (activeIndex < 1) activeIndex = activeGallery.count;
  loadGalleryImage();
}

document.querySelectorAll('[data-gallery]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showGallery(link.dataset.gallery);
  });
});

document.querySelector('.lightbox-close')?.addEventListener('click', closeGallery);
document.querySelector('.lightbox-next')?.addEventListener('click', nextImage);
document.querySelector('.lightbox-prev')?.addEventListener('click', prevImage);

gallery?.addEventListener('click', event => {
  if (event.target === gallery) closeGallery();
});

document.addEventListener('keydown', event => {
  if (!gallery?.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowRight') nextImage();
  if (event.key === 'ArrowLeft') prevImage();
});

menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});
