module.exports = {


  friendlyName: 'Login',


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
      description: '登入成功'
    },
    err: {
      description: '登入失敗'
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


    // All done.
    return;

  }


};
