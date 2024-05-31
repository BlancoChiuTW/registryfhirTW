module.exports = {


  friendlyName: 'Guide',


  description: 'Destroy ig.',


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
    const ig = await GuidesEditions.findOne({
      id: inputs.id
    }).populate('editions');

    if (!ig) {
      return exits.err(200);
    }

    // check permission
    if ((ig.uploader !== this.req.session.user.id) && (this.req.session.user.role === 999)) {
      return exits.err(201);
    }

    // destroy all editions
    const _ = await ig.editions.forEach(async edition => {
      await GuidesEditions.destroy({
        id: edition.id
      });
    })

    // destroy ig
    const __ = await Guides.destroy({
      id: inputs.id
    });

    // All done.
    return exits.success({id: inputs.id});

  }


};
