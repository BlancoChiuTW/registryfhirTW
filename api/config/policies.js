/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */
const ACL = Object.freeze({
  ANY: true,
  ANY_OR_USER: ['check-anon-or-logined'],
  USER: ['check-login'],
  ADMIN: ['check-login', 'check-admin'],
});

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  'user/get-me': ACL.USER,
  'user/update-me': ACL.USER,
  'user/logout': ACL.USER,
  // '*': true,

};
