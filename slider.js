document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    // Создаем точки для навигации
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Функция переключения слайда
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        const dots = document.querySelectorAll('.slider-dot');
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        setTimeout(() => {
            isAnimating = false;
        }, 600); // Должно совпадать с длительностью перехода в CSS
    }

    // Автоматическое переключение
    function startSlider() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    // Остановка автоматического переключения
    function pauseSlider() {
        clearInterval(slideInterval);
    }

    // Инициализация слайдера
    function initSlider() {
        createDots();
        startSlider();
        
        // Обработчики событий
        prevBtn.addEventListener('click', () => {
            pauseSlider();
            goToSlide(currentSlide - 1);
            startSlider();
        });

        nextBtn.addEventListener('click', () => {
            pauseSlider();
            goToSlide(currentSlide + 1);
            startSlider();
        });

        slider.addEventListener('mouseenter', pauseSlider);
        slider.addEventListener('mouseleave', startSlider);
    }

    initSlider();
});