import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'semantic-ui-react';
import { AddReport } from '../../../containers/Resources/Report/AddReport';

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
describe.only('AddReport', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      submitReport: jest.fn(),
      loading: false,
      history: { push: jest.fn() },
    };
    wrapper = mount(<AddReport {...props} />);
  });
  it('should mount without crashing', () => {
    expect(wrapper.find('ReportForm').length).toEqual(1);
    expect(wrapper.find(Form.Input).length).toEqual(1);
  });
  it('should set state for the title field when onChange method is called with an event target name of title', () => {
    const title = 'A new report';
    wrapper.find('ReportForm').prop('onChange')(
      createFormEvent('title', title),
    );
    expect(wrapper.state('title')).toEqual(title);
  });
  it('should set state for the reportFile field when onChange method is called with an event target name of reportFile', () => {
    const fileName = 'blank.pdf';
    wrapper.find('ReportForm').prop('onChange')(
      createFormEvent('reportFile', fileName, true),
    );
    expect(wrapper.state('reportFile').name).toEqual(fileName);
  });
  it('should set state for the reportType field when onChange method is called with an event target name of reportType', () => {
    const reportType = 'annual';
    wrapper.find('ReportForm').prop('onChange')(
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
    wrapper.find('ReportForm').prop('onChange')(
      createFormEvent('title', title),
    );
    expect(wrapper.state('title')).toEqual(title);
    expect(wrapper.state('errors').title).not.toBeDefined();
  });
  it('should not submit form with invalid input fields when onSubmit method is called', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      title: 'A valid title',
      reportFile: {},
      reportType: 'invalid type',
    });
    wrapper.find('ReportForm').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalled();
    expect(wrapper.prop('submitReport')).not.toBeCalled();
  });
  it('should submit form with valid input fields when onSubmit method is called', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      title: 'A valid title',
      reportFile: {
        name: 'blank.pdf',
      },
      reportType: 'quarterly',
    });
    wrapper.find('ReportForm').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalled();
    expect(wrapper.prop('submitReport')).toBeCalled();
  });
});
