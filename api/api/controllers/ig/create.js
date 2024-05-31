module.exports = {


  friendlyName: 'Guide',


  description: 'Create ig.',


  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'IG 名稱'
    },
    description: {
      type: 'string',
      defaultsTo: '',
      description: 'IG 描述'
    },
    package_id: {
      type: 'string',
      defaultsTo: '',
      description: 'NPM 套件名稱'
    },
    authority: {
      type: 'string',
      defaultsTo: '',
      description: 'IG 發布單位'
    },
    country: {
      type: 'string',
      defaultsTo: 'TW',
      description: 'IG 適用國家'
    },
    language: {
      type: 'string',
      defaultsTo: 'zh-TW',
      description: 'IG 使用語言'
    },
    category: {
      type: 'number',
      defaultsTo: 1,
      description: 'IG 分類'
    },
    tags: {
      type: 'ref',
      defaultsTo: [],
      description: 'IG 標籤（字串陣列）'
    },
    ig_version: {
      type: 'string',
      required: true,
      description: 'IG 版本'
    },
    fhir_version: {
      type: 'string',
      required: true,
      description: '使用的 FHIR 版本'
    },
    url: {
      type: 'string',
      isURL: true,
      required: true,
      description: 'IG 網址'
    },
    status: {
      type: 'string',
      isIn: ['draft', 'active', 'retired', 'unknown'],
      defaultsTo: 'draft',
      description: 'IG 有效狀態：draft 草稿（預設）, active 正式, retired 停用, unknown 未知'
    },
    experimental: {
      type: 'boolean',
      defaultsTo: false,
      description: '是否為實驗性 IG（預設為 false）'
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
    const igData = {
      name: inputs.name,
      uploader: this.req.session.user.id,
      description: inputs.description,
      package_id: inputs.package_id,
      authority: inputs.authority,
      country: inputs.country,
      language: inputs.language,
      category: inputs.category,
      tags: inputs.tags,
    };

    // create ig
    const ig = await Guides.create(igData).fetch();

    // create ig edition
    const igEditionData = {
      guide: ig.id,
      ig_version: inputs.ig_version,
      fhir_version: inputs.fhir_version,
      url: inputs.url,
      status: inputs.status,
      experimental: inputs.experimental,
    };

    // create ig edition
    const edition = await GuidesEditions.create(igEditionData).fetch();

    // All done.
    return exits.success({ig, edition});

  }


};
