import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../../helpers/commons/base';
import { data, stubModelUpdateProcess } from '../../../helpers/files';
import { createMedia, removeAllMedia } from '../../../helpers/resources/media';

const route = '/api/v1/resources/repository/media';

const apiCreateMedia = () => {
  return app
    .post(route)
    .attach('mediaFile', './server/__tests__/helpers/files/blank.mp4');
};

const apiListMedia = () => {
  return app.get(`${route}`).send();
};

const apiGetMedia = (id) => {
  return app.get(`${route}/${id}`).send();
};

const apiDeleteMedia = (id) => {
  return app.delete(`${route}/${id}`);
};

describe('Media route', () => {
  let stub;

  before(() => {
    stub = stubModelUpdateProcess('video', 'media');
  });

  after(() => {
    stub.restore();
  });

  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllMedia();
  });

  describe('Create media', () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.resources.create']);
    });

    it('should create a media', async () => {
      const res = await apiCreateMedia();
      expect(res.status).toBe(201);
      expect(res.body.data.media).toMatchObject({ media: data.video });
    });

    it('should return fail when media file is missing', async () => {
      const res = await app.post(route).send({});
      expect(res.status).toBe(400);
    });

    it('should create for all other relevant permissions', async () => {
      await app.loginRandom(['cms.*']);
      expect((await apiCreateMedia()).status).toBe(201);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateMedia()).status).toBe(201);
      await app.loginRandom(['cms.resources.*']);
      expect((await apiCreateMedia()).status).toBe(201);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom();
      expect((await apiCreateMedia()).status).toBe(403);
    });
  });

  describe('List media', () => {
    beforeEach(async () => {
      await app.loginRandom([]);
      await createMedia({}, 2);
    });

    it('should list all media', async () => {
      const res = await apiListMedia();
      expect(res.status).toBe(200);
      expect(res.body.data.media.length).toEqual(2);
    });

    it('should get empty when there is no media', async () => {
      await removeAllMedia();
      const res = await apiListMedia();
      expect(res.body.data.media.length).toBe(0);
    });
  });

  describe('Get media', () => {
    let existingMedia;

    beforeEach(async () => {
      await app.loginRandom(['cms.resources.view']);
      existingMedia = await createMedia();
    });

    it('should get media', async () => {
      const res = await apiGetMedia(existingMedia._id);
      expect(res.status).toBe(200);
      expect(res.body.data.media).toMatchObject({
        mediaFile: existingMedia.mediaFile,
      });
    });

    it('should fail when the doc does not exist', async () => {
      const res = await apiGetMedia('5w4w45e4sd4');
      expect(res.status).toBe(404);
    });

    it('should create for all other relevant permissions', async () => {
      await app.loginRandom(['cms.*']);
      expect((await apiGetMedia(existingMedia._id)).status).toBe(200);
      await app.loginRandom(['cms.view']);
      expect((await apiGetMedia(existingMedia._id)).status).toBe(200);
      await app.loginRandom(['cms.resources.*']);
      expect((await apiGetMedia(existingMedia._id)).status).toBe(200);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom();
      expect((await apiGetMedia(existingMedia._id)).status).toBe(403);
    });
  });

  describe('Delete Media', () => {
    let existingMedia;

    beforeEach(async () => {
      await app.loginRandom(['cms.resources.delete']);
      const createdAt = { created_at: new Date() };
      existingMedia = await createMedia(createdAt);
    });

    it('should delete media', async () => {
      const res = await apiDeleteMedia(existingMedia._id);
      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({
        deleted: {
          _id: existingMedia.id,
          mediaFile: existingMedia.mediaFile,
        },
      });
    });
    it('should fail when the doc does not exist', async () => {
      const res = await apiDeleteMedia('5x5x5x5x');
      expect(res.status).toBe(404);
    });
  });
});
