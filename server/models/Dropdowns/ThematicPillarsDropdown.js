import keystone from 'keystone';

const ThematicPillarDropdown = new keystone.List('ThematicPillarDropdown');

ThematicPillarDropdown.add({
  pillarName: { type: String },
  description: { type: String },
});

ThematicPillarDropdown.defaultColumns = 'pillarName';

ThematicPillarDropdown.register();

export default ThematicPillarDropdown;
