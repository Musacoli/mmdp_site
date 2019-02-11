import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import toJson from 'enzyme-to-json';
import { PillarOne } from '../../../containers/Pillar/pillarOne';
import { PillarTwo } from '../../../containers/Pillar/pillarTwo';
import { PillarThree } from '../../../containers/Pillar/pillarThree';
import { PillarFour } from '../../../containers/Pillar/pillarFour';

const func = jest.fn();

const props = {
  pillars: {
    title: '',
    introduction: '',
    whatWeAreDoing: '',
    keyActivities: '',
    image1: '',
    image2: '',
    imageOneFileName: '',
    imageTwoFileName: '',
    pillarNumber: 1,
    error: null,
    id: null,
    loading: false,
    updateMode: false,
    stateUpdated: false,
  },
  updatePillar: () => {},
  getPillar: () => {},
  createPillar: () => {},
};

const pillarOne = (
  <PillarOne {...props} change={func} submit={func} handleEditorChange={func} />
);
const pillarTwo = (
  <PillarTwo {...props} change={func} submit={func} handleEditorChange={func} />
);
const pillarThree = (
  <PillarThree
    {...props}
    change={func}
    submit={func}
    handleEditorChange={func}
  />
);
const pillarFour = (
  <PillarFour
    {...props}
    change={func}
    submit={func}
    handleEditorChange={func}
  />
);

const pillarOneWrapper = mount(pillarOne, new ReactRouterEnzymeContext());
const pillarTwoWrapper = mount(pillarTwo, new ReactRouterEnzymeContext());
const pillarThreeWrapper = mount(pillarThree, new ReactRouterEnzymeContext());
const pillarFourWrapper = mount(pillarFour, new ReactRouterEnzymeContext());

describe(' Pillar', () => {
  it('should render properly', () => {
    const tree = toJson(pillarOneWrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders Pillar component without crashing', () => {
    pillarOneWrapper.setState({
      title: 'This is a title',
      introduction:
        'Key Activities section must not be less than 20 characters',
      whatWeAreDoing:
        'Key Activities section must not be less than 20 characters',
      keyActivities:
        'Key Activities section must not be less than 20 characters',
    });

    pillarOneWrapper.state(
      'title',
      'introduction',
      'whatWeAreDoing',
      'keyActivities',
    );

    pillarOneWrapper
      .find('MarkdownEditor')
      .at(0)
      .prop('handleEditorChange')('value');
    pillarOneWrapper
      .find('MarkdownEditor')
      .at(1)
      .prop('handleEditorChange')('value');
    pillarOneWrapper
      .find('MarkdownEditor')
      .at(2)
      .prop('handleEditorChange')('value');

    pillarOneWrapper.setState({
      title: 'This is a titler',
      introduction:
        'Key Activities section must not be less than 20 characteres',
      whatWeAreDoing:
        'Key Activities section must not be less than 20 charactters',
      keyActivities:
        'Key Activities section must not be less than 20 characteers',
    });
    pillarOneWrapper.find('form').simulate('submit');
    pillarOneWrapper
      .find('FileInput')
      .at(0)
      .prop('change')({
      target: { name: 'image1', files: [{ filename: '' }] },
    });
    pillarOneWrapper
      .find('FileInput')
      .at(1)
      .prop('change')({
      target: { name: 'image2', files: [{ filename: '' }] },
    });
    pillarOneWrapper
      .find('FileInput')
      .at(0)
      .simulate('change');
    pillarOneWrapper
      .find('FileInput')
      .at(1)
      .simulate('change');
    pillarOneWrapper.find('button').simulate('click');
    pillarOneWrapper.instance().submit({ preventDefault: func });
    pillarOneWrapper.instance().handleEditorChange('title', 'title is newwww');
    pillarOneWrapper
      .instance()
      .handleEditorChange(
        'introduction',
        'Key Activities section must not be less than 20 characteres',
      );
    pillarOneWrapper
      .instance()
      .handleEditorChange(
        'whatWeAreDoing',
        'Key Activities section must not be less than 20 charactters',
      );
    pillarOneWrapper
      .instance()
      .handleEditorChange(
        'keyActivities',
        'Key Activities section must not be less than 20 characteers',
      );
  });
});
// Pillar two
describe(' Pillar', () => {
  it('should render properly', () => {
    const tree = toJson(pillarTwoWrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders Pillar component without crashing', () => {
    pillarTwoWrapper.setState({
      title: 'This is a title',
      introduction:
        'Key Activities section must not be less than 20 characters',
      whatWeAreDoing:
        'Key Activities section must not be less than 20 characters',
      keyActivities:
        'Key Activities section must not be less than 20 characters',
    });

    pillarTwoWrapper.state(
      'title',
      'introduction',
      'whatWeAreDoing',
      'keyActivities',
    );

    pillarTwoWrapper
      .find('MarkdownEditor')
      .at(0)
      .prop('handleEditorChange')('value');
    pillarTwoWrapper
      .find('MarkdownEditor')
      .at(1)
      .prop('handleEditorChange')('value');
    pillarTwoWrapper
      .find('MarkdownEditor')
      .at(2)
      .prop('handleEditorChange')('value');

    pillarTwoWrapper.setState({
      title: 'This is a titler',
      introduction:
        'Key Activities section must not be less than 20 characteres',
      whatWeAreDoing:
        'Key Activities section must not be less than 20 charactters',
      keyActivities:
        'Key Activities section must not be less than 20 characteers',
    });
    pillarTwoWrapper.find('form').simulate('submit');
    pillarTwoWrapper
      .find('FileInput')
      .at(0)
      .prop('change')({
      target: { name: 'image1', files: [{ filename: '' }] },
    });
    pillarTwoWrapper
      .find('FileInput')
      .at(1)
      .prop('change')({
      target: { name: 'image2', files: [{ filename: '' }] },
    });
    pillarTwoWrapper
      .find('FileInput')
      .at(0)
      .simulate('change');
    pillarTwoWrapper
      .find('FileInput')
      .at(1)
      .simulate('change');
    pillarTwoWrapper.find('button').simulate('click');
    pillarTwoWrapper.instance().submit({ preventDefault: func });
    pillarTwoWrapper.instance().handleEditorChange('title', 'title is newwww');
    pillarTwoWrapper
      .instance()
      .handleEditorChange(
        'introduction',
        'Key Activities section must not be less than 20 characteres',
      );
    pillarTwoWrapper
      .instance()
      .handleEditorChange(
        'whatWeAreDoing',
        'Key Activities section must not be less than 20 charactters',
      );
    pillarTwoWrapper
      .instance()
      .handleEditorChange(
        'keyActivities',
        'Key Activities section must not be less than 20 characteers',
      );
  });
});

// Pillar three

describe(' Pillar', () => {
  it('should render properly', () => {
    const tree = toJson(pillarThreeWrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders Pillar component without crashing', () => {
    pillarThreeWrapper.setState({
      title: 'This is a title',
      introduction:
        'Key Activities section must not be less than 20 characters',
      whatWeAreDoing:
        'Key Activities section must not be less than 20 characters',
      keyActivities:
        'Key Activities section must not be less than 20 characters',
    });

    pillarThreeWrapper.state(
      'title',
      'introduction',
      'whatWeAreDoing',
      'keyActivities',
    );

    pillarThreeWrapper
      .find('MarkdownEditor')
      .at(0)
      .prop('handleEditorChange')('value');
    pillarThreeWrapper
      .find('MarkdownEditor')
      .at(1)
      .prop('handleEditorChange')('value');
    pillarThreeWrapper
      .find('MarkdownEditor')
      .at(2)
      .prop('handleEditorChange')('value');

    pillarThreeWrapper.setState({
      title: 'This is a titler',
      introduction:
        'Key Activities section must not be less than 20 characteres',
      whatWeAreDoing:
        'Key Activities section must not be less than 20 charactters',
      keyActivities:
        'Key Activities section must not be less than 20 characteers',
    });
    pillarThreeWrapper.find('form').simulate('submit');
    pillarThreeWrapper
      .find('FileInput')
      .at(0)
      .prop('change')({
      target: { name: 'image1', files: [{ filename: '' }] },
    });
    pillarThreeWrapper
      .find('FileInput')
      .at(1)
      .prop('change')({
      target: { name: 'image2', files: [{ filename: '' }] },
    });
    pillarThreeWrapper
      .find('FileInput')
      .at(0)
      .simulate('change');
    pillarThreeWrapper
      .find('FileInput')
      .at(1)
      .simulate('change');
    pillarThreeWrapper.find('button').simulate('click');
    pillarThreeWrapper.instance().submit({ preventDefault: func });
    pillarThreeWrapper
      .instance()
      .handleEditorChange('title', 'title is newwww');
    pillarThreeWrapper
      .instance()
      .handleEditorChange(
        'introduction',
        'Key Activities section must not be less than 20 characteres',
      );
    pillarThreeWrapper
      .instance()
      .handleEditorChange(
        'whatWeAreDoing',
        'Key Activities section must not be less than 20 charactters',
      );
    pillarThreeWrapper
      .instance()
      .handleEditorChange(
        'keyActivities',
        'Key Activities section must not be less than 20 characteers',
      );
  });
});

// Pillar Four

describe(' Pillar', () => {
  it('should render properly', () => {
    const tree = toJson(pillarFourWrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders Pillar component without crashing', () => {
    pillarFourWrapper.setState({
      title: 'This is a title',
      introduction:
        'Key Activities section must not be less than 20 characters',
      whatWeAreDoing:
        'Key Activities section must not be less than 20 characters',
      keyActivities:
        'Key Activities section must not be less than 20 characters',
    });

    pillarFourWrapper.state(
      'title',
      'introduction',
      'whatWeAreDoing',
      'keyActivities',
    );

    pillarFourWrapper
      .find('MarkdownEditor')
      .at(0)
      .prop('handleEditorChange')('value');
    pillarFourWrapper
      .find('MarkdownEditor')
      .at(1)
      .prop('handleEditorChange')('value');
    pillarFourWrapper
      .find('MarkdownEditor')
      .at(2)
      .prop('handleEditorChange')('value');

    pillarFourWrapper.setState({
      title: 'This is a titler',
      introduction:
        'Key Activities section must not be less than 20 characteres',
      whatWeAreDoing:
        'Key Activities section must not be less than 20 charactters',
      keyActivities:
        'Key Activities section must not be less than 20 characteers',
    });
    pillarFourWrapper.find('form').simulate('submit');
    pillarFourWrapper
      .find('FileInput')
      .at(0)
      .prop('change')({
      target: { name: 'image1', files: [{ filename: '' }] },
    });
    pillarFourWrapper
      .find('FileInput')
      .at(1)
      .prop('change')({
      target: { name: 'image2', files: [{ filename: '' }] },
    });
    pillarFourWrapper
      .find('FileInput')
      .at(0)
      .simulate('change');
    pillarFourWrapper
      .find('FileInput')
      .at(1)
      .simulate('change');
    pillarFourWrapper.find('button').simulate('click');
    pillarFourWrapper.instance().submit({ preventDefault: func });
    pillarFourWrapper.instance().handleEditorChange('title', 'title is newwww');
    pillarFourWrapper
      .instance()
      .handleEditorChange(
        'introduction',
        'Key Activities section must not be less than 20 characteres',
      );
    pillarFourWrapper
      .instance()
      .handleEditorChange(
        'whatWeAreDoing',
        'Key Activities section must not be less than 20 charactters',
      );
    pillarFourWrapper
      .instance()
      .handleEditorChange(
        'keyActivities',
        'Key Activities section must not be less than 20 characteers',
      );
  });
});
