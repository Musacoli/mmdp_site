import * as governorMessageAPI from '../governorMessage';

describe('Should test axios api requests', () => {
  it('should test get object', () => {
    governorMessageAPI
      .createGovernorMessage({
        about: 'about',
        background: 'background',
      })
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
  it('should test get object', () => {
    governorMessageAPI
      .updateGovernorMessage({
        id: '1234',
        about: 'about',
        background: 'background',
      })
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
  it('should test get object', () => {
    governorMessageAPI.getGovernorMessage().then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });
});
