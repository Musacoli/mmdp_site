import React from 'react';
import { shallow } from 'enzyme';
import AddReportView from '../../../views/Resources/Research/AddResearch';
import ResearchForm from '../../../components/Resources/Research/ResearchForm';

describe('<ResearchView /> ', () => {
  it('renders ResearchView component without crashing', () => {
    const props = {
      onChange: jest.fn(),
    };
    shallow(<AddReportView {...props} />);
  });
});

describe('<ResearchForm /> ', () => {
  it('renders ResearchForm component without crashing', () => {
    const props = {
      onChange: jest.fn(),
      loading: true,
      onSubmit: jest.fn(),
      fileName: '',
    };
    shallow(<ResearchForm {...props} />);
  });
});
