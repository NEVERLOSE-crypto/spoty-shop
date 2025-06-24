document.addEventListener('DOMContentLoaded', function() {
    // Данные товаров
    const products = [
        {
            id: 1,
            name: "Кроссовки для бега",
            price: 5999,
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
            category: "Обувь"
        },
        {
            id: 2,
            name: "Футболка тренировочная",
            price: 1999,
            image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1459&q=80",
            category: "Одежда"
        },
        {
            id: 3,
            name: "Йога-коврик",
            price: 1299,
            image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
            category: "Аксессуары"
        },
        {
            id: 4,
            name: "Беговая дорожка",
            price: 34999,
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            category: "Оборудование"
        },
        {
            id: 5,
            name: "Гантели 5 кг",
            price: 2499,
            image: "https://images.unsplash.com/photo-1571019614243-c7780e0d15ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            category: "Оборудование"
        },
        {
            id: 6,
            name: "Спортивный рюкзак",
            price: 3599,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            category: "Аксессуары"
        }
    ];

    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const paginationContainer = document.getElementById('pagination');
    
    
    const itemsPerPage = 3;
    let currentPage = 1;
    let filteredProducts = [...products];

   
    function displayProducts() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
        
        productsContainer.innerHTML = paginatedProducts.length ? 
            paginatedProducts.map(product => `
                <div class="product-card">
                    <a href="product.html?id=${product.id}" class="product-link">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-price">${product.price.toLocaleString()} ₽</div>
                            <button class="btn add-to-cart">В корзину</button>
                        </div>
                    </a>
                </div>
            `).join('') : '<p class="no-results">Товары не найдены</p>';

        renderPagination();
    }

 
    function renderPagination() {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        paginationContainer.innerHTML = '';
        
        if (totalPages <= 1) return;
        
       
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo;';
        prevButton.className = 'page-button';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayProducts();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
        paginationContainer.appendChild(prevButton);
       
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = `page-button ${i === currentPage ? 'active' : ''}`;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayProducts();
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
            paginationContainer.appendChild(pageButton);
        }
        
       
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&raquo;';
        nextButton.className = 'page-button';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayProducts();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
        paginationContainer.appendChild(nextButton);
    }

   
    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
        
        currentPage = 1;
        applySortAndDisplay();
    }

    function sortProducts(productsToSort, sortOption) {
        switch(sortOption) {
            case 'price-asc':
                return [...productsToSort].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...productsToSort].sort((a, b) => b.price - a.price);
            case 'name-asc':
                return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return [...productsToSort].sort((a, b) => b.name.localeCompare(a.name));
            default:
                return productsToSort;
        }
    }

    function applySortAndDisplay() {
        filteredProducts = sortProducts(filteredProducts, sortSelect.value);
        displayProducts();
    }


    searchInput.addEventListener('input', searchProducts);
    sortSelect.addEventListener('change', applySortAndDisplay);


    displayProducts();
});