// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

function initializeCart() {
    // Create cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    updateCartCount();
    setupAddToCartButtons();
    setupSearch();
    
    // Display cart items if on cart page
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
}

// Set up all "Add to Cart" buttons
function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('h3').textContent,
                image: productCard.querySelector('img').src,
                category: getCategoryFromUrl()
            };
            
            addToCart(product);
        });
    });
}

// Get category from current URL
function getCategoryFromUrl() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().split('.')[0];
    return filename.replace(/-/g, ' ');
}

// Add item to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (!existingItem) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    } else {
        alert(`${product.name} is already in your cart!`);
    }
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    document.getElementById('cart-count').textContent = cart.length;
}

// Display cart items on cart page
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartContainer = document.querySelector('.empty-cart');
    
    // Clear existing items but keep heading
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '<h3>Your Selected Items</h3>';
    }
    
    if (cart.length === 0) {
        if (emptyCartContainer) emptyCartContainer.style.display = 'block';
        if (cartItemsContainer) cartItemsContainer.style.display = 'none';
        return;
    }
    
    if (emptyCartContainer) emptyCartContainer.style.display = 'none';
    if (cartItemsContainer) cartItemsContainer.style.display = 'block';
    
    // Add each item to the cart display
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>Category: ${item.category}</p>
            </div>
            <button class="remove-item" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        if (cartItemsContainer) {
            cartItemsContainer.appendChild(itemElement);
        }
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(parseInt(this.dataset.index));
        });
    });
    
    // Add event listener for send order button
    const sendOrderButton = document.querySelector('.send-order');
    if (sendOrderButton) {
        sendOrderButton.addEventListener('click', sendOrder);
    }
}

// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// Enhanced Search functionality
function setupSearch() {
    const searchBar = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-button');
    
    if (searchBar && searchButton) {
        // Search when button is clicked
        searchButton.addEventListener('click', performSearch);
        
        // Search when typing (real-time search)
        searchBar.addEventListener('input', performSearch);
        
        // Search when Enter key is pressed
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchTerm = document.querySelector('.search-bar').value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product-card');
    let foundResults = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (searchTerm === '' || productName.includes(searchTerm)) {
            card.style.display = 'flex';
            foundResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show "no results" message if needed
    const noResultsMsg = document.querySelector('.no-results');
    if (!foundResults && searchTerm !== '') {
        if (!noResultsMsg) {
            const productsGrid = document.querySelector('.products-grid');
            const msg = document.createElement('div');
            msg.className = 'no-results';
            msg.textContent = 'No products found matching your search.';
            productsGrid.appendChild(msg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Pause slideshow on hover (optional)
document.querySelector('.hero').addEventListener('mouseenter', function() {
    document.querySelector('.hero-slideshow').style.animationPlayState = 'paused';
});

document.querySelector('.hero').addEventListener('mouseleave', function() {
    document.querySelector('.hero-slideshow').style.animationPlayState = 'running';
});

// Send order via WhatsApp
function sendOrder() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = 'Hello ProKitchen Solutions,\n\nI am interested in the following equipment:\n\n';
    
    cart.forEach(item => {
        message += `- ${item.name} (${item.category})\n`;
    });
    
    message += '\nPlease contact me with more information.\n\n';
    message += 'My contact details:\nName: \nPhone: \nDelivery Address: ';
    
    window.open(`https://wa.me/2348164015614?text=${encodeURIComponent(message)}`, '_blank');
}

// Make displayCartItems available globally
window.displayCartItems = displayCartItems;