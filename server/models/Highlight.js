import keystone from 'keystone';

const Highlight = new keystone.List('Highlight');

Highlight.add({
  name: { type: String },
});

Highlight.relationship({
  ref: 'Coordination',
  refPath: 'highlight',
  path: 'highlight',
});
Highlight.register();

export default Highlight;
