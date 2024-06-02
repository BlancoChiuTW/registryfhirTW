/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const DEBUG = false;

const ACL = Object.freeze({
  ANY: true,
  ANY_OR_USER: (DEBUG ? true : ['check-anon-or-logined']),
  USER: (DEBUG ? true :['check-login']),
  ADMIN: (DEBUG ? true :['check-login', 'check-admin']),
});

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  'index': ACL.ANY,

  'user/get-me': ACL.USER,
  'user/get': ACL.ADMIN,
  'user/update-me': ACL.USER,
  'user/update': ACL.ADMIN,
  'user/register': ACL.ANY,
  'user/login': ACL.ANY,
  'user/logout': ACL.USER,

  'ig/create': ACL.USER,
  'ig/get': ACL.ANY,
  'ig/get-one': ACL.ANY,
  'ig/update': ACL.USER,
  'ig/destroy': ACL.USER,

  'ig/edition/get': ACL.ANY,
  'ig/edition/get-one': ACL.ANY,
  'ig/edition/create': ACL.USER,
  'ig/edition/update': ACL.USER,
  'ig/edition/destroy': ACL.USER,

  'ig/category/get': ACL.ANY,

  // '*': true,

};
