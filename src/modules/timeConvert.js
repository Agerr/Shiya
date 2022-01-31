module.exports = async (string) => {

    const coefficient = await parseInt(string.replace(/[^0-9,.]/g, ""))
    let seconds;
    if (/^0|([1-9]\d*)d$/.test(string) || /^0|([1-9]\d*)day$/.test(string) | /^0|([1-9]\d*)days$/.test(string)) {
        seconds = coefficient * 86400;
    } else if (/^0|([1-9]\d*)h$/.test(string) || /^0|([1-9]\d*)hour$/.test(string) || /^0|([1-9]\d*)hours$/.test(string)) {
        seconds = coefficient * 3600;
    } else if (/^0|([1-9]\d*)m$/.test(string) || /^0|([1-9]\d*)min$/.test(string) || /^0|([1-9]\d*)mins$/.test(string) || /^0|([1-9]\d*)minute$/.test(string) || /^0|([1-9]\d*)minutes$/.test(string)) {
        seconds = coefficient * 60;
    } else {
        seconds = coefficient;
    }

    Math.round(seconds);
    
    if (!/^([1-9]\d*)$/.test(seconds)) seconds = false;
    
    return seconds;
}