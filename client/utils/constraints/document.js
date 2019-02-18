const documentFormConstraint = {
  title: {
    presence: {
      allowEmpty: false,
      message: '^Enter the document title',
    },
    length: {
      minimum: 4,
      message: 'must be at least 4 characters',
    },
  },
  reportFile: {
    presence: {
      allowEmpty: false,
      message: '^Select a document file to upload',
    },
  },
  reportType: {
    presence: {
      allowEmpty: false,
      message: '^Select a document type',
    },
    inclusion: {
      within: ['quarterly', 'annual'],
      message:
        '^Report type can only be a quarterly report or an annual report',
    },
  },
};

export default documentFormConstraint;
