module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

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

    // 刪除資料庫中的 session 資料
    await UsersSessions.destroy({
      token: this.req.headers.authorization.substring(7)
    });

    // 刪除 session 中的 user 資料
    delete this.req.session.user;

    // All done.
    return exits.success({
      message: '登出成功'
    });

  }


};
