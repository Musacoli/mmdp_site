const input = (item, thematicOptions) => [
  {
    type: 'text',
    name: 'subThemeName',
    label: 'Sub-theme name',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Enter sub-theme name',
    value: item.subThemeName,
  },
  {
    type: 'select',
    name: 'thematicPillarId',
    label: 'Thematic Pillar',
    className: '',
    fluid: true,
    placeholder: 'Thematic Pillar',
    value: item.thematicPillarId,
    options: thematicOptions,
  },
  {
    type: 'text',
    name: 'edoTarget',
    label: 'Edo Target',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Edo Target',
    value: item.edoTarget,
  },
  {
    type: 'text',
    name: 'description',
    label: 'Description',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'description',
    value: item.description,
  },
];

export default input;
