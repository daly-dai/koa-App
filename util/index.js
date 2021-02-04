let getFulldate = function () {
    let nowDate = new Date();
    return `${nowDate.getFullYear()}-${getZero(nowDate.getMonth() + 1)}-${getZero(nowDate.getDate())} ${nowDate.getHours()}:${getZero(nowDate.getMinutes())}:${getZero(nowDate.getSeconds())}`;
}

module.exports = {
    getFulldate: getFulldate,
}