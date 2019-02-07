import * as aboutMMDPAPI from '../aboutMMDP';

describe('Should test axios api requests', () => {
  it('should test get object', () => {
    aboutMMDPAPI
      .createAboutMMDP({
        about: 'about',
        background: 'background',
      })
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
  it('should test get object', () => {
    aboutMMDPAPI
      .updateAboutMMDP({
        id: '1234',
        about: 'about',
        background: 'background',
      })
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
  it('should test get object', () => {
    aboutMMDPAPI.getAboutMMDP().then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });
});
