document.addEventListener('DOMContentLoaded', function() {
    // Handle all buy buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const whatsappNumber = '+2348164015614';
            const message = `Hello Echewise, I'm interested in your ${productName}. Please send me more details and pricing information.`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Simple search functionality
    const searchBar = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-button');
    const productCards = document.querySelectorAll('.product-card');
    
    if (searchButton && searchBar) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchBar.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Also search when pressing Enter
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
        const heroSlideshow = document.querySelector('.hero-slideshow');
        if (heroSlideshow) {
            const slides = document.querySelectorAll('.hero-slide');
            let currentSlide = 0;
            const slideCount = slides.length;
            
            // Initialize first slide
            if (slideCount > 0) {
                slides[currentSlide].style.opacity = '1';
                
                // Start slideshow if multiple slides exist
                if (slideCount > 1) {
                    setInterval(() => {
                        // Fade out current slide
                        slides[currentSlide].style.opacity = '0';
                        
                        // Move to next slide
                        currentSlide = (currentSlide + 1) % slideCount;
                        
                        // Fade in next slide
                        slides[currentSlide].style.opacity = '1';
                    }, 5000);
                }
            }
        }
    });

    // Make category cards clickable (for homepage)
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.getAttribute('onclick');
            if (link) {
                const url = link.match(/window\.location\.href='(.*?)'/)[1];
                window.location.href = url;
            }
        });
    });
