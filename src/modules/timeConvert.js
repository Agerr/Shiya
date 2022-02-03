module.exports = async (string) => {

    const coefficient = await parseInt(string.replace(/[^0-9,.]/g, ""))
    let seconds;
    if(/^[1-9]\d*(\.\d+)?d$/.test(string) || /^[1-9]\d*(\.\d+)?day$/.test(string) | /^[1-9]\d*(\.\d+)?days$/.test(string)) {
        seconds = coefficient * 86400;
    } else if(/^[1-9]\d*(\.\d+)?h$/.test(string) || /^[1-9]\d*(\.\d+)?hour$/.test(string) || /^[1-9]\d*(\.\d+)?hours$/.test(string)) {
        seconds = coefficient * 3600;
    } else if(/^[1-9]\d*(\.\d+)?m$/.test(string) || /^[1-9]\d*(\.\d+)?min$/.test(string) || /^[1-9]\d*(\.\d+)?mins$/.test(string) || /^[1-9]\d*(\.\d+)?minute$/.test(string) || /^[1-9]\d*(\.\d+)?minutes$/.test(string)) {
        seconds = coefficient * 60;
    } else {
        seconds = coefficient;
    }

    Math.round(seconds);
    
    if(!/^([1-9]\d*)$/.test(seconds)) seconds = false;

    return seconds;
}