module.exports = {


  friendlyName: 'GuideEdition',


  description: 'Update edition.',


  inputs: {
    guide: {
      type: 'number',
      description: 'IG ID',
      required: true
    },
    edition_id: {
      type: 'number',
      description: 'Edition ID',
      required: true
    },
    ig_version: {
      type: 'string',
      description: 'IG 版本',
      defaultsTo: '-1'
    },
    fhir_version: {
      type: 'string',
      description: 'FHIR 版本',
      defaultsTo: '-1'
    },
    url: {
      type: 'string',
      description: 'IG 網址',
      defaultsTo: '-1'
    },
    status: {
      type: 'string',
      description: 'IG 狀態',
      defaultsTo: 'nochange',
      isIn: ['draft', 'active', 'retired', 'unknown', 'nochange']
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

    // check if edition exists
    const edition = await GuidesEditions.findOne({
      id: inputs.edition_id
    });

    if (!edition) {
      return exits.err(203);
    }

    // check permission
    if ((guide.uploader !== this.req.session.user.id) && (this.req.session.user.role === 999)) {
      return exits.err(201);
    }

    // update edition
    const igEditionData = {
      ig_version: (inputs.ig_version !== '-1') ? inputs.ig_version : edition.ig_version,
      fhir_version: (inputs.fhir_version !== '-1') ? inputs.fhir_version : edition.fhir_version,
      url: (inputs.url !== '-1') ? inputs.url : edition.url,
      status: (inputs.status !== 'nochange') ? inputs.status : edition.status,
      experimental: inputs.experimental
    };

    const igEdition = await GuidesEditions.update({
      id: inputs.edition_id
    }, igEditionData).fetch();

    // All done.
    return exits.success(igEdition[0]);

  }


};
