import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { EditResearch } from '../../../containers/Resources/Research/EditResearch';

describe('<Edit Research Container /> ', () => {
  const match = {
    params: { id: 1 },
  };

  const updateData = {
    title: 'Welcome To Research',
    researchFile: {
      bucket: 'mmdp-img-assets',
      etag: '9bd46a8adedb4a78a165c4ad6c302a25',
      filename: 'VHl2-3o5I-DdnL-Q',
      mimetype: 'application/pdf',
      path: '/assets/documents',
      size: 519957,
      url:
        'https://s3.amazonaws.com/mmdp-img-assets/assets/documents/VHl2-3o5I-DdnL-Q',
    },
  };

  const wrapper = shallow(
    <EditResearch
      match={match}
      getResearch={jest.fn}
      InputData={jest.fn}
      updateData={updateData}
      researchItem={{}}
      updateResearch={jest.fn}
      error={{}}
    />,
    new ReactRouterEnzymeContext(),
  );

  it('renders Edit Research conatiner without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Except Wrapper To Have These Functions', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'title',
        value: 'This is My Title',
        checked: true,
        files: ['File'],
      },
    };

    const fileEvent = {
      preventDefault: jest.fn(),
      target: {
        name: 'researchFile',
        files: [
          {
            name: 'file.pdf',
          },
        ],
      },
    };
    wrapper.instance().onFormSubmit(event);
    wrapper.instance().onChange(event);
    wrapper.instance().onChange(fileEvent);
  });
});
