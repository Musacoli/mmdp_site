import React from 'react';
import { mount } from 'enzyme';
import { ListResearch } from '../../../../containers/Resources/Research/ListResearch';
import ListResearchGrid from '../../../../components/Resources/Research/ListResearch';
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
describe('ListResearch', () => {
  let wrapper;
  let props;
  let event = {};
  beforeEach(() => {
    props = {
      getResearch: jest.fn(),
      removeResearch: jest.fn(),
      archiveResearch: jest.fn(),
      loading: true,
      location: { search: '?page=1' },
      research: {
        results: {},
      },
    };
    event = {
      preventDefault: jest.fn(),
    };
    wrapper = mount(<ListResearch {...props} />);
  });
  describe('ListResearch without pagination', () => {
    it('should mount without crashing', () => {
      expect(wrapper.find(SimpleLoader).exists()).toBeTruthy();
      expect(wrapper.find(ListResearchGrid).exists()).toBeTruthy();
      expect(wrapper.find(Pagination).exists()).toBeTruthy();
    });
    it('should get list of reports on component mount', () => {
      expect(wrapper.prop('getResearch')).toBeCalledTimes(1);
      expect(wrapper.prop('getResearch')).toBeCalledWith({
        page: 1,
        query: '',
      });
    });
    it('should display modal when show modal method is called', () => {
      wrapper.find(ListResearchGrid).prop('showModal')(event, {
        id: itemToModify,
        modalAction: 'archive',
      });
    });
    it('should call handleConfirm method and delete report when modal action equals delete', () => {
      wrapper.setState(deleteActionState);
      wrapper.find(ListResearchGrid).prop('onConfirm')();
      expect(wrapper.prop('removeResearch')).toBeCalledWith(itemToModify);
    });
    it('should call handleConfirm method and archive report when modal action equals archive', () => {
      wrapper.setState(archiveActionState);
      wrapper.find(ListResearchGrid).prop('onConfirm')();
      expect(wrapper.prop('archiveResearch')).toBeCalledWith({
        data: {
          archived: true,
        },
        _id: itemToModify,
      });
      expect(wrapper.state('isOpen')).toBeFalsy();
    });
    it('should call handleConfirm method and unarchive report when modal action equals unarchive', () => {
      archiveActionState.modalAction = 'unarchive';
      wrapper.setState(archiveActionState);
      wrapper.find(ListResearchGrid).prop('onConfirm')();
      expect(wrapper.prop('archiveResearch')).toBeCalledWith({
        data: {
          archived: false,
        },
        _id: itemToModify,
      });
      expect(wrapper.state('isOpen')).toBeFalsy();
    });
  });
});
