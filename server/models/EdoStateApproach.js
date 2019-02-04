import keystone from 'keystone';

const { Types } = keystone.Field;

const EdoStateApproach = new keystone.List('EdoStateApproach');

EdoStateApproach.add({
  creator: { type: Types.Relationship, ref: 'User' },
  theEdoStateApproach: { type: Types.Html, wysiwyg: true },
  background: { type: Types.Html, wysiwyg: true },
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

EdoStateApproach.defaultColumns = 'theEdoStateApproach, background';
EdoStateApproach.register();

export default EdoStateApproach;
