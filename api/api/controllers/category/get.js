module.exports = {


  friendlyName: 'Get',


  description: 'Get category.',


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

    // get category list
    const category = await GuidesCategory.find();
    // All done.
    return exits.success(category);

  }


};
