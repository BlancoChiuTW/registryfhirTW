module.exports = {


  friendlyName: 'Guide',


  description: '',


  inputs: {
    id: {
      type: 'number',
      description: 'id',
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

    const ig = await Guides.findOne({
      id: inputs.id
    }).populate('uploader').populate('category').populate('editions');

    ig.uploader = ig.uploader.firstname + ' ' + ig.uploader.lastname;

    // All done.
    return exits.success(ig);

  }


};
