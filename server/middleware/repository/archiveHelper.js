import keystone from 'keystone';

export const Document = () => keystone.list('Document');

export const checkArchiveState = async (id) => {
  const document = Document().model;
  try {
    const doc = await document.findById(id);
    return doc.archived ? { archived: false } : { archived: true };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const message = (state) => {
  return state
    ? 'Document archived successfully'
    : 'Document restored successfully';
};
