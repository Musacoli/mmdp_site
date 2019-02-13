import expect from 'expect';
import sinon from 'sinon';
import { app, removeAllGroupsAndUsers } from '../../../helpers/commons/base';
import { createMedia } from '../../../helpers/repository/documents';
import { Document } from '../../../../middleware/repository/validateDocument';

const url = '/api/v1/resources/repository';

const apiArchiveDocument = (id) => {
  return app.patch(`${url}/archive/${id}`).send();
};

const deleteDocument = (id) => {
  return app.delete(`${url}/${id}`).send();
};

describe('Document Api', () => {
  describe('Archive/Unarchive', () => {
    let existingDocument;

    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.resources.archive']);
      existingDocument = await createMedia();
    });

    it('should archive document', async () => {
      const res = await apiArchiveDocument(existingDocument._id);
      expect(res.status).toBe(200);
      expect(res.body.archived).toEqual(true);
      expect(res.body.message).toEqual('Document archived successfully');
    });

    it('should archive with all other relevant permissions', async () => {
      await app.loginRandom(['cms.resources.*']);
      expect((await apiArchiveDocument(existingDocument._id)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiArchiveDocument(existingDocument._id)).status).toBe(200);
      await app.loginRandom(['cms.archive']);
      expect((await apiArchiveDocument(existingDocument._id)).status).toBe(200);
    });

    it('should restore document', async () => {
      existingDocument = await createMedia({
        mediaType: 'document',
        archived: true,
      });
      const res = await apiArchiveDocument(existingDocument._id);
      expect(res.status).toBe(200);
      expect(res.body.archived).toEqual(false);
      expect(res.body.message).toEqual('Document restored successfully');
    });

    it('should fail if invalid object id is used', async () => {
      const res = await apiArchiveDocument('invalid id');
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual('Please use a valid id');
    });

    it('should return 404 if document does not exist', async () => {
      const res = await apiArchiveDocument('5c62f9eb0f91196cd014fd60');
      expect(res.status).toBe(404);
      expect(res.body.message).toEqual('Document does not exist');
    });

    it('should return a 500 if an error occurred while trying to archive', async () => {
      const stub = sinon.stub(Document().model, 'findById').rejects();
      const res = await apiArchiveDocument(existingDocument._id);
      expect(res.status).toBe(500);
      stub.restore();
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiArchiveDocument(existingDocument._id);
      expect(res.status).toBe(403);
    });
  });

  describe('Delete Document', () => {
    let existingDocument;

    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.resources.delete']);
      existingDocument = await createMedia({ mediaType: 'document' });
    });

    it('should delete document', async () => {
      const res = await deleteDocument(existingDocument._id);
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual('Document deleted successfully');
    });

    it('should delete with all other relevant permissions', async () => {
      await app.loginRandom(['cms.resources.*']);
      expect((await deleteDocument(existingDocument._id)).status).toBe(200);
      existingDocument = await createMedia({ mediaType: 'document' });
      await app.loginRandom(['cms.*']);
      expect((await deleteDocument(existingDocument._id)).status).toBe(200);
      existingDocument = await createMedia({ mediaType: 'document' });
      await app.loginRandom(['cms.delete']);
      expect((await deleteDocument(existingDocument._id)).status).toBe(200);
    });

    it('should fail if invalid object id is used', async () => {
      const res = await deleteDocument('invalid id');
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual('Please use a valid id');
    });

    it('should return 404 if document does not exist', async () => {
      const res = await deleteDocument('5c62f9eb0f91196cd014fd60');
      expect(res.status).toBe(404);
      expect(res.body.message).toEqual('Document does not exist');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiArchiveDocument(existingDocument._id);
      expect(res.status).toBe(403);
    });

    it('should return a 500 if an error occurred while trying to archive', async () => {
      const stub = sinon.stub(Document().model, 'findById').rejects();
      const res = await deleteDocument(existingDocument._id);
      expect(res.status).toBe(500);
      stub.restore();
    });
  });
});
