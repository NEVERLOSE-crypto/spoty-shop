document.addEventListener('DOMContentLoaded', function() {
  
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
           
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
          
            this.classList.add('active');
            
          
            const largeImageUrl = this.getAttribute('data-large');
            mainImage.src = largeImageUrl;
            
          
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });

  
    const reviewForm = document.getElementById('review-form');
    const reviewList = document.getElementById('review-list');
    const productId = 'product-1'; 

  
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
        displayReviews(reviews);
    }

   
    function displayReviews(reviews) {
        reviewList.innerHTML = reviews.map(review => `
            <div class="review">
                <div class="review-header">
                    <div class="review-author">${review.name}</div>
                    <div class="review-rating">
                        ${getRatingStars(review.rating)}
                    </div>
                </div>
                <div class="review-date">${new Date(review.date).toLocaleDateString('ru-RU')}</div>
                <div class="review-text">${review.text}</div>
            </div>
        `).join('');
    }

    
    function getRatingStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

   
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('review-name').value;
        const rating = parseInt(document.getElementById('review-rating').value);
        const text = document.getElementById('review-text').value;
        
       
        const newReview = {
            name,
            rating,
            text,
            date: new Date().toISOString()
        };
        
        
        const reviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
        
        
        reviews.unshift(newReview);
        
       
        localStorage.setItem(`reviews-${productId}`, JSON.stringify(reviews));
        
        
        displayReviews(reviews);
        
       
        reviewForm.reset();
        
        
        alert('Спасибо за ваш отзыв!');
    });

   
    loadReviews();
});