/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  description: '使用者資料表',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 50,
      description: '帳號'
    },
    password: {
      type: 'string',
      required: true,
      encrypt: true,
      description: '密碼'
    },
    role: {
      type: 'number',
      isIn: [0, 1, 999, 1000],
      defaultsTo: 1000,
      description: '角色權限：0 管理員, 1 審核員, 999 一般使用者, 1000 等待審核中'
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true,
      maxLength: 200,
      description: '電子郵件'
    },
    firstname: {
      type: 'string',
      maxLength: 50,
      description: '名字'
    },
    lastname: {
      type: 'string',
      maxLength: 50,
      description: '姓氏'
    },
    active: {
      type: 'boolean',
      defaultsTo: false,
      description: '帳號是否啟用'
    },



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

