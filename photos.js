
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    const slider = document.querySelector('.photo-slider');
    const items = document.querySelectorAll('.photo-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    const indicators = [];
    let currentIndex = 0;
    let slideInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function initSlider() {
        if (items.length === 0) return;

        // Initialize first slide
        items[0].classList.add('active');
        updateIndicators();

        // Touch events
        if (slider) {
            slider.addEventListener('touchstart', touchStart, { passive: true });
            slider.addEventListener('touchend', touchEnd, { passive: true });
            slider.addEventListener('touchmove', touchMove, { passive: true });

            // Mouse events
            slider.addEventListener('mousedown', touchStart);
            window.addEventListener('mouseup', touchEnd);
            window.addEventListener('mousemove', touchMove);
        }

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);

        // Button events
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetAutoSlide();
            });
        }

        // Start auto-slide
        startAutoSlide();

        // Pause auto-slide on hover
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', startAutoSlide);
        }
    }

    function createIndicators() {
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = '';

        items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator' + (index === 0 ? ' active' : '');
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide();
            });
            indicatorsContainer.appendChild(indicator);
            indicators.push(indicator);
        });
    }

    function updateIndicators() {
        if (indicators.length === 0) createIndicators();
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        if (items.length === 0) return;
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        if (index === currentIndex) return;

        const direction = index > currentIndex ? 'next' : 'prev';

        // Reset all items first
        items.forEach((item, i) => {
            item.classList.remove('active', 'prev', 'next');
        });

        items[currentIndex].classList.add(direction === 'next' ? 'prev' : 'next');
        items[index].classList.add('active');

        currentIndex = index;
        updateIndicators();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Touch and drag handling
    function touchStart(e) {
        if (e.type === 'mousedown') {
            e.preventDefault();
            startPos = e.clientX;
        } else if (e.touches && e.touches.length === 1) {
            startPos = e.touches[0].clientX;
        } else {
            return;
        }

        isDragging = true;
        clearInterval(slideInterval);
    }

    function touchMove(e) {
        if (!isDragging) return;

        let currentPosition;
        if (e.type === 'mousemove') {
            currentPosition = e.clientX;
        } else if (e.touches && e.touches.length === 1) {
            currentPosition = e.touches[0].clientX;
        } else {
            return;
        }

        const diff = currentPosition - startPos;
        const activeItem = items[currentIndex];

        if (!activeItem) return;

        activeItem.style.transform = `translateX(${diff}px)`;
    }

    function touchEnd(e) {
        if (!isDragging) return;

        isDragging = false;

        let endPos;
        if (e.type === 'mouseup') {
            endPos = e.clientX;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            endPos = e.changedTouches[0].clientX;
        } else {
            return;
        }

        const diff = endPos - startPos;

        items[currentIndex].style.transform = '';

        // Determine if we should change slides
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }

        resetAutoSlide();
    }

    function handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                prevSlide();
                resetAutoSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                resetAutoSlide();
                break;
        }
    }

    // Initialize everything
    initSlider();
});
