module.exports = {


  friendlyName: 'User',


  description: '取得目前登入的使用者資料',


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
    
    // All done.
    delete this.req.session.user.password;

    return exits.success({...this.req.session.user});

  }


};
