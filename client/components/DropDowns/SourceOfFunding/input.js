const input = (item) => [
  {
    type: 'text',
    name: 'sourceOfFundingName',
    label: 'Source of Funding',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Enter source of funding name',
    value: item.sourceOfFundingName,
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
