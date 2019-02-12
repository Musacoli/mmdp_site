import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
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
const reports = [
  {
    _id: '4456534rfdrdthryhfgdzc',
    title: 'Awesome report',
    reportType: 'annual',
  },
];
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
    wrapper = mount(<ListReport {...props} />);
  });
  describe('ListReports without pagination', () => {
    it('should mount without crashing', () => {
      expect(wrapper.find(SimpleLoader).exists()).toBeTruthy();
      expect(wrapper.find(ListReportGrid).exists()).toBeTruthy();
      expect(wrapper.find(Pagination).exists()).toBeFalsy();
    });
    it('should get list of reports on component mount', () => {
      expect(wrapper.prop('getReports')).toBeCalledTimes(1);
      expect(wrapper.prop('getReports')).toBeCalledWith(1);
    });
    // it('should get list of reports for a particular page when a user navigates to that page', () => {
    //   expect(wrapper.prop('getReports')).toBeCalledWith(1);
    //   wrapper.setProps({ location: { search: '?page=2' } });
    //   expect(wrapper.prop('getReports')).toBeCalledTimes(2);
    //   expect(wrapper.prop('getReports')).toBeCalledWith(2);
    // });
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
  describe('ListReports with pagination', () => {
    const currentPage = 1;
    const totalPages = 3;
    beforeEach(() => {
      const propsWithResponse = {
        ...props,
        loading: false,
        location: { search: '?page=1' },
        response: { meta: { currentPage, totalPages }, reports },
      };
      wrapper = mount(
        <MemoryRouter>
          <ListReport {...propsWithResponse} />
        </MemoryRouter>,
      );
    });
    // it('should contain pagination component', () => {
    //   expect(wrapper.find(Pagination).exists()).toBeTruthy();
    // });
    // it('should contain correct link the next page', () => {
    //   expect(
    //     wrapper
    //       .find('a.pagination-area__navigator')
    //       .at(1)
    //       .props().href,
    //   ).toBe(`/?page=${currentPage + 1}`);
    // });
    // it('should contain disabled link if the current page is the first page', () => {
    //   const onClickFn = wrapper
    //     .find('a.pagination-area__navigator')
    //     .at(0)
    //     .props().onClick;
    //   expect(
    //     wrapper
    //       .find('a.pagination-area__navigator')
    //       .at(0)
    //       .props().href,
    //   ).toBe('/');
    //   expect(onClickFn).toEqual(expect.any(Function));
    //   onClickFn(event);
    //   expect(event.preventDefault).toHaveBeenCalled();
    // });
  });
});
