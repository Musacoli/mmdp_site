import sinon from 'sinon';
import modelHelper from '../../../helpers/modelHelper';

/**
 * Holds mock file metadata that is used by the stubModelUpdateProcess() method.
 */
export const data = {
  pdf: {
    mimetype: 'application/pdf',
    filename: '1548791511140blank.pdf',
    path: '/assets/documents',
    size: 4911,
    url: 'urltoaws/1548791511140blank.pdf',
  },
  img: {
    mimetype: 'application/png',
    filename: '1548791511140test-img.png',
    path: '/assets/images',
    size: 5000,
    url: 'urltoaws/1548791511140test-img.png',
  },
  video: {
    mimetype: 'video/quicktime',
    filename: 'aUMGKPJFfDntrMlm',
    path: '/assets/repository/media',
    size: 4931981,
    etag: '"d1714ae92a69773f19b0bb36aaa6af26"',
    bucket: 'mmdp-img-assets',
    url: 'urltoaws/aUMGKPJFfDntrMlm.mov',
  },
};

/**
 * Stub the model update process method. This will prevent tests from actually uploading files.
 * Uploading files makes tests slow and fails if there is no reliable connection. The type
 * field specifies the kind of file that you're trying to upload. The fileField specifies
 * the name of the file field on an actual response when a file is uploaded. otherFields
 * specifies other fields that are returned when the model is created or updated. The
 * _id field is already mocked.
 *
 * @param type
 * @param fileField
 * @param otherFields
 * @returns {*|void}
 */
export const stubModelUpdateProcess = (type, fileField, otherFields = {}) => {
  return sinon.stub(modelHelper, 'process').resolves(
    Promise.resolve({
      [fileField]: data[type],
      _id: '5c54ed71193ac3510f55ebcd',
      ...otherFields,
    }),
  );
};
