/**
 * Product Service
 * Handles all API calls related to products
 */

import { API_BASE_URL } from './index';

/**
 * Fetch products from API
 * @param {Object} options - Query options
 * @param {string} options.game - Game slug filter (e.g., 'blox-fruit')
 * @param {string} options.status - Status filter ('available', 'sold')
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async ({ game, status } = {}) => {
  const params = new URLSearchParams();
  
  if (game) params.append('game', game);
  if (status) params.append('status', status);

  const queryString = params.toString();
  const url = `${API_BASE_URL}/api/products${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

/**
 * Fetch single product by ID
 * @param {number|string} id - Product ID
 * @returns {Promise<Object>} Product data
 */
export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
};

/**
 * Fetch all active games
 * @returns {Promise<Array>} Array of games
 */
export const getGames = async () => {
  const response = await fetch(`${API_BASE_URL}/api/games`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  return response.json();
};

export default {
  getProducts,
  getProductById,
  getGames,
};
