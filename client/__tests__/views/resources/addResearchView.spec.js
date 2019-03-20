import React from 'react';
import { shallow } from 'enzyme';
import AddReportView from '../../../views/Resources/Research/AddResearch';
import EditResearchView from '../../../views/Resources/Research/EditResearch';
import ResearchForm from '../../../components/Resources/Research/ResearchForm';

describe('<ResearchView /> ', () => {
  it('renders AddResearchView component without crashing', () => {
    const props = {
      onChange: jest.fn(),
    };
    shallow(<AddReportView {...props} />);
  });

  it('renders EditResearchView component without crashing', () => {
    const props = {
      onChange: jest.fn(),
    };
    shallow(<EditResearchView {...props} />);
  });
});

describe('<ResearchForm /> ', () => {
  it('renders ResearchForm component without crashing', () => {
    const props = {
      onChange: jest.fn(),
      loading: true,
      onSubmit: jest.fn(),
      fileName: '',
      disable: true,
    };
    shallow(<ResearchForm {...props} />);
  });
});
