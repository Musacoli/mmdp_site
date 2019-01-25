import expect from "expect";
import supertest from "supertest";
import keystone from "./helpers/keystone";
import permissions from "../core/permissions";
import {getPermissionsMapArray} from "../utils/permissions";

const app = supertest(keystone.app);

const permissionsUrl = '/api/permissions';

describe('List (GET) permissions', () => {
  it('should list permissions successfully', async () => {
    const res = await app.get(permissionsUrl);
    expect(res.status).toBe(200);
  });

  it('should list all system permissions', async () => {
    const resPermissions = (await app.get(permissionsUrl)).body;
    expect(resPermissions.length).toBe(Object.keys(permissions).length);
    expect(resPermissions).toEqual(getPermissionsMapArray());
  });
});
