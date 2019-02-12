import keystone from 'keystone';
import faker from 'faker';

const getEventItem = (fields) => ({
  slug: faker.helpers.slugify(faker.random.words(4)),
  details: `<p>${faker.random.words(20)}</p>`,
  eventDate: faker.date.recent(),
  title: faker.random.words(4),
  archived: false,
  headerImage: {
    mimetype: 'image/png',
    filename: faker.system.fileName('.png'),
    path: '/assets/images',
    size: faker.random.number(),
    etag: faker.random.uuid(),
    bucket: faker.lorem.word(),
    url: faker.internet.url(),
  },
  mainEvent: false,
  dateCreated: faker.date.recent(),
  ...fields,
});

export const createEvent = async () => {
  const event = getEventItem();
  return keystone.list('Events').model.create(event);
};

export const createArchivedEvent = async () => {
  const event = getEventItem({ archived: true });
  return keystone.list('Events').model.create(event);
};
