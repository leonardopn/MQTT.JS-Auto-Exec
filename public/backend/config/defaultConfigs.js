const _ = require("lodash");

const configDefault = {
    serverIp: "",
    user: "",
    pass: "",
    topic: "",
    startup: false
}

function verificaObjetoDefault(data, objComparativo) {
    const propsData = Object.getOwnPropertyNames(data);
    const propsOnjComparativo = Object.getOwnPropertyNames(objComparativo);
    propsData.sort();
    propsOnjComparativo.sort();
    return _.isEqual(propsData, propsOnjComparativo);
}

module.exports = { configDefault, verificaObjetoDefault }