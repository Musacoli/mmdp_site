import keystone from 'keystone';
import User from '../models/User';

const Types = keystone.Field.Types;

let Group = new keystone.List('Group');

Group.add({
  name: {type: String, required: true, unique: true},
  permissions: {type: Types.TextArray, default: []},
  createdAt: { type: Date, default: Date.now },
});

Group.relationship({path: 'users', ref: 'User', refPath: 'groups'});

Group.register();

export default Group;
