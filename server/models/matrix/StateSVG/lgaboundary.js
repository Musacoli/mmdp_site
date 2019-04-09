import keystone from 'keystone';

const LGABoundary = new keystone.List('lgaboundary');

LGABoundary.add({
  uniqueId: { type: String },
  name: { type: String },
  path: { type: String },
  state: { type: String },
  url: { type: String },
  lga: { type: String },
});

LGABoundary.register();

export default LGABoundary;
