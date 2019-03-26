import keystone from 'keystone';

const { Types } = keystone.Field;

const Community = new keystone.List('Community');

Community.add({
  wardId: { type: Types.Relationship, ref: 'Ward' },
  communityName: { type: String },
  description: { type: String },
});

Community.defaultColumns = 'communityName';

Community.register();

export default Community;
