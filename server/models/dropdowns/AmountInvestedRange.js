// Range of Numbers, to tell the domain of amount invested thus far on a returnee service

import keystone from 'keystone';

const { Types } = keystone.Field;

const AmountInvestedRange = new keystone.List('AmountInvestedRange');

AmountInvestedRange.add({
  amountInvestedRange: { type: Types.Text },
  description: { type: Types.Text },
});

AmountInvestedRange.defaultColumns = 'amountInvestedRange';

AmountInvestedRange.register();
export default AmountInvestedRange;
