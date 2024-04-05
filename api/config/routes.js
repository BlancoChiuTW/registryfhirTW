/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const express = require('express');
const serveStatic = require('serve-static');

const assetsDir = `${__dirname}/../assets`;
const swaggerDir = `../swagger/swagger.json`;



module.exports.routes = {

  // 使用者相關
  'POST /user/register': 'user/register',
  'POST /user/login': 'user/login',
  'GET /user/me': 'user/get-me',
  'PUT /user/me': 'user/update-me',
  'POST /user/logout': 'user/logout',
  
  // 靜態檔案相關
  '/*': serveStatic(assetsDir, {skipAssets: true}),
};
