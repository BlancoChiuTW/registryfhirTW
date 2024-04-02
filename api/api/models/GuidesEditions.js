/**
 * GuidesEditions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'guides_editions',
  attributes: {
    guide: {
      model: 'guides',
      required: true,
      description: '關聯 IG 的 ID'
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

};

