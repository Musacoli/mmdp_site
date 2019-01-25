import keystone from 'keystone';

const { Types } = keystone.Field;

const Coordination = new keystone.List('Coordination');

Coordination.add({
  creator: { type: Types.Relationship, ref: 'User' },
  coordination: { type: Types.Html, wysiwyg: true },
  whatAreWeDoing: { type: Types.Html, wysiwyg: true },
  introToHighlights: { type: Types.Html, wysiwyg: true },
  highlight: { type: Types.Relationship, ref: 'Highlight', many: true },
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


Coordination.defaultColumns = 'Coordination, whatAreWeDoing, introToHighlights, highlight';
Coordination.register();

export default Coordination;
