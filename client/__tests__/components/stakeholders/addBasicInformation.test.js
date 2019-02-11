import React from 'react';
import { shallow } from 'enzyme';

import BasicInformationForm from '../../../components/Stakeholders/addBasicInfo';
import FormHeader from '../../../components/Stakeholders/formHeader';
import FormInputs from '../../../components/Stakeholders/formInputs';
import FormLabels from '../../../components/Stakeholders/formLabels';
import FormNotesTextarea from '../../../components/stakeholders/textArea';

describe('Basic information component', () => {
  it('should render correctly', () => {
    shallow(
      <BasicInformationForm
        state=""
        yearOfRegistration=""
        edoStateOperationStartYear=""
        handleNext={jest.fn}
        handleChange={jest.fn}
        step={1}
        pages={3}
      />,
    );
  });
});

describe('Form header', () => {
  it('should render correctly', () => {
    shallow(<FormHeader title="Basic Informatiom" step={1} pages={3} />);
  });
});

describe('Form inputs', () => {
  it('should render correctly', () => {
    shallow(<FormInputs input1="name" input2="email" />);
  });
});

describe('Form Labels', () => {
  it('should render correctly', () => {
    shallow(<FormLabels label1="name" label2="email" />);
  });
});

describe('Form text', () => {
  it('should render correctly', () => {
    shallow(
      <FormNotesTextarea
        placeholder="Enter message"
        className="st-textarea"
        id="notes"
        name="notes"
        onChange={jest.fn}
        value="notes"
      />,
    );
  });
});
