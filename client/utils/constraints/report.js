const addReportConstraint = {
  title: {
    presence: {
      allowEmpty: false,
      message: '^Enter the report title',
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
      message: '^Report type can only be a quarterly report or an annual report',
    },
  },
};

// eslint-disable-next-line import/prefer-default-export
export { addReportConstraint };
