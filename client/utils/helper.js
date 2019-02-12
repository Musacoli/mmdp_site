export const ARCHIVE_ACTION = 'archive';
export const UNARCHIVE_ACTION = 'unarchive';

export const ucFirstLetter = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getActionLinks = ({ id, archived, onClick }) => {
  const archiveAction = archived ? UNARCHIVE_ACTION : ARCHIVE_ACTION;
  return [
    {
      link: `/resources/reports/${id}/edit`,
      text: 'Edit',
    },
    {
      onClick: (event) => {
        onClick(event, { id, modalAction: archiveAction });
      },
      text: ucFirstLetter(archiveAction),
    },
    {
      onClick: (event) => {
        onClick(event, { id, modalAction: 'delete' });
      },
      text: 'Delete',
      type: 'danger',
    },
  ];
};

export const deriveError = (err) => {
  let error;
  if (err.message === 'Network Error') {
    error = 'Unable to connect to the server! Please check your connection.';
  } else if (
    err.response &&
    (err.response.status === 400 ||
      err.response.data.status === 'Validation error')
  ) {
    const { error: errors } = err.response.data;
    const firstError = Object.keys(errors)[0];
    error = errors[firstError];
  } else {
    error = err.response ? err.response.data.message : err.message;
  }
  return error;
};
