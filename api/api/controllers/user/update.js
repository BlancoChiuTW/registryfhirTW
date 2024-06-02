

module.exports = {

  friendlyName: 'User',
  description: '【管理員功能】更新使用者資料',

  inputs: {
    uid: {
      type: 'number',
      description: '使用者 ID'
    },
    password: {
      type: 'string',
      description: '密碼'
    },
    email: {
      type: 'string',
      isEmail: true,
      description: '電子郵件'
    },
    firstname: {
      type: 'string',
      description: '名字'
    },
    lastname: {
      type: 'string',
      description: '姓氏'
    },
    role: {
      type: 'number',
      description: '角色'
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

    // 檢查是否有重複的 email
    if(inputs.email) {
      const user = await Users.find({
        email: inputs.email
      }).limit(1);
      if (user && user.id !== inputs.uid) {
        return exits.err(109);
      }
    }

    // 檢查權限（使用者不能修改自己的權限）
    if(inputs.role && inputs.role>= 999){
      return exits.err(110);
    }

    // 檢查權限（欲修改的權限不能比自己高）
    if(inputs.role && inputs.role < this.req.session.user.role){
      return exits.err(110);
    }

    // 更新使用者資料
    const updatedUser = await Users.update({
      id: this.req.session.user.id
    }).set({
      ...inputs
    }).fetch();

    delete updatedUser[0].password;

    // All done.
    return exits.success(updatedUser[0]);

  }


};
