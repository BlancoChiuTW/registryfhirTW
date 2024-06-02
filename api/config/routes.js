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

  // 首頁
  '/': 'index',

  // 使用者相關
  'POST /user/register': 'user/register',
  'POST /user/login': 'user/login',
  'GET /user/me': 'user/get-me',
  'GET /user/:uid': 'user/get',
  'PUT /user/me': 'user/update-me',
  'PUT /user/:uid': 'user/update',
  'POST /user/logout': 'user/logout',
  
  // IG 相關
  'POST /ig': 'ig/create',
  'GET /ig': 'ig/get',
  'GET /ig/:id': 'ig/get-one',
  'PUT /ig/:id': 'ig/update',
  'DELETE /ig/:id': 'ig/destroy',

  // IG Edition 相關
  'GET /ig/:guide/edition': 'ig/edition/get',
  'GET /ig/:guide/edition/:edition_id': 'ig/edition/get-one',
  'POST /ig/:guide/edition': 'ig/edition/create',
  'PUT /ig/:guide/edition/:edition_id': 'ig/edition/update',
  'DELETE /ig/:guide/edition/:edition_id': 'ig/edition/destroy',

  // IG Category 相關
  'POST /category': 'category/create',


  
  // 靜態檔案相關
  '/*': serveStatic(assetsDir, {skipAssets: true}),
};
