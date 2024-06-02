module.exports = {


  friendlyName: 'User',


  description: '【使用者功能】更新自己的使用者資料',


  inputs: {
    password: {
      type: 'string',
      description: '密碼'
    },
    confirmPassword: {
      type: 'string',
      description: '確認密碼'
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

    // 如果有傳入密碼，則檢查確認密碼是否相同
    if(inputs.password && inputs.password !== inputs.confirmPassword){
      return exits.err(107);
    }

    // 檢查是否有重複的 email
    if(inputs.email) {
      const user = await Users.find({
        email: inputs.email
      }).limit(1);
      if (user && user.id !== this.req.session.user.id) {
        return exits.err(109);
      }
    }

    // 檢查權限（使用者不能修改自己的權限）
    if(inputs.role && inputs.role === 999){
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
