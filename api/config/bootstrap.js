/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // If there are no users in the database, create a new user.
  if (await Users.count() === 0) {
    sails.log.info('Creating admin user');
    await Users.create({
      username: 'admin',
      password: 'admin',
      role: 0,
      email: 'admin@localhost.com',
      firstname: 'Admin',
      lastname: 'User',
      active: true,
    });
    return;
  }

  // If there are no categories in the database, create a new category.
  if (await GuidesCategory.count() === 0) {
    sails.log.info('Creating default category');
    await GuidesCategory.create({
      name: '無分類',
      description: '無分類／預設分類',
    });
    return;
  }

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

};
