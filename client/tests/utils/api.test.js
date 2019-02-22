/* eslint-env jest */
import { server, authUserHeader } from '../../utils/keys';
import { api } from '../../utils/api';

describe.only('Should test axios api requests', () => {
  it('should test get object', () => {
    server({ url: '/', method: 'get' }).then((response) => {
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