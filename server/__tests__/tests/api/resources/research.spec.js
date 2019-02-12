import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../../helpers/commons/base';
import { stubModelUpdateProcess } from '../../../helpers/files';

const route = '/api/v1/resources/research';

const title = 'This user research';

const apiCreateResearch = async (payload) => app.post(route).send(payload);

describe('Resources research API', () => {
  let stub;

  before(() => {
    stub = stubModelUpdateProcess('pdf', 'reportFile', { title });
  });

  after(() => {
    stub.restore();
  });

  describe('Create  research', () => {
    const researchData = {
      title: 'yooo',
      researchFile: '../../../../helpers/files/blank.pdf',
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
      const res = await app
        .post(route)
        .field('title', title)
        .attach('researchFile', './server/__tests__/helpers/files/blank.pdf');

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('Research has been successfully added!');
      expect(res.body.data).toBeDefined();
      stub.restore();
    });
  });
});
