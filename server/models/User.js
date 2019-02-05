import keystone from 'keystone';
import { hasPassword } from '../utils/validators';
import {getUserPermissions} from "../utils/permissions";

const { Types } = keystone.Field;

export const User = new keystone.List('User');

User.add(
  {
    first_name: {
      type: Types.Text,
      required: true,
      default: 'first name',
      index: true,
    },
    last_name: {
      type: Types.Text,
      required: true,
      default: 'last name',
      index: true,
    },
    username: {
      type: Types.Text,
      min: 5,
      required: true,
      index: true,
      unique: true,
      default: 'new@User',
    },
    phone: {
      type: Types.Number,
      index: true,
    },
    email: {
      type: Types.Email,
      required: true,
      index: true,
      initial: true,
      unique: true,
    },
    password: {
      type: Types.Password,
      required: true,
      initial: true,
      default: hasPassword('P@ssword1'),
    },
    confirmed: {
      type: Boolean,
      index: false
    },
    groups: {
      type: Types.Relationship,
      ref: 'Group',
      many: true,
      default: []
    },
  },
);

User.schema.virtual('permissions').get(function() {
  return getUserPermissions(this);
});

User.defaultColumns = 'username, email';

User.register();
