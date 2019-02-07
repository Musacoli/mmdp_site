import keystone from 'keystone';

const { Types } = keystone.Field;

const Group = new keystone.List('Group');

Group.add({
  name: { type: String, required: true, unique: true },
  permissions: { type: Types.TextArray, default: [] },
  createdAt: { type: Date, default: Date.now },
});

Group.relationship({ path: 'users', ref: 'User', refPath: 'groups' });

Group.register();

export default Group;
