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
    

    animateOnScroll();

    window.addEventListener('scroll', animateOnScroll);
    
   
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.setAttribute('data-animate', 'true');
        card.setAttribute('data-animate-delay', (index * 100).toString());
    });
});