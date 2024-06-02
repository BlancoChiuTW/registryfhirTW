module.exports = {


  friendlyName: 'User',


  description: '【管理員功能】取得使用者資料',


  inputs: {
    uid: {
      type: 'number',
      description: '使用者 ID'
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
  
    // 檢查是否有傳入使用者 ID
    if(!inputs.uid){
      return exits.err(990);
    }

    // 取得使用者資料
    const _user = await Users.findOne({
      id: inputs.uid
    });

    // 檢查是否有此使用者
    if(!_user){
      return exits.err(111);
    }


    // All done.
    delete _user.password;

    return exits.success(_user);

  }


};
