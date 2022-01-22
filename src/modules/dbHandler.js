const fs = require(`fs`),
      usageData = require(`../json/usage.json`);

module.exports.addUse = (command, id) => {
    if(!usageData.global[command]) usageData.global[command] = 0;
    if(!usageData[id]) usageData[id] = { total: 0 };
    if(!usageData[id][command]) usageData[id][command] = 0;

    usageData.global.total++;
    usageData.global[command]++;
    usageData[id].total++;
    usageData[id][command]++;

    return fs.writeFileSync(`./json/usage.json`, JSON.stringify(usageData, null, 4));
}