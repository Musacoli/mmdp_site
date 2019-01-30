import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import API from '../../../utils/keys';
import '../../../assets/styles/MarkdownEditor/index.scss';

class MarkdownEditor extends Component {
  handleEditorChange = (e) => {
    const { handleEditorChange } = this.props;
    handleEditorChange(e.target.getContent());
  };

  imageUploadHandler = (blobInfo, success, failure) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob());

    fetch(`${API}/api/v1/file-upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        success(res.file.file.url);
      })
      .catch(() => {
        failure('Error occurred');
      });
  };

  render() {
    const { value } = this.props;
    return (
      <Editor
        initialValue={value || ''}
        init={{
          plugins: 'link lists image',
          images_upload_handler: this.imageUploadHandler,
          toolbar:
            'fontsizeselect bold italic underline alignleft aligncenter alignright alignjustify bullist numlist outdent indent image',
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

MarkdownEditor.propTypes = {
  handleEditorChange: PropTypes.func,
  value: PropTypes.string,
};

export default MarkdownEditor;
