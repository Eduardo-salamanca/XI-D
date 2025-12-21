// Photo memory slider with game character selection effect
const photoSlider = document.getElementById('photoSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.getElementById('indicators');
const photoCounter = document.getElementById('photoCounter');

let currentIndex = 0;
let photos = [];

// Initialize photos array
function refreshPhotos() {
    photos = Array.from(photoSlider.querySelectorAll('.photo-item'));
    if (photos.length > 0) {
        goToPhoto(Math.min(currentIndex, photos.length - 1));
    } else {
        updateIndicators();
        updateButtons();
        updateCounter();
    }
}

// Update indicators
function updateIndicators() {
    indicators.innerHTML = '';
    photos.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === currentIndex ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToPhoto(index));
        indicators.appendChild(indicator);
    });
}

// Update counter
function updateCounter() {
    if (photoCounter) {
        photoCounter.textContent = `${currentIndex + 1} / ${photos.length || 1}`;
    }
}

// Go to specific photo
function goToPhoto(index) {
    if (photos.length === 0) return;
    if (index < 0 || index >= photos.length) return;
    
    // Remove all classes
    photos.forEach(photo => {
        photo.classList.remove('active', 'prev', 'next');
    });
    
    // Update current index
    currentIndex = index;
    
    // Set active photo (center)
    photos[currentIndex].classList.add('active');
    
    // Set previous photo (left)
    if (currentIndex > 0) {
        photos[currentIndex - 1].classList.add('prev');
    }
    
    // Set next photo (right)
    if (currentIndex < photos.length - 1) {
        photos[currentIndex + 1].classList.add('next');
    }
    
    updateIndicators();
    updateButtons();
    updateCounter();
}

// Update button states
function updateButtons() {
    if (prevBtn) prevBtn.disabled = currentIndex === 0 || photos.length <= 1;
    if (nextBtn) nextBtn.disabled = currentIndex === photos.length - 1 || photos.length <= 1;
}

// Next photo
function nextPhoto() {
    if (currentIndex < photos.length - 1) {
        goToPhoto(currentIndex + 1);
    }
}

// Previous photo
function prevPhoto() {
    if (currentIndex > 0) {
        goToPhoto(currentIndex - 1);
    }
}

// Event listeners
if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
if (nextBtn) nextBtn.addEventListener('click', nextPhoto);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
});

// Click on side photos to navigate
document.addEventListener('click', (e) => {
    const clickedPhoto = e.target.closest('.photo-item');
    if (clickedPhoto && clickedPhoto.classList.contains('prev')) {
        prevPhoto();
    } else if (clickedPhoto && clickedPhoto.classList.contains('next')) {
        nextPhoto();
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (photoSlider) {
    photoSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    photoSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next photo
            nextPhoto();
        } else {
            // Swipe right - previous photo
            prevPhoto();
        }
    }
}

// Initialize
refreshPhotos();

// Watch for new photos added dynamically
const observer = new MutationObserver(() => {
    refreshPhotos();
});
observer.observe(photoSlider, { childList: true, subtree: true });
