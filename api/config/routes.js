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
const os = require('os');

const dir = `../assets`;


module.exports.routes = {
  // 靜態檔案相關
  'GET /img/*': serveStatic(dir, {skipAssets: true}),
  'GET /file/*': serveStatic(dir, {skipAssets: true}),

};
