const input = (item, subthemeOptions) => [
  {
    type: 'text',
    name: 'focusAreaName',
    label: 'Focus Area',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Enter Focus Area Name',
    value: item.focusAreaName,
  },
  {
    type: 'select',
    name: 'subThemeId',
    label: 'Sub Themes',
    className: '',
    fluid: true,
    placeholder: 'Sub Themes',
    value: item.subThemeId,
    options: subthemeOptions,
  },
  {
    type: 'text',
    name: 'description',
    label: 'Description',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Enter a description',
    value: item.description,
  },
];

export default input;
