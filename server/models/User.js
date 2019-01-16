import keystone from 'keystone';

const Types = keystone.Field.Types;

const User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: {
    type: Types.Email, required: true, index: true, initial: true, unique: true
  },
  password: { type: Types.Password, required: true, initial: true }
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

User.defaultColumns = 'id, name, email';

User.register();
