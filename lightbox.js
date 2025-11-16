// Lightbox functionality for Shanga website
(function() {
    'use strict';

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
        orecchini: { max: 100, name: 'Orecchini' },
        decorazione: { max: 100, name: 'Decorazione Casa' },
        sandali: { max: 200, name: 'Sandali' }
    };

    class Lightbox {
        constructor() {
            this.isOpen = false;
            this.currentCategory = '';
            this.currentSubcategory = '';
            this.currentNumber = 0;
            this.currentPrice = '';
            this.availableImages = [];
            this.currentIndex = 0;
            
            this.lightbox = document.getElementById('lightbox');
            this.lightboxImage = document.getElementById('lightbox-image');
            this.lightboxTitle = document.getElementById('lightbox-title');
            this.lightboxPrice = document.getElementById('lightbox-price');
            this.closeBtn = document.querySelector('.lightbox-close');
            this.prevBtn = document.getElementById('lightbox-prev');
            this.nextBtn = document.getElementById('lightbox-next');
            
            this.init();
        }

        init() {
            if (!this.lightbox) return;

            // Close button
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.close());
            }

            // Navigation buttons
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.previous());
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }

            // Click outside to close
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.close();
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.isOpen) return;

                switch(e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.previous();
                        break;
                    case 'ArrowRight':
                        this.next();
                        break;
                }
            });

            // Prevent scrolling when lightbox is open
            this.lightbox.addEventListener('wheel', (e) => {
                e.preventDefault();
            });
        }

        open(category, number, availableImages = [], subcategory = '', price = '') {
            this.currentCategory = category;
            this.currentSubcategory = subcategory;
            this.currentNumber = number;
            this.currentPrice = price;
            this.availableImages = availableImages.sort((a, b) => a - b);
            this.currentIndex = this.availableImages.indexOf(number);

            if (this.currentIndex === -1) {
                this.availableImages.push(number);
                this.availableImages.sort((a, b) => a - b);
                this.currentIndex = this.availableImages.indexOf(number);
            }

            this.loadImage();
            this.updateNavigation();
            this.show();
        }

        close() {
            this.isOpen = false;
            this.lightbox.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset image
            if (this.lightboxImage) {
                this.lightboxImage.classList.remove('loaded');
            }
        }

        show() {
            this.isOpen = true;
            this.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        loadImage() {
            if (!this.lightboxImage || !this.lightboxTitle) return;

            // Show loading state
            this.lightboxImage.classList.remove('loaded');
            
            // Add loading spinner
            this.addLoadingSpinner();

        let imagePath;
        let categoryName;

        // UNIVERSAL SUBCATEGORY LOGIC
        if (this.currentSubcategory) {
            imagePath = `img/${this.currentCategory}/${this.currentSubcategory}/${this.currentNumber}.webp`;
            categoryName =
                categoryConfig[this.currentCategory]?.subcategories?.[this.currentSubcategory]?.name
                || this.currentSubcategory;
        } else {
            imagePath = `img/${this.currentCategory}/${this.currentNumber}.webp`;
            categoryName = categoryConfig[this.currentCategory]?.name || this.currentCategory;
        }


            // Preload image
            const img = new Image();
            img.onload = () => {
                this.lightboxImage.src = imagePath;
                this.lightboxImage.alt = `${categoryName} #${this.currentNumber}`;
                this.lightboxTitle.textContent = `${categoryName} #${this.currentNumber}`;
                
                // Update price
                if (this.lightboxPrice) {
                    if (this.currentPrice) {
                        this.lightboxPrice.textContent = this.currentPrice;
                        this.lightboxPrice.style.display = 'inline-block';
                    } else {
                        this.lightboxPrice.style.display = 'none';
                    }
                }
                
                // Remove loading spinner and show image
                this.removeLoadingSpinner();
                this.lightboxImage.classList.add('loaded');
            };

            img.onerror = () => {
                this.removeLoadingSpinner();
                this.lightboxTitle.textContent = `Errore nel caricamento dell'immagine`;
                if (this.lightboxPrice) {
                    this.lightboxPrice.style.display = 'none';
                }
                console.error(`Failed to load image: ${imagePath}`);
            };

            img.src = imagePath;
        }

        addLoadingSpinner() {
            // Remove existing spinner
            this.removeLoadingSpinner();
            
            const spinner = document.createElement('div');
            spinner.className = 'lightbox-loading';
            spinner.id = 'lightbox-spinner';
            
            const lightboxContent = document.querySelector('.lightbox-content');
            if (lightboxContent) {
                lightboxContent.appendChild(spinner);
            }
        }

        removeLoadingSpinner() {
            const spinner = document.getElementById('lightbox-spinner');
            if (spinner) {
                spinner.remove();
            }
        }

        previous() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.currentNumber = this.availableImages[this.currentIndex];
                this.updateCurrentPrice();
                this.loadImage();
                this.updateNavigation();
            }
        }

        next() {
            if (this.currentIndex < this.availableImages.length - 1) {
                this.currentIndex++;
                this.currentNumber = this.availableImages[this.currentIndex];
                this.updateCurrentPrice();
                this.loadImage();
                this.updateNavigation();
            }
        }

        updateCurrentPrice() {
            // Get price for current product
            const priceConfig = window.priceConfig || {};
            if (this.currentSubcategory && this.currentCategory === 'collane' && priceConfig[this.currentCategory]?.[this.currentSubcategory]?.[this.currentNumber]) {
                this.currentPrice = priceConfig[this.currentCategory][this.currentSubcategory][this.currentNumber];
            } else if (priceConfig[this.currentCategory]?.[this.currentNumber]) {
                this.currentPrice = priceConfig[this.currentCategory][this.currentNumber];
            } else {
                this.currentPrice = '';
            }
        }

        updateNavigation() {
            if (!this.prevBtn || !this.nextBtn) return;

            // Update previous button
            this.prevBtn.disabled = this.currentIndex === 0;
            
            // Update next button
            this.nextBtn.disabled = this.currentIndex === this.availableImages.length - 1;

            // Update button text with numbers
            if (this.currentIndex > 0) {
                const prevNumber = this.availableImages[this.currentIndex - 1];
                this.prevBtn.textContent = `← #${prevNumber}`;
            } else {
                this.prevBtn.textContent = '← Precedente';
            }

            if (this.currentIndex < this.availableImages.length - 1) {
                const nextNumber = this.availableImages[this.currentIndex + 1];
                this.nextBtn.textContent = `#${nextNumber} →`;
            } else {
                this.nextBtn.textContent = 'Successivo →';
            }
        }

        // Public method to check if lightbox is open
        isLightboxOpen() {
            return this.isOpen;
        }

        // Method to get current image info
        getCurrentImageInfo() {
            return {
                category: this.currentCategory,
                subcategory: this.currentSubcategory,
                number: this.currentNumber,
                price: this.currentPrice,
                index: this.currentIndex,
                total: this.availableImages.length
            };
        }
    }

    // Initialize lightbox when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        window.lightbox = new Lightbox();
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        if (window.lightbox && window.lightbox.isLightboxOpen()) {
            touchStartX = e.changedTouches[0].screenX;
        }
    });

    document.addEventListener('touchend', function(e) {
        if (window.lightbox && window.lightbox.isLightboxOpen()) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                window.lightbox.next();
            } else {
                // Swipe right - previous image
                window.lightbox.previous();
            }
        }
    }

    // Prevent context menu on lightbox images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.id === 'lightbox-image') {
            e.preventDefault();
        }
    });

    // Add zoom functionality with double tap/click
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        if (e.target.id === 'lightbox-image') {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 500 && tapLength > 0) {
                // Double tap detected
                toggleImageZoom(e.target);
            }
            lastTap = currentTime;
        }
    });

    // Double click for desktop
    document.addEventListener('dblclick', function(e) {
        if (e.target.id === 'lightbox-image') {
            toggleImageZoom(e.target);
        }
    });

    function toggleImageZoom(img) {
        if (img.style.transform === 'scale(2)') {
            img.style.transform = 'scale(1)';
            img.style.cursor = 'zoom-in';
        } else {
            img.style.transform = 'scale(2)';
            img.style.cursor = 'zoom-out';
        }
    }

})();