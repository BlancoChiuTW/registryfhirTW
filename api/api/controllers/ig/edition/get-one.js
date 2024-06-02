const { defaults } = require("pg");

module.exports = {


  friendlyName: 'GuideEdition',


  description: '【無權限要求】取得特定 IG 底下的單一筆版本發布資料',


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

    // get the edition
    const edition = await GuidesEditions.findOne({
      id: inputs.edition_id,
    });

    if (!edition) {
      return exits.err(203);
    }

    // All done.
    return exits.success(edition);
  }


};
