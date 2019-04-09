const input = (item) => [
  {
    type: 'text',
    name: 'amountInvestedRange',
    label: 'Amount Invested Range',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Enter Amount invested Range eg.500-1000',
    value: item.amountInvestedRange,
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
