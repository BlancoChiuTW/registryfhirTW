module.exports = {


  friendlyName: 'GuideEdition',


  description: '【使用者功能】移除特定 IG 底下的版本發布，只能移除自己發布的 IG，若為管理員則無限制。',


  inputs: {
    guide: {
      type: 'number',
      description: 'IG ID',
      required: true
    },
    edition_id: {
      type: 'number',
      description: 'IG 版本 ID (資料中的 ID)',
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
    // check if the guide exists
    const guide = await Guides.findOne({
      id: inputs.guide
    });

    if (!guide) {
      return exits.err(200);
    }

    // check permission
    if ((guide.uploader !== this.req.session.user.id) && (this.req.session.user.role === 999)) {
      return exits.err(201);
    }

    // destroy the edition
    const _ = await GuidesEditions.destroy({
      id: inputs.edition_id,
    });

    // All done.
    return exits.success({id: inputs.edition_id});

  }


};
