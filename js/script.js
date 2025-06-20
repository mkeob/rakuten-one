// Custom Script

// Slider functionality and Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    let currentSlide = 0;
    const slideCount = slides.length;

    // Create bullet points container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
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

    // Function to update slider position and dots
    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Event listener for next button
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });

    // Event listener for previous button
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });

    // Auto slide every 5 seconds
    const autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);

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
    
    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
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
    
    // Scroll Buttons functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const scrollDownBtn = document.getElementById('scrollDownBtn');
    
    // Check if buttons exist
    if (scrollTopBtn && scrollDownBtn) {
        // Initial check for page height and show down button if page is long enough
        const initialCheck = () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            if (totalHeight > 300) {
                scrollDownBtn.classList.add('show');
            }
        };
        
        // Run initial check after page loads
        setTimeout(initialCheck, 100);
        
        // Show/hide buttons based on scroll position
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            
            // Show/hide scroll up button
            if (scrollPosition > 100) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
            
            // Show/hide scroll down button
            if (scrollPosition < totalHeight - 100) {
                scrollDownBtn.classList.add('show');
            } else {
                scrollDownBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when up button is clicked
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Scroll to bottom when down button is clicked
        scrollDownBtn.addEventListener('click', () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
});