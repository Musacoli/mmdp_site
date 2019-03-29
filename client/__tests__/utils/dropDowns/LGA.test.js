import { api } from '../../../utils/dropdowns/LGA';

describe('Should test axios api requests', () => {
  it('Test for LGA axios api requests', () => {
    api.create({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.list({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.edit({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.delete({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });
});
