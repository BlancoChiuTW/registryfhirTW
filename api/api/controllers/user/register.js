module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


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
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      description: '電子郵件'
    },
    firstname: {
      type: 'string',
      required: true,
      description: '名字'
    },
    lastname: {
      type: 'string',
      required: true,
      description: '姓氏'
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

    // 檢查是否有重複的使用者名稱或 email
    const userCheck = await Users.findOne({
      or: [
        { username: inputs.username },
        { email: inputs.email }
      ]
    });
    if (userCheck) {
      return exits.err(100);
    }

    // 寫入資料庫
    await Users.create({
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      firstname: inputs.firstname,
      lastname: inputs.lastname,
      role: 1000,
      active: false
    });

    // All done.
    return exits.success({
      message: '註冊成功'
    });

  }


};
