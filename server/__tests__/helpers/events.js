import { createUser, faker, removeAllModels } from './commons/base';
import Event from '../../models/EventsModel';

export const makeEvent = async (overrides = {}, times = 1) => {
  const eventsData = [];

  for (let i = 0; i < times; i++) {
    eventsData.push({
      title: faker.lorem.sentence(20),
      // eslint-disable-next-line no-await-in-loop
      author: await createUser()._id,
      mainEvent: faker.random.boolean(),
      details: faker.lorem.sentence(5),
      archived: faker.random.boolean(),
      ...overrides,
    });
  }

  return times === 1 ? eventsData[0] : eventsData;
};

export const createEvent = async (overrides = {}, times = 1) => {
  const events = [];

  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    events.push(await Event.model.create(await makeEvent(overrides)));
  }

  return times === 1 ? events[0] : events;
};

export const removeAllEvents = async () => {
  await removeAllModels(Event);
};
