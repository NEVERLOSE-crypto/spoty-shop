document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-animate]');
        const windowHeight = window.innerHeight;
        const triggerOffset = windowHeight / 1.2;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerOffset) {
                element.classList.add('animated');
            }
        });
    };
    
    // Проверяем при загрузке
    animateOnScroll();
    
    // И при прокрутке
    window.addEventListener('scroll', animateOnScroll);
    
    // Для плавного появления карточек по очереди
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.setAttribute('data-animate', 'true');
        card.setAttribute('data-animate-delay', (index * 100).toString());
    });
});