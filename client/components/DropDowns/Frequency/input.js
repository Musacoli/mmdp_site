const input = (item) => [
  {
    type: 'text',
    name: 'frequencyValue',
    label: 'Frequency value',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Enter frequency value',
    value: item.frequencyValue,
  },
  {
    type: 'text',
    name: 'classification',
    label: 'Classification',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Enter  classification',
    value: item.classification,
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
