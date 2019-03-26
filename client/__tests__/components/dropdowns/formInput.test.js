import formInput from '../../../components/DropDowns/CommunityList/formInputs';

const item = {
  wardId: '23232323',
  communityName: 'community',
  description: 'description',
};
const options = [
  {
    _id: '3232323',
    wardName: 'ward',
    description: 'desc',
  },
];
it('should set values', () => {
  const form = formInput(item, options);
  expect(form[0].value).toBe(item.communityName);
  expect(form[1].value).toBe(item.wardId);
  expect(form[2].value).toBe(item.description);
});
