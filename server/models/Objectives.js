import keystone from 'keystone';

const { Types } = keystone.Field;

const Objectives = new keystone.List('Objectives');

Objectives.add({
  creator: { type: Types.Relationship, ref: 'User' },
  Objectives: { type: Types.Html, wysiwyg: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  archived: { type: Boolean, default: false },
});


Objectives.defaultColumns = 'Objectives';
Objectives.register();

export default Objectives;
