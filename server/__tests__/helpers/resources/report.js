import { faker, removeAllCollections } from '../commons/base';
import Report from '../../../models/resources/Report';

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

export const createReport = async (overrides = {}, times = 1) => {
  const data = getReportItem(overrides);
  const reports = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    reports.push(await Report.model.create(data));
  }
  return times === 1 ? reports[0] : reports;
};

export const removeAllReports = async () => {
  await removeAllCollections(Report);
};
