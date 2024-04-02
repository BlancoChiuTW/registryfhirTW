/**
 * Guides-category.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'guides_category',
  attributes: {
    name: {
      type: 'string',
      required: true,
      description: '分類名稱'
    },
  },

};

