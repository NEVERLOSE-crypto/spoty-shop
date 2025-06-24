document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем элементы формы
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Получаем элементы ошибок
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('success-message');
    
    // Сбрасываем предыдущие ошибки
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    messageError.style.display = 'none';
    successMessage.style.display = 'none';
    
    nameInput.parentElement.classList.remove('invalid');
    emailInput.parentElement.classList.remove('invalid');
    messageInput.parentElement.classList.remove('invalid');
    
    // Флаг валидации
    let isValid = true;
    
    // Валидация имени
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Поле имени обязательно';
        nameError.style.display = 'block';
        nameInput.parentElement.classList.add('invalid');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Имя должно содержать минимум 2 символа';
        nameError.style.display = 'block';
        nameInput.parentElement.classList.add('invalid');
        isValid = false;
    }
    
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Поле email обязательно';
        emailError.style.display = 'block';
        emailInput.parentElement.classList.add('invalid');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Введите корректный email';
        emailError.style.display = 'block';
        emailInput.parentElement.classList.add('invalid');
        isValid = false;
    }
    
    // Валидация сообщения
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Поле сообщения обязательно';
        messageError.style.display = 'block';
        messageInput.parentElement.classList.add('invalid');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Сообщение должно содержать минимум 10 символов';
        messageError.style.display = 'block';
        messageInput.parentElement.classList.add('invalid');
        isValid = false;
    }
    
    // Если форма валидна
    if (isValid) {
        successMessage.style.display = 'block';
        // Сбрасываем форму
        this.reset();
        // Прокручиваем к сообщению об успехе
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
});