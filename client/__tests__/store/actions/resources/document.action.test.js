import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
} from '../../../../constants/resources/document';
import {
  addDocument,
  addDocumentFailure,
  addDocumentSuccessful,
} from '../../../../store/actions/resources/document';

describe('Resource document actions', () => {
  it('should dispatch ADD_DOCUMENT', () => {
    expect(addDocument({}).type).toEqual(ADD_DOCUMENT);
  });
  it('should dispatch ADD_DOCUMENT_SUCCESS', () => {
    expect(addDocumentSuccessful({}).type).toEqual(ADD_DOCUMENT_SUCCESS);
  });
  it('should dispatch ADD_DOCUMENT_FAILURE', () => {
    expect(addDocumentFailure({}).type).toEqual(ADD_DOCUMENT_FAILURE);
  });
});
