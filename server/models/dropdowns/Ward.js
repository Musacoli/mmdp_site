import keystone from 'keystone';

const { Types } = keystone.Field;

const Ward = new keystone.List('Ward');

Ward.add({
  lgaId: { type: Types.Relationship, ref: 'LGA' },
  wardName: { type: String },
});

Ward.defaultColumns = 'wardName';

Ward.register();

export default Ward;
