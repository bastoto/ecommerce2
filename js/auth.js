/**
 * MAISON ÉLÉGANCE - Authentication Manager
 *
 * Handles user registration, login, logout, and order management.
 * Uses PHP API endpoints for persistence with localStorage as a fallback
 * if the API is unavailable.
 *
 * Exported as window.AuthManager for global access.
 */

window.AuthManager = {

  /** localStorage keys */
  SESSION_KEY: 'me_user',
  USERS_KEY: 'me_users',
  ORDERS_KEY: 'me_orders',

  // =========================================================================
  // Authentication
  // =========================================================================

  /**
   * Registers a new user via the API. Falls back to localStorage if the
   * API is unreachable.
   *
   * @param {string} name     - User's full name
   * @param {string} email    - User's email address
   * @param {string} password - User's password
   * @returns {Object} The created user object
   * @throws {Error} If registration fails (e.g. duplicate email)
   */
  async register(name, email, password) {
    try {
      const response = await fetch('api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Registration failed');
      }

      // Save session
      const user = data.user || { id: data.id, name, email };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
      this.updateUI();
      return user;

    } catch (err) {
      // If it was a validation error from the API, re-throw it
      if (err.message && !err.message.includes('fetch')) {
        // Check if the error is a network error or an API validation error
        if (err.message !== 'Failed to fetch' &&
            err.message !== 'NetworkError when attempting to fetch resource.' &&
            err.message !== 'Load failed') {
          throw err;
        }
      }

      // Fallback: register locally
      console.warn('AuthManager: API unavailable, using localStorage fallback.');
      return this._registerLocal(name, email, password);
    }
  },

  /**
   * Logs in a user via the API. Falls back to localStorage if the
   * API is unreachable.
   *
   * @param {string} email    - User's email
   * @param {string} password - User's password
   * @returns {Object} The authenticated user object
   * @throws {Error} If credentials are invalid
   */
  async login(email, password) {
    try {
      const response = await fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Login failed');
      }

      const user = data.user || { id: data.id, name: data.name, email };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
      this.updateUI();
      return user;

    } catch (err) {
      // If it was a validation error from the API, re-throw it
      if (err.message && err.message !== 'Failed to fetch' &&
          err.message !== 'NetworkError when attempting to fetch resource.' &&
          err.message !== 'Load failed') {
        throw err;
      }

      // Fallback: login locally
      console.warn('AuthManager: API unavailable, using localStorage fallback.');
      return this._loginLocal(email, password);
    }
  },

  /**
   * Logs the current user out by clearing the session from localStorage.
   */
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    this.updateUI();
  },

  /**
   * Returns the currently logged-in user object, or null if not authenticated.
   * @returns {Object|null}
   */
  getCurrentUser() {
    try {
      const data = localStorage.getItem(this.SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Checks whether a user is currently logged in.
   * @returns {boolean}
   */
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  // =========================================================================
  // Orders
  // =========================================================================

  /**
   * Saves a completed order via the API. Falls back to localStorage.
   *
   * @param {Object} order - The order object to save
   * @returns {Object} The saved order (may include server-generated ID)
   */
  async saveOrder(order) {
    const user = this.getCurrentUser();
    if (user) {
      order.userId = user.id || user.email;
      order.userName = user.name;
    }
    order.date = new Date().toISOString();

    try {
      const response = await fetch('api/orders.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to save order');
      }

      // Also save locally as backup
      this._saveOrderLocal(order);
      return data.order || order;

    } catch (err) {
      console.warn('AuthManager: API unavailable, saving order locally.', err);
      this._saveOrderLocal(order);
      return order;
    }
  },

  /**
   * Retrieves order history for the current user from the API.
   * Falls back to localStorage.
   *
   * @returns {Array} Array of order objects
   */
  async getOrders() {
    const user = this.getCurrentUser();
    if (!user) return [];

    const userId = user.id || user.email;

    try {
      const response = await fetch(`api/orders.php?user_id=${encodeURIComponent(userId)}`);
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch orders');
      }

      return data.orders || [];

    } catch (err) {
      console.warn('AuthManager: API unavailable, reading orders from localStorage.', err);
      return this._getOrdersLocal(userId);
    }
  },

  // =========================================================================
  // UI Updates
  // =========================================================================

  /**
   * Updates the navigation UI based on authentication state.
   * - If logged in: shows account link with user name, hides login link
   * - If logged out: shows login link, hides account/user-name elements
   */
  updateUI() {
    const user = this.getCurrentUser();
    const loginLinks = document.querySelectorAll('.nav-login');
    const accountLinks = document.querySelectorAll('.nav-account');
    const userNameEls = document.querySelectorAll('.user-name');
    const logoutBtns = document.querySelectorAll('.btn-logout');

    if (user) {
      // User is logged in
      loginLinks.forEach(el => el.style.display = 'none');
      accountLinks.forEach(el => el.style.display = '');
      userNameEls.forEach(el => { el.textContent = user.name; });
      logoutBtns.forEach(btn => {
        btn.style.display = '';
        // Attach logout handler (remove previous to avoid duplicates)
        btn.removeEventListener('click', this._handleLogout);
        btn.addEventListener('click', this._handleLogout);
      });
    } else {
      // User is logged out
      loginLinks.forEach(el => el.style.display = '');
      accountLinks.forEach(el => el.style.display = 'none');
      userNameEls.forEach(el => { el.textContent = ''; });
      logoutBtns.forEach(btn => btn.style.display = 'none');
    }
  },

  /** Bound logout click handler */
  _handleLogout(e) {
    e.preventDefault();
    window.AuthManager.logout();
    window.location.href = 'index.html';
  },

  // =========================================================================
  // Local Fallbacks (Private Methods)
  // =========================================================================

  /**
   * Registers a user using only localStorage.
   * @private
   */
  _registerLocal(name, email, password) {
    const users = this._getLocalUsers();

    // Check for duplicate email
    if (users.find(u => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }

    const user = {
      id: 'local_' + Date.now(),
      name,
      email,
      password: btoa(password) // basic obfuscation (not secure — demo only)
    };

    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // Create session (without password)
    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    this.updateUI();
    return session;
  },

  /**
   * Logs in a user using only localStorage.
   * @private
   */
  _loginLocal(email, password) {
    const users = this._getLocalUsers();
    const user = users.find(
      u => u.email === email && u.password === btoa(password)
    );

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    this.updateUI();
    return session;
  },

  /**
   * Retrieves all locally stored users.
   * @private
   * @returns {Array}
   */
  _getLocalUsers() {
    try {
      const data = localStorage.getItem(this.USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  /**
   * Saves an order to localStorage.
   * @private
   */
  _saveOrderLocal(order) {
    try {
      const orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');
      orders.push(order);
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('AuthManager: Failed to save order locally', e);
    }
  },

  /**
   * Retrieves orders for a given userId from localStorage.
   * @private
   * @returns {Array}
   */
  _getOrdersLocal(userId) {
    try {
      const orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');
      return orders.filter(o => o.userId === userId);
    } catch (e) {
      return [];
    }
  }
};
