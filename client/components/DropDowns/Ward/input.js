const input = (item, lgaOptions) => [
  {
    type: 'text',
    name: 'wardName',
    label: 'Ward name',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Enter ward name',
    value: item.wardName,
  },
  {
    type: 'select',
    name: 'lgaId',
    label: 'Local Government Area',
    className: '',
    fluid: true,
    placeholder: 'Local Government Area',
    value: item.lgaId,
    options: lgaOptions,
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
