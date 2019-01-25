import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';


import './index.scss';

class MarkdownEditor extends Component {
  handleEditorChange = (e) => {
    this.props.handleEditorChange(e.target.getContent())
  }

  render() {
    return (
      <Editor
        initialValue={this.props.value || ''}
        init={{
          plugins: 'link lists image',
          toolbar: 'fontsizeselect bold italic underline alignleft aligncenter alignright bullist numlist outdent indent image'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

MarkdownEditor.propTypes = {
  handleEditorChange: PropTypes.func,
  value: PropTypes.string,
}

export default MarkdownEditor;
