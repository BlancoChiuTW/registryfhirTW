module.exports = {


  friendlyName: 'Category',


  description: '【管理員功能】新增 IG 類別',


  inputs: {
    name: {
      type: 'string',
      description: '類別名稱',
      required: true
    },
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
    const category = await GuidesCategory.create({
      name: inputs.name
    }).fetch();

    // All done.
    return exits.success(category);

  }


};
