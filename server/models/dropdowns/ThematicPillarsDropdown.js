import keystone from 'keystone';

const ThematicPillarDropdown = new keystone.List('ThematicPillarDropdown');

ThematicPillarDropdown.add({
  pillarTitle: { type: String },
  description: { type: String },
});

ThematicPillarDropdown.defaultColumns = 'pillarTitle';

ThematicPillarDropdown.register();

export default ThematicPillarDropdown;
