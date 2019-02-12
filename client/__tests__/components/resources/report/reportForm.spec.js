import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'semantic-ui-react';
import { ReportForm } from '../../../../containers/Resources/Report/ReportForm';
import ReportFormView from '../../../../components/Resources/Report/ReportForm';

const validFormDetails = {
  title: 'A valid title',
  reportFile: {
    name: 'blank.pdf',
  },
  reportType: 'quarterly',
};
const createFormEvent = (name, value, withFile) => {
  const event = {
    target: {
      name,
      value,
    },
  };
  if (withFile) {
    event.target.files = [{ name: value }];
  }
  return event;
};
describe('ReportForm', () => {
  let event;
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      createReport: jest.fn(),
      updateReport: jest.fn(),
      getReport: jest.fn(),
      loading: false,
      history: { push: jest.fn() },
      response: {},
    };
    event = {
      preventDefault: jest.fn(),
    };
  });
  describe('Report form', () => {
    beforeEach(() => {
      wrapper = mount(<ReportForm mode="add" {...props} />);
    });
    it('should mount without crashing', () => {
      expect(wrapper.find(ReportFormView).length).toEqual(1);
      expect(wrapper.find(Form.Input).length).toEqual(1);
    });
    it('should set state for the title field when onChange method is called with an event target name of title', () => {
      const title = 'A new report';
      wrapper.find(ReportFormView).prop('onChange')(
        createFormEvent('title', title),
      );
      expect(wrapper.state('title')).toEqual(title);
    });
    it('should set state for the reportFile field when onChange method is called with an event target name of reportFile', () => {
      const fileName = 'blank.pdf';
      wrapper.find(ReportFormView).prop('onChange')(
        createFormEvent('reportFile', fileName, true),
      );
      expect(wrapper.state('reportFile').name).toEqual(fileName);
    });
    it('should set state for the reportType field when onChange method is called with an event target name of reportType', () => {
      const reportType = 'annual';
      wrapper.find(ReportFormView).prop('onChange')(
        createFormEvent('reportType', reportType),
      );
      expect(wrapper.state('reportType')).toEqual(reportType);
    });
    it('should clear error for a particular input field when onChange method is called by the input field', () => {
      const title = 'Awesome report for the year';
      wrapper.setState({
        errors: {
          title: ['Enter the report title'],
          reportFile: ['Select a report file to upload'],
        },
      });
      wrapper.find(ReportFormView).prop('onChange')(
        createFormEvent('title', title),
      );
      expect(wrapper.state('title')).toEqual(title);
      expect(wrapper.state('errors').title).not.toBeDefined();
    });
    it('should not submit form with invalid input fields when onSubmit method is called', () => {
      wrapper.setState({
        title: 'A valid title',
        reportFile: {},
        reportType: 'invalid type',
      });
      wrapper.find(ReportFormView).prop('onSubmit')(event);
      expect(event.preventDefault).toBeCalled();
      expect(wrapper.prop('createReport')).not.toBeCalled();
    });
    it('should submit form with valid input fields when onSubmit method is called', () => {
      wrapper.setState(validFormDetails);
      wrapper.find(ReportFormView).prop('onSubmit')(event);
      expect(event.preventDefault).toBeCalled();
      expect(wrapper.prop('createReport')).toBeCalled();
    });
  });
  describe('ReportForm in edit mode', () => {
    const reportId = '5c5afa15bc8f70175006ff21';
    beforeEach(() => {
      const editProps = {
        ...props,
        match: { params: { id: reportId } },
      };
      wrapper = mount(<ReportForm mode="edit" {...editProps} />);
    });
    it('should fetch details for a report on mount', () => {
      expect(wrapper.prop('getReport')).toHaveBeenCalledWith(reportId);
    });
    it('should update state and auto-populate input field when data for the report to edit is returned', () => {
      const response = {
        report: {
          title: 'June report',
          reportType: 'annual',
          reportFile: {
            fileName: 'blank-pdf.pdf',
          },
        },
      };
      wrapper.setProps({ response, loading: false });
      expect(wrapper.state('title')).toBe(response.report.title);
      expect(wrapper.state('reportType')).toBe(response.report.reportType);
      expect(wrapper.state('reportFile')).toEqual(response.report.reportFile);
    });
    it('should submit update and call updateReport method', () => {
      wrapper.setState(validFormDetails);
      wrapper.find(ReportFormView).prop('onSubmit')(event);
      expect(event.preventDefault).toBeCalled();
      expect(wrapper.prop('createReport')).not.toBeCalled();
      expect(wrapper.prop('updateReport')).toBeCalled();
    });
  });
});
