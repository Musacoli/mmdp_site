import React from 'react';
import { shallow, mount } from 'enzyme';
import MarkdownEditor from '../../../components/common/MarkdownEditor';

const func = () => {};

describe('<MarkdownEditor /> ', () => {
  it('renders MarkdownEditor component without crashing', () => {
    shallow(<MarkdownEditor value="value" handleEditorChange={func} />);
  });
  it('renders MarkdownEditor component without crashing', () => {
    const wrapper = mount(
      <MarkdownEditor value="value" handleEditorChange={func} />,
    );
    wrapper.instance().handleEditorChange({ target: { getContent: () => {} } });
    wrapper.instance().imageUploadHandler({ blob: func }, func, func);
  });
});
