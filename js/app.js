/**
 * MAISON ELEGANCE - Main Application
 *
 * Central application logic that initializes all pages, handles shared UI
 * behaviours (header scroll, search, toasts), and renders product components.
 *
 * Exported as window.App for global access.
 * Auto-initializes on DOMContentLoaded.
 */

window.App = {

  // =========================================================================
  // Initialization
  // =========================================================================

  /**
   * Main entry point. Called on DOMContentLoaded for every page.
   * Sets up global behaviours and dispatches to page-specific initializers.
   */
  init() {
    this.setupHeaderScroll();
    this.setupSearch();
    this.setupMobileMenu();
    this.setupBackToTop();

    // Update cart badge and auth UI
    CartManager.updateBadge();
    AuthManager.updateUI();

    // Page-specific initialization based on data-page attribute on <body>
    const page = document.body.dataset.page;
    switch (page) {
      case 'home':          this.initHomePage(); break;
      case 'category':      this.initCategoryPage(); break;
      case 'product':       this.initProductPage(); break;
      case 'cart':          this.initCartPage(); break;
      case 'checkout':      this.initCheckoutPage(); break;
      case 'account':       this.initAccountPage(); break;
      case 'confirmation':  this.initConfirmationPage(); break;
    }
  },

  // =========================================================================
  // Global UI Behaviours
  // =========================================================================

  /**
   * Adds a .scrolled class to the <header> / .navbar when the user scrolls
   * past 50px, enabling CSS-driven visual changes (e.g. shadow, background).
   */
  setupHeaderScroll() {
    const header = document.querySelector('header, .navbar');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
  },

  /**
   * Sets up the product search functionality.
   * Listens to input on .search-input, filters PRODUCTS, and renders
   * matching results into a .search-results dropdown.
   */
  setupSearch() {
    const overlay = document.querySelector('#searchOverlay');
    const input = document.querySelector('#searchInput');
    const results = document.querySelector('#searchResults');
    const toggleBtn = document.querySelector('.search-toggle');
    const closeBtn = document.querySelector('#searchClose');

    if (toggleBtn && overlay) {
      toggleBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        if (input) input.focus();
      });
    }
    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        if (input) input.value = '';
        if (results) { results.innerHTML = ''; results.classList.remove('show'); }
      });
    }

    if (!input || !results) return;

    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();

      if (query.length < 2) {
        results.innerHTML = '';
        results.classList.remove('show');
        return;
      }

      const matches = window.PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query)
      ).slice(0, 6); // limit to 6 results

      if (matches.length === 0) {
        results.innerHTML = '<div class="search-result-item p-3 text-muted">No products found</div>';
        results.classList.add('show');
        return;
      }

      results.innerHTML = matches.map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item d-flex align-items-center p-2 text-decoration-none text-dark">
          <img src="${p.image}" alt="${p.name}" class="rounded me-3" style="width:45px;height:55px;object-fit:cover;">
          <div>
            <div class="fw-semibold">${p.name}</div>
            <div class="text-muted small">$${p.price.toFixed(2)}</div>
          </div>
        </a>
      `).join('');
      results.classList.add('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        results.innerHTML = '';
        results.classList.remove('show');
      }
    });
  },

  /**
   * Closes the Bootstrap mobile nav menu when a link inside it is clicked.
   */
  setupMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (!navbarCollapse) return;

    navbarCollapse.addEventListener('click', (e) => {
      if (e.target.matches('a.nav-link') || e.target.closest('a.nav-link')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  },

  /**
   * Sets up the "back to top" button. Shows it when scrolled down past
   * 300px, and smooth-scrolls to top on click.
   */
  setupBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  // =========================================================================
  // Toast Notification
  // =========================================================================

  /**
   * Displays a toast notification that auto-dismisses after 3 seconds.
   *
   * @param {string} message - The message to display
   * @param {string} type    - 'success', 'error', or 'info'
   */
  showToast(message, type = 'success') {
    // Create or find toast container
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container position-fixed top-0 end-0 p-3';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }

    // Map type to Bootstrap contextual class and icon
    const icons = {
      success: '<i class="bi bi-check-circle-fill me-2"></i>',
      error: '<i class="bi bi-exclamation-circle-fill me-2"></i>',
      info: '<i class="bi bi-info-circle-fill me-2"></i>'
    };
    const bgClass = type === 'error' ? 'bg-danger' : type === 'info' ? 'bg-dark' : 'bg-success';

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white ${bgClass} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${icons[type] || ''}${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;

    container.appendChild(toastEl);

    const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
    bsToast.show();

    // Remove from DOM after hidden
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  },

  // =========================================================================
  // Product Rendering Helpers
  // =========================================================================

  /**
   * Renders a product card as an HTML string.
   * Includes image with badge, quick-view overlay, name, price, rating,
   * and an add-to-cart button.
   *
   * @param {Object} product - A product object from PRODUCTS
   * @returns {string} HTML string
   */
  renderProductCard(product) {
    const badgeHTML = product.badge
      ? `<span class="badge ${product.badge === 'SALE' ? 'bg-danger' : 'bg-dark'} position-absolute top-0 start-0 m-3">${product.badge}</span>`
      : '';

    const priceHTML = product.originalPrice
      ? `<span class="text-danger fw-bold">$${product.price.toFixed(2)}</span>
         <span class="text-muted text-decoration-line-through ms-2 small">$${product.originalPrice.toFixed(2)}</span>`
      : `<span class="fw-bold">$${product.price.toFixed(2)}</span>`;

    return `
      <div class="col-6 col-md-4 col-lg-3 mb-4">
        <div class="card product-card border-0 h-100">
          <div class="product-img-wrapper position-relative overflow-hidden">
            <a href="product.html?id=${product.id}">
              <img src="${product.image}" class="card-img-top product-img" alt="${product.name}" loading="lazy">
            </a>
            ${badgeHTML}
            <div class="product-overlay position-absolute bottom-0 start-0 end-0 p-3 d-flex gap-2">
              <a href="product.html?id=${product.id}" class="btn btn-sm btn-light flex-grow-1">
                <i class="bi bi-eye me-1"></i> Quick View
              </a>
            </div>
          </div>
          <div class="card-body px-0 pt-3">
            <p class="text-muted small mb-1 text-uppercase">${product.subcategory}</p>
            <h6 class="card-title mb-1">
              <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a>
            </h6>
            <div class="mb-1">${priceHTML}</div>
            <div class="mb-2">${this.renderStars(product.rating)} <span class="text-muted small">(${product.reviews})</span></div>
            <button class="btn btn-outline-dark btn-sm w-100 btn-add-to-cart" data-product-id="${product.id}">
              <i class="bi bi-bag-plus me-1"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renders a star-rating display as HTML.
   * Uses Bootstrap Icons for filled, half, and empty stars.
   *
   * @param {number} rating - Rating value (e.g. 4.5)
   * @returns {string} HTML string with star icons
   */
  renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        html += '<i class="bi bi-star-fill text-warning"></i>';
      } else if (rating >= i - 0.5) {
        html += '<i class="bi bi-star-half text-warning"></i>';
      } else {
        html += '<i class="bi bi-star text-warning"></i>';
      }
    }
    return html;
  },

  // =========================================================================
  // Quick Add-to-Cart (from product cards)
  // =========================================================================

  /**
   * Handles "Add to Cart" clicks on product cards. Uses the first
   * available size and color as defaults.
   */
  setupQuickAddToCart(container) {
    (container || document).addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-to-cart');
      if (!btn) return;

      const productId = parseInt(btn.dataset.productId, 10);
      const product = window.PRODUCTS.find(p => p.id === productId);
      if (!product) return;

      // Use first available size and color
      const size = product.sizes[0];
      const color = product.colors[0].name;

      CartManager.addItem(product, size, color, 1);
      this.showToast(`${product.name} added to cart!`);
    });
  },

  // =========================================================================
  // Page Initializers
  // =========================================================================

  /**
   * HOME PAGE
   * Renders featured products, new arrivals, and sale items.
   * Sets up category navigation links.
   */
  initHomePage() {
    const PRODUCTS = window.PRODUCTS;

    // Featured products — first 8
    const featuredContainer = document.querySelector('#featuredProducts');
    if (featuredContainer) {
      const featured = PRODUCTS.slice(0, 8);
      featuredContainer.innerHTML = featured.map(p => this.renderProductCard(p)).join('');
    }

    // New arrivals
    const newContainer = document.querySelector('#newArrivals');
    if (newContainer) {
      const newItems = PRODUCTS.filter(p => p.badge === 'NEW');
      newContainer.innerHTML = newItems.map(p => this.renderProductCard(p)).join('');
    }

    // Sale items
    const saleContainer = document.querySelector('#saleProducts');
    if (saleContainer) {
      const saleItems = PRODUCTS.filter(p => p.badge === 'SALE');
      saleContainer.innerHTML = saleItems.map(p => this.renderProductCard(p)).join('');
    }

    // Set up category links — navigate to category page with ?cat= param
    document.querySelectorAll('[data-category]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = link.dataset.category;
        window.location.href = `category.html?cat=${cat}`;
      });
    });

    // Quick add-to-cart from cards
    this.setupQuickAddToCart();
  },

  /**
   * CATEGORY PAGE
   * Reads ?cat= URL parameter, filters products, renders a grid,
   * and sets up filter buttons and sort dropdown.
   */
  initCategoryPage() {
    const PRODUCTS = window.PRODUCTS;
    const params = new URLSearchParams(window.location.search);
    const category = params.get('cat') || 'all';

    // Update page title and breadcrumb
    const pageTitle = document.querySelector('#categoryTitle');
    const breadcrumb = document.querySelector('#breadcrumbCategory');
    const titles = {
      men: "Men's Collection", women: "Women's Collection",
      accessories: 'Accessories', all: 'All Products',
      new: 'New Arrivals', sale: 'Sale'
    };
    const title = titles[category] || 'All Products';
    if (pageTitle) pageTitle.textContent = title;
    if (breadcrumb) breadcrumb.textContent = title;

    /**
     * Gets products filtered by URL category parameter.
     */
    const getBaseProducts = () => {
      switch (category) {
        case 'men': return PRODUCTS.filter(p => p.category === 'men');
        case 'women': return PRODUCTS.filter(p => p.category === 'women');
        case 'accessories': return PRODUCTS.filter(p => p.category === 'accessories');
        case 'new': return PRODUCTS.filter(p => p.badge === 'NEW');
        case 'sale': return PRODUCTS.filter(p => p.badge === 'SALE');
        default: return [...PRODUCTS];
      }
    };

    /**
     * Renders products into the grid, applying subcategory filters and sorting.
     */
    const renderGrid = () => {
      const activeFilter = document.querySelector('.btn-filter.active');
      const subcat = activeFilter ? activeFilter.dataset.filter : 'all';
      const sortValue = document.querySelector('#sortSelect')?.value || 'featured';

      let filtered = getBaseProducts();

      // Subcategory filtering
      if (subcat !== 'all') {
        filtered = filtered.filter(p => p.subcategory.toLowerCase() === subcat.toLowerCase());
      }

      // Sorting
      switch (sortValue) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }

      const grid = document.querySelector('#productGrid');
      const emptyState = document.querySelector('#emptyState');
      if (!grid) return;

      if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('d-none');
      } else {
        grid.innerHTML = filtered.map(p => this.renderProductCard(p)).join('');
        if (emptyState) emptyState.classList.add('d-none');
      }

      // Update count
      const countEl = document.querySelector('#productCount');
      if (countEl) countEl.textContent = filtered.length;
    };

    // Filter button clicks (subcategory filters)
    document.querySelectorAll('.btn-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid();
      });
    });

    // Sort dropdown
    const sortSelect = document.querySelector('#sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', renderGrid);
    }

    // Initial render
    renderGrid();
    this.setupQuickAddToCart();
  },

  /**
   * PRODUCT DETAIL PAGE
   * Reads ?id= URL parameter, populates existing HTML elements with
   * product data (does NOT replace the page layout with innerHTML).
   */
  initProductPage() {
    const PRODUCTS = window.PRODUCTS;
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) {
      const nameEl = document.querySelector('#productName');
      if (nameEl) nameEl.textContent = 'Product not found';
      return;
    }

    // All images (main + extras)
    const allImages = [product.image, ...(product.images || [])];

    // --- Breadcrumb ---
    const breadcrumbCategory = document.querySelector('#breadcrumbCategory');
    if (breadcrumbCategory) {
      breadcrumbCategory.href = `category.html?cat=${product.category}`;
      breadcrumbCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    }
    const breadcrumbProduct = document.querySelector('#breadcrumbProduct');
    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = product.name;
    }

    // --- Main Image ---
    const mainImage = document.querySelector('#mainImage');
    if (mainImage) {
      mainImage.src = allImages[0];
      mainImage.alt = product.name;
    }

    // --- Badge ---
    const productBadge = document.querySelector('#productBadge');
    if (productBadge) {
      if (product.badge) {
        productBadge.textContent = product.badge;
        productBadge.classList.remove('d-none');
        productBadge.classList.remove('bg-danger', 'bg-accent');
        productBadge.classList.add(product.badge === 'SALE' ? 'bg-danger' : 'bg-accent');
      } else {
        productBadge.classList.add('d-none');
      }
    }

    // --- Thumbnails ---
    const thumbnailStrip = document.querySelector('#thumbnailStrip');
    if (thumbnailStrip) {
      thumbnailStrip.innerHTML = allImages.map((img, i) => `
        <img src="${img}" alt="${product.name} view ${i + 1}"
             class="product-thumbnail rounded ${i === 0 ? 'active' : ''}"
             data-index="${i}"
             style="width:70px;height:85px;object-fit:cover;cursor:pointer;border:2px solid ${i === 0 ? '#212121' : 'transparent'};">
      `).join('');

      // Thumbnail click: swap main image
      thumbnailStrip.querySelectorAll('.product-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
          const idx = parseInt(thumb.dataset.index, 10);
          if (mainImage) mainImage.src = allImages[idx];
          thumbnailStrip.querySelectorAll('.product-thumbnail').forEach(t => {
            t.classList.remove('active');
            t.style.borderColor = 'transparent';
          });
          thumb.classList.add('active');
          thumb.style.borderColor = '#212121';
        });
      });
    }

    // --- Product Name ---
    const productName = document.querySelector('#productName');
    if (productName) productName.textContent = product.name;

    // --- Rating ---
    const productRating = document.querySelector('#productRating');
    if (productRating) {
      productRating.innerHTML = `
        <div class="stars text-warning">
          ${this.renderStars(product.rating)}
        </div>
        <span class="text-muted small review-count">(${product.reviews} reviews)</span>
      `;
    }

    // --- Price ---
    const productPrice = document.querySelector('#productPrice');
    if (productPrice) {
      if (product.originalPrice) {
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        productPrice.innerHTML = `
          <span class="current-price fs-3 fw-bold text-danger">$${product.price.toFixed(2)}</span>
          <span class="original-price text-muted text-decoration-line-through ms-2">$${product.originalPrice.toFixed(2)}</span>
          <span class="discount-badge badge bg-danger ms-2">${discount}% OFF</span>
        `;
      } else {
        productPrice.innerHTML = `
          <span class="current-price fs-3 fw-bold">$${product.price.toFixed(2)}</span>
        `;
      }
    }

    // --- Description ---
    const productDescription = document.querySelector('#productDescription');
    if (productDescription) productDescription.textContent = product.description;

    // --- Color Options ---
    const colorOptions = document.querySelector('#colorOptions');
    const selectedColorName = document.querySelector('#selectedColorName');
    if (colorOptions) {
      colorOptions.innerHTML = product.colors.map((c, i) => `
        <button class="btn color-btn p-0 ${i === 0 ? 'active' : ''}"
                data-color="${c.name}"
                title="${c.name}"
                style="width:32px;height:32px;border-radius:50%;background:${c.hex};border:2px solid ${i === 0 ? '#212121' : '#dee2e6'};">
        </button>
      `).join('');

      if (selectedColorName) selectedColorName.textContent = product.colors[0].name;

      // Color click handler
      colorOptions.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          colorOptions.querySelectorAll('.color-btn').forEach(b => {
            b.classList.remove('active');
            b.style.borderColor = '#dee2e6';
          });
          btn.classList.add('active');
          btn.style.borderColor = '#212121';
          if (selectedColorName) selectedColorName.textContent = btn.dataset.color;
        });
      });
    }

    // --- Size Options ---
    const sizeOptions = document.querySelector('#sizeOptions');
    if (sizeOptions) {
      sizeOptions.innerHTML = product.sizes.map((s, i) => `
        <button class="btn btn-outline-dark size-btn ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
      `).join('');

      sizeOptions.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sizeOptions.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    }

    // --- Quantity Controls ---
    const qtyInput = document.querySelector('#quantityInput');
    if (qtyInput) {
      // Find the minus and plus buttons as siblings within the quantity selector
      const qtyContainer = qtyInput.closest('.quantity-selector') || qtyInput.parentElement;
      const qtyBtns = qtyContainer.querySelectorAll('.quantity-btn, button');

      qtyBtns.forEach(btn => {
        if (btn.dataset.action === 'decrease' || btn.textContent.trim() === '-' || btn.querySelector('.bi-dash')) {
          btn.addEventListener('click', () => {
            const val = parseInt(qtyInput.value, 10);
            if (val > 1) qtyInput.value = val - 1;
          });
        }
        if (btn.dataset.action === 'increase' || btn.textContent.trim() === '+' || btn.querySelector('.bi-plus')) {
          btn.addEventListener('click', () => {
            const val = parseInt(qtyInput.value, 10);
            if (val < 10) qtyInput.value = val + 1;
          });
        }
      });
    }

    // --- Add to Cart ---
    const addToCartBtn = document.querySelector('#addToCartBtn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const size = document.querySelector('#sizeOptions .size-btn.active')?.dataset.size || product.sizes[0];
        const color = document.querySelector('#colorOptions .color-btn.active')?.dataset.color || product.colors[0].name;
        const qty = parseInt(qtyInput?.value, 10) || 1;

        CartManager.addItem(product, size, color, qty);
        this.showToast(`${product.name} added to cart!`);
      });
    }

    // --- Accordion: Details & Care ---
    const detailsContent = document.querySelector('#detailsContent');
    if (detailsContent && product.material) {
      detailsContent.innerHTML = `<p class="text-muted">${product.material}</p>`;
    }

    const careContent = document.querySelector('#careContent');
    if (careContent && product.care) {
      careContent.innerHTML = `<p class="text-muted">${product.care}</p>`;
    }

    // --- Related Products ---
    const relatedContainer = document.querySelector('#relatedProducts');
    if (relatedContainer) {
      const related = PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      relatedContainer.innerHTML = related.map(p => this.renderProductCard(p)).join('');
      this.setupQuickAddToCart(relatedContainer);
    }
  },

  /**
   * CART PAGE
   * Renders cart items into #cartItems, updates summary values in
   * existing spans (#cartSubtotal, #cartShipping, #cartTotal).
   * Toggles #emptyCart / #cartSummary visibility.
   */
  initCartPage() {
    const renderCart = () => {
      const cart = CartManager.getCart();
      const itemsContainer = document.querySelector('#cartItems');
      const summaryContainer = document.querySelector('#cartSummary');
      const emptyContainer = document.querySelector('#emptyCart');
      const cartItemCount = document.querySelector('#cartItemCount');
      const checkoutBtn = document.querySelector('#checkoutBtn');

      if (!itemsContainer) return;

      // Update item count in heading
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      if (cartItemCount) cartItemCount.textContent = totalItems;

      if (cart.length === 0) {
        itemsContainer.innerHTML = '';
        if (summaryContainer) summaryContainer.style.display = 'none';
        if (emptyContainer) emptyContainer.classList.remove('d-none');
        if (checkoutBtn) {
          checkoutBtn.classList.add('disabled');
          checkoutBtn.setAttribute('tabindex', '-1');
        }
        return;
      }

      if (emptyContainer) emptyContainer.classList.add('d-none');
      if (summaryContainer) summaryContainer.style.display = '';
      if (checkoutBtn) {
        checkoutBtn.classList.remove('disabled');
        checkoutBtn.removeAttribute('tabindex');
      }

      // Render cart items
      itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item d-flex gap-3 p-3 mb-3 border rounded-3" data-index="${index}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img rounded" style="width:120px;height:150px;object-fit:cover;">
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="mb-1">${item.name}</h6>
                <p class="text-muted small mb-1">Color: ${item.color} | Size: ${item.size}</p>
              </div>
              <button class="btn btn-sm btn-link text-muted remove-item" data-index="${index}"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="d-flex justify-content-between align-items-end mt-3">
              <div class="quantity-selector d-flex align-items-center">
                <button class="btn btn-outline-secondary btn-sm cart-qty-minus" data-index="${index}">-</button>
                <input type="number" class="form-control text-center mx-1 cart-qty-val" value="${item.quantity}" min="1" style="width:50px;" readonly>
                <button class="btn btn-outline-secondary btn-sm cart-qty-plus" data-index="${index}">+</button>
              </div>
              <span class="fw-semibold">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `).join('');

      // Update summary values in existing spans
      const subtotal = CartManager.getSubtotal();
      const shipping = CartManager.getShipping();
      const total = CartManager.getTotal();

      const subtotalEl = document.querySelector('#cartSubtotal');
      const shippingEl = document.querySelector('#cartShipping');
      const totalEl = document.querySelector('#cartTotal');

      if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
      if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    };

    // Event delegation for cart actions
    const itemsContainer = document.querySelector('#cartItems');
    if (itemsContainer) {
      itemsContainer.addEventListener('click', (e) => {
        const minusBtn = e.target.closest('.cart-qty-minus');
        const plusBtn = e.target.closest('.cart-qty-plus');
        const removeBtn = e.target.closest('.remove-item');

        if (minusBtn) {
          const idx = parseInt(minusBtn.dataset.index, 10);
          const cart = CartManager.getCart();
          if (cart[idx] && cart[idx].quantity > 1) {
            CartManager.updateQuantity(idx, cart[idx].quantity - 1);
          }
          renderCart();
        }

        if (plusBtn) {
          const idx = parseInt(plusBtn.dataset.index, 10);
          const cart = CartManager.getCart();
          if (cart[idx] && cart[idx].quantity < 10) {
            CartManager.updateQuantity(idx, cart[idx].quantity + 1);
          }
          renderCart();
        }

        if (removeBtn) {
          const idx = parseInt(removeBtn.dataset.index, 10);
          CartManager.removeItem(idx);
          this.showToast('Item removed from cart', 'info');
          renderCart();
        }
      });
    }

    // Promo code handler
    const applyPromoBtn = document.querySelector('#applyPromo');
    const promoInput = document.querySelector('#promoInput');
    const promoMessage = document.querySelector('#promoMessage');
    if (applyPromoBtn && promoInput) {
      applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (promoMessage) {
          if (code === 'ELEGANCE10') {
            promoMessage.textContent = 'Promo code applied! 10% off.';
            promoMessage.classList.remove('d-none', 'text-danger');
            promoMessage.classList.add('text-success');
          } else if (code === '') {
            promoMessage.textContent = 'Please enter a promo code.';
            promoMessage.classList.remove('d-none', 'text-success');
            promoMessage.classList.add('text-danger');
          } else {
            promoMessage.textContent = 'Invalid promo code.';
            promoMessage.classList.remove('d-none', 'text-success');
            promoMessage.classList.add('text-danger');
          }
        }
      });
    }

    renderCart();
  },

  /**
   * CHECKOUT PAGE
   * Populates the order summary sidebar, wires up card preview,
   * auto-formatting for card inputs, and place order button.
   * Does NOT generate form HTML — the HTML is pre-built.
   */
  initCheckoutPage() {
    const cart = CartManager.getCart();

    // If cart is empty, redirect to cart page
    if (cart.length === 0) {
      window.location.href = 'cart.html';
      return;
    }

    const subtotal = CartManager.getSubtotal();
    const shipping = CartManager.getShipping();
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal + shipping + tax;

    // --- Populate Order Summary Items ---
    const checkoutItems = document.querySelector('#checkoutItems');
    if (checkoutItems) {
      checkoutItems.innerHTML = cart.map(item => `
        <div class="d-flex align-items-center gap-3 mb-3">
          <div class="position-relative">
            <img src="${item.image}" alt="${item.name}" class="rounded" style="width:60px;height:75px;object-fit:cover;">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">${item.quantity}</span>
          </div>
          <div class="flex-grow-1">
            <div class="small fw-semibold">${item.name}</div>
            <div class="text-muted" style="font-size:0.75rem;">Size: ${item.size} | ${item.color}</div>
          </div>
          <div class="small fw-semibold">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `).join('');
    }

    // --- Populate Totals ---
    const checkoutSubtotal = document.querySelector('#checkoutSubtotal');
    const checkoutShipping = document.querySelector('#checkoutShipping');
    const checkoutTax = document.querySelector('#checkoutTax');
    const checkoutTotal = document.querySelector('#checkoutTotal');

    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (checkoutShipping) checkoutShipping.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (checkoutTax) checkoutTax.textContent = `$${tax.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;

    // --- Pre-fill user info if logged in ---
    const user = AuthManager.getCurrentUser();
    if (user) {
      const emailInput = document.querySelector('#checkoutEmail');
      if (emailInput && user.email) emailInput.value = user.email;

      if (user.name) {
        const parts = user.name.split(' ');
        const firstNameInput = document.querySelector('#shippingFirstName');
        const lastNameInput = document.querySelector('#shippingLastName');
        if (firstNameInput) firstNameInput.value = parts[0] || '';
        if (lastNameInput) lastNameInput.value = parts.slice(1).join(' ') || '';
      }

      if (user.phone) {
        const phoneInput = document.querySelector('#shippingPhone');
        if (phoneInput) phoneInput.value = user.phone;
      }

      if (user.address) {
        const addressInput = document.querySelector('#shippingAddress');
        if (addressInput) addressInput.value = user.address;
      }
    }

    // --- Card Preview Wiring ---
    const cardNumber = document.querySelector('#cardNumber');
    const cardName = document.querySelector('#cardName');
    const cardExpiry = document.querySelector('#cardExpiry');
    const cardCvv = document.querySelector('#cardCvv');
    const cardPreviewNumber = document.querySelector('#cardPreviewNumber');
    const cardPreviewName = document.querySelector('#cardPreviewName');
    const cardPreviewExpiry = document.querySelector('#cardPreviewExpiry');

    // Card number: auto-format with spaces every 4 digits + update preview
    if (cardNumber) {
      cardNumber.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
        if (cardPreviewNumber) {
          const formatted = e.target.value || '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022';
          cardPreviewNumber.textContent = formatted;
        }
      });
    }

    // Card name: update preview
    if (cardName) {
      cardName.addEventListener('input', (e) => {
        if (cardPreviewName) {
          cardPreviewName.textContent = e.target.value.toUpperCase() || 'YOUR NAME';
        }
      });
    }

    // Card expiry: auto-format as MM/YY + update preview
    if (cardExpiry) {
      cardExpiry.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2);
        e.target.value = val;
        if (cardPreviewExpiry) {
          cardPreviewExpiry.textContent = val || 'MM/YY';
        }
      });
    }

    // CVV: digits only
    if (cardCvv) {
      cardCvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
      });
    }

    // --- Place Order ---
    const placeOrderBtn = document.querySelector('#placeOrderBtn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields = [
          '#checkoutEmail',
          '#shippingFirstName', '#shippingLastName', '#shippingAddress',
          '#shippingCity', '#shippingState', '#shippingZip', '#shippingCountry',
          '#cardName', '#cardNumber', '#cardExpiry', '#cardCvv'
        ];

        let valid = true;
        requiredFields.forEach(selector => {
          const field = document.querySelector(selector);
          if (field && !field.value.trim()) {
            field.classList.add('is-invalid');
            valid = false;
          } else if (field) {
            field.classList.remove('is-invalid');
          }
        });

        // Email validation
        const emailField = document.querySelector('#checkoutEmail');
        if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
          emailField.classList.add('is-invalid');
          valid = false;
        }

        // Card number validation
        if (cardNumber) {
          const cardNum = cardNumber.value.replace(/\s/g, '');
          if (cardNum.length < 13) {
            cardNumber.classList.add('is-invalid');
            valid = false;
          }
        }

        if (!valid) {
          this.showToast('Please fill in all required fields.', 'error');
          return;
        }

        // Disable button to prevent double-submit
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';

        // Build order object
        const order = {
          orderNumber: 'ME-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          date: new Date().toISOString(),
          items: CartManager.getCart(),
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
          total: total,
          shippingAddress: {
            firstName: document.querySelector('#shippingFirstName').value,
            lastName: document.querySelector('#shippingLastName').value,
            email: document.querySelector('#checkoutEmail').value,
            address: document.querySelector('#shippingAddress').value,
            city: document.querySelector('#shippingCity').value,
            state: document.querySelector('#shippingState').value,
            zip: document.querySelector('#shippingZip').value,
            country: document.querySelector('#shippingCountry').value,
            phone: document.querySelector('#shippingPhone').value
          },
          status: 'confirmed'
        };

        try {
          await AuthManager.saveOrder(order);
          // Store order for confirmation page
          sessionStorage.setItem('me_last_order', JSON.stringify(order));
          CartManager.clear();
          window.location.href = 'confirmation.html';
        } catch (err) {
          placeOrderBtn.disabled = false;
          placeOrderBtn.innerHTML = '<i class="bi bi-lock me-2"></i>Place Order';
          this.showToast('Something went wrong. Please try again.', 'error');
          console.error('Order submission error:', err);
        }
      });
    }
  },

  /**
   * ACCOUNT PAGE
   * Toggles between #guestView and #userView based on login state.
   * Wires up login, register, profile, and logout forms using existing HTML elements.
   */
  initAccountPage() {
    const guestView = document.querySelector('#guestView');
    const userView = document.querySelector('#userView');

    if (!guestView || !userView) return;

    const renderAccount = async () => {
      if (AuthManager.isLoggedIn()) {
        const user = AuthManager.getCurrentUser();

        // Show user view, hide guest view
        guestView.style.display = 'none';
        userView.style.display = '';

        // Populate user sidebar info
        const userAvatar = document.querySelector('#userAvatar');
        if (userAvatar && user.name) {
          const initials = user.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('');
          userAvatar.textContent = initials;
        }

        const userDisplayName = document.querySelector('#userDisplayName');
        if (userDisplayName) userDisplayName.textContent = user.name || 'User';

        const userDisplayEmail = document.querySelector('#userDisplayEmail');
        if (userDisplayEmail) userDisplayEmail.textContent = user.email || '';

        // Populate profile form
        const profileName = document.querySelector('#profileName');
        const profileEmail = document.querySelector('#profileEmail');
        const profilePhone = document.querySelector('#profilePhone');
        const profileAddress = document.querySelector('#profileAddress');

        if (profileName) profileName.value = user.name || '';
        if (profileEmail) profileEmail.value = user.email || '';
        if (profilePhone) profilePhone.value = user.phone || '';
        if (profileAddress) profileAddress.value = user.address || '';

        // Profile form save handler
        const profileForm = document.querySelector('#profileForm');
        const saveProfileBtn = document.querySelector('#saveProfileBtn');
        if (profileForm) {
          profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedUser = {
              ...user,
              name: profileName?.value || user.name,
              email: profileEmail?.value || user.email,
              phone: profilePhone?.value || '',
              address: profileAddress?.value || ''
            };
            AuthManager.updateUser(updatedUser);
            // Update sidebar display
            if (userDisplayName) userDisplayName.textContent = updatedUser.name;
            if (userDisplayEmail) userDisplayEmail.textContent = updatedUser.email;
            if (userAvatar) {
              const initials = updatedUser.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('');
              userAvatar.textContent = initials;
            }
            App.showToast('Profile updated successfully!');
          });
        }

        // Load and render orders
        let orders = [];
        try {
          orders = await AuthManager.getOrders();
        } catch (e) {
          console.warn('Failed to load orders', e);
        }

        const ordersList = document.querySelector('#ordersList');
        const ordersEmpty = document.querySelector('#ordersEmpty');

        if (ordersList) {
          if (orders.length > 0) {
            // Hide empty state, render order cards
            if (ordersEmpty) ordersEmpty.style.display = 'none';

            // Insert order cards before the empty state element (or at the start)
            const ordersHTML = orders.map(o => `
              <div class="card border rounded-3 mb-3">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="mb-0">${o.orderNumber || 'N/A'}</h6>
                    <span class="badge bg-success">${o.status || 'Confirmed'}</span>
                  </div>
                  <p class="small text-muted mb-1">${o.date ? new Date(o.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
                  <p class="small mb-0">${o.items ? o.items.length + ' item(s)' : ''} — <strong>$${o.total ? o.total.toFixed(2) : '0.00'}</strong></p>
                </div>
              </div>
            `).join('');

            // Insert before ordersEmpty if it exists, otherwise set innerHTML
            if (ordersEmpty) {
              ordersEmpty.insertAdjacentHTML('beforebegin', ordersHTML);
            } else {
              ordersList.innerHTML = ordersHTML;
            }
          } else {
            if (ordersEmpty) ordersEmpty.style.display = '';
          }
        }

        // Logout handler
        const logoutBtn = document.querySelector('#logoutBtn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AuthManager.logout();
            renderAccount();
          });
        }

      } else {
        // Show guest view, hide user view
        guestView.style.display = '';
        userView.style.display = 'none';

        // Login handler
        const loginForm = document.querySelector('#loginForm');
        if (loginForm) {
          loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.querySelector('#loginEmail')?.value.trim();
            const password = document.querySelector('#loginPassword')?.value;

            if (!email || !password) {
              App.showToast('Please enter email and password.', 'error');
              return;
            }

            const loginBtn = document.querySelector('#loginBtn');
            if (loginBtn) {
              loginBtn.disabled = true;
              loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
            }

            try {
              await AuthManager.login(email, password);
              App.showToast('Welcome back!');
              AuthManager.updateUI();
              renderAccount();
            } catch (err) {
              App.showToast(err.message || 'Login failed.', 'error');
              if (loginBtn) {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Sign In';
              }
            }
          });
        }

        // Register handler
        const registerForm = document.querySelector('#registerForm');
        if (registerForm) {
          registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.querySelector('#registerName')?.value.trim();
            const email = document.querySelector('#registerEmail')?.value.trim();
            const password = document.querySelector('#registerPassword')?.value;
            const confirmPassword = document.querySelector('#registerConfirmPassword')?.value;
            const agreeTerms = document.querySelector('#agreeTerms')?.checked;

            if (!name || !email || !password || !confirmPassword) {
              App.showToast('Please fill in all fields.', 'error');
              return;
            }

            if (password !== confirmPassword) {
              App.showToast('Passwords do not match.', 'error');
              return;
            }

            if (password.length < 6) {
              App.showToast('Password must be at least 6 characters.', 'error');
              return;
            }

            if (!agreeTerms) {
              App.showToast('Please agree to the Terms & Conditions.', 'error');
              return;
            }

            const registerBtn = document.querySelector('#registerBtn');
            if (registerBtn) {
              registerBtn.disabled = true;
              registerBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';
            }

            try {
              await AuthManager.register(name, email, password);
              App.showToast('Account created successfully!');
              AuthManager.updateUI();
              renderAccount();
            } catch (err) {
              App.showToast(err.message || 'Registration failed.', 'error');
              if (registerBtn) {
                registerBtn.disabled = false;
                registerBtn.textContent = 'Create Account';
              }
            }
          });
        }
      }
    };

    renderAccount();
  },

  /**
   * CONFIRMATION PAGE
   * Populates existing HTML elements with order data from sessionStorage.
   */
  initConfirmationPage() {
    // Retrieve order from sessionStorage
    let order;
    try {
      order = JSON.parse(sessionStorage.getItem('me_last_order'));
    } catch (e) {
      order = null;
    }

    // --- Greeting ---
    const confirmationGreeting = document.querySelector('#confirmationGreeting');
    if (confirmationGreeting) {
      const user = AuthManager.getCurrentUser();
      if (user && user.name) {
        confirmationGreeting.textContent = `Thank you for your purchase, ${user.name.split(' ')[0]}!`;
      } else {
        confirmationGreeting.textContent = 'Thank you for your purchase.';
      }
    }

    // --- Order Number ---
    const orderNumberEl = document.querySelector('#orderNumber');
    if (orderNumberEl) {
      orderNumberEl.textContent = order?.orderNumber || 'ME-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    // --- Order Date ---
    const orderDateEl = document.querySelector('#orderDate');
    if (orderDateEl) {
      const date = order?.date ? new Date(order.date) : new Date();
      orderDateEl.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // --- Order Items ---
    const orderItemsEl = document.querySelector('#orderItems');
    if (orderItemsEl && order?.items) {
      orderItemsEl.innerHTML = order.items.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center gap-2">
            <img src="${item.image}" alt="${item.name}" class="rounded" style="width:40px;height:50px;object-fit:cover;">
            <div>
              <div class="small fw-semibold">${item.name}</div>
              <div class="text-muted" style="font-size:0.75rem;">Qty: ${item.quantity} | Size: ${item.size} | ${item.color}</div>
            </div>
          </div>
          <span class="small fw-semibold">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('');
    }

    // --- Order Total ---
    const orderTotalEl = document.querySelector('#orderTotal');
    if (orderTotalEl && order) {
      orderTotalEl.textContent = `$${order.total.toFixed(2)}`;
    }

    // --- Shipping Address ---
    const shippingAddressEl = document.querySelector('#shippingAddress');
    if (shippingAddressEl && order?.shippingAddress) {
      const addr = order.shippingAddress;
      shippingAddressEl.innerHTML = `
        ${addr.firstName} ${addr.lastName}<br>
        ${addr.address}<br>
        ${addr.city}, ${addr.state} ${addr.zip}${addr.country ? '<br>' + addr.country : ''}
        ${addr.phone ? '<br>' + addr.phone : ''}
      `;
    }

    // Clear the stored order
    sessionStorage.removeItem('me_last_order');
  }
};

// =========================================================================
// Auto-initialize on DOM ready
// =========================================================================

document.addEventListener('DOMContentLoaded', () => App.init());
