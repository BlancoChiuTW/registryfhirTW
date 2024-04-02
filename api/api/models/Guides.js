/**
 * Guides.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      description: 'IG 名稱'
    },
    uploader: {
      model: 'users',
      required: true,
      description: '上傳者 ID'
    },
    description: {
      type: 'string',
      description: 'IG 描述'
    },
    package_id: {
      type: 'string',
      description: 'NPM 套件名稱'
    },
    authority: {
      type: 'string',
      description: 'IG 發布單位'
    },
    country: {
      type: 'string',
      description: 'IG 適用國家'
    },
    language: {
      type: 'string',
      description: 'IG 使用語言'
    },
    category: {
      model: 'guidesCategory',
      description: 'IG 分類'
    },
    tags: {
      type: 'ref',
      description: 'IG 標籤（字串陣列）'
    },
    editions: {
      collection: 'guidesEditions',
      via: 'guide',
      description: 'IG 版本清單'
    },
    
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

