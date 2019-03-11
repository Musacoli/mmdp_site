import keystone from 'keystone';

const { Types } = keystone.Field;

const Community = new keystone.List('Community');

Community.add({
  lgaId: { type: Types.Relationship, ref: 'LGA' },
  communityName: { type: String },
});

Community.defaultColumns = 'communityName';

Community.register();

export default Community;
