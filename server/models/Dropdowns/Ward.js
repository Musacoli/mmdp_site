import keystone from 'keystone';

const { Types } = keystone.Field;

const Community = new keystone.List('Ward');

Community.add({
  lgaId: { type: Types.Relationship, ref: 'LGA' },
  wardName: { type: String },
});

Community.defaultColumns = 'wardName';

Community.register();

export default Community;
