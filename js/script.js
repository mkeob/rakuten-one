// Custom Script
// Slider functionality and Scroll to Top Button
document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentSlide = 0;
    const slideCount = slides.length;

    // Create bullet points container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    if (sliderWrapper) {
        sliderWrapper.parentElement.appendChild(dotsContainer);
        // Create dots
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.className = 'slider-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Function to update slider position and dots
    function updateSlider() {
        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update dots
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }

    // Event listener for next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        });
    }

    // Event listener for previous button
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        });
    }

    // Auto slide every 5 seconds
    let autoSlideInterval;
    if (sliderWrapper) {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
    }

    // Responsive adjustments for window resize
    function handleResponsiveLayout() {
        // Adjust common items layout based on screen size
        const commonItems = document.querySelectorAll('.common-item');
        const windowWidth = window.innerWidth;

        // Reset slider if needed
        updateSlider();

        // Adjust font sizes and padding dynamically if needed
        if (windowWidth <= 480) {
            commonItems.forEach(item => {
                item.classList.add('small-screen');
            });
        } else {
            commonItems.forEach(item => {
                item.classList.remove('small-screen');
            });
        }
    }

    // Initial call to set up responsive layout
    handleResponsiveLayout();

    // Add resize event listener
    window.addEventListener('resize', handleResponsiveLayout);

    // Touch events for mobile swipe on slider
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderWrapper) {
        sliderWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        sliderWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        } else if (touchEndX > touchStartX) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        }
    }

    // Scroll to top and bottom buttons functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const scrollDownBtn = document.getElementById('scrollDownBtn');

    // Show/hide scroll buttons based on scroll position
    function toggleScrollButtons() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Show/hide scroll to top button
        if (scrollPosition > windowHeight / 2) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Show/hide scroll to bottom button
        if (scrollPosition < documentHeight - windowHeight * 1.5) {
            scrollDownBtn.classList.add('show');
        } else {
            scrollDownBtn.classList.remove('show');
        }
    }

    // Initial check for scroll buttons
    toggleScrollButtons();

    // Add scroll event listener
    window.addEventListener('scroll', toggleScrollButtons);

    // Scroll to top button click event
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll to bottom button click event
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle Enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Add aria-controls attribute
        navbarToggler.setAttribute('aria-controls', 'navbarScroll');
        
        // Handle click outside to close menu
        document.addEventListener('click', (e) => {
            const isClickInside = navbarToggler.contains(e.target) || navbarCollapse.contains(e.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });

        // Close menu on window resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    }
});
