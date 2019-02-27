import keystone from 'keystone';

const { Types } = keystone.Field;

const SubTheme = new keystone.List('SubTheme');

SubTheme.add({
  subThemeName: { type: String },
  description: { type: String },
  thematicPillarId: { type: Types.Relationship, ref: 'ThematicPillarDropdown' },
  edoTarget: { type: String },
});

SubTheme.defaultColumns = 'subThemeName';

SubTheme.register();

export default SubTheme;
