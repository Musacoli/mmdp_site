import keystone from 'keystone';
import faker from 'faker';

const getReportItem = (fields) => ({
  title: faker.random.words(3),
  reportType: 'annual',
  reportFile: {
    mimetype: 'application/pdf',
    filename: faker.system.fileName('.pdf'),
    path: '/assets/documents',
    size: faker.random.number(),
    etag: faker.random.uuid(),
    bucket: faker.lorem.word(),
    url: faker.internet.url(),
  },
  ...fields,
});

export const createReport = async () => {
  const report = getReportItem();
  return keystone.list('Report').model.create(report);
};

export const createArchivedReport = async () => {
  const report = getReportItem({ archived: true });
  return keystone.list('Report').model.create(report);
};
