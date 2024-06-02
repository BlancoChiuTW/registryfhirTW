const { defaults } = require("pg");

module.exports = {


  friendlyName: 'Guide',


  description: '【無權限要求】取得 IG 資料列表',


  inputs: {
    name: {
      type: 'string',
      description: 'IG 名稱',
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
    // get ig list
    const ig = await Guides.find({
      where: {
        or: [
          {name: {
            contains: inputs.name
          }},
          {authority: {
            contains: inputs.authority
          }},
          {country: {
            contains: inputs.country
          }},
          {language: {
            contains: inputs.language
          }}
        ]
      },
      sort: 'updatedAt DESC',
      skip: inputs.limit * (inputs.page - 1),
      limit: inputs.limit
    }).populate('uploader').populate('category').populate('editions'); 

    await ig.forEach(async (item) => {
      item.category = item.category.name;
      item.uploader = {
        id: item.uploader.id,
        name: item.uploader.firstName + ' ' + item.uploader.lastName
      }
      // get latest edition
      item.url = item.editions[item.editions.length - 1].url;
      item.ig_version = item.editions[item.editions.length - 1].ig_version;
      item.fhir_version = item.editions[item.editions.length - 1].fhir_version;
      delete item.editions;
    });


    // All done.
    return exits.success({
      total: ig.length,
      data: ig
    });

  }


};
