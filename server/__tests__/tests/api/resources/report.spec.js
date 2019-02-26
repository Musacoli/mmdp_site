import chai from 'chai';
import sinon from 'sinon';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import {
  createReport,
  createArchivedReport,
} from '../../../helpers/resources/report';
import modelHelper from '../../../../helpers/modelHelper';
import Report from '../../../../models/resources/Report';

const { expect } = chai;

const route = '/api/v1/resources/reports';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
const archiveRoute = (id) => `${route}/${id}/archive`;
const unArchiveRoute = (id) => `${route}/${id}/unarchive`;

const title = 'This user report';
const reportType = 'annual';

const responseData = {
  title,
  reportFile: {
    mimetype: 'application/pdf',
    filename: '1548791511140blank.pdf',
    path: '/assets/documents',
    size: 4911,
    url: 'urltoaws/1548791511140blank.pdf',
  },
  _id: '5c54ed71193ac3510f55ebcd',
};

describe('Report route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(Report);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.resources.create']);
    });

    it('should return a 400 status when title and or reportFile is not provided', async () => {
      const res = await app.post(route).send({
        title: '',
        reportFile: '',
        reportType: '',
      });
      expect(res.status).to.equal(400);
      expect(res.body)
        .to.have.property('error')
        .be.a('Object');
      expect(res.body.error).to.have.property('title');
      expect(res.body.error).to.have.property('files');
      expect(res.body.error).to.have.property('reportType');
    });

    it('should return a 400 status when invalid reportType is provided', async () => {
      const res = await app
        .post(route)
        .field('title', title)
        .field('reportType', 'unknownType');
      expect(res.status).to.equal(400);
      expect(res.body)
        .to.have.property('error')
        .be.a('Object');
      expect(res.body.error).to.have.property('files');
      expect(res.body.error).to.have.property('reportType');
    });

    it('should return a 201 status when valid title and reportFile is sent', async () => {
      const stub = sinon
        .stub(modelHelper, 'process')
        .resolves(Promise.resolve(responseData));
      const res = await app
        .post(route)
        .field('title', title)
        .field('reportType', reportType)
        .attach('reportFile', './server/__tests__/helpers/files/blank.pdf');
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('report');
      expect(res.body.data.report)
        .to.have.property('reportFile')
        .be.a('Object');
      stub.restore();
    });
  });

  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await Promise.all([
        createReport(),
        createReport(),
        createReport(),
        createArchivedReport(),
      ]);
      await app.loginRandom([]);
    });

    it('should get all reports', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('reports');
      expect(res.body.data.reports).to.be.a('Array');
      expect(res.body.data.reports).to.have.lengthOf(4);
    });

    it('should exclude archived reports for guests', async () => {
      app.logout();
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('reports');
      expect(res.body.data.reports).to.be.a('Array');
      expect(res.body.data.reports).to.have.lengthOf(3);
    });
  });

  describe(`PATCH request`, () => {
    let report;
    beforeEach(async () => {
      await app.loginRandom(['cms.resources.archive']);
      report = await createReport();
    });

    it('should archive a report', async () => {
      const { _id: id } = report;
      const res = await app.patch(archiveRoute(id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('report');
      expect(res.body.data.report).to.be.a('Object');
      expect(res.body.data.report.archived).to.equal(true);
    });

    it('should unarchive a report', async () => {
      const { _id: id } = report;
      const res = await app.patch(unArchiveRoute(id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('report');
      expect(res.body.data.report).to.be.a('Object');
      expect(res.body.data.report.archived).to.equal(false);
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.resources.delete']);
    });

    it('should delete a report', async () => {
      const report = await createReport();
      const { _id: id } = report;
      const res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.resources.update']);
    });

    it('should update a report', async () => {
      const newTitle = 'Edited report title';
      const report = await createReport();
      const { _id: id } = report;
      const res = await app.put(updateRoute(id)).send({ title: newTitle });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('report');
      expect(res.body.data.report.title).to.equal(newTitle);
    });
  });
});
