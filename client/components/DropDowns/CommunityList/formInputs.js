const inputs = (item, options) => {
  return [
    {
      type: 'text',
      name: 'communityName',
      label: 'Community name',
      className: 'animated fadeIn',
      fluid: true,
      placeholder: 'Enter community name',
      value: item.communityName || '',
    },
    {
      type: 'select',
      name: 'wardId',
      label: 'Ward',
      className: '',
      fluid: true,
      placeholder: 'Select ward',
      value: item.wardId || '',
      options,
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      className: 'animated fadeIn',
      fluid: true,
      placeholder: 'description',
      value: item.description || '',
    },
  ];
};
export default inputs;
