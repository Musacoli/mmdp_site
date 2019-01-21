import React from 'react';
import { shallow } from 'enzyme';
import MarkdownEditor from '..';

const handleEditorChange = () => {};

describe('<MarkdownEditor /> ', () => {
  it('renders MarkdownEditor component without crashing', () => {
    shallow(<MarkdownEditor value="value" handleEditorChange={handleEditorChange} />);
  });
});

