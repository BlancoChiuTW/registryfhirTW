module.exports = {


  friendlyName: 'Guide',


  description: '【使用者功能】刪除一筆 IG 資料，並刪除這個 IG 底下所有版本發布資料，只能刪除自己上傳的 IG 資料，管理員則無限制',


  inputs: {
    id: {
      type: 'number',
      description: 'id',
      required: true
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

    // get ig
    const ig = await Guides.findOne({
      id: inputs.id
    }).populate('editions');

    if (!ig) {
      return exits.err(200);
    }

    sails.log(ig.uploader, this.req.session.user.id, this.req.session.user.role)

    // check permission
    if ((ig.uploader !== this.req.session.user.id) && (this.req.session.user.role>= 999)) {
      return exits.err(201);
    }

    // destroy all editions
    const _ = await GuidesEditions.destroy({
      guide: inputs.id
    });

    // destroy ig
    const __ = await Guides.destroy({
      id: inputs.id
    });

    // All done.
    return exits.success({id: inputs.id});

  }


};
