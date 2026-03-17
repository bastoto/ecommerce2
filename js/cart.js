/**
 * MAISON ÉLÉGANCE - Cart Manager
 *
 * Handles all shopping cart operations using localStorage for persistence.
 * Cart items are stored as an array of objects, each containing product info,
 * selected size, color, and quantity.
 *
 * Exported as window.CartManager for global access.
 */

window.CartManager = {

  /** localStorage key for the cart data */
  STORAGE_KEY: 'me_cart',

  /**
   * Retrieves the current cart from localStorage.
   * @returns {Array} Array of cart item objects
   */
  getCart() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('CartManager: Failed to read cart from localStorage', e);
      return [];
    }
  },

  /**
   * Saves the given cart array to localStorage.
   * @param {Array} cart - The cart array to persist
   */
  saveCart(cart) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('CartManager: Failed to save cart to localStorage', e);
    }
  },

  /**
   * Adds a product to the cart. If an item with the same product ID, size,
   * and color already exists, the quantity is merged (incremented).
   *
   * @param {Object} product  - The product object from PRODUCTS array
   * @param {string} size     - Selected size (e.g. "M", "One Size")
   * @param {string} color    - Selected color name (e.g. "Black")
   * @param {number} quantity - Number of units to add
   */
  addItem(product, size, color, quantity) {
    const cart = this.getCart();

    // Look for an existing item with matching product, size, and color
    const existingIndex = cart.findIndex(
      item => item.productId === product.id &&
              item.size === size &&
              item.color === color
    );

    if (existingIndex !== -1) {
      // Merge: increase quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // Add new item
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        color: color,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    this.updateBadge();
  },

  /**
   * Removes a cart item by its index.
   * @param {number} index - Zero-based index of the item to remove
   */
  removeItem(index) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      this.saveCart(cart);
      this.updateBadge();
    }
  },

  /**
   * Updates the quantity of a cart item. If the new quantity is 0 or less,
   * the item is removed from the cart entirely.
   *
   * @param {number} index - Zero-based index of the item
   * @param {number} qty   - New quantity value
   */
  updateQuantity(index, qty) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      if (qty <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = qty;
      }
      this.saveCart(cart);
      this.updateBadge();
    }
  },

  /**
   * Returns the total number of individual items in the cart
   * (sum of all quantities).
   * @returns {number}
   */
  getCount() {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  },

  /**
   * Calculates the cart subtotal (sum of price * quantity for each item).
   * @returns {number}
   */
  getSubtotal() {
    return this.getCart().reduce(
      (total, item) => total + (item.price * item.quantity), 0
    );
  },

  /**
   * Determines shipping cost. Free shipping for orders $100 and above.
   * @returns {number} Shipping cost (0 or 9.95)
   */
  getShipping() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 100 ? 0 : 9.95;
  },

  /**
   * Calculates the order total (subtotal + shipping).
   * @returns {number}
   */
  getTotal() {
    return this.getSubtotal() + this.getShipping();
  },

  /**
   * Empties the entire cart.
   */
  clear() {
    this.saveCart([]);
    this.updateBadge();
  },

  /**
   * Updates all elements with the class .cart-count to display the
   * current item count. Hides the badge if the count is 0.
   */
  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-block' : 'none';
    });
  }
};
