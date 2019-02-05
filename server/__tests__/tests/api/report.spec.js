import chai from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import keystone from '../../helpers/commons';
import modelHelper from '../../../helpers/modelHelper';

const { app } = keystone;

const { expect } = chai;

const server = request(app);

const route = '/api/v1/resources/report';

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
  describe(`POST ${route}`, () => {
    it('should return a 400 status when title and or reportFile is not provided', async () => {
      const res = await server
        .post(route)
        .send({
          title: '',
          reportFile: '',
          reportType: '',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error').be.a('Object');
      expect(res.body.error).to.have.property('title');
      expect(res.body.error).to.have.property('files');
      expect(res.body.error).to.have.property('reportType');
    });
    it('should return a 400 status when invalid reportType is provided', async () => {
      const res = await server
        .post(route)
        .field('title', title)
        .field('reportType', 'unknownType');
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error').be.a('Object');
      expect(res.body.error).to.have.property('files');
      expect(res.body.error).to.have.property('reportType');
    });
    it('should return a 201 status when valid title and reportFile is sent', async () => {
      const stub = sinon.stub(modelHelper, 'process').resolves(Promise.resolve(responseData));
      const res = await server
        .post(route)
        .field('title', title)
        .field('reportType', reportType)
        .attach('reportFile', './server/__tests__/helpers/testUploads/blank.pdf');
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('report');
      expect(res.body.data.report).to.have.property('reportFile').be.a('Object');
      stub.restore();
    });
  });
});
