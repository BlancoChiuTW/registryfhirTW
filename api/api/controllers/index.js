module.exports = {


  friendlyName: 'Index',


  description: '首頁',


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
    return exits.success({
      name: 'Taiwan FHIR IG Registry API',
      version: '1.0.0',
      documentation: '/swagger',
    });

  }


};
