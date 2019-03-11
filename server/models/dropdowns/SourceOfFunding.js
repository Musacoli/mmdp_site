import keystone from 'keystone';

const SourceOfFunding = new keystone.List('SourceOfFunding');

SourceOfFunding.add({
  sourceOfFundingName: { type: String },
  description: { type: String },
});

SourceOfFunding.defaultColumns = 'sourceOfFundingName';

SourceOfFunding.register();

export default SourceOfFunding;
