import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'semantic-ui-react';
import faker from 'faker';
import { AddDocument } from '../../../containers/Resources/Document';

const title = faker.name.jobTitle();
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
describe.only('AddDocument', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      submitDocument: jest.fn(),
      loading: false,
      history: { push: jest.fn() },
    };
    wrapper = mount(<AddDocument {...props} />);
  });
  it('should mount AddDocument without crashing', () => {
    expect(wrapper.find('DocumentForm').length).toEqual(1);
    expect(wrapper.find(Form.Input).length).toEqual(1);
  });
  it('should set state for the title field when onChange method is called with an event target name of title', () => {
    wrapper.find('DocumentForm').prop('onChange')(
      createFormEvent('title', title),
    );
    expect(wrapper.state('title')).toEqual(title);
  });
  it('should clear error for a particular input field when onChange method is called by the input field', () => {
    wrapper.setState({
      errors: {
        title: [title],
        document: ['Select a document file to upload'],
      },
    });
    wrapper.find('DocumentForm').prop('onChange')(
      createFormEvent('title', title),
    );
    expect(wrapper.state('title')).toEqual(title);
    expect(wrapper.state('errors').title).not.toBeDefined();
  });
  it('should not submit submitDocument with invalid input fields', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      title,
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
      title: 'A valid title',
      document: {
        name: 'blank.pdf',
      },
    });
    wrapper.find('DocumentForm').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalled();
    expect(wrapper.prop('submitDocument')).toBeCalled();
  });
});
