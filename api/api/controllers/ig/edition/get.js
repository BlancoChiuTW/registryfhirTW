module.exports = {


  friendlyName: 'GuideEdition',


  description: 'Get edition.',


  inputs: {
    guide: {
      type: 'number',
      description: 'IG ID',
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
    // check if the guide exists
    const guide = await Guides.findOne({
      id: inputs.guide
    });

    if (!guide) {
      return exits.err(200);
    }

    // get all editions
    const editions = await GuidesEditions.find({
      guide: inputs.guide
    });
    
    // All done.
    return exits.success(editions);

  }


};
