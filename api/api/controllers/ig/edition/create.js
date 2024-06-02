module.exports = {


  friendlyName: 'GuideEdition',


  description: '【使用者功能】新增 IG 底下的版本發布',


  inputs: {
    guide: {
      type: 'number',
      description: 'IG ID',
      required: true
    },
    ig_version: {
      type: 'string',
      description: 'IG 版本',
      required: true
    },
    fhir_version: {
      type: 'string',
      description: 'FHIR 版本',
      required: true
    },
    url: {
      type: 'string',
      description: 'IG 網址',
      required: true
    },
    status: {
      type: 'string',
      description: 'IG 狀態',
      defaultsTo: 'draft',
      isIn: ['draft', 'active', 'retired', 'unknown']
    },
    experimental: {
      type: 'boolean',
      description: '是否為實驗性 IG',
      defaultsTo: false
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
    // check if guide exists
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

    // create edition
    const igEditionData = {
      guide: inputs.guide,
      ig_version: inputs.ig_version,
      fhir_version: inputs.fhir_version,
      url: inputs.url,
      status: inputs.status,
      experimental: inputs.experimental
    };

    const igEdition = await GuidesEditions.create(igEditionData).fetch();


    // All done.
    return exits.success(igEdition);

  }


};
