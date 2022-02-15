module.exports = (seconds) => {
    return `${parseInt(seconds) / 3600 >= 1 ? Math.round(parseInt(seconds) / 3600 * 100) / 100 + ` hours` : parseInt(seconds) / 60 >= 1 ? Math.round(parseInt(seconds) / 60 * 100) / 100 + ` minutes` : seconds + ` seconds`}`;
}