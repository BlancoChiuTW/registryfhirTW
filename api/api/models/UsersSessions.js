/**
 * UsersSessions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users_sessions',
  attributes: {
    user: {
      model: 'users',
      description: '關聯使用者 ID'
    },
    token: {
      type: 'string',
      required: true,
      unique: true,
      description: '登入 Token'
    },
    expiresAt: {
      type: 'number',
      description: 'Token 有效期限，為 JS Timestamp 格式'
    },
  },
  beforeCreate: function (valuesToSet, proceed) {
    // Token 有效期限為 3 小時，以 JS Timestamp 格式儲存
    valuesToSet.expiresAt = Date.now() + 60 * 1000 * sails.config.custom.user_session_time;

    proceed();
  }
};

