exports.create = {
  Group: [
    {
      name: 'Security Admin',
      permissions: ['user.*', 'group.*']
    }
  ],
  // for testing purposes update the id on the groups
  // array appropriately after the data is seeded
  User: [
    {
      'name': {
        first: 'Super',
        last: 'Admin'
      },
      'email': 'super.admin@mmdp.com',
      'password': 'admin',
      'groups': ['5c47216928c2dfa645b39e7d'],
    }
  ]
};
