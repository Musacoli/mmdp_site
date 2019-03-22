import keystone from 'keystone';

const ThematicPillarDropdown = new keystone.List('ThematicPillarDropdown');

ThematicPillarDropdown.add({
  pillarTitle: { type: String, unique: true },
  description: { type: String, required: false },
});

ThematicPillarDropdown.defaultColumns = 'pillarTitle';

ThematicPillarDropdown.register();

export default ThematicPillarDropdown;
