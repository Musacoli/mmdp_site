import React from 'react';
import { mount } from 'enzyme';
import { MediaForm } from '../../../containers/Resources/Document/MediaForm';

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
describe.only('MediaForm', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      submitDocument: jest.fn(),
      loading: false,
      history: { push: jest.fn() },
      match: { params: {} },
      singleDocument: {},
      updateDocument: jest.fn(),
      getDocument: jest.fn(),
      success: true,
      clearErrors: jest.fn(),
    };
    wrapper = mount(<MediaForm {...props} />);
  });
  it('should mount MediaForm without crashing', () => {
    expect(wrapper.find('DocumentForm').length).toEqual(1);
  });

  it('should clear error for a particular input field when onChange method is called by the input field', () => {
    wrapper.setState({
      errors: {
        document: ['Select a document file to upload'],
      },
    });
  });
  it('should not submit submitDocument with invalid input fields', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      document: {},
    });
    wrapper.find('DocumentForm').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalled();
    expect(wrapper.prop('submitDocument')).not.toBeCalled();
  });
  it('should submit submitDocument with valid input fields', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      document: {
        name: 'blank.pdf',
      },
    });
    wrapper.find('DocumentForm').prop('onChange')(
      createFormEvent('title', 'title'),
    );
    wrapper.find('DocumentForm').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalled();
    expect(wrapper.prop('submitDocument')).toBeCalled();
  });
});
