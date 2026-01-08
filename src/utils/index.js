/**
 * Utility Functions
 * 
 * Place your helper functions here, for example:
 * - formatCurrency
 * - formatDate
 * - validateEmail
 * - debounce
 */

/**
 * Format number to Indonesian Rupiah currency
 * @param {number} amount 
 * @returns {string}
 */
export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Truncate text with ellipsis
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
