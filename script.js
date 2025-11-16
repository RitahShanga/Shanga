// Main JavaScript functionality for Shanga website
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Category configuration with necklace subcategories and pricing system
const categoryConfig = {
    collane: { 
        max: 350, 
        name: 'Collane',
        subcategories: {
            ottone: { max: 120, name: 'Ottone' },
            krobo: { max: 115, name: 'Krobo' },
            perline: { max: 115, name: 'Perline' }
        }
    },

    bracciali: { max: 50, name: 'Bracciali' },

    orecchini: { 
        name: 'Orecchini',
        subcategories: {
            ottone: { max: 100, name: 'Ottone' },
            perline: { max: 100, name: 'Perline' }
        }
    },

    decorazione: { 
        name: 'Decorazione Casa',
        subcategories: {
            portacandele: { max: 100, name: 'Portacandele' },
            centrotavole: { max: 100, name: 'Centrotavole' },
            cestini: { max: 100, name: 'Cestini' }
        }
    },

    sandali: { max: 200, name: 'Sandali' },

    cinture: { max: 100, name: 'Cinture' } // NEW CATEGORY
};


// Price configuration - Add prices for each product here
const priceConfig = {
    collane: {
        ottone: {
            1: "€25.00", 2: "€25.00", 3: "€25.00", 4: "€25.00", 5: "€25.00",
            6: "€25.00", 7: "€25.00", 8: "€25.00", 9: "€25.00", 10: "€25.00",
            11: "€25.00", 12: "€25.00", 13: "€25.00", 14: "€25.00", 15: "€25.00",
            16: "€25.00", 17: "€25.00", 18: "€25.00", 19: "€25.00", 20: "€25.00",
            21: "€25.00", 22: "€25.00", 23: "€25.00", 24: "€25.00", 25: "€25.00",
            26: "€25.00", 27: "€25.00", 28: "€25.00", 29: "€25.00", 30: "€25.00",
            31: "€25.00", 32: "€25.00", 33: "€25.00", 34: "€25.00", 35: "€25.00",
            36: "€25.00", 37: "€25.00", 38: "€25.00", 39: "€25.00", 40: "€25.00",
            41: "€25.00", 42: "€25.00", 43: "€25.00",
            44: "€15.00", 45: "€15.00", 46: "€15.00", 47: "€15.00", 48: "€15.00",
            49: "€15.00", 50: "€15.00", 51: "€15.00", 52: "€15.00", 53: "€15.00",
            54: "€15.00", 55: "€15.00", 56: "€15.00", 57: "€15.00", 58: "€15.00",
            59: "€15.00", 60: "€15.00", 61: "€15.00", 62: "€15.00", 63: "€15.00",
            64: "€15.00", 65: "€15.00"
        },
        krobo: {
            1: "€35.00", 2: "€35.00", 3: "€35.00", 4: "€35.00", 5: "€35.00",
            6: "€35.00", 7: "€35.00", 8: "€35.00", 9: "€35.00", 10: "€35.00",
            11: "€35.00", 12: "€35.00", 13: "€30.00",
            14: "€30.00", 15: "€30.00", 16: "€30.00", 17: "€30.00", 18: "€30.00",
            19: "€25.00", 20: "€25.00", 21: "€25.00", 22: "€25.00", 23: "€25.00",
            24: "€25.00", 25: "€25.00", 26: "€25.00", 27: "€25.00", 28: "€25.00",
            29: "€25.00", 30: "€25.00", 31: "€25.00", 32: "€25.00", 33: "€25.00",
            34: "€25.00", 35: "€25.00", 36: "€25.00", 37: "€25.00", 38: "€25.00",
            39: "€25.00", 40: "€25.00", 41: "€25.00", 42: "€25.00", 43: "€25.00",
            44: "€25.00", 45: "€25.00", 46: "€25.00", 47: "€25.00", 48: "€25.00",
            49: "€25.00", 50: "€25.00", 51: "€30.00", 52: "€30.00", 53: "€30.00",
            54: "€30.00", 55: "€30.00", 56: "€30.00", 57: "€30.00", 58: "€30.00",
            59: "€30.00", 60: "€30.00", 61: "€30.00",
            62: "€25.00", 63: "€25.00", 64: "€25.00", 65: "€25.00", 66: "€25.00",
            67: "€25.00", 68: "€25.00", 69: "€25.00", 70: "€25.00", 71: "€25.00",
            72: "€25.00"
        },
        perline: {
            1: "€25.00", 2: "€25.00",
            3: "€18.00", 4: "€18.00", 5: "€18.00", 6: "€18.00", 7: "€18.00",
            8: "€25.00", 9: "€25.00", 10: "€25.00", 11: "€25.00", 12: "€25.00", 13: "€25.00",
            14: "€35.00", 15: "€35.00", 16: "€35.00", 17: "€35.00", 18: "€35.00",
            19: "€35.00", 20: "€35.00", 21: "€35.00", 22: "€35.00",
            23: "€25.00", 24: "€25.00", 25: "€25.00", 26: "€25.00", 27: "€25.00",
            28: "€25.00", 29: "€25.00", 30: "€25.00", 31: "€25.00", 32: "€25.00",
            33: "€25.00", 34: "€25.00", 35: "€25.00", 36: "€25.00",
            37: "€25.00", 38: "€25.00", 39: "€25.00",
            40: "€20.00", 41: "€20.00", 42: "€15.00", 43: "€25.00",
            44: "€15.00", 45: "€15.00", 46: "€15.00", 47: "€15.00", 48: "€15.00",
            49: "€25.00", 50: "€25.00", 51: "€25.00",
            52: "€25.00", 53: "€25.00", 54: "€25.00", 55: "€25.00",
            56: "€20.00", 57: "€20.00", 58: "€20.00", 59: "€20.00", 60: "€20.00",
            61: "€20.00", 62: "€20.00", 63: "€20.00", 64: "€20.00", 65: "€20.00", 66: "€20.00",
            67: "€15.00", 68: "€15.00", 69: "€15.00", 70: "€15.00",
            71: "€30.00", 72: "€30.00", 73: "€30.00", 74: "€30.00", 75: "€30.00",
            76: "€30.00", 77: "€30.00", 78: "€30.00", 79: "€30.00"
        }
         },
    bracciali: {
            1: "€25.00",
            2: "€32.00",
            3: "€28.00",
            // Add more prices as needed
        },
    orecchini: {
            1: "€18.00",
            2: "€22.00",
            3: "€15.00",
            // Add more prices as needed
        },
    decorazione: {
        portacandele: {
            1: "€55.00",
            2: "€55.00",
            3: "€55.00",
            4: "€55.00",
            5: "€55.00",
            6: "€55.00",
            7: "€55.00",
            8: "€55.00",
            9: "€55.00",
            10: "€25.00",
            11: "€25.00",
            12: "€25.00",
            13: "€25.00",
            14: "€25.00",
            15: "€25.00",
            16: "€25.00",
            17: "€25.00",
            18: "€25.00",
            19: "€25.00",
            20: "€25.00",
            21: "€25.00",
            22: "€25.00",
            23: "€25.00",
            24: "€25.00",
            25: "€25.00",
        },
        centrotavole: {

        },
        cestini: {

        } 
         },
    sandali: {
            1: "€55.00",
            2: "€55.00",
            3: "€55.00",
        }
    };

    // Global variables for catalog
    let currentCategory = '';
    let currentSubcategory = '';
    let loadedImages = [];
    let currentPage = 0;
    const imagesPerPage = 20;
    let isLoading = false;

    // Home page functionality
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        initHomePage();
    }

    // Catalog page functionality
    if (window.location.pathname.includes('shanga')) {
        initCatalogPage();
    }

    function initHomePage() {
        const categoryBoxes = document.querySelectorAll('.category-box');
        
        categoryBoxes.forEach(box => {
            box.addEventListener('click', function() {
                const category = this.dataset.category;
                window.location.href = `shanga.html?category=${category}`;
            });

            // Add hover effects
            box.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            box.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    function initCatalogPage() {
    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const subcategoryParam = urlParams.get('subcategory');

    if (categoryParam && categoryConfig[categoryParam]) {
        currentCategory = categoryParam;
        currentSubcategory = subcategoryParam || '';
        document.getElementById('category-select').value = currentCategory;
    } else {
        // Default to collane
        currentCategory = 'collane';
        currentSubcategory = 'krobo'; // load Krobo by default
    }

    // ✅ Wait until DOM is fully painted before running setup
    window.requestAnimationFrame(() => {
        updateCatalogTitle();
        setupSubcategorySelector();

        // Default load for collane if none chosen
        if (currentCategory === 'collane' && !currentSubcategory) {
            currentSubcategory = 'krobo';
        }

        clearProductGrid();
        loadProducts();
    });

    // Category selector change event
    document.getElementById('category-select').addEventListener('change', function() {
        currentCategory = this.value;
        currentSubcategory = '';
        currentPage = 0;
        loadedImages = [];
        updateCatalogTitle();
        setupSubcategorySelector();
        clearProductGrid();
        loadProducts();

        const newUrl = `${window.location.pathname}?category=${currentCategory}`;
        window.history.pushState({ category: currentCategory }, '', newUrl);
    });

    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }

    // Infinite scroll
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
            if (!isLoading && hasMoreProducts()) {
                loadMoreProducts();
            }
        }
    });
}


function setupSubcategorySelector() {
    const catalogControls = document.querySelector('.catalog-controls');

    // Remove old subcategory section
    const existing = document.querySelector('.subcategory-selector');
    if (existing) existing.remove();

    const config = categoryConfig[currentCategory];
    if (!config.subcategories) return; // No subcategories → exit

    const subDiv = document.createElement('div');
    subDiv.className = 'subcategory-selector';
    subDiv.innerHTML = `<label>Sottocategorie:</label><div class="subcategory-boxes"></div>`;

    const boxContainer = subDiv.querySelector('.subcategory-boxes');

    Object.entries(config.subcategories).forEach(([key, obj]) => {
        const box = document.createElement('div');
        box.className = 'subcategory-box';
        box.dataset.subcategory = key;
        box.textContent = obj.name;

        if (currentSubcategory === key) box.classList.add('active');

        box.addEventListener('click', () => {
            document.querySelectorAll('.subcategory-box').forEach(b => b.classList.remove('active'));
            box.classList.add('active');

            currentSubcategory = key;
            currentPage = 0;
            loadedImages = [];

            updateCatalogTitle();
            clearProductGrid();
            loadProducts();

            const newUrl = `${window.location.pathname}?category=${currentCategory}&subcategory=${currentSubcategory}`;
            window.history.pushState({}, '', newUrl);
        });

        boxContainer.appendChild(box);
    });

    catalogControls.insertBefore(subDiv, catalogControls.querySelector('.loading-indicator'));
}


    function updateCatalogTitle() {
        const titleElement = document.getElementById('catalog-title');
        const categoryNameElement = document.getElementById('category-name');
        
        let title = categoryConfig[currentCategory]?.name || currentCategory;
        
        if (currentSubcategory && categoryConfig[currentCategory]?.subcategories?.[currentSubcategory]) {
            title += ` - ${categoryConfig[currentCategory].subcategories[currentSubcategory].name}`;
        }
        
        if (titleElement) {
            titleElement.textContent = title;
        }
        
        if (categoryNameElement) {
            categoryNameElement.textContent = title;
        }
    }

    function clearProductGrid() {
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
            productGrid.innerHTML = '';
        }
    }

    function loadProducts() {
        if (isLoading) return;
        
        isLoading = true;
        showLoading(true);

        const maxItems = getMaxItemsForCurrentSelection();
        const startIndex = currentPage * imagesPerPage + 1;
        const endIndex = Math.min(startIndex + imagesPerPage - 1, maxItems);
        const promises = [];

        for (let i = startIndex; i <= endIndex; i++) {
            promises.push(checkImageExists(currentCategory, i, currentSubcategory));
        }

        Promise.allSettled(promises).then(results => {
            const productGrid = document.getElementById('product-grid');
            
            results.forEach((result, index) => {
                if (result.status === 'fulfilled' && result.value.exists) {
                    const imageNumber = startIndex + index;
                    const productElement = createProductElement(currentCategory, imageNumber, result.value.isSoldOut, currentSubcategory);
                    productGrid.appendChild(productElement);
                    loadedImages.push(imageNumber);
                    
                    // Add loading animation
                    setTimeout(() => {
                        productElement.classList.add('loading');
                    }, index * 50);
                }
            });

            currentPage++;
            isLoading = false;
            showLoading(false);
            updateLoadMoreButton();
        });
    }

    function getMaxItemsForCurrentSelection() {
        if (currentSubcategory && categoryConfig[currentCategory]?.subcategories?.[currentSubcategory]) {
            return categoryConfig[currentCategory].subcategories[currentSubcategory].max;
        }
        return categoryConfig[currentCategory]?.max || 0;
    }

    function getProductPrice(category, number, subcategory = '') {
        if (subcategory && priceConfig[category]?.[subcategory]) {
            return priceConfig[category][subcategory][number] || null;
        }
        return priceConfig[category]?.[number] || null;
    }




    function loadMoreProducts() {
        if (hasMoreProducts()) {
            loadProducts();
        }
    }

    function hasMoreProducts() {
        const totalLoaded = loadedImages.length;
        const maxProducts = getMaxItemsForCurrentSelection();
        return totalLoaded < maxProducts;
    }

    function updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            if (hasMoreProducts()) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

function checkImageExists(category, number, subcategory = '') {
    return new Promise((resolve) => {
        const img = new Image();
        let imagePath;

        if (subcategory && categoryConfig[category].subcategories) {
            imagePath = `img/${category}/${subcategory}/${number}.webp`;
        } else {
            imagePath = `img/${category}/${number}.webp`;
        }

        img.onload = () => resolve({ exists: true, isSoldOut: false });

        img.onerror = () => {
            const sold = new Image();
            let soldPath;

            if (subcategory && categoryConfig[category].subcategories) {
                soldPath = `img/${category}/${subcategory}/${number}_soldout.webp`;
            } else {
                soldPath = `img/${category}/${number}_soldout.webp`;
            }

            sold.onload = () => resolve({ exists: true, isSoldOut: true });
            sold.onerror = () => resolve({ exists: false, isSoldOut: false });

            sold.src = soldPath;
        };

        img.src = imagePath;
    });
}


    function createProductElement(category, number, isSoldOut, subcategory = '') {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.dataset.category = category;
        productDiv.dataset.number = number;
        productDiv.dataset.subcategory = subcategory;

        let imagePath;
        let productTitle;

        if (subcategory && categoryConfig[category].subcategories) {
            imagePath = isSoldOut ?
                `img/${category}/${subcategory}/${number}_soldout.webp` :
                `img/${category}/${subcategory}/${number}.webp`;

            productTitle = `${categoryConfig[category].subcategories[subcategory].name} #${number}`;
        } else {
            imagePath = isSoldOut ?
                `img/${category}/${number}_soldout.webp` :
                `img/${category}/${number}.webp`;

            productTitle = `${categoryConfig[category].name} #${number}`;
        }


        // Get price
        const price = getProductPrice(category, number, subcategory);
        const priceHTML = price ? `<div class="product-price">${price}</div>` : '';

        productDiv.innerHTML = `
            <div class="product-image">
                <img src="${imagePath}" alt="${productTitle}" loading="lazy">
                ${isSoldOut ? `
                    <div class="sold-out-overlay">
                        <span class="sold-out-text">Esaurito</span>
                    </div>
                ` : ''}
            </div>
            <div class="product-info">
                <div class="product-title">${productTitle}</div>
                <div class="product-id">#${number}</div>
                ${priceHTML}
            </div>
        `;

        // Add click event for lightbox (only if not sold out)
        if (!isSoldOut) {
            productDiv.addEventListener('click', function() {
                openLightbox(category, number, subcategory);
            });
        }

        return productDiv;
    }

    function showLoading(show) {
        const loadingIndicator = document.getElementById('loading');
        if (loadingIndicator) {
            loadingIndicator.style.display = show ? 'block' : 'none';
        }
    }

    function openLightbox(category, number, subcategory = '') {
        if (typeof window.lightbox !== 'undefined') {
            const price = getProductPrice(category, number, subcategory);
            window.lightbox.open(category, number, loadedImages, subcategory, price);
        }
    }

    // Lazy loading intersection observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add some visual feedback for interactions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('category-box') || 
            e.target.closest('.category-box')) {
            // Add click animation
            const box = e.target.classList.contains('category-box') ? 
                e.target : e.target.closest('.category-box');
            
            box.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                box.style.transform = '';
            }, 150);
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close lightbox if open
            if (typeof window.lightbox !== 'undefined' && window.lightbox.isOpen) {
                window.lightbox.close();
            }
        }
    });

    console.log('Shanga website initialized successfully!');
});