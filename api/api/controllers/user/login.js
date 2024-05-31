const { v4: uuidv4 } = require('uuid');

module.exports = {

  friendlyName: 'User',


  description: 'Login user.',


  inputs: {
    username: {
      type: 'string',
      required: true,
      description: '使用者名稱'
    },
    password: {
      type: 'string',
      required: true,
      description: '密碼'
    }
  },


  exits: {
    success: {
      responseType: 'ok'
    },
    err: {
      responseType: 'err'
    }
  },


  fn: async function (inputs, exits) {
    // 取得使用者資料
    const user = await Users.findOne({
      username: inputs.username
    }).decrypt();

    // 若無此使用者
    if (!user) {
      return exits.err(103);
    }

    // 檢查密碼
    if (inputs.password !== user.password) {
      return exits.err(104);
    }

    // 產生 token
    // Token 產生規則：uuid 去掉 '-' 符號，有效時間自 sails.config.custom.user_session_time 設定，設定單位為分鐘
    const token = uuidv4().replace(/-/g, '');
    const expiresAt = new Date().getTime() + sails.config.custom.user_session_time * 60 * 1000;

    // 寫入資料庫
    await UsersSessions.create({
      user: user.id,
      token,
      expiresAt
    });


    // All done.
    return exits.success({
      token,
      expiresAt: new Date(expiresAt).toISOString()
    });
  }


};
