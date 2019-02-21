import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../../helpers/commons/base';
import { data, stubModelUpdateProcess } from '../../../helpers/files';
import {
  createDocument,
  removeAllDocuments,
} from '../../../helpers/resources/document';

const route = '/api/v1/resources/repository/document';

const title = 'My Doc';

const apiCreateDocument = () => {
  return app
    .post(route)
    .field('title', title)
    .attach('document', './server/__tests__/helpers/files/blank.pdf');
};

const apiUpdateDocument = (id) => {
  return app
    .put(`${route}/${id}`)
    .field('title', title)
    .attach('document', './server/__tests__/helpers/files/blank.pdf');
};

const apiListDocuments = () => {
  return app.get(`${route}`).send();
};

const apiGetOne = (id) => {
  return app.get(`${route}/${id}`).send();
};

describe('Document route', () => {
  let stub;

  before(() => {
    stub = stubModelUpdateProcess('pdf', 'document', { title });
  });

  after(() => {
    stub.restore();
  });

  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllDocuments();
  });

  describe('Create document', () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.resources.create']);
    });

    it('should create a document', async () => {
      const res = await apiCreateDocument();
      expect(res.status).toBe(201);
      expect(res.body.data.document).toMatchObject({
        title,
        document: data.pdf,
      });
    });

    it('should return fail when title or document is missing', async () => {
      const res = await app.post(route).send({});
      expect(res.status).toBe(400);
    });

    it('should create for all other relevant permissions', async () => {
      await app.loginRandom(['cms.*']);
      expect((await apiCreateDocument()).status).toBe(201);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateDocument()).status).toBe(201);
      await app.loginRandom(['cms.resources.*']);
      expect((await apiCreateDocument()).status).toBe(201);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom();
      expect((await apiCreateDocument()).status).toBe(403);
    });
  });

  describe('Update document', () => {
    let existingDocument;

    beforeEach(async () => {
      await app.loginRandom(['cms.resources.update']);
      existingDocument = await createDocument();
    });

    it('should create a document', async () => {
      const res = await apiUpdateDocument(existingDocument._id);
      expect(res.status).toBe(200);
      expect(res.body.data.document).toMatchObject({
        title,
        document: data.pdf,
      });
    });

    it('should not fail when title or document is missing', async () => {
      const res = await app.put(`${route}/${existingDocument._id}`).send({});
      expect(res.status).toBe(400);
    });

    it('should fail when the doc does not exist', async () => {
      const res = await apiUpdateDocument('5w4w45e4sd4');
      expect(res.status).toBe(404);
    });

    it('should create for all other relevant permissions', async () => {
      await app.loginRandom(['cms.*']);
      expect((await apiUpdateDocument(existingDocument._id)).status).toBe(200);
      await app.loginRandom(['cms.update']);
      expect((await apiUpdateDocument(existingDocument._id)).status).toBe(200);
      await app.loginRandom(['cms.resources.*']);
      expect((await apiUpdateDocument(existingDocument._id)).status).toBe(200);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom();
      expect((await apiUpdateDocument(existingDocument._id)).status).toBe(403);
    });
  });

  describe('List documents', () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.resources.view']);
      await createDocument({ title: 'Foo' }, 2);
    });

    it('should list all document', async () => {
      const res = await apiListDocuments();
      expect(res.status).toBe(200);
      expect(res.body.data.documents.length).toEqual(2);
    });

    it('should get empty when there are no docs', async () => {
      await removeAllDocuments();
      const res = await apiListDocuments();
      expect(res.body.data.documents.length).toBe(0);
    });

    it('should filter by GET parameters - no match', async () => {
      const res = await apiListDocuments({ title: '1A2BVEFGG' });
      expect(res.status).toBe(200);
      expect(res.body.data.documents.length).toEqual(0);
    });

    it('should filter by GET parameters - match', async () => {
      const res = await apiListDocuments({ title: 'Foo' });
      expect(res.status).toBe(200);
      expect(res.body.data.documents.length).toEqual(2);
    });

    it('should create for all other relevant permissions', async () => {
      await app.loginRandom(['cms.*']);
      expect((await apiListDocuments()).status).toBe(200);
      await app.loginRandom(['cms.view']);
      expect((await apiListDocuments()).status).toBe(200);
      await app.loginRandom(['cms.resources.*']);
      expect((await apiListDocuments()).status).toBe(200);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom();
      expect((await apiListDocuments()).status).toBe(403);
    });
  });

  describe('Get document', () => {
    let existingDocument;

    beforeEach(async () => {
      await app.loginRandom(['cms.resources.view']);
      existingDocument = await createDocument();
    });

    it('should create a document', async () => {
      const res = await apiGetOne(existingDocument._id);
      expect(res.status).toBe(200);
      expect(res.body.data.document).toMatchObject({
        title: existingDocument.title,
        document: existingDocument.document,
      });
    });

    it('should fail when the doc does not exist', async () => {
      const res = await apiGetOne('5w4w45e4sd4');
      expect(res.status).toBe(404);
    });

    it('should create for all other relevant permissions', async () => {
      await app.loginRandom(['cms.*']);
      expect((await apiGetOne(existingDocument._id)).status).toBe(200);
      await app.loginRandom(['cms.view']);
      expect((await apiGetOne(existingDocument._id)).status).toBe(200);
      await app.loginRandom(['cms.resources.*']);
      expect((await apiGetOne(existingDocument._id)).status).toBe(200);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom();
      expect((await apiGetOne(existingDocument._id)).status).toBe(403);
    });
  });
});
