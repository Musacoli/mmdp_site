import keystone from 'keystone';

export const Document = () => keystone.list('Document');
export const Event = () => keystone.list('Event');

export const checkArchiveState = async (id) => {
  const document = Document().model;
  try {
    const doc = await document.findById(id);
    return doc.archived ? { archived: false } : { archived: true };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const eventArchiveState = async (id) => {
  const event = Event().model;
  try {
    const evt = await event.findById(id);
    return evt.archived ? { archived: false } : { archived: true };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const message = (state) => {
  return state
    ? 'Document archived successfully'
    : 'Document unarchived successfully';
};

export const eventMessage = (state) => {
  return state
    ? 'Event archived successfully'
    : 'Event unarchived successfully';
};
