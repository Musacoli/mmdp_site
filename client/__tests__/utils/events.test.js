import { api } from '../../utils/events';

describe('Should test axios api requests', () => {
  it('gives events promises', () => {
    api.create({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.list({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.retrieve({}).then((response) => {
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
