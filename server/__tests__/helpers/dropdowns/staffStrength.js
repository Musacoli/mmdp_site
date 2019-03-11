import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const StaffStrengthRange = keystone.list('StaffStrengthRange');

export const createStaffStrength = async (times = 1) => {
  const staffStrengthRanges = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    staffStrengthRanges.push(
      await StaffStrengthRange.model.create({
        staffStrength: faker.random.words(4),
        description: faker.random.words(8),
      }),
    );
  }
  return times === 1 ? staffStrengthRanges[0] : staffStrengthRanges;
};

export const removeAllStaffStrengths = async () => {
  await removeAllCollections(StaffStrengthRange);
};
