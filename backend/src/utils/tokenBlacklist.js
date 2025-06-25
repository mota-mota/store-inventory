// Almacén en memoria para tokens revocados (en producción usa Redis o similar)
const tokenBlacklist = new Set();

/**
 * Agrega un token a la lista negra
 * @param {string} token - Token a invalidar
 */
const addToBlacklist = (token) => {
  tokenBlacklist.add(token);
};

/**
 * Verifica si un token está en la lista negra
 * @param {string} token - Token a verificar
 * @returns {boolean} - true si el token está en la lista negra, false en caso contrario
 */
const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};

module.exports = {
  tokenBlacklist,
  addToBlacklist,
  isTokenBlacklisted
};
