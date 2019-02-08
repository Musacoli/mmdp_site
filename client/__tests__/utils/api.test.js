/* eslint-env jest */
import { client, authUserHeader, api } from '../../utils/api';

describe('Should test axios api requests', () => {
  it('should test get object', () => {
    client({ url: '/', method: 'get' }).then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });

  it('should add authentication for logged in users header', () => {
    expect(authUserHeader()).toEqual({});
  });

  it('should test update user profile promise', () => {
    api.group.edit({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.group.list({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.group.create({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.group.retrieve({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.group.delete({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
    api.permission.list({}).then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });
});
