const { description } = require("./get");

module.exports = {


  friendlyName: 'Guide',


  description: 'Update ig.',


  inputs: {
    id: {
      type: 'number',
      description: 'id',
      required: true
    },
    name: {
      type: 'string',
      description: 'IG 名稱',
      defaultsTo: ''
    },
    description: {
      type: 'string',
      description: 'IG 描述',
      defaultsTo: ''
    },
    package_id: {
      type: 'string',
      description: 'NPM 套件名稱',
      defaultsTo: ''
    },
    authority: {
      type: 'string',
      description: 'IG 發布單位',
      defaultsTo: ''
    },
    country: {
      type: 'string',
      description: 'IG 適用國家',
      defaultsTo: ''
    },
    language: {
      type: 'string',
      description: 'IG 使用語言',
      defaultsTo: ''
    },
    category: {
      type: 'number',
      description: 'IG 分類',
      defaultsTo: -1
    },
    tags: {
      type: 'ref',
      description: 'IG 標籤（字串陣列）',
      defaultsTo: null
    },
    page: {
      type: 'number',
      description: '頁數',
      defaultsTo: 1
    },
    limit: {
      type: 'number',
      description: '每頁筆數',
      defaultsTo: 10
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
    // get ig
    const ig = await Guides.findOne({
      id: inputs.id
    });

    if (!ig) {
      return exits.err(200);
    }

    // check permission
    if ((ig.uploader !== this.req.session.user.id) && (this.req.session.user.role === 999)) {
      return exits.err(201);
    }

    // check if category exists
    if (inputs.category !== -1) {
      const category = await GuidesCategory.findOne({
        id: inputs.category
      });
      if (!category) {
        return exits.err(202);
      }
    }

    // update ig
    const igData = {
      name: (inputs.name === '') ? ig.name : inputs.name,
      description: (inputs.description === '') ? ig.description : inputs.description,
      package_id: (inputs.package_id === '') ? ig.package_id : inputs.package_id,
      authority: (inputs.authority === '') ? ig.authority : inputs.authority,
      country: (inputs.country === '') ? ig.country : inputs.country,
      language: (inputs.language === '') ? ig.language : inputs.language,
      category: (inputs.category === 1) ? ig.category : inputs.category,
      tags: (inputs.tags === null) ? ig.tags : inputs.tags,
    };

    const update = await Guides.update({
      id: inputs.id
    }).set(igData).fetch();

    // All done.
    return exits.success(update[0]);

  }


};
