const env = process.env.TEST_ENV || 'local'; // agar kuch nahi mila to local
export const ENV = require(`./${env}`).ENV;