import keystone from 'keystone';

const Frequency = new keystone.List('Frequency');

Frequency.add({
  frequencyValue: { type: Number },
  classification: { type: String },
  description: { type: String },
});

Frequency.defaultColumns = 'frequencyValue';

Frequency.register();

export default Frequency;
