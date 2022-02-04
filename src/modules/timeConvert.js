module.exports = async (string) => {
    string = string.replace(`,`, `.`);
    const coefficient = parseFloat(string.replace(/[^0-9.]+/g, ``))
    let seconds;
    if(/^[0-9]\d*(\.\d+)?d$/.test(string) || /^[0-9]\d*(\.\d+)?day$/.test(string) || /^[0-9]\d*(\.\d+)?days$/.test(string)) {
        seconds = coefficient * 86400;
    } else if(/^[0-9]\d*(\.\d+)?h$/.test(string) || /^[0-9]\d*(\.\d+)?hour$/.test(string) || /^[0-9]\d*(\.\d+)?hours$/.test(string)) {
        seconds = coefficient * 3600;
    } else if(/^[0-9]\d*(\.\d+)?m$/.test(string) || /^[0-9]\d*(\.\d+)?min$/.test(string) || /^[0-9]\d*(\.\d+)?mins$/.test(string) || /^[0-9]\d*(\.\d+)?minute$/.test(string) || /^[0-9]\d*(\.\d+)?minutes$/.test(string)) {
        seconds = coefficient * 60;
    } else if(/^[0-9]\d*(\.\d+)?s$/.test(string) || /^[0-9]\d*(\.\d+)?sec$/.test(string) || /^[0-9]\d*(\.\d+)?secs$/.test(string) || /^[0-9]\d*(\.\d+)?second$/.test(string) || /^[0-9]\d*(\.\d+)?seconds$/.test(string)) {
        seconds = coefficient * 1;
    } else {
        seconds = string;
    }

    seconds = Math.round(seconds);

    if(!/^([0-9]\d*)$/.test(seconds)) seconds = false;
    return seconds;
}