// 引入user
const User = require("../models/User");

/**
 * @description 根据用户的id获取用户的scoketid
 * @access 私密的
 *
 */
async function getSocketIdById(id) {
  const findResult = await User.find({ id: id });
  if (findResult.length > 0) {
    return findResult[0].scoketId;
  }

  return "";
}

module.exports = {
  getSocketIdById,
};
