import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { ListReport } from '../../../../containers/Resources/Report/ListReport';
import ListReportGrid from '../../../../components/Resources/Report/ListReport';
import SimpleLoader from '../../../../components/common/Loader/SimpleLoader';
import Pagination from '../../../../components/common/Pagination';

const itemToModify = '32434r4etryhtgfdafsrf';
const deleteActionState = {
  isOpen: true,
  itemToModify,
  modalAction: 'delete',
};
const archiveActionState = {
  ...deleteActionState,
  modalAction: 'archive',
};
describe('ListReports', () => {
  let wrapper;
  let props;
  let event = {};
  beforeEach(() => {
    props = {
      getReports: jest.fn(),
      removeReport: jest.fn(),
      archiveReport: jest.fn(),
      loading: true,
      location: { search: '?page=1' },
      response: {},
    };
    event = {
      preventDefault: jest.fn(),
    };
    wrapper = mount(
      <Router>
        <ListReport {...props} />
      </Router>,
    ).find(ListReport);
  });
  describe('ListReports without pagination', () => {
    it('should mount without crashing', () => {
      expect(wrapper.find(SimpleLoader).exists()).toBeTruthy();
      expect(wrapper.find(ListReportGrid).exists()).toBeTruthy();
      expect(wrapper.find(Pagination).exists()).toBeTruthy();
    });
    it('should get list of reports on component mount', () => {
      expect(wrapper.prop('getReports')).toBeCalledTimes(1);
      expect(wrapper.prop('getReports')).toBeCalledWith({
        page: 1,
        search: '',
      });
    });
    it('should display modal when show modal method is called', () => {
      wrapper.find(ListReportGrid).prop('showModal')(event, {
        id: itemToModify,
        modalAction: 'archive',
      });
    });
    it('should call handleConfirm method and delete report when modal action equals delete', () => {
      wrapper.setState(deleteActionState);
      wrapper.find(ListReportGrid).prop('onConfirm')();
      expect(wrapper.prop('removeReport')).toBeCalledWith({ id: itemToModify });
    });
    it('should call handleConfirm method and archive report when modal action equals archive', () => {
      wrapper.setState(archiveActionState);
      wrapper.find(ListReportGrid).prop('onConfirm')();
      expect(wrapper.prop('archiveReport')).toBeCalledWith({
        action: 'archive',
        id: itemToModify,
      });
      expect(wrapper.state('isOpen')).toBeFalsy();
    });
    it('should call handleConfirm method and unarchive report when modal action equals unarchive', () => {
      archiveActionState.modalAction = 'unarchive';
      wrapper.setState(archiveActionState);
      wrapper.find(ListReportGrid).prop('onConfirm')();
      expect(wrapper.prop('archiveReport')).toBeCalledWith({
        action: 'unarchive',
        id: itemToModify,
      });
      expect(wrapper.state('isOpen')).toBeFalsy();
    });
  });
});
