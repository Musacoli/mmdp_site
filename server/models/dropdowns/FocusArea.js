import keystone from 'keystone';

const { Types } = keystone.Field;

const FocusArea = new keystone.List('FocusArea');

FocusArea.add({
  focusAreaName: { type: String },
  description: { type: String },
  subThemeId: { type: Types.Relationship, ref: 'SubTheme' },
});

FocusArea.defaultColumns = 'focusAreaName';

FocusArea.register();

export default FocusArea;
