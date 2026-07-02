/**
 * Wrapper around the ugly NodeJS async import() to make importing Yee-Haw in CommonJS projects much simpler
 *
 * @param {} options 
 */

const yeehaw = async function(options) {
    const yeehaw = await import('../dist/src/index.js');
    return yeehaw.yeehaw(options);
};

module.exports = yeehaw;