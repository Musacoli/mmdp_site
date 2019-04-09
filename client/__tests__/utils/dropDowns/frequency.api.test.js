import { api } from '../../../utils/api';

describe('Should test frequency api requests', () => {
  it('Test for frequency axios api requests', () => {
    api.dropdowns.frequency.create({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.dropdowns.frequency.list({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.dropdowns.frequency.update({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.dropdowns.frequency.delete({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });
});
