import expect from 'expect';
import sinon from 'sinon';
// import request from 'supertest';
import modelHelper from '../../../../../helpers/modelHelper';

import { app, removeAllGroupsAndUsers } from '../../../../helpers/commons/base';

const route = '/api/v1/resources/research';

const title = 'This user research';
const responseData = {
  title,
  researchFile: {
    mimetype: 'application/pdf',
    filename: '1548791511140blank.pdf',
    path: '/assets/documents',
    size: 4911,
    url: 'urltoaws/1548791511140blank.pdf',
  },
  _id: '5c54ed71193ac3510f55ebcd',
};

const apiCreateResearch = async (payload) => app.post(route).send(payload);

describe('Resources research API', () => {
  describe('Create  research', () => {
    const researchData = {
      title: 'yooo',
      researchFile: '../../../../helpers/testUploads/blank.pdf',
    };
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.resources.create']);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom();
      const res = await apiCreateResearch({});
      expect(res.status).toBe(403);
    });
    it('should create the Admin research ', async () => {
      const res = await apiCreateResearch(researchData);
      expect(res.status).toBe(400);
      expect(res.body.status).toBe('fail');
      expect(res.body.error).toBeDefined();
    });
    it('should return a 201 status when valid title and researchFile is sent', async () => {
      const stub = sinon
        .stub(modelHelper, 'process')
        .resolves(Promise.resolve(responseData));

      const res = await app
        .post(route)
        .field('title', title)
        .attach(
          'researchFile',
          './server/__tests__/helpers/testUploads/blank.pdf',
        );

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('Research has been successfully added!');
      expect(res.body.data).toBeDefined();
      stub.restore();
    });
  });
});
