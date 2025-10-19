/**
 * Format price in Indian currency (Lakhs/Crores)
 * @param {number} price - Price in rupees
 * @returns {string} Formatted price string
 */
export const formatPriceINR = (price) => {
  if (!price) return '₹0';
  
  if (price >= 10000000) {
    // Convert to Crores
    const crores = price / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  } else if (price >= 100000) {
    // Convert to Lakhs
    const lakhs = price / 100000;
    return `₹${lakhs.toFixed(2)} L`;
  } else {
    // Less than a lakh
    return `₹${price.toLocaleString('en-IN')}`;
  }
};

/**
 * Format number in compact notation
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatCompactNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

