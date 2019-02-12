const reportFormConstraint = {
  title: {
    presence: {
      allowEmpty: false,
      message: '^Enter the report title',
    },
    length: {
      minimum: 4,
      message: 'must be at least 4 characters',
    },
  },
  reportFile: {
    presence: {
      allowEmpty: false,
      message: '^Select a report file to upload',
    },
  },
  reportType: {
    presence: {
      allowEmpty: false,
      message: '^Select a report type',
    },
    inclusion: {
      within: ['quarterly', 'annual'],
      message:
        '^Report type can only be a quarterly report or an annual report',
    },
  },
};

export default reportFormConstraint;
